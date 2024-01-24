const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const linkAccessRole = require("../models/linkAccessRoleSettings")
const capitalLetterDB = require('../models/CapitalLetter');
const forbiddenDb = require('../models/Forbidden');

const trLang = require("../lang/tr.json").buildCommands.chatGuard;
const enLang = require("../lang/en.json").buildCommands.chatGuard;
const LanguageService = require("../../utils/LanguageService");
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
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommandGroup(antiLinkGroup =>
            antiLinkGroup
                .setName(enLang.antiLink.name)
                .setNameLocalizations({
                    tr: trLang.antiLink.name,
                })
                .setDescription(enLang.antiLink.description)
                .setDescriptionLocalizations({
                    tr: trLang.antiLink.description,
                })
                .addSubcommand(enableAntiLink =>
                    enableAntiLink
                        .setName(enLang.antiLink.enable.name)
                        .setNameLocalizations({
                            tr: trLang.antiLink.enable.name,
                        })
                        .setDescription(enLang.antiLink.enable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.antiLink.enable.description,
                        })
                        .addRoleOption(roleOption =>
                            roleOption
                                .setName(enLang.antiLink.enable.roleOption.name)
                                .setNameLocalizations({
                                    tr: trLang.antiLink.enable.roleOption.name,
                                })
                                .setDescription(enLang.antiLink.enable.roleOption.description)
                                .setDescriptionLocalizations({
                                    tr: trLang.antiLink.enable.roleOption.description,
                                })
                                .setRequired(true)
                        )
                )
                .addSubcommand(disableAntiLink =>
                    disableAntiLink
                        .setName(enLang.antiLink.disable.name)
                        .setNameLocalizations({
                            tr: trLang.antiLink.disable.name,
                        })
                        .setDescription(enLang.antiLink.disable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.antiLink.disable.description,
                        })
                )
        )
        .addSubcommandGroup(capitalLetterGroup =>
            capitalLetterGroup
                .setName(enLang.capitalLetter.name)
                .setNameLocalizations({
                    tr: trLang.capitalLetter.name,
                })
                .setDescription(enLang.capitalLetter.description)
                .setDescriptionLocalizations({
                    tr: trLang.capitalLetter.description,
                })
                .addSubcommand(enableCapitalLetter =>
                    enableCapitalLetter
                        .setName(enLang.capitalLetter.enable.name)
                        .setNameLocalizations({
                            tr: trLang.capitalLetter.enable.name,
                        })
                        .setDescription(enLang.capitalLetter.enable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.capitalLetter.enable.description,
                        })
                )
                .addSubcommand(disableCapitalLetter =>
                    disableCapitalLetter
                        .setName(enLang.capitalLetter.disable.name)
                        .setNameLocalizations({
                            tr: trLang.capitalLetter.disable.name,
                        })
                        .setDescription(enLang.capitalLetter.disable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.capitalLetter.disable.description,
                        })
                )
        )
        .addSubcommandGroup(slowModeGroup =>
            slowModeGroup
                .setName(enLang.slowMode.name)
                .setNameLocalizations({
                    tr: trLang.slowMode.name,
                })
                .setDescription(enLang.slowMode.description)
                .setDescriptionLocalizations({
                    tr: trLang.slowMode.description,
                })
                .addSubcommand(enableSlowMode =>
                    enableSlowMode
                        .setName(enLang.slowMode.enable.name)
                        .setNameLocalizations({
                            tr: trLang.slowMode.enable.name,
                        })
                        .setDescription(enLang.slowMode.enable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.slowMode.enable.description,
                        })
                        .addIntegerOption(durationOption =>
                            durationOption
                                .setName(enLang.slowMode.enable.durationOption.name)
                                .setNameLocalizations({
                                    tr: trLang.slowMode.enable.durationOption.name,
                                })
                                .setDescription(enLang.slowMode.enable.durationOption.description)
                                .setDescriptionLocalizations({
                                    tr: trLang.slowMode.enable.durationOption.description,
                                })
                                .setRequired(true)
                        )
                        .addChannelOption(channelOption =>
                            channelOption
                                .setName(enLang.slowMode.enable.channelOption.name)
                                .setNameLocalizations({
                                    tr: trLang.slowMode.enable.channelOption.name,
                                })
                                .setDescription(enLang.slowMode.enable.channelOption.description)
                                .setDescriptionLocalizations({
                                    tr: trLang.slowMode.enable.channelOption.description,
                                })
                                .addChannelTypes(ChannelType.GuildText)
                        )
                )
                .addSubcommand(disableSlowMode =>
                    disableSlowMode
                        .setName(enLang.slowMode.disable.name)
                        .setNameLocalizations({
                            tr: trLang.slowMode.disable.name,
                        })
                        .setDescription(enLang.slowMode.disable.description)
                        .setDescriptionLocalizations({
                            tr: trLang.slowMode.disable.description,
                        })
                        .addChannelOption(channelOption =>
                            channelOption
                                .setName(enLang.slowMode.disable.channelOption.name)
                                .setNameLocalizations({
                                    tr: trLang.slowMode.disable.channelOption.name,
                                })
                                .setDescription(enLang.slowMode.disable.channelOption.description)
                                .setDescriptionLocalizations({
                                    tr: trLang.slowMode.disable.channelOption.description,
                                })
                                .addChannelTypes(ChannelType.GuildText)
                        )
                )
        )
        .addSubcommand(forbidWord =>
            forbidWord
                .setName(enLang.forbidWord.name)
                .setNameLocalizations({
                    tr: trLang.forbidWord.name,
                })
                .setDescription(enLang.forbidWord.description)
                .setDescriptionLocalizations({
                    tr: trLang.forbidWord.description,
                })
                .addStringOption(wordOption =>
                    wordOption
                        .setName(enLang.forbidWord.wordOption.name)
                        .setNameLocalizations({
                            tr: trLang.forbidWord.wordOption.name,
                        })
                        .setDescription(enLang.forbidWord.wordOption.description)
                        .setDescriptionLocalizations({
                            tr: trLang.forbidWord.wordOption.description,
                        })
                        .setRequired(true)
                )
        ),

    /**
    * 
    * @param {Object} param0 
    * @param {ChatInputCommandInteraction} param0.interaction
    */
    run: async ({ interaction }) => {
        langData = await LanguageService.getLocalizedString(interaction.guild.id, 'commands');

        if (!interaction.inGuild()) {
            interaction.reply({
                content: langData.inGuildError,
                ephemeral: true,
            });
            return;
        }
        if (!interaction.memberPermissions.has('ManageChannels')) {
            await interaction.reply("You dont have enough Permissions");
            return;
        }
        const mainSubCommand = interaction.options.getSubcommandGroup();
        const subcommand = interaction.options.getSubcommand();

        const queryGuild = {
            guildId: interaction.guild.id,
        };
        const embed = new EmbedBuilder()
        langData = langData.chatGuard
        switch (mainSubCommand) {
            case "anti-link":
                langData = langData.antiLink
                // Check if the user has permission to use this command
                const antiLinksubcommand = interaction.options.getSubcommand();
                switch (antiLinksubcommand) {
                    case "enable":
                        const targetRoleId = interaction.options.getRole('link-access-role').id;
                        await interaction.deferReply({ ephemeral: true });
                        let linkAccessDB = await linkAccessRole.findOne({ guildId: interaction.guild.id });
                        if (linkAccessDB) {
                            if (linkAccessDB.roleId === targetRoleId) {
                                embed
                                    .setColor('Green')
                                    .setTitle('Anti-Link System')
                                    .setDescription("Anti-Link System is already have that role.Use /anti-link disable for disable")
                                    .addFields({ name: "Link Access Role", value: `><@&${targetRoleId}>` })

                                interaction.editReply({ embeds: [embed], ephemeral: true }); 
                                return;
                            }
                            linkAccessDB.roleId = targetRoleId;
                        } else {
                            linkAccessDB = new linkAccessRole({
                                guildId: interaction.guild.id,
                                roleId: targetRoleId,
                            });
                        }
                        await linkAccessDB.save();
                        embed
                            .setColor('Green')
                            .setTitle('Anti-Link System')
                            .setDescription("Anti-Link System is now enabled.Use /anti-link disable for disable")
                            .addFields({ name: "Link Access Role", value: `><@&${targetRoleId}>` })

                        interaction.editReply({ embeds: [embed], ephemeral: true });

                        break;
                    case "disable":
                        await interaction.deferReply({ ephemeral: true });
                        if (!(await linkAccessRole.exists({ guildId: interaction.guild.id }))) {
                            embed
                                .setColor('Red')
                                .setTitle('Anti-Link System')
                                .setDescription("Anti-Link System is not exist. Use /anti-link enable for setup")
                            interaction.editReply({ embeds: [embed], ephemeral: true });
                            return;
                        }
                        embed
                            .setColor('Red')
                            .setTitle('Anti-Link System')
                            .setDescription("Anti-Link System is now disabled.Use /anti-link enable for setup")
                        interaction.editReply({ embeds: [embed], ephemeral: true });

                        await linkAccessRole.findOneAndDelete({ guildId: interaction.guild.id });

                        break;
                }
                break;
            case "capital-letter":
                const capitalLetterSubcommand = interaction.options.getSubcommand();
                await interaction.deferReply();
                let dfStatus = false;
                const capitalLetterStatus = await capitalLetterDB.findOne(queryGuild);

                if (capitalLetterSubcommand === 'enable') {
                    dfStatus = true;
                }

                if (capitalLetterSubcommand === 'disable') {
                    dfStatus = false;
                }
                let lastStatus = dfStatus === true ? "enable" : "disable";

                if (!capitalLetterStatus) {
                    const newStat = new capitalLetterDB({
                        guildId: interaction.guild.id,
                        status: dfStatus,
                    })
                    await newStat.save();
                    await interaction.editReply(`${lastStatus} delete writing with capital letter`);
                    return;
                }
                capitalLetterStatus.status = dfStatus;
                await capitalLetterStatus.save().catch((e) => {
                    console.log(`Error saving updated level ${e}`);
                    return;
                });
                await interaction.editReply(`${lastStatus} delete writing with capital letter`);

                break;
            case "slow-mode":
                const slowModesubcommand = interaction.options.getSubcommand();
                switch (slowModesubcommand) {
                    case "enable":
                        let duration = interaction.options.getInteger("duration");
                        const activeChannel = interaction.options.getChannel('channel') || interaction.channel;
                        embed
                            .setColor("Random").setDescription(`:white_check_mark: ${activeChannel} now has ${duration} seconds of **slowmode**.To disable run "/slowmode-disable"`)

                        activeChannel.setRateLimitPerUser(duration).then(async () => {
                            await interaction.reply({ embeds: [embed], ephemeral: true });
                        }).catch(err => {
                            console.error(err);
                        });

                        break;
                    case "disable":
                        const disableChannel = interaction.options.getChannel('channel') || interaction.channel;
                        embed
                            .setColor("Random").setDescription(`:white_check_mark: ${disableChannel} now disable of **slowmode**.To disable run "/slowmode-disable"`)

                        disableChannel.setRateLimitPerUser(0).then(async () => {
                            await interaction.reply({ embeds: [embed], ephemeral: true });
                        }).catch(err => {
                            console.error(err);
                        });
                        break;
                }
                break;
        }
        if (subcommand == "forbid-word") {
            const forbidWord = interaction.options.get('word').value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            await interaction.deferReply();

            let notExist = false;
            const added = `The word has  added succesfuly `;
            const alreadyAdded = `The word has already added `;
            const forbid = await forbiddenDb.findOne(queryGuild);
            if (forbid) {
                if (forbid.forbiddenWord) {
                    for (let i in forbid.forbiddenWord) {
                        if (forbidWord === forbid.forbiddenWord[i]) {
                            notExist = true;
                            await interaction.editReply({ content: alreadyAdded, ephemeral: true });
                        }
                    }
                    if (!notExist) {
                        forbid.forbiddenWord.push(forbidWord);
                        await forbid.save();
                        await interaction.editReply({ content: added, ephemeral: true });
                    }
                }
            } else {
                //!new word add for new server
                const newWord = new forbiddenDb({
                    guildId: interaction.guild.id,
                    forbiddenWord: forbidWord,
                });
                await newWord.save();
                await interaction.editReply({ content: added, ephemeral: true });
            }
            return;
        }

    },
};