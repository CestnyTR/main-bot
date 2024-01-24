const { EmbedBuilder, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const client = require("../index")
let queueList
const trLang = require("../lang/tr.json").buildCommands.music;
const enLang = require("../lang/en.json").buildCommands.music;
module.exports = {
    data: new SlashCommandBuilder()
        .setName(enLang.name)
        .setNameLocalizations({
            tr: trLang.name,
        })
        .setDescription(enLang.description)
        .setDescriptionLocalizations({
            tr: trLang.description,
        })
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName(enLang.play.name)
            .setNameLocalizations({
                tr: trLang.play.name,
            })
            .setDescription(enLang.play.description)
            .setDescriptionLocalizations({
                tr: trLang.play.description,
            })
            .addStringOption(option => option
                .setName(enLang.play.options.query.name)
                .setNameLocalizations({
                    tr: trLang.play.options.query.name,
                })
                .setDescription(enLang.play.options.query.description)
                .setDescriptionLocalizations({
                    tr: trLang.play.options.query.description,
                })
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.volume.name)
            .setNameLocalizations({
                tr: trLang.volume.name,
            })
            .setDescription(enLang.volume.description)
            .setDescriptionLocalizations({
                tr: trLang.volume.description,
            })
            .addIntegerOption(option => option
                .setName(enLang.volume.options.percent.name)
                .setNameLocalizations({
                    tr: trLang.volume.options.percent.name,
                })
                .setDescription(enLang.volume.options.percent.description)
                .setDescriptionLocalizations({
                    tr: trLang.volume.options.percent.description,
                })
                .setMinValue(0)
                .setMaxValue(100)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.queue.name)
            .setNameLocalizations({
                tr: trLang.queue.name,
            })
            .setDescription(enLang.queue.description)
            .setDescriptionLocalizations({
                tr: trLang.queue.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.skip.name)
            .setNameLocalizations({
                tr: trLang.skip.name,
            })
            .setDescription(enLang.skip.description)
            .setDescriptionLocalizations({
                tr: trLang.skip.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.pause.name)
            .setNameLocalizations({
                tr: trLang.pause.name,
            })
            .setDescription(enLang.pause.description)
            .setDescriptionLocalizations({
                tr: trLang.pause.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.resume.name)
            .setNameLocalizations({
                tr: trLang.resume.name,
            })
            .setDescription(enLang.resume.description)
            .setDescriptionLocalizations({
                tr: trLang.resume.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.stop.name)
            .setNameLocalizations({
                tr: trLang.stop.name,
            })
            .setDescription(enLang.stop.description)
            .setDescriptionLocalizations({
                tr: trLang.stop.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.nowPlaying.name)
            .setNameLocalizations({
                tr: trLang.nowPlaying.name,
            })
            .setDescription(enLang.nowPlaying.description)
            .setDescriptionLocalizations({
                tr: trLang.nowPlaying.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.shuffle.name)
            .setNameLocalizations({
                tr: trLang.shuffle.name,
            })
            .setDescription(enLang.shuffle.description)
            .setDescriptionLocalizations({
                tr: trLang.shuffle.description,
            })
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.foward.name)
            .setNameLocalizations({
                tr: trLang.foward.name,
            })
            .setDescription(enLang.foward.description)
            .setDescriptionLocalizations({
                tr: trLang.foward.description,
            })
            .addIntegerOption(option => option
                .setName(enLang.foward.options.seconds.name)
                .setNameLocalizations({
                    tr: trLang.foward.options.seconds.name,
                })
                .setDescription(enLang.foward.options.seconds.description)
                .setDescriptionLocalizations({
                    tr: trLang.foward.options.seconds.description,
                })
                .setMinValue(0)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.rewind.name)
            .setNameLocalizations({
                tr: trLang.rewind.name,
            })
            .setDescription(enLang.rewind.description)
            .setDescriptionLocalizations({
                tr: trLang.rewind.description,
            })
            .addIntegerOption(option => option
                .setName(enLang.rewind.options.seconds.name)
                .setNameLocalizations({
                    tr: trLang.rewind.options.seconds.name,
                })
                .setDescription(enLang.rewind.options.seconds.description)
                .setDescriptionLocalizations({
                    tr: trLang.rewind.options.seconds.description,
                })
                .setMinValue(0)
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName(enLang.loop.name)
            .setNameLocalizations({
                tr: trLang.loop.name,
            })
            .setDescription(enLang.loop.description)
            .setDescriptionLocalizations({
                tr: trLang.loop.description,
            })
            .addStringOption(option => option
                .setName(enLang.loop.options.name)
                .setNameLocalizations({
                    tr: trLang.loop.options.name,
                })
                .setDescription(enLang.loop.options.description)
                .setDescriptionLocalizations({
                    tr: trLang.loop.options.description,
                })
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
                queueList = await checkQueue();
                if (queueList == null) return;
                client.distube.setVolume(voiceChannel, volume);
                interaction.reply({ content: `🔉 Volume has been set to ${volume}%` })
                break;
            case "skip":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.skip(voiceChannel);
                embed.setColor("Blue").setDescription(`⏭️ The song has been skipped`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "stop":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.stop(voiceChannel);
                embed.setColor("Red").setDescription(`⏹️ The song has been stopped`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "pause":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.pause(voiceChannel);
                embed.setColor("Orange").setDescription(`⏸️ The song has been paused`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "resume":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.resume(voiceChannel);
                embed.setColor("Green").setDescription(`⏯️ The song has been resumed`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "queue":
                queueList = await checkQueue();
                if (queueList == null) return;
                const listQueue = await client.distube.getQueue(voiceChannel)
                embed.setColor("Purple").setDescription(`${listQueue.songs.map(
                    (song, id) => `\n**${id + 1}** ${song.name} -\`${song.formattedDuration}\``)}`
                );
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "shuffle":
                queueList = await checkQueue();
                if (queueList == null) return;
                const shuffleSong = await client.distube.getQueue(voiceChannel)
                await shuffleSong.shuffle();
                embed.setColor("Purple").setDescription(`shuffled songs  in the queue. :${shuffleSong.songs.map(
                    (song, id) => `\n**${id + 1}** ${song.name} -\`${song.formattedDuration}\``)}`
                ); interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "foward":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.seek(queue.currentTime + seconds);
                embed.setColor("Purple").setDescription(`⏭️ The song Fowarded \`${seconds}\`.`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "rewind":
                queueList = await checkQueue();
                if (queueList == null) return;
                await queue.seek(queue.currentTime - seconds);
                embed.setColor("Purple").setDescription(`⏮️ The song Rewind \`${seconds}\`.`);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "now-playing":
                queueList = await checkQueue();
                if (queueList == null) return;
                const nowSong = queue.songs[0];
                embed.setColor("Blue").setDescription(`🎵 **Currently playing:** \`${nowSong.name}\` - \`${nowSong.formattedDuration}\`.\n**Link:**\`${nowSong.url}\`.`).setThumbnail(nowSong.thumbnail);
                interaction.reply({ embeds: [embed], ephemeral: true })
                break;
            case "loop":
                queueList = await checkQueue();
                if (queueList == null) return;

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
            if (list) return list;
            embed.setColor("Red").setDescription("There is no active queue");
            interaction.reply({ embeds: [embed], ephemeral: true });
            return null;
        }

    }
}

