const { client, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("The server info system")
        .setDMPermission(false)
        .addSubcommand((subcommand) => subcommand
            .setName('emojimap')
            .setDescription('View the list of emojis on the server')
        )
        .addSubcommand((subcommand) => subcommand
            .setName("help")
            .setDescription("Shows the list of commands and information about the bot")
        )
        .addSubcommand((subcommand) => subcommand
            .setName("server-info")
            .setDescription('Shows info about the server')
        )
        .addSubcommand((subcommand) => subcommand
            .setName('user-info')
            .setDescription(`Find information about a user in the guild`)
            .addUserOption(option => option
                .setName('user')
                .setDescription(`The user you want to get information about`)
                .setRequired(false)
            )
        )
        .addSubcommand((subcommand) => subcommand
            .setName("ping")
            .setDescription('Replies with the bot ping!')
        )
    ,
    /**
    * 
    * @param {Object} param0 
    * @param {ChatInputCommandInteraction} param0.interaction
    */
    run: async ({ interaction, client }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: 'You can only run this command inside a server.',
                ephemeral: true,
            });
            return;
        }
        const mainSubCommand = interaction.options.getSubcommand();
        const queryGuild = {
            guildId: interaction.guild.id,
        };
        switch (mainSubCommand) {
            case "emojimap":
                const emojis = interaction.guild.emojis.cache.map((e) => `${e} | \`${e}\``);
                const pageSize = 10;
                const pages = Math.ceil(emojis.length / pageSize);
                let currentPage = 0;

                const generateEmbed = (page) => {
                    const start = page * pageSize;
                    const end = start + pageSize;
                    const emojiList = emojis.slice(start, end)
                        .join('\n') || 'This server does not have emojis';

                    const emojimapEmbed = new EmbedBuilder()
                        .setTitle(`Emojis (Pagina ${page + 1} de ${pages})`)
                        .setDescription(`${emojiList}`);
                    return emojimapEmbed;
                }
                const emojimapRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('previous')
                            .setLabel('Former')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next')
                            .setStyle(ButtonStyle.Primary),
                    );

                const emojimapMessage = await interaction.reply({ embeds: [generateEmbed(currentPage)], components: [emojimapRow], fetchReply: true, ephemeral: true });

                const emojimapCollector = await emojimapMessage.createMessageComponentCollector();

                emojimapCollector.on('collect', async interaction => {
                    if (interaction.customId === 'previous') {
                        currentPage--;
                        if (currentPage < 0) {
                            currentPage = pages - 1;
                        }
                    } else if (interaction.customId === 'next') {
                        currentPage++;
                        if (currentPage > pages - 1) {
                            currentPage = 0;
                        }
                    }
                    await interaction.update({ embeds: [generateEmbed(currentPage)], components: [row], ephemeral: true });
                });

                emojimapCollector.on('end', async () => {
                    row.components.forEach((c) => {
                        c.setDisabled(true);
                    });
                    await emojimapMessage.edit({ components: [row], ephemeral: true });
                });
                break;
            case "help":
                const helpmenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("menu")
                            .setPlaceholder("Select a topic")
                            .addOptions(
                                {
                                    label: "Public commands",
                                    description: "Shows all public commands",
                                    value: "menu1"
                                },

                                {
                                    label: "Moderation commands",
                                    description: "Shows all moderation commands",
                                    value: "menu2"
                                },

                                {
                                    label: "Music commands",
                                    description: "Shows the music commands",
                                    value: "menu3"
                                },
                            ),
                    );

                const funbutton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("funbutton")
                            .setLabel("Fun commands")
                            .setStyle(ButtonStyle.Secondary)
                    )

                const generalcommands = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("back")
                            .setLabel("Back")
                            .setStyle(ButtonStyle.Primary)
                    )

                const inviteme = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Invite me")
                            .setStyle(ButtonStyle.Link)
                            .setURL("https://discord.com/api/oauth2/authorize?client_id=1170412463993409586&permissions=8&scope=bot%20applications.commands")
                    )


                const helpEmbed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription("CestnyTR is a multi-function bot with general commands, Admin commands, Moderation commands, Fun commands. Ticket and others will be added soon")
                    .setTimestamp()

                const publicem = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription("`/help`: Shows help menu\n`/avatar`: Shows avatar\n`/ask-gpt`: Ask a question to chatgpt\n`/invite`: Give the bot's invite link\n`/botstats`: Checks the status of the bot\n`/mcstats`: Checks status of a minecraft server\n`/serverinfo`: Gives information about the server\n`/userinfo`: Gives information about a user")
                    .setTimestamp()

                const funem = new EmbedBuilder()
                    .setColor("Yellow")
                    .setDescription("`/tweet`: fake-tweets a post\n`/meme`: Generates a random meme\n`/pixelate`: Pixelate a usre's avatar\n`/slap`: Slaps a user")
                    .setTimestamp()

                const modem = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription("`/ban`: Bans a user\n`/unban`: Unbans a user\n`/kick`: Kicks a user\n`/mute`: Mutes a user\n`/unmute`: Unmutes a user\n`/purge`: Purges specific numbers of messages\n`/setup-logs`: Setups log channel in your server\n`/warnings add`: Add warnings to a user\n`/warnings check`: Checks numbers of warnings a user have\n`/warnings remove`: Clears a specific number of warns from a user\n`/warnings clear`: Clear all warns from a user")
                    .setTimestamp()

                const musicem = new EmbedBuilder()
                    .setColor("Purple")
                    .setDescription("`/play`: Plays a music\n`/forward`: Forwards a music\n`/loop`: Loops a music\n`/nowplaying`: Shows informations about current playing song\n`/pause`: Pauses the playing music\n`/resume`: Resumes a paused music\n`/queue`: Get the list of your currently active queue\n`/shuffle`: Shuffle current playlist.\n`/rewind`: Rewinds the playing music\n`/volume`: Change the volume\n`/stop`: Stops the music")
                    .setTimestamp()

                const helpMessage = await interaction.reply({ embeds: [helpEmbed], components: [helpmenu, inviteme], ephemeral: true })

                const helpCollector = await helpMessage.createMessageComponentCollector()

                helpCollector.on(`collect`, async (i) => {
                    if (i.customId === 'menu') {
                        const value = i.values[0];
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: `Only ${interaction.user.tag} can interact with the select menu!`, ephemeral: true })
                        }
                        if (value === "menu1") {
                            await i.update({ embeds: [publicem], components: [helpmenu, funbutton, inviteme] })
                        }

                        if (value === "menu2") {
                            await i.update({ embeds: [modem], components: [helpmenu, inviteme] })
                        }

                        if (value === "menu3") {
                            await i.update({ embeds: [musicem], components: [helpmenu, inviteme] })
                        }
                    }

                    if (i.customId === "funbutton") {
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: `Only ${interaction.user.tag} can interact with the buttons!`, ephemeral: true })
                        }
                        await i.update({ embeds: [funem], components: [helpmenu, generalcommands, inviteme] })
                    }

                    if (i.customId === "back") {
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: `Only ${interaction.user.tag} can interact with the buttons!`, ephemeral: true })
                        }
                        await i.update({ embeds: [publicem], components: [helpmenu, funbutton, inviteme] })
                    }

                })
                break;
            case "server-info":
                if (!interaction.memberPermissions.has('Administrator')) {
                    await interaction.reply({
                        content: "You dont have enough Permissions",
                        ephemeral: true,
                    });
                    return;
                }
                const { guild } = interaction;
                const serverInfoEmbed = new EmbedBuilder({
                    author: { name: guild.name, iconURL: guild.iconURL({ size: 256 }) },
                    fields: [
                        { name: 'Owner', value: (await guild.fetchOwner()).user.tag, inline: true },
                        { name: 'Text Channels', value: guild.channels.cache.filter((c) => c.type === 0).toJSON().length, inline: true },
                        { name: 'Voice Channels', value: guild.channels.cache.filter((c) => c.type === 2).toJSON().length, inline: true },
                        { name: 'Categories', value: guild.channels.cache.filter((c) => c.type === 4).toJSON().length, inline: true },
                        { name: 'Members', value: guild.memberCount, inline: true },
                        { name: 'Roles', value: guild.roles.cache.size, inline: true },
                        { name: 'Role List', value: guild.roles.cache.toJSON().join(', ') }
                    ],
                    footer: { text: `ID: ${guild.id} | Server Created: ${guild.createdAt.toDateString()}` }
                })
                interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true })
                break;
            case "user-info":
                const user = interaction.options.getUser('user') || interaction.user;
                const member = await interaction.guild.members.fetch(user.id);
                const userAvatar = user.displayAvatarURL({ size: 32 });
                const nick = member.displayName || 'None';
                const botStatus = user.bot ? 'Yes' : 'No';
                const userInfoEmbed = new EmbedBuilder()
                    .setTitle(`${user.username}'s Information`)
                    .setColor('Red')
                    .setThumbnail(userAvatar)
                    .setTimestamp()
                    .setFooter({ text: `User ID: ${user.id}` })
                    .addFields({
                        name: '<:arrow:1174741041404989502> Joined Discord',
                        value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`,
                        inline: true,
                    })
                    .addFields({
                        name: '<:arrow:1174741041404989502>  Joined Server',
                        value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`,
                        inline: true,
                    })
                    .addFields({
                        name: '<:namecard:1174742568332963932> Nickname:',
                        value: nick,
                        inline: false,
                    })
                    .addFields({
                        name: '<:discordboost:1174743833649623050> Boosted Server',
                        value: member.premiumSince ? 'Yes' : 'No',
                        inline: false,
                    })
                    .addFields({
                        name: '<:botverify:1174744270276677763> BOT',
                        value: botStatus,
                        inline: false,
                    })
                await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });
                break;
            case "ping":
                await interaction.deferReply({ ephemeral: true });

                const reply = await interaction.fetchReply();

                const ping = reply.createdTimestamp - interaction.createdTimestamp;

                interaction.editReply(
                    `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
                );
                break;
        }

    }
}