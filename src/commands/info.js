const { client, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const trLang = require("../lang/tr.json").buildCommands.info;
const enLang = require("../lang/en.json").buildCommands.info;
const commandLangSetup = require("../lang/commandLangSetup");
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
                            .setPlaceholder(langData.placeholder)
                            .addOptions(
                                {
                                    label: langData.helpMenu.publicCommands.label,
                                    description: langData.helpMenu.publicCommands.description,
                                    value: "publicCommands"
                                },

                                {
                                    label: langData.helpMenu.moderationCommands.label,
                                    description: langData.helpMenu.moderationCommands.description,
                                    value: "moderationCommands"
                                },

                                {
                                    label: langData.helpMenu.musicCommands.label,
                                    description: langData.helpMenu.musicCommands.description,
                                    value: "musicCommands"
                                },
                            ),
                    );

                const funbutton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("funbutton")
                            .setLabel(langData.helpMenu.funButton)
                            .setStyle(ButtonStyle.Secondary)
                    )

                const generalcommands = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId("back")
                            .setLabel(langData.helpMenu.generalCommands)
                            .setStyle(ButtonStyle.Primary)
                    )

                const inviteme = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(langData.helpMenu.inviteMe.label)
                            .setStyle(ButtonStyle.Link)
                            .setURL(langData.helpMenu.inviteMe.url)
                    )


                const helpEmbed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(langData.helpEmbed)
                    .setTimestamp()

                const publicem = new EmbedBuilder()
                    .setColor("Green")
                    .setDescription(langData.publicCommands)
                    .setTimestamp()

                const funem = new EmbedBuilder()
                    .setColor("Yellow")
                    .setDescription(langData.funCommands)
                    .setTimestamp()

                const modem = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(langData.moderationCommands)
                    .setTimestamp()

                const musicem = new EmbedBuilder()
                    .setColor("Purple")
                    .setDescription(langData.musicCommands)
                    .setTimestamp()

                const helpMessage = await interaction.reply({ embeds: [helpEmbed], components: [helpmenu, inviteme], ephemeral: true })

                const helpCollector = await helpMessage.createMessageComponentCollector()

                helpCollector.on(`collect`, async (i) => {
                    if (i.customId === 'helpMenu') {
                        const value = i.values[0];
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: langData.interactErrMenu.replace("{{user}}", interaction.user.tag), ephemeral: true })
                        }
                        if (value === "publicCommands") {
                            await i.update({ embeds: [publicem], components: [helpmenu, funbutton, inviteme] })
                        }

                        if (value === "moderationCommands") {
                            await i.update({ embeds: [modem], components: [helpmenu, inviteme] })
                        }

                        if (value === "musicCommands") {
                            await i.update({ embeds: [musicem], components: [helpmenu, inviteme] })
                        }
                    }

                    if (i.customId === "funbutton") {
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: langData.interactErrBtn.replace("{{user}}", interaction.user.tag), ephemeral: true })
                        }
                        await i.update({ embeds: [funem], components: [helpmenu, generalcommands, inviteme] })
                    }

                    if (i.customId === "back") {
                        if (i.user.id !== interaction.user.id) {
                            return await i.reply({ content: langData.interactErrBtn.replace("{{user}}", interaction.user.tag), ephemeral: true })
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