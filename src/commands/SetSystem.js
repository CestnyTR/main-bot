const { PermissionFlagsBits, PermissionsBitField, ChatInputCommandInteraction, SlashCommandBuilder, ChannelType, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const AutoRole = require('../models/AutoRole');
const GuildConfigurations = require("../models/GuildConfiguration")
const logChSchema = require("../models/logChannels");
const rolesInfoSchema = require("../models/RolesInfo");
const voiceDB = require('../models/JoinToCreate');
const ticketSystemSchema = require("../models/TicketSystem")
const welcomeSchema = require('../models/Welcome');
const giveawaySystemSchema = require('../models/giveawaySys');
const trLang = require("../lang/tr.json").buildCommands.serverSystem;
const enLang = require("../lang/en.json").buildCommands.serverSystem;
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
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.configSuggestions.name)
            .setNameLocalizations({
                tr: trLang.configSuggestions.name,
            })
            .setDescription(enLang.configSuggestions.description)
            .setDescriptionLocalizations({
                tr: trLang.configSuggestions.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.configSuggestions.enable.name)
                .setNameLocalizations({
                    tr: trLang.configSuggestions.enable.name,
                })
                .setDescription(enLang.configSuggestions.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.configSuggestions.enable.description,
                })
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.configSuggestions.disable.name)
                .setNameLocalizations({
                    tr: trLang.configSuggestions.disable.name,
                })
                .setDescription(enLang.configSuggestions.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.configSuggestions.disable.description,
                })
            )
        )

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.joinToCreate.name)
            .setNameLocalizations({
                tr: trLang.joinToCreate.name,
            })
            .setDescription(enLang.joinToCreate.description)
            .setDescriptionLocalizations({
                tr: trLang.joinToCreate.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.joinToCreate.enable.name)
                .setNameLocalizations({
                    tr: trLang.joinToCreate.enable.name,
                })
                .setDescription(enLang.joinToCreate.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.joinToCreate.enable.description,
                })
                .addChannelOption(option => option
                    .setName(enLang.joinToCreate.enable.channel.name)
                    .setNameLocalizations({
                        tr: trLang.joinToCreate.enable.channel.name,
                    })
                    .setDescription(enLang.joinToCreate.enable.channel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.joinToCreate.enable.channel.description,
                    })
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildVoice)
                )
                .addChannelOption(option => option
                    .setName(enLang.joinToCreate.enable.category.name)
                    .setNameLocalizations({
                        tr: trLang.joinToCreate.enable.category.name,
                    })
                    .setDescription(enLang.joinToCreate.enable.category.description)
                    .setDescriptionLocalizations({
                        tr: trLang.joinToCreate.enable.category.description,
                    })
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildCategory)
                )
                .addIntegerOption(option => option
                    .setName(enLang.joinToCreate.enable.voiceLimit.name)
                    .setNameLocalizations({
                        tr: trLang.joinToCreate.enable.voiceLimit.name,
                    })
                    .setDescription(enLang.joinToCreate.enable.voiceLimit.description)
                    .setDescriptionLocalizations({
                        tr: trLang.joinToCreate.enable.voiceLimit.description,
                    })
                    .setMinValue(2)
                    .setMaxValue(15)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.joinToCreate.disable.name)
                .setNameLocalizations({
                    tr: trLang.joinToCreate.disable.name,
                })
                .setDescription(enLang.joinToCreate.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.joinToCreate.disable.description,
                })
            )
        )

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.setupRegister.name)
            .setNameLocalizations({
                tr: trLang.setupRegister.name,
            })
            .setDescription(enLang.setupRegister.description)
            .setDescriptionLocalizations({
                tr: trLang.setupRegister.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupRegister.activateRoleSelectMenu.name)
                .setNameLocalizations({
                    tr: trLang.setupRegister.activateRoleSelectMenu.name,
                })
                .setDescription(enLang.setupRegister.activateRoleSelectMenu.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupRegister.activateRoleSelectMenu.description,
                })
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setRoleType.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleType.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setRoleType.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleType.description,
                    })
                    .setRequired(true)
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setRoleContent.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleContent.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setRoleContent.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setRoleContent.description,
                    })
                    .setRequired(true)
                )
                .addIntegerOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setMaxChoice.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMaxChoice.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setMaxChoice.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMaxChoice.description,
                    })
                    .setMinValue(1)
                    .setMaxValue(6)
                    .setRequired(true)
                )
                .addIntegerOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setMinChoice.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMinChoice.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setMinChoice.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setMinChoice.description,
                    })
                    .setMinValue(0)
                    .setMaxValue(2)
                    .setRequired(true)
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleDefaultName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleDefaultName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleDefaultName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleDefaultName.description,
                    })
                    .setRequired(true)
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setDefaultRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setDefaultRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setDefaultRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setDefaultRole.description,
                    })
                    .setRequired(true)
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleFirstName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFirstName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleFirstName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFirstName.description,
                    })
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setFirstRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFirstRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setFirstRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFirstRole.description,
                    })
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleSecondName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleSecondName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleSecondName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleSecondName.description,
                    })
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setSecondRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setSecondRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setSecondRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setSecondRole.description,
                    })
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleThirdName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleThirdName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleThirdName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleThirdName.description,
                    })
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setThirdRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setThirdRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setThirdRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setThirdRole.description,
                    })
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleFourthName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFourthName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleFourthName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFourthName.description,
                    })
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setFourthRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFourthRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setFourthRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFourthRole.description,
                    })
                )
                .addStringOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.roleFifthName.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFifthName.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.roleFifthName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.roleFifthName.description,
                    })
                )
                .addRoleOption((option) => option
                    .setName(enLang.setupRegister.activateRoleSelectMenu.setFifthRole.name)
                    .setNameLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFifthRole.name,
                    })
                    .setDescription(enLang.setupRegister.activateRoleSelectMenu.setFifthRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupRegister.activateRoleSelectMenu.setFifthRole.description,
                    })
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupRegister.userInfoButton.name)
                .setNameLocalizations({
                    tr: trLang.setupRegister.userInfoButton.name,
                })
                .setDescription(enLang.setupRegister.userInfoButton.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupRegister.userInfoButton.description,
                })
            )
        )

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.setupLogSystem.name)
            .setNameLocalizations({
                tr: trLang.setupLogSystem.name,
            })
            .setDescription(enLang.setupLogSystem.description)
            .setDescriptionLocalizations({
                tr: trLang.setupLogSystem.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupLogSystem.choiceLogChannels.name)
                .setNameLocalizations({
                    tr: trLang.setupLogSystem.choiceLogChannels.name,
                })
                .setDescription(enLang.setupLogSystem.choiceLogChannels.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupLogSystem.choiceLogChannels.description,
                })
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.setCategory.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.setCategory.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.setCategory.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.setCategory.description,
                    })
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.joinLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.joinLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.joinLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.joinLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.leftLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.leftLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.leftLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.leftLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.penaltyLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.penaltyLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.penaltyLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.penaltyLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.addsLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.addsLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.addsLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.addsLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.levelLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.levelLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.levelLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.levelLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.messageLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.messageLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.messageLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.messageLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.userLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.userLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.userLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.userLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.banLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.banLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.banLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.banLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.modLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.modLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.modLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.modLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.inviteLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.inviteLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.inviteLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.inviteLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.voiceChatLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.voiceChatLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.voiceChatLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.voiceChatLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.tagLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.tagLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.tagLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.tagLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.choiceLogChannels.commandLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.commandLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.choiceLogChannels.commandLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.choiceLogChannels.commandLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupLogSystem.setupOneLogChannel.name)
                .setNameLocalizations({
                    tr: trLang.setupLogSystem.setupOneLogChannel.name,
                })
                .setDescription(enLang.setupLogSystem.setupOneLogChannel.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupLogSystem.setupOneLogChannel.description,
                })
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.setupOneLogChannel.setCategory.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.setupOneLogChannel.setCategory.name,
                    })
                    .setDescription(enLang.setupLogSystem.setupOneLogChannel.setCategory.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.setupOneLogChannel.setCategory.description,
                    })
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true)
                )
                .addChannelOption((option) => option
                    .setName(enLang.setupLogSystem.setupOneLogChannel.selectLogChannel.name)
                    .setNameLocalizations({
                        tr: trLang.setupLogSystem.setupOneLogChannel.selectLogChannel.name,
                    })
                    .setDescription(enLang.setupLogSystem.setupOneLogChannel.selectLogChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.setupLogSystem.setupOneLogChannel.selectLogChannel.description,
                    })
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupLogSystem.createLogChannel.name)
                .setNameLocalizations({
                    tr: trLang.setupLogSystem.createLogChannel.name,
                })
                .setDescription(enLang.setupLogSystem.createLogChannel.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupLogSystem.createLogChannel.description,
                })
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.setupLogSystem.deleteLogChannel.name)
                .setNameLocalizations({
                    tr: trLang.setupLogSystem.deleteLogChannel.name,
                })
                .setDescription(enLang.setupLogSystem.deleteLogChannel.description)
                .setDescriptionLocalizations({
                    tr: trLang.setupLogSystem.deleteLogChannel.description,
                })
            )
        )

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.welcomeConfig.name)
            .setNameLocalizations({
                tr: trLang.welcomeConfig.name,
            })
            .setDescription(enLang.welcomeConfig.description)
            .setDescriptionLocalizations({
                tr: trLang.welcomeConfig.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.welcomeConfig.enable.name)
                .setNameLocalizations({
                    tr: trLang.welcomeConfig.enable.name,
                })
                .setDescription(enLang.welcomeConfig.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.welcomeConfig.enable.description,
                })
                .addChannelOption(option => option
                    .setName(enLang.welcomeConfig.enable.welcomeChannel.name)
                    .setNameLocalizations({
                        tr: trLang.welcomeConfig.enable.welcomeChannel.name,
                    })
                    .setDescription(enLang.welcomeConfig.enable.welcomeChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.welcomeConfig.enable.welcomeChannel.description,
                    })
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
                )
                .addChannelOption(option => option
                    .setName(enLang.welcomeConfig.enable.registerChannel.name)
                    .setNameLocalizations({
                        tr: trLang.welcomeConfig.enable.registerChannel.name,
                    })
                    .setDescription(enLang.welcomeConfig.enable.registerChannel.description)
                    .setDescriptionLocalizations({
                        tr: trLang.welcomeConfig.enable.registerChannel.description,
                    })
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.welcomeConfig.disable.name)
                .setNameLocalizations({
                    tr: trLang.welcomeConfig.disable.name,
                })
                .setDescription(enLang.welcomeConfig.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.welcomeConfig.disable.description,
                })
            )
        )

        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.ticketSetup.name)
            .setNameLocalizations({
                tr: trLang.ticketSetup.name,
            })
            .setDescription(enLang.ticketSetup.description)
            .setDescriptionLocalizations({
                tr: trLang.ticketSetup.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.ticketSetup.enable.name)
                .setNameLocalizations({
                    tr: trLang.ticketSetup.enable.name,
                })
                .setDescription(enLang.ticketSetup.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.ticketSetup.enable.description,
                })
                .addRoleOption((option) => option
                    .setName(enLang.ticketSetup.enable.staffRole.name)
                    .setNameLocalizations({
                        tr: trLang.ticketSetup.enable.staffRole.name,
                    })
                    .setDescription(enLang.ticketSetup.enable.staffRole.description)
                    .setDescriptionLocalizations({
                        tr: trLang.ticketSetup.enable.staffRole.description,
                    })
                    .setRequired(true)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.ticketSetup.disable.name)
                .setNameLocalizations({
                    tr: trLang.ticketSetup.disable.name,
                })
                .setDescription(enLang.ticketSetup.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.ticketSetup.disable.description,
                })
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.autoroleConfigure.name)
            .setNameLocalizations({
                tr: trLang.autoroleConfigure.name,
            })
            .setDescription(enLang.autoroleConfigure.description)
            .setDescriptionLocalizations({
                tr: trLang.autoroleConfigure.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.autoroleConfigure.enable.name)
                .setNameLocalizations({
                    tr: trLang.autoroleConfigure.enable.name,
                })
                .setDescription(enLang.autoroleConfigure.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.autoroleConfigure.enable.description,
                })
                .addRoleOption((option) => option
                    .setName(enLang.autoroleConfigure.enable.role.name)
                    .setNameLocalizations({
                        tr: trLang.autoroleConfigure.enable.role.name,
                    })
                    .setDescription(enLang.autoroleConfigure.enable.role.description)
                    .setDescriptionLocalizations({
                        tr: trLang.autoroleConfigure.enable.role.description,
                    })
                    .setRequired(true)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.autoroleConfigure.disable.name)
                .setNameLocalizations({
                    tr: trLang.autoroleConfigure.disable.name,
                })
                .setDescription(enLang.autoroleConfigure.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.autoroleConfigure.disable.description,
                })
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName(enLang.giveawaySetup.name)
            .setNameLocalizations({
                tr: trLang.giveawaySetup.name,
            })
            .setDescription(enLang.giveawaySetup.description)
            .setDescriptionLocalizations({
                tr: trLang.giveawaySetup.description,
            })
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.giveawaySetup.enable.name)
                .setNameLocalizations({
                    tr: trLang.giveawaySetup.enable.name,
                })
                .setDescription(enLang.giveawaySetup.enable.description)
                .setDescriptionLocalizations({
                    tr: trLang.giveawaySetup.enable.description,
                })
            )
            .addSubcommand((subcommand) => subcommand
                .setName(enLang.giveawaySetup.disable.name)
                .setNameLocalizations({
                    tr: trLang.giveawaySetup.disable.name,
                })
                .setDescription(enLang.giveawaySetup.disable.description)
                .setDescriptionLocalizations({
                    tr: trLang.giveawaySetup.disable.description,
                })
            )
        )


    ,
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({ content: 'You can only run this command inside a server.', ephemeral: true });
            return;
        }
        if (!interaction.memberPermissions.has('Administrator')) {
            await interaction.reply({ content: "You dont have enough Permissions", ephemeral: true });
            return;
        }
        const mainSubCommand = interaction.options.getSubcommandGroup();
        const subcommand = interaction.options.getSubcommand();
        const queryGuild = {
            guildId: interaction.guild.id,
        };
        const embed = new EmbedBuilder()
        switch (mainSubCommand) {
            case "setup-register":
                const rgSubcommand = interaction.options.getSubcommand();
                switch (rgSubcommand) {
                    case "activate-role-selecet-menu":
                        const roleType = interaction.options.get('set-role-type').value.trim().toLowerCase();
                        const roleContent = interaction.options.get('set-role-content').value;

                        let setMaxValue = interaction.options.get('set-max-choice').value;
                        const setMinValue = interaction.options.get('set-min-choice').value;
                        const defaultRoleName = interaction.options.get('role-default-name').value;
                        const defaultRole = interaction.options.get('set-default-role').value;

                        const firstRoleName = interaction.options.get('role-first-name')?.value || null;
                        const firstRole = interaction.options.get('set-first-role')?.value || null;

                        const secondRoleName = interaction.options.get('role-second-name')?.value || null;
                        const secondRole = interaction.options.get('set-second-role')?.value || null;

                        const thirdRoleName = interaction.options.get('role-third-name')?.value || null;
                        const thirdRole = interaction.options.get('set-third-role')?.value || null;

                        const fourthRoleName = interaction.options.get('role-fourth-name')?.value || null;
                        const fourthRole = interaction.options.get('set-fourth-role')?.value || null;

                        const fifthRoleName = interaction.options.get('role-fifth-name')?.value || null;
                        const fifthRole = interaction.options.get('set-fifth-role')?.value || null;
                        let _listRoles = [{
                            label: defaultRoleName,
                            description: `get the roll of ${defaultRoleName}`,
                            value: defaultRole,
                        }];
                        function listRolePush(role) {
                            return _listRoles.push(role);
                        }
                        if (firstRoleName && firstRole) {
                            listRolePush({
                                label: firstRoleName,
                                description: `get the roll of ${firstRoleName}`,
                                value: firstRole,
                            })
                        }
                        if (secondRoleName && secondRole) {
                            listRolePush({
                                label: secondRoleName,
                                description: `get the roll of ${secondRoleName}`,
                                value: secondRole,
                            })
                        }
                        if (thirdRoleName && thirdRole) {
                            listRolePush({
                                label: thirdRoleName,
                                description: `get the roll of ${thirdRoleName}`,
                                value: thirdRole,
                            })
                        }
                        if (fourthRoleName && fourthRole) {
                            listRolePush({
                                label: fourthRoleName,
                                description: `get the roll of ${fourthRoleName}`,
                                value: fourthRole,
                            })
                        }
                        if (fifthRoleName && fifthRole) {
                            listRolePush({
                                label: fifthRoleName,
                                description: `get the roll of ${fifthRoleName}`,
                                value: fifthRole,
                            })
                        }
                        if (setMaxValue > _listRoles.length) {
                            setMaxValue = _listRoles.length;
                        }
                        //!db work
                        const query = {
                            guildId: interaction.guild.id,
                            roleType: roleType
                        };
                        let rolesInfo
                        rolesInfo = await rolesInfoSchema.findOne(query);
                        if (rolesInfo) {
                            rolesInfo = new rolesInfoSchema({
                                guildId: interaction.guild.id,
                                roleType: roleType,
                                roleContent: roleContent,
                                maxChoice: setMaxValue,
                                minChoice: setMinValue,
                                listRoles: _listRoles,
                            });
                            await rolesInfo.save();
                        } else {
                            rolesInfo = new rolesInfoSchema({
                                guildId: interaction.guild.id,
                                roleType: roleType,
                                roleContent: roleContent,
                                maxChoice: setMaxValue,
                                minChoice: setMinValue,
                                listRoles: _listRoles,
                            });
                            await rolesInfo.save();
                        }

                        //!    StringSelectMenuBuilder
                        const newRoleList = new StringSelectMenuBuilder()
                            .setCustomId(rolesInfo.roleType)
                            .setPlaceholder("Make a selection...")
                            .setMinValues(rolesInfo.minChoice)
                            .setMaxValues(rolesInfo.maxChoice)
                            .addOptions(
                                rolesInfo.listRoles.map((get) => new StringSelectMenuOptionBuilder().setLabel(get.label).setDescription(get.description).setValue(get.value))
                            )
                        const actionRow = new ActionRowBuilder().addComponents(newRoleList);
                        await interaction.reply({
                            content: `${roleContent} command was run successfully`,
                            ephemeral: true,
                        });
                        await interaction.channel.send({
                            content: roleContent,
                            components: [actionRow],
                        });
                        break;

                    case "user-info-button":
                        const row = new ActionRowBuilder();
                        row.components.push(
                            new ButtonBuilder()
                                .setCustomId("register")
                                .setLabel("Register")
                                .setStyle(ButtonStyle.Primary)
                        );
                        await interaction.reply({
                            content: `user-info-button command was run successfully`,
                            ephemeral: true,
                        });
                        await interaction.channel.send({ content: `Please set your ${interaction.guild.name} server name `, components: [row], }) // Send Embed, Image And Mess
                        break;
                }
                break;
            case "join-to-create":
                let jtcData = await voiceDB.findOne(queryGuild)
                const jtcSubcommand = interaction.options.getSubcommand();
                switch (jtcSubcommand) {
                    case "enable":
                        if (jtcData) { return await interaction.reply({ content: 'You already have a setup join to create system for disabled run /join-to-create disable', ephemeral: true }); }
                        //!take jtcData
                        const channel = interaction.options.getChannel("channel");
                        const category = interaction.options.getChannel("category");
                        const limit = interaction.options.getInteger("voice-limit") || 10;

                        //!db work
                        jtcData = new voiceDB({
                            guildId: interaction.guild.id,
                            Channel: channel.id,
                            Category: category.id,
                            VoiceLimit: limit
                        });
                        await jtcData.save()

                        //?embed Build
                        embed
                            .setColor('Random')
                            .setDescription(`The join to create system has been Setup in ${channel}, All new voice Channel will created in ${category}`)
                        await interaction.reply({ embeds: [embed] })
                        break;
                    case "disable":
                        if (!jtcData) { return await interaction.reply({ content: 'You dont have a setup join to create system for setup run /join-to-create setup', ephemeral: true }); }
                        const result = jtcData.deleteOne(queryGuild)
                        if (result.deletedCount > 0) {
                            await interaction.reply({
                                content: 'The Join to create System has been successfully disabled.',
                                ephemeral: true
                            });
                        }
                        embed
                            .setColor('Random')
                            .setDescription('The join to create system has been "disabled"')
                        await interaction.reply({ embeds: [embed] })
                        break;
                }

                break;
            case "welcome-config":
                const wlSubcommand = interaction.options.getSubcommand();
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({
                    content: `The welcome system cannot be set up because you do not have the necessary permissions to do so.`,
                    ephemeral: true
                })
                switch (wlSubcommand) {
                    case "enable":
                        const welcomeChannel = interaction.options.getChannel('welcome-channel');
                        const registerChannel = interaction.options.getChannel('register-channel');

                        const wlExistingData = await welcomeSchema.findOne(queryGuild);

                        if (!wlExistingData) {
                            await welcomeSchema.create({
                                Guild: interaction.guild.id,
                                Channel: welcomeChannel.id,
                                registerChannel: registerChannel.id
                            });
                            await interaction.reply({
                                content: `The welcome message system has been successfully implemented within the ${welcomeChannel}.`,
                                ephemeral: true
                            });
                        } else {
                            await interaction.reply({
                                content: 'You have a welcome message system in place. To restart it, use the `/welcome-disable` command.',
                                ephemeral: true
                            });
                        }

                        break;
                    case "disable":
                        const result = await welcomeSchema.deleteOne();
                        if (result.deletedCount > 0) {
                            await interaction.reply({
                                content: 'The Welcome Message System has been successfully disabled.',
                                ephemeral: true
                            });
                        } else {
                            await interaction.reply({
                                content: 'No welcome message system found to disable.',
                                ephemeral: true
                            });
                        }
                        break;
                }
                break;
            case "autorole-configure":
                const auSubcommand = interaction.options.getSubcommand();
                switch (auSubcommand) {
                    case "enable":
                        const targetRoleId = interaction.options.get('role').value;
                        await interaction.deferReply();
                        let autoRole = await AutoRole.findOne(queryGuild);
                        if (autoRole) {
                            if (autoRole.roleId === targetRoleId) {
                                interaction.editReply('Auto role has already been configured for that role. To disable run `/autorole-disable`');
                                return;
                            }
                            autoRole.roleId = targetRoleId;
                        } else {
                            autoRole = new AutoRole({
                                guildId: interaction.guild.id,
                                roleId: targetRoleId,
                            });
                        }
                        await autoRole.save();
                        interaction.editReply('Autorole has now been configured. To disable run `/autorole-disable`');
                        break;
                    case "disable":
                        await interaction.deferReply();
                        if (!(await AutoRole.exists(queryGuild))) {
                            interaction.editReply('Auto role has not been configured for this server. Use `/autorole-configure disable` to set it up.');
                            return;
                        }
                        await AutoRole.findOneAndDelete(queryGuild);
                        interaction.editReply('Auto role has been disabled for this server. Use `/autorole-configure enable` to set it up again.');
                        break;
                }
                break;
            case "setup-log-system":
                let logChDB = await logChSchema.findOne(queryGuild);
                if (!logChDB) {
                    logChDB = new logChSchema(queryGuild);
                }
                const logSubcommand = interaction.options.getSubcommand();
                switch (logSubcommand) {
                    case "choice-log-channels":
                        if (logChDB.exist) {
                            embed
                                .setColor('Red')
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.displayName })
                                .addFields({ name: "Log Channels", value: `>Channels already exsit` })
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        }
                        await interaction.deferReply({ ephemeral: true });
                        const categoryIdLog = interaction.options.getChannel("set-category").id;
                        const joinLog = interaction.options.getChannel("join-log-channel").id;
                        const leftLog = interaction.options.getChannel("left-log-channel").id;
                        const penaltyLog = interaction.options.getChannel("penalty-log-channel").id;
                        const addsLog = interaction.options.getChannel("adds-log-channel").id;
                        const levelLog = interaction.options.getChannel("level-log-channel").id;
                        const messageLog = interaction.options.getChannel("message-log-channel").id;
                        const userLog = interaction.options.getChannel("user-log-channel").id;
                        const banLog = interaction.options.getChannel("ban-log-channel").id;
                        const modLog = interaction.options.getChannel("mod-log-channel").id;
                        const inviteLog = interaction.options.getChannel("invite-log-channel").id;
                        const voiceLog = interaction.options.getChannel("voice-chat-log-channel").id;
                        const tagLog = interaction.options.getChannel("tag-log-channel").id;
                        const commandLog = interaction.options.getChannel("command-log-channel").id;

                        //?save to db
                        logChDB.categoryId = categoryIdLog;
                        logChDB.joinLog = joinLog;
                        logChDB.leftLog = leftLog;
                        logChDB.penaltyLog = penaltyLog;
                        logChDB.addsLog = addsLog;
                        logChDB.levelLog = levelLog;
                        logChDB.messageLog = messageLog;
                        logChDB.userLog = userLog;
                        logChDB.banLog = banLog;
                        logChDB.modLog = modLog;
                        logChDB.inviteLog = inviteLog;
                        logChDB.voiceLog = voiceLog;
                        logChDB.tagLog = tagLog;
                        logChDB.commandLog = commandLog;
                        logChDB.exist = true;
                        await logChDB.save();
                        embed
                            .setColor('Red')
                            .setTimestamp()
                            .setAuthor({ name: interaction.user.displayName })
                            .addFields({ name: "Log Channels", value: `>Log Channels settled now` })
                        interaction.editReply({ embeds: [embed], ephemeral: true });
                        break;
                    case "setup-one-log-channel":
                        if (logChDB.exist) {
                            embed
                                .setColor('Red')
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.displayName })
                                .addFields({ name: "Log Channels", value: `>Channels already exsit` })
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        }
                        await interaction.deferReply({ ephemeral: true });

                        const categoryOneLog = interaction.options.getChannel("set-category").id;
                        const allInOneLog = interaction.options.getChannel("select-log-channel").id;
                        //?save to db
                        logChDB.categoryId = categoryOneLog;
                        logChDB.joinLog = allInOneLog;
                        logChDB.leftLog = allInOneLog;
                        logChDB.penaltyLog = allInOneLog;
                        logChDB.addsLog = allInOneLog;
                        logChDB.levelLog = allInOneLog;
                        logChDB.messageLog = allInOneLog;
                        logChDB.userLog = allInOneLog;
                        logChDB.banLog = allInOneLog;
                        logChDB.modLog = allInOneLog;
                        logChDB.inviteLog = allInOneLog;
                        logChDB.voiceLog = allInOneLog;
                        logChDB.tagLog = allInOneLog;
                        logChDB.commandLog = allInOneLog;
                        logChDB.exist = true;
                        embed
                            .setColor('Red')
                            .setTimestamp()
                            .setAuthor({ name: interaction.user.displayName })
                            .addFields({ name: "Log Channels", value: `>Log Channels settled in one channels` })
                        interaction.editReply({ embeds: [embed], ephemeral: true });
                        break;
                    case "create-log-channel":
                        if (logChDB.exist) {
                            embed
                                .setColor('Red')
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.displayName })
                                .addFields({ name: "Log Channels", value: `>Channels already exsit` })
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        }
                        await interaction.deferReply({ ephemeral: true });

                        const categoryName = 'Server Logs';
                        let channelNames = {
                            'join-log': "joinLog",
                            'left-log': "leftLog",
                            'penalty-log': "penaltyLog",
                            'adds-log': "addsLog",
                            'level-log': "levelLog",
                            'message-log': "messageLog",
                            'user-log': "userLog",
                            'ban-log': "banLog",
                            'mod-log': "modLog",
                            'invite-log': "inviteLog",
                            'voice-chat-log': "voiceLog",
                            'tag-log': "tagLog",
                            'command-log': "commandLog",
                        };
                        // Kategori oluştur
                        await interaction.guild.channels.create({
                            name: categoryName,
                            type: ChannelType.GuildCategory,
                        }).then(async (category) => {
                            for (const [key, value] of Object.entries(channelNames)) {
                                await interaction.guild.channels.create({
                                    name: key,
                                    parent: category,
                                    type: ChannelType.GuildText,
                                }).then(async (channel) => {
                                    // Kanal izinlerini ayarla
                                    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                                        ViewChannel: false,
                                        SendMessages: false,
                                    });
                                    logChDB[value] = channel.id;
                                })
                            }
                            logChDB.categoryId = category.id;

                        })
                        logChDB.exist = true;
                        await logChDB.save()

                        embed
                            .setColor('Green')
                            .setTimestamp()
                            .setAuthor({ name: interaction.user.displayName })
                            .addFields({ name: "Log Channels", value: `>Log Channels created successfully` })
                        await interaction.editReply({ embeds: [embed], ephemeral: true });

                        break;
                    case "delete-log-channel":
                        if (!logChDB.exist) {
                            embed
                                .setColor('Red')
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.displayName })
                                .addFields({ name: "Log Channels", value: `>Channels doesnt exsit` })
                            return interaction.reply({ embeds: [embed], ephemeral: true });
                        }
                        await interaction.deferReply({ ephemeral: true });
                        const category = await interaction.guild.channels.cache.get(logChDB.categoryId); // You can use `find` instead of `get` to fetch the category using a name: `find(cat => cat.name === 'test')
                        if (category && category.children && category.children.cache) {
                            // Koleksiyon üzerinde forEach kullanarak kanalları sil
                            category.children.cache.forEach(channel => channel.delete());
                            category.delete();

                            //?delete to db
                            logChDB.categoryId = null;
                            logChDB.joinLog = null;
                            logChDB.leftLog = null;
                            logChDB.penaltyLog = null;
                            logChDB.addsLog = null;
                            logChDB.levelLog = null;
                            logChDB.messageLog = null;
                            logChDB.userLog = null;
                            logChDB.banLog = null;
                            logChDB.modLog = null;
                            logChDB.inviteLog = null;
                            logChDB.voiceLog = null;
                            logChDB.commandLog = null;
                            logChDB.tagLog = null;

                            logChDB.exist = false;
                            await logChDB.save();
                            embed
                                .setColor('Green')
                                .setTimestamp()
                                .setAuthor({ name: interaction.user.displayName })
                                .addFields({ name: "Log Channels", value: `>Log Channels deleted successfully` })
                            await interaction.editReply({ embeds: [embed], ephemeral: true });
                        }
                        break;
                }
                break;
            case "ticket-setup":
                const tkSubcommand = interaction.options.getSubcommand();
                let ticketSystemDB = await ticketSystemSchema.findOne(queryGuild);
                switch (tkSubcommand) {
                    case "enable":
                        const staffRoleID = interaction.options.get('staff-role').value;
                        if (ticketSystemDB) {
                            return interaction.reply({ content: 'The ticked system is already exist', ephemeral: true });
                        } else {
                            ticketSystemDB = new ticketSystemSchema({
                                guildId: interaction.guild.id,
                                categoryId: "",
                                staffRoleId: staffRoleID,
                                channelId: "",
                            });
                        }
                        interaction.deferReply({ ephemeral: true });
                        embed
                            .setDescription('Create a ticket and contact the support team with the button below.')
                            .setColor("Blue");
                        const ticketBtn = new ButtonBuilder()
                            .setCustomId('ticketBtnId')
                            .setLabel("Create Ticket")
                            .setEmoji('📩')
                            .setStyle(ButtonStyle.Secondary);
                        const row = new ActionRowBuilder()
                            .addComponents(ticketBtn);
                        // Kategori oluştur
                        await interaction.guild.channels.create({
                            name: "Support",
                            type: ChannelType.GuildCategory,
                        }).then(async (category) => {
                            ticketSystemDB.forDeleteCategoryId = category.id;
                            await interaction.guild.channels.create({
                                name: "[🎫] ticket",
                                parent: category,
                                type: ChannelType.GuildText,
                            }).then(async (channel) => {
                                // Kanal izinlerini ayarla
                                await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                                    ViewChannel: true,
                                    SendMessages: false,
                                });
                                ticketSystemDB.channelId = channel.id;
                                await channel.send({ embeds: [embed], components: [row] })
                            })
                        })
                        await interaction.guild.channels.create({
                            name: "TICKETS",
                            type: ChannelType.GuildCategory,
                        }).then(async (category) => {
                            ticketSystemDB.categoryId = category.id;
                        });
                        await ticketSystemDB.save();

                        embed
                            .setColor("Green")
                            .setTitle("Ticket server")
                            .setDescription("Ticket created succesfuly");

                        await interaction.editReply({ embeds: [embed], ephemeral: true })
                        break;
                    case "disable":
                        // Check if the ticket system is already disabled
                        if (!ticketSystemDB) {
                            return interaction.reply({ content: 'The ticket system is already disabled', ephemeral: true });
                        }

                        // Delete the channels and category associated with the ticket system
                        const category = interaction.guild.channels.cache.get(ticketSystemDB.categoryId);
                        const channel = interaction.guild.channels.cache.get(ticketSystemDB.channelId);
                        const secCategory = interaction.guild.channels.cache.get(ticketSystemDB.forDeleteCategoryId);

                        if (category) {
                            await category.delete();
                        }
                        if (secCategory) {
                            await secCategory.delete();
                        }

                        if (channel) {
                            await channel.delete();
                        }

                        // Delete the ticket system configuration from the database
                        await ticketSystemDB.deleteOne(queryGuild);

                        embed
                            .setColor("Red")
                            .setTitle("Ticket server")
                            .setDescription("The ticket system has been disabled successfully");

                        await interaction.reply({ embeds: [embed], ephemeral: true })
                        break;
                }

                break;
            case "config-suggestions":
                let guildConfiguration = await GuildConfigurations.findOne(queryGuild);

                const configSubcommand = interaction.options.getSubcommand();
                switch (configSubcommand) {
                    case "enable":
                        if (guildConfiguration?.suggestionChannelId) {
                            embed
                                .setColor("Green")
                                .setTitle("Suggest system server")
                                .setDescription("Suggestion system allready exist ");
                            await interaction.reply({ embeds: [embed], ephemeral: true });
                            return;
                        }
                        interaction.deferReply({ ephemeral: true });

                        embed
                            .setDescription('Create a suggest and start a vote for it')
                            .setColor("Blue");
                        const suggestBtn = new ButtonBuilder()
                            .setCustomId('suggestBtnId')
                            .setLabel("Create suggest")
                            .setEmoji('🗳️')
                            .setStyle(ButtonStyle.Secondary);
                        const row = new ActionRowBuilder()
                            .addComponents(suggestBtn);
                        await interaction.guild.channels.create({
                            name: "Suggestions",
                            type: ChannelType.GuildCategory,
                        }).then(async (category) => {
                            guildConfiguration.suggestionCategoryId = category.id;
                            await interaction.guild.channels.create({
                                name: "[🗳️] suggest",
                                parent: category,
                                type: ChannelType.GuildText,
                            }).then(async (channel) => {
                                // Kanal izinlerini ayarla
                                await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                                    ViewChannel: true,
                                    SendMessages: false,
                                });
                                guildConfiguration.suggestionChannelId = channel.id;
                                await guildConfiguration.save();
                                await channel.send({ embeds: [embed], components: [row] })
                            })
                        })
                        embed
                            .setColor("Green")
                            .setTitle("Suggest system server")
                            .setDescription("Suggestion created succesfuly");
                        await interaction.editReply({ embeds: [embed], ephemeral: true })
                        break;
                    case "disable":
                        // Kategori ve kanal ID'lerini al
                        const categoryIdToRemove = guildConfiguration.suggestionCategoryId;
                        const channelIdToRemove = guildConfiguration.suggestionChannelId;
                        // Kategori ve kanalı sil
                        if (categoryIdToRemove) {
                            const categoryToRemove = interaction.guild.channels.cache.get(categoryIdToRemove);
                            if (categoryToRemove) {
                                await categoryToRemove.delete();
                            }
                        }
                        if (channelIdToRemove) {
                            const channelToRemove = interaction.guild.channels.cache.get(channelIdToRemove);
                            if (channelToRemove) {
                                await channelToRemove.delete();
                            }
                        }
                        // Kategori ve kanal ID'lerini temizle ve kaydet
                        guildConfiguration.suggestionCategoryId = null;
                        guildConfiguration.suggestionChannelId = null;
                        await guildConfiguration.save();
                        embed
                            .setColor("Red")
                            .setTitle("Suggest system server")
                            .setDescription("Suggestion removed succesfuly");
                        await interaction.reply({ embeds: [embed], ephemeral: true });
                        break;
                }
                break;
            case "giveaway-setup":
                let giveawaySystemDB = await giveawaySystemSchema.findOne({ guildId: interaction.guild.id });
                switch (subcommand) {
                    case "enable":
                        const embed = new EmbedBuilder()
                        if (giveawaySystemDB) {
                            return interaction.reply({ content: 'The giveaway system is already exist', ephemeral: true });
                        } else {
                            giveawaySystemDB = new giveawaySystemSchema({
                                guildId: interaction.guild.id,
                                categoryId: "",
                                channelId: "",
                            });
                        }
                        embed
                            .setDescription('Create a giveaway and contact the support team with the button below.')
                            .setColor("Blue");
                        const giveawayBtn = new ButtonBuilder()
                            .setCustomId('giveawayBtnId')
                            .setLabel("Create giveaway")
                            .setEmoji('🎁')
                            .setStyle(ButtonStyle.Secondary);
                        const row = new ActionRowBuilder()
                            .addComponents(giveawayBtn);
                        // Kategori oluştur
                        await interaction.guild.channels.create({
                            name: "Giveaway",
                            type: ChannelType.GuildCategory,
                        }).then(async (category) => {
                            giveawaySystemDB.categoryId = category.id;
                            await interaction.guild.channels.create({
                                name: "[🎁] giveaway",
                                parent: category,
                                type: ChannelType.GuildText,
                            }).then(async (channel) => {
                                await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                                    ViewChannel: true,
                                    SendMessages: false,
                                });
                                giveawaySystemDB.channelId = channel.id;
                                await channel.send({ embeds: [embed], components: [row] })
                            })
                        })
                        embed
                            .setColor("Green")
                            .setTitle("giveaway server")
                            .setDescription("giveaway created succesfuly");

                        await giveawaySystemDB.save();
                        await interaction.reply({ embeds: [embed], ephemeral: true })
                        break;
                    case "disable":
                        // Check if the giveaway system is already disabled
                        if (!giveawaySystemDB) {
                            return interaction.reply({ content: 'The giveaway system is already disabled', ephemeral: true });
                        }

                        // Delete the channels and category associated with the giveaway system
                        const category = interaction.guild.channels.cache.get(giveawaySystemDB.categoryId);
                        const channel = interaction.guild.channels.cache.get(giveawaySystemDB.channelId);

                        if (category) {
                            await category.delete();
                        }
                        if (channel) {
                            await channel.delete();
                        }

                        // Delete the giveaway system configuration from the database
                        await giveawaySystemDB.deleteOne(queryGuild);

                        interaction.reply({ content: 'The giveaway system has been disabled successfully', ephemeral: true });
                        break;
                }
                break;
        }
    }
}