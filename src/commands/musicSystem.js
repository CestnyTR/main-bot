const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits, VoiceChannel, GuildEmoji, ChatInputCommandInteraction, DiscordjsTypeError } = require('discord.js');
const client = require("../index")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription('play your music')
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName("play")
            .setDescription("Write here a song name")
            .addStringOption(option => option
                .setName("query")
                .setDescription("paste youtube url")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("volume")
            .setDescription("Adjust the song volume")
            .addIntegerOption(option => option
                .setName("percent")
                .setDescription("10=10%")
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("queue")
            .setDescription("Music queue")
        )
        .addSubcommand(subcommand => subcommand
            .setName("skip")
            .setDescription("Skip the music ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("pause")
            .setDescription("Pause the music ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("resume")
            .setDescription("Resume the music ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("stop")
            .setDescription("Stop the music ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("now-playing")
            .setDescription("Now Playing ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("shuffle")
            .setDescription("Shuffle current playlist ")
        )
        .addSubcommand(subcommand => subcommand
            .setName("foward")
            .setDescription("Foward seconds in a song")
            .addIntegerOption(option => option
                .setName("secounds")
                .setDescription("Amount of seconds to foward. (10 = 10s)")
                .setMinValue(0)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("rewind")
            .setDescription("Rewind seconds in a song")
            .addIntegerOption(option => option
                .setName("secounds")
                .setDescription("Amount of seconds to rewind. (10 = 10s)")
                .setMinValue(0)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("loop")
            .setDescription("Display loop options")
            .addStringOption(option => option
                .setName("loop-options")
                .setDescription("Loop optiıns : off, song, queue")
                .addChoices(
                    { name: "off", value: "off" },
                    { name: "song", value: "song" },
                    { name: "queue", value: "queue" },
                )
                .setRequired(true)
            )
        )
    ,
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
    */
    run: async ({ interaction }) => {
        try {
            DiscordjsTypeError
            const { options, member, guild, channel } = interaction
            const subcommand = options.getSubcommand();
            const query = options.getString("query");
            const volume = options.getInteger("percent");
            const voiceChannel = member.voice.channel;
            const seconds = options.getInteger("secounds");
            const loopOptions = options.getString("loop-options")
            const queue = await client.distube.getQueue(voiceChannel)
            const embed = new EmbedBuilder();
            if (!voiceChannel) {
                embed.setColor("Red").setDescription("You must join voice channel");
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }
            if (!member.voice.channelId == guild.members.me.voice.channelId) {
                embed.setColor("Red").setDescription(`You can't use music player as it already active in <#${guild.members.me.voice.channelId}>`);
                return interaction.reply({ embeds: [embed], ephemeral: true })
            }
            switch (subcommand) {
                case "play":
                    client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
                    interaction.reply({ content: "🎵 Request recived." })
                    break;
                case "volume":
                    checkQueue();
                    client.distube.setVolume(voiceChannel, volume);
                    interaction.reply({ content: `🔉 Volume has been set to ${volume}%` })
                    break;
                case "skip":
                    checkQueue();

                    await queue.skip(voiceChannel);
                    embed.setColor("Blue").setDescription(`⏭️ The song has been skipped`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "stop":
                    checkQueue();
                    await queue.stop(voiceChannel);
                    embed.setColor("Red").setDescription(`⏹️ The song has been stopped`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "pause":
                    checkQueue();
                    await queue.pause(voiceChannel);
                    embed.setColor("Orange").setDescription(`⏸️ The song has been paused`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "resume":
                    checkQueue();
                    await queue.resume(voiceChannel);
                    embed.setColor("Green").setDescription(`⏯️ The song has been resumed`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "queue":
                    checkQueue();
                    const listQueue = await client.distube.getQueue(voiceChannel)
                    embed.setColor("Purple").setDescription(`${listQueue.songs.map(
                        (song, id) => `\n**${id + 1}** ${song.name} -\`${song.formattedDuration}\``)}`
                    );
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "shuffle":
                    checkQueue();
                    const shuffleSong = await client.distube.getQueue(voiceChannel)
                    await shuffleSong.shuffle();
                    embed.setColor("Purple").setDescription(`shuffled songs  in the queue. :${shuffleSong.songs.map(
                        (song, id) => `\n**${id + 1}** ${song.name} -\`${song.formattedDuration}\``)}`
                    ); interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "foward":
                    checkQueue();
                    await queue.seek(queue.currentTime + seconds);
                    embed.setColor("Purple").setDescription(`⏭️ The song Fowarded \`${seconds}\`.`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "rewind":
                    checkQueue();
                    await queue.seek(queue.currentTime - seconds);
                    embed.setColor("Purple").setDescription(`⏮️ The song Rewind \`${seconds}\`.`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "now-playing":
                    checkQueue();
                    const nowSong = queue.songs[0];
                    embed.setColor("Blue").setDescription(`🎵 **Currently playing:** \`${nowSong.name}\` - \`${nowSong.formattedDuration}\`.\n**Link:**\`${nowSong.url}\`.`).setThumbnail(nowSong.thumbnail);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
                case "loop":
                    checkQueue();
                    const loopQueue = await client.distube.getQueue(voiceChannel)
                    let mode = null;
                    switch (loopOptions) {
                        case "off":
                            mode = 0;
                            break;
                        case "song":
                            mode = 1;
                            break;
                        case "queue":
                            mode = 2;
                            break;
                    }
                    mode = await loopQueue.setRepeatMode(mode);
                    mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
                    embed.setColor("Orange").setDescription(`🔁 Set repeat mode to \`${mode}\`.`);
                    interaction.reply({ embeds: [embed], ephemeral: true })
                    break;
            }

            async function checkQueue() {
                const list = await client.distube.getQueue(voiceChannel)
                if (!list) {
                    embed.setColor("Red").setDescription("There is no active queue");
                    return interaction.reply({ embeds: [embed], ephemeral: true })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

