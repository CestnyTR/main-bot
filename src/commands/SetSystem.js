const { PermissionFlagsBits, PermissionsBitField, ChatInputCommandInteraction, SlashCommandBuilder, ChannelType, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
const AutoRole = require('../models/AutoRole');
const GuildConfigurations = require("../models/GuildConfiguration")
const logChSchema = require("../models/logChannels");
const rolesInfoSchema = require("../models/RolesInfo");
const voiceDB = require('../models/JoinToCreate');
const ticketSystemSchema = require("../models/TicketSystem")
const welcomeSchema = require('../models/Welcome');
const giveawaySystemSchema = require('../models/giveawaySys');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-system")
        .setDescription("Set server system ")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("config-suggestions")
            .setDescription("configure sugestions.")
            .addSubcommand((subcommand) => subcommand
                .setName('enable')
                .setDescription("enable the Suggestions system.")
            )
            .addSubcommand((subcommand) => subcommand
                .setName('disable')
                .setDescription("Disable the Suggestions system.")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("join-to-create")
            .setDescription("Setup or disable your join to create voice channel system")


            .addSubcommand((subcommand) => subcommand
                .setName("enable")
                .setDescription("Enable your join to create voice channel system ")
                .addChannelOption(option => option.setName("channel").setDescription("The channel you want to be your join to create voice channel").setRequired(true).addChannelTypes(ChannelType.GuildVoice))
                .addChannelOption(option => option.setName("category").setDescription("The category you want for the new voice channel created in").setRequired(true).addChannelTypes(ChannelType.GuildCategory))
                .addIntegerOption(option => option.setName("voice-limit").setDescription("Set default limit for the new voice channel (2-15)").setMinValue(2).setMaxValue(15))
            )
            .addSubcommand((subcommand) => subcommand
                .setName("disable")
                .setDescription("Disable your join to create voice channel system")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("setup-register")
            .setDescription("Setup your register chanel")
            .addSubcommand((subcommand) => subcommand
                .setName("activate-role-selecet-menu")
                .setDescription("Activate your role select menu ,u can add six role")
                .addStringOption((option) => option.setName("set-role-type").setDescription("set your role type").setRequired(true))
                .addStringOption((option) => option.setName("set-role-content").setDescription("set your role content").setRequired(true))
                .addIntegerOption((option) => option.setName("set-max-choice").setDescription("user maximum selection 1-6").setMinValue(1).setMaxValue(6).setRequired(true))
                .addIntegerOption((option) => option.setName("set-min-choice").setDescription("user minimum  selection 0-2").setMinValue(0).setMaxValue(2).setRequired(true))
                .addStringOption((option) => option.setName("role-default-name").setDescription("set your visible default role name").setRequired(true))
                .addRoleOption((option) => option.setName("set-default-role").setDescription("set your default role ").setRequired(true))

                .addStringOption((option) => option.setName("role-first-name").setDescription("set your first visible role name, if you add this please set first role"))
                .addRoleOption((option) => option.setName("set-first-role").setDescription("set your first role "))

                .addStringOption((option) => option.setName("role-second-name").setDescription("set your visible second role name, if you add this please set second role"))
                .addRoleOption((option) => option.setName("set-second-role").setDescription("set your second role "))

                .addStringOption((option) => option.setName("role-third-name").setDescription("set your visible third role name, if you add this please set third role"))
                .addRoleOption((option) => option.setName("set-third-role").setDescription("set your third role "))

                .addStringOption((option) => option.setName("role-fourth-name").setDescription("set your visible fourth role name, if you add this please set fourth role"))
                .addRoleOption((option) => option.setName("set-fourth-role").setDescription("set your fourth role "))

                .addStringOption((option) => option.setName("role-fifth-name").setDescription("set your visible fifth role name, if you add this please set fifth role"))
                .addRoleOption((option) => option.setName("set-fifth-role").setDescription("set your fifth role "))
            )
            .addSubcommand((subcommand) => subcommand
                .setName("user-info-button")
                .setDescription("This command can create a modal for ask question name and age")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("setup-log-system")
            .setDescription("Setup your log chanels")


            .addSubcommand((subcommand) => subcommand
                .setName("choice-log-channels").setDescription("You can  choice manuel log channels")
                .addChannelOption((option) => option.setName("set-category").setDescription("set your category").addChannelTypes(ChannelType.GuildCategory).setRequired(true))
                .addChannelOption((option) => option.setName("join-log-channel").setDescription("set your joinLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("left-log-channel").setDescription("set your leftLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("penalty-log-channel").setDescription("set your penaltyLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("adds-log-channel").setDescription("set your addsLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("level-log-channel").setDescription("set your levelLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("message-log-channel").setDescription("set your messageLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("user-log-channel").setDescription("set your userLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("ban-log-channel").setDescription("set your banLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("mod-log-channel").setDescription("set your modLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("invite-log-channel").setDescription("set your inviteLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("voice-chat-log-channel").setDescription("set your voiceChatLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("tag-log-channel").setDescription("set your tagLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
                .addChannelOption((option) => option.setName("command-log-channel").setDescription("set your joinLog channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
            )
            .addSubcommand((subcommand) => subcommand
                .setName("setup-one-log-channel").setDescription("You can set  all logos in one channel.Please remember to set channel permissions after using")
                .addChannelOption((option) => option.setName("set-category").setDescription("set your category").addChannelTypes(ChannelType.GuildCategory).setRequired(true))
                .addChannelOption((option) => option.setName("select-log-channel").setDescription("set your log channel ").addChannelTypes(ChannelType.GuildText).setRequired(true))
            )
            .addSubcommand((subcommand) => subcommand
                .setName("create-log-channel").setDescription("You can set automatically set all logs on separate channel.")
            )
            .addSubcommand((subcommand) => subcommand
                .setName("delete-log-channel").setDescription("You can delete logs channel.")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("welcome-config")
            .setDescription("Set your welcome message or disable")

            .addSubcommand((subcommand) => subcommand
                .setName('enable')
                .setDescription(`Setup a welcome message for your guild`)
                .addChannelOption(option => option
                    .setName('welcome-channel')
                    .setDescription(`Please indicate the channel where you would like the welcome messages to be sent.`)
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
                )
                .addChannelOption(option => option
                    .setName('register-channel')
                    .setDescription(`Please directing you to the channel where you want your registration transactions to take place.`)
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true)
                ))
            .addSubcommand((subcommand) => subcommand
                .setName('disable')
                .setDescription('Disable the welcome message system.')
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("ticket-setup")
            .setDescription('open a ticket in the guild ')

            .addSubcommand((subcommand) => subcommand
                .setName("enable")
                .setDescription("Enable your ticket system for this server.")
                .addRoleOption((option) => option
                    .setName("staff-role")
                    .setDescription('the staff role you want them to take care of')
                    .setRequired(true)
                )
            ).addSubcommand((subcommand) => subcommand
                .setName("disable")
                .setDescription("Disable your ticket system for this server.")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("autorole-configure")
            .setDescription('Configure your auto-role for this server.')


            .addSubcommand((subcommand) => subcommand
                .setName("enable")
                .setDescription("Enable your auto-role for this server.")
                .addRoleOption((option) => option
                    .setName("role")
                    .setDescription('The role you want users to get on join.')
                    .setRequired(true)
                )
            )
            .addSubcommand((subcommand) => subcommand
                .setName("disable")
                .setDescription("Disable your auto-role for this server.")
            )
        )
        .addSubcommandGroup((addSubcommandGroup) => addSubcommandGroup
            .setName("giveaway-setup")
            .setDescription('Create a giveaway system in the guild ')
            .addSubcommand((subcommand) => subcommand
                .setName("enable")
                .setDescription("Enable your giveaway system for this server.")
            ).addSubcommand((subcommand) => subcommand
                .setName("disable")
                .setDescription("Disable your giveaway system for this server.")
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