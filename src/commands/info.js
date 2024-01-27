const { client, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const trLang = require("../lang/tr.json").buildCommands.info;
const enLang = require("../lang/en.json").buildCommands.info;
const LanguageService = require("../utils/LanguageService");
let langData
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
        .addSubcommand((subcommand) => subcommand
            .setName(enLang.emojimap.name)
            .setNameLocalizations({
                tr: trLang.emojimap.name,
            })
            .setDescription(enLang.emojimap.description)
            .setDescriptionLocalizations({
                tr: trLang.emojimap.description,
            })
        )
        .addSubcommand((subcommand) => subcommand
            .setName(enLang.help.name)
            .setNameLocalizations({
                tr: trLang.help.name,
            })
            .setDescription(enLang.help.description)
            .setDescriptionLocalizations({
                tr: trLang.help.description,
            })
        )
        .addSubcommand((subcommand) => subcommand
            .setName(enLang.serverInfo.name)
            .setNameLocalizations({
                tr: trLang.serverInfo.name,
            })
            .setDescription(enLang.serverInfo.description)
            .setDescriptionLocalizations({
                tr: trLang.serverInfo.description,
            })
        )
        .addSubcommand((subcommand) => subcommand
            .setName(enLang.userInfo.name)
            .setNameLocalizations({
                tr: trLang.userInfo.name,
            })
            .setDescription(enLang.userInfo.description)
            .setDescriptionLocalizations({
                tr: trLang.userInfo.description,
            })
            .addUserOption(option => option
                .setName(enLang.userInfo.options.name)
                .setNameLocalizations({
                    tr: trLang.userInfo.options.name,
                })
                .setDescription(enLang.userInfo.options.description)
                .setDescriptionLocalizations({
                    tr: trLang.userInfo.options.description,
                })
                .setRequired(false)
            )
        )
    ,
    /**
    * 
    * @param {Object} param0 
    * @param {ChatInputCommandInteraction} param0.interaction
    */
    run: async ({ interaction, client }) => {
        langData = await LanguageService.getLocalizedString(interaction.guild.id, 'commands');
        if (!interaction.inGuild()) {
            interaction.reply({
                content: langData.inGuildError,
                ephemeral: true,
            });
            return;
        }
        const mainSubCommand = interaction.options.getSubcommand();
        const queryGuild = {
            guildId: interaction.guild.id,
        };
        langData = langData.info
        switch (mainSubCommand) {
            case "emojimap":
                langData = langData.emojimap;
                const emojis = interaction.guild.emojis.cache.map((e) => `${e} | \`${e}\``);
                const pageSize = 10;
                const pages = Math.ceil(emojis.length / pageSize);
                let currentPage = 0;

                const generateEmbed = (page) => {
                    const start = page * pageSize;
                    const end = start + pageSize;
                    const emojiList = emojis.slice(start, end)
                        .join('\n') || langData.noEmojis;
                    const emojimapEmbed = new EmbedBuilder()
                        .setTitle(langData.title
                            .replace("{{currentPage}}", page + 1)
                            .replace("{{totalPages}}", totalPages)
                        )
                        .setDescription(`${emojiList}`);
                    return emojimapEmbed;
                }
                const emojimapRow = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('previous')
                            .setLabel(langData.buttonLabels.previous)
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel((langData.buttonLabels.next))
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
                langData = langData.help;
                const helpmenu = new ActionRowBuilder()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("helpMenu")
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
                    if (i.customId === 'helpMenu') {
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
                langData = langData.serverInfo;
                if (!interaction.memberPermissions.has('ManageChannels')) {
                    await interaction.reply({
                        content: langData.permissionError,
                        ephemeral: true,
                    });
                    return;
                }
                const { guild } = interaction;
                const serverInfoEmbed = new EmbedBuilder({
                    author: { name: guild.name, iconURL: guild.iconURL({ size: 256 }) },
                    fields: [
                        { name: langData.owner, value: (await guild.fetchOwner()).user.tag, inline: true },
                        { name: langData.textChannels, value: guild.channels.cache.filter((c) => c.type === 0).toJSON().length, inline: true },
                        { name: langData.voiceChannels, value: guild.channels.cache.filter((c) => c.type === 2).toJSON().length, inline: true },
                        { name: langData.categories, value: guild.channels.cache.filter((c) => c.type === 4).toJSON().length, inline: true },
                        { name: langData.members, value: guild.memberCount, inline: true },
                        { name: langData.roles, value: guild.roles.cache.size, inline: true },
                        { name: langData.roleList, value: guild.roles.cache.toJSON().join(', ') }
                    ],
                    footer: {
                        text: langData.footer.replace("{{guildId}}", guild.id).replace("{{createdAt}}", guild.createdAt.toDateString())
                    }
                })
                interaction.reply({ embeds: [serverInfoEmbed], ephemeral: true })
                break;
            case "user-info":
                langData = langData.userInfo
                const user = interaction.options.getUser('user') || interaction.user;
                const member = await interaction.guild.members.fetch(user.id);
                const userAvatar = user.displayAvatarURL({ size: 32 });
                const nick = member.displayName || langData.none;
                const botStatus = user.bot ? langData.yes : langData.no;
                const userInfoEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setTitle(langData.title.replace("{{username}}", user.username))
                    .setThumbnail(userAvatar)

                    .addFields(
                        {
                            name: langData.joinedDiscord,
                            value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: langData.joinedServer,
                            value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`,
                            inline: true,
                        },
                        {
                            name: langData.nickname,
                            value: nick,
                            inline: false,
                        },
                        {
                            name: langData.boostedServer,
                            value: member.premiumSince ? langData.yes : langData.no,
                            inline: false,
                        },
                        {
                            name: langData.bot,
                            value: botStatus,
                            inline: false,
                        }
                    )
                    .setTimestamp()
                    .setFooter({ text: langData.footer.replace("{{userId}}", user.id) })
                await interaction.reply({ embeds: [userInfoEmbed], ephemeral: true });
                break;
            case "ping":
                await interaction.deferReply({ ephemeral: true });

                const reply = await interaction.fetchReply();

                const ping = reply.createdTimestamp - interaction.createdTimestamp;

                interaction.editReply(langData.ping.replace("{{ping}}", ping).replace("{{websocketPing}}", client.ws.ping));
                break;
        }

    }
}