const { PermissionFlagsBits, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const AutoRole = require('../models/AutoRole');
const logChSchema = require("../models/logChannels");
const trLang = require("../lang/tr.json").buildCommands.modrateSystem;
const enLang = require("../lang/en.json").buildCommands.modrateSystem;
const ms = require('ms');
let reason = "some reason";
let targetUserId;
let targetUser;
let targetUserRolePosition;
let requestUserRolePosition;
let botRolePosition;
let target;
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
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addSubcommand(kickSubcommand =>
            kickSubcommand
                .setName(enLang.kick.name)
                .setNameLocalizations({
                    tr: trLang.kick.name,
                })
                .setDescription(enLang.kick.description)
                .setDescriptionLocalizations({
                    tr: trLang.kick.description,
                })
                .addUserOption(option => option
                    .setName(enLang.kick.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.kick.options.targetUser.name,
                    })
                    .setDescription(enLang.kick.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.kick.options.targetUser.description,
                    })
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(enLang.kick.options.reason.name)
                    .setNameLocalizations({
                        tr: trLang.kick.options.reason.name,
                    })
                    .setDescription(enLang.kick.options.reason.description)
                    .setDescriptionLocalizations({
                        tr: trLang.kick.options.reason.description,
                    })
                )
        )
        .addSubcommand(moveAllSubcommand =>
            moveAllSubcommand
                .setName(enLang.moveAll.name)
                .setNameLocalizations({
                    tr: trLang.moveAll.name,
                })
                .setDescription(enLang.moveAll.description)
                .setDescriptionLocalizations({
                    tr: trLang.moveAll.description,
                })
                .addChannelOption(option =>
                    option.setName(enLang.moveAll.options.source.name)
                        .setNameLocalizations({
                            tr: trLang.moveAll.options.source.name,
                        })
                        .setDescription(enLang.moveAll.options.source.description)
                        .setDescriptionLocalizations({
                            tr: trLang.moveAll.options.source.description,
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true))
                .addChannelOption(option =>
                    option.setName(enLang.moveAll.options.target.name)
                        .setNameLocalizations({
                            tr: trLang.moveAll.options.target.name,
                        })
                        .setDescription(enLang.moveAll.options.target.description)
                        .setDescriptionLocalizations({
                            tr: trLang.moveAll.options.target.description,
                        })
                        .addChannelTypes(ChannelType.GuildVoice)
                        .setRequired(true))
        )
        .addSubcommand(removeRoleSubcommand =>
            removeRoleSubcommand
                .setName(enLang.removeRole.name)
                .setNameLocalizations({
                    tr: trLang.removeRole.name,
                })
                .setDescription(enLang.removeRole.description)
                .setDescriptionLocalizations({
                    tr: trLang.removeRole.description,
                })
                .addUserOption(option => option
                    .setName(enLang.removeRole.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.removeRole.options.targetUser.name,
                    })
                    .setDescription(enLang.removeRole.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.removeRole.options.targetUser.description,
                    })
                    .setRequired(true)
                )
        )
        .addSubcommand(timeoutSubcommand =>
            timeoutSubcommand
                .setName(enLang.timeout.name)
                .setNameLocalizations({
                    tr: trLang.timeout.name,
                })
                .setDescription(enLang.timeout.description)
                .setDescriptionLocalizations({
                    tr: trLang.timeout.description,
                })
                .addUserOption(option => option
                    .setName(enLang.timeout.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.timeout.options.targetUser.name,
                    })
                    .setDescription(enLang.timeout.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.timeout.options.targetUser.description,
                    })
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(enLang.timeout.options.duration.name)
                    .setNameLocalizations({
                        tr: trLang.timeout.options.duration.name,
                    })
                    .setDescription(enLang.timeout.options.duration.description)
                    .setDescriptionLocalizations({
                        tr: trLang.timeout.options.duration.description,
                    })
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(enLang.timeout.options.reason.name)
                    .setNameLocalizations({
                        tr: trLang.timeout.options.reason.name,
                    })
                    .setDescription(enLang.timeout.options.reason.description)
                    .setDescriptionLocalizations({
                        tr: trLang.timeout.options.reason.description,
                    })
                )
        )
        .addSubcommand(clearSubcommand =>
            clearSubcommand
                .setName(enLang.clear.name)
                .setNameLocalizations({
                    tr: trLang.clear.name,
                })
                .setDescription(enLang.clear.description)
                .setDescriptionLocalizations({
                    tr: trLang.clear.description,
                })
                .addIntegerOption(option => option
                    .setName(enLang.clear.options.amount.name)
                    .setNameLocalizations({
                        tr: trLang.clear.options.amount.name,
                    })
                    .setDescription(enLang.clear.options.amount.description)
                    .setDescriptionLocalizations({
                        tr: trLang.clear.options.amount.description,
                    })
                    .setRequired(true)
                )
                .addUserOption(option => option
                    .setName(enLang.clear.options.target.name)
                    .setNameLocalizations({
                        tr: trLang.clear.options.target.name,
                    })
                    .setDescription(enLang.clear.options.target.description)
                    .setDescriptionLocalizations({
                        tr: trLang.clear.options.target.description,
                    })
                )
        )
        .addSubcommand(chanceUserNameSubcommand =>
            chanceUserNameSubcommand
                .setName(enLang.chanceUserName.name)
                .setNameLocalizations({
                    tr: trLang.chanceUserName.name,
                })
                .setDescription(enLang.chanceUserName.description)
                .setDescriptionLocalizations({
                    tr: trLang.chanceUserName.description,
                })
                .addUserOption(option => option
                    .setName(enLang.chanceUserName.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.chanceUserName.options.targetUser.name,
                    })
                    .setDescription(enLang.chanceUserName.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.chanceUserName.options.targetUser.description,
                    })
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(enLang.chanceUserName.options.setName.name)
                    .setNameLocalizations({
                        tr: trLang.chanceUserName.options.setName.name,
                    })
                    .setDescription(enLang.chanceUserName.options.setName.description)
                    .setDescriptionLocalizations({
                        tr: trLang.chanceUserName.options.setName.description,
                    })
                    .setRequired(true)
                )
        )
        .addSubcommand(banSubcommand =>
            banSubcommand
                .setName(enLang.ban.name)
                .setNameLocalizations({
                    tr: trLang.ban.name,
                })
                .setDescription(enLang.ban.description)
                .setDescriptionLocalizations({
                    tr: trLang.ban.description,
                })
                .addUserOption(option => option
                    .setName(enLang.ban.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.ban.options.targetUser.name,
                    })
                    .setDescription(enLang.ban.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.ban.options.targetUser.description,
                    })
                    .setRequired(true)
                )
                .addStringOption(option => option
                    .setName(enLang.ban.options.reason.name)
                    .setNameLocalizations({
                        tr: trLang.ban.options.reason.name,
                    })
                    .setDescription(enLang.ban.options.reason.description)
                    .setDescriptionLocalizations({
                        tr: trLang.ban.options.reason.description,
                    })
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
        langData = await LanguageService.getLocalizedString(interaction.guild.id, 'commands');

        if (!interaction.inGuild()) {
            interaction.reply({
                content: langData.inGuildError,
                ephemeral: true,
            });
            return;
        }
        if (!interaction.memberPermissions.has('ManageChannels')) {
            await interaction.reply(langData.permissionsError);
            return;
        }
        const mainSubCommand = interaction.options.getSubcommand();
        const queryGuild = {
            guildId: interaction.guild.id,
        };
        const embed = new EmbedBuilder()
        langData = langData.modrateSystem;
        switch (mainSubCommand) {
            case "kick":
                targetUserId = interaction.options.get('target-user').value;
                reason = interaction.options.get('reason')?.value || langData.noReason;
                if (!interaction.memberPermissions.has('KickMembers')) {
                    await interaction.reply(langData.permissions);
                    return;
                }
                langData = langData.kick;

                await interaction.deferReply();
                targetUser = await interaction.guild.members.fetch(targetUserId);
                if (!targetUser) {
                    await interaction.editReply(langData.userNotFound);
                    return;
                }

                if (targetUser.id === interaction.guild.ownerId) {
                    await interaction.editReply(langData.ownerError);
                    return;
                }

                targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
                botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
                if (targetUserRolePosition >= requestUserRolePosition) {
                    await interaction.editReply(langData.roleErrorUser);
                    return;
                }
                if (targetUserRolePosition >= botRolePosition) {
                    await interaction.editReply(langData.roleErrorBot);
                    return;
                }

                // kick the targetUser
                try {
                    await targetUser.kick({ reason });
                    await interaction.editReply(langData.success.replace("{{targetUser}}", targetUser).replace("{{reason}}", reason));
                } catch (error) {
                }
                break;
            case "move-all":
                if (!interaction.memberPermissions.has('MoveMembers')) {
                    await interaction.reply(langData.permissions);
                    return;
                }
                langData = langData.moveAll;
                const sourceChannel = interaction.options.getChannel('source');
                const targetChannel = interaction.options.getChannel('target');
                let count = 0;
                await sourceChannel.members.forEach(member => {
                    count++
                    member.voice.setChannel(targetChannel);
                });
                interaction.reply({
                    content: langData
                        .replace("{{targetChannel}}", targetChannel.id)
                        .replace("{{count}}", count)
                        .replace("{{sourceChannel}}", sourceChannel.id)
                    , ephemeral: true
                });
                break;
            case "remove-role":
                target = interaction.options.getUser("target-user");
                const autoRole = await AutoRole.findOne({ guildId: interaction.guildId });
                langData = langData.removeRole

                // Kullanıcının tüm rollerini al
                const member = interaction.guild.members.cache.get(target.id);
                if (!member) {
                    return await interaction.reply({ content: langData.userNotFound, ephemeral: true })
                }
                let registerRole = null;
                if (autoRole) {
                    registerRole = interaction.guild.roles.cache.find(role => role.id === autoRole.roleId);
                }
                await member.roles.set([]);// Tüm rolleri kaldır ve Autorol rolünü ekle
                // Register rolünü bul
                if (registerRole) {
                    await member.roles.set([registerRole]);
                    return await interaction.reply({ content: langData.success.replace("{{targetUser}}", target.tag), ephemeral: true })
                }
                await interaction.reply({ content: langData.successNoRegisterRole.replace("{{targetUser}}", target.tag), ephemeral: true });
                break;
            case "timeout":
                if (!interaction.memberPermissions.has('MuteMembers')) {
                    await interaction.reply(langData.permissions);
                    return;
                }
                const mentionable = interaction.options.get('target-user').value;
                const duration = interaction.options.get('duration').value; // 1d, 1 day, 1s 5s, 5m
                reason = interaction.options.get('reason')?.value || langData.noReason;

                langData = langData.timeout;

                await interaction.deferReply();
                targetUser = await interaction.guild.members.fetch(mentionable);
                if (!targetUser) {
                    await interaction.editReply(langData.userNotFound);
                    return;
                }

                if (targetUser.user.bot) {
                    await interaction.editReply(langData.botError);
                    return;
                }

                const msDuration = ms(duration);
                if (isNaN(msDuration)) {
                    await interaction.editReply(langData.durationError);
                    return;
                }

                if (msDuration < 5000 || msDuration > 2.419e9) {
                    await interaction.editReply(langData.durationOutOfRange);
                    return;
                }

                targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
                botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

                if (targetUserRolePosition >= requestUserRolePosition) {
                    await interaction.editReply(langData.roleErrorUser);
                    return;
                }

                if (targetUserRolePosition >= botRolePosition) {
                    await interaction.editReply(langData.roleErrorBot);
                    return;
                }
                // Timeout the user
                const { default: prettyMs } = await import('pretty-ms');

                if (targetUser.isCommunicationDisabled()) {
                    await targetUser.timeout(msDuration, reason);
                    await interaction.editReply(langData.successUpdate
                        .replace("{{targetUser}}", targetUser)
                        .replace("{{prettyDuration}}", prettyMs(msDuration, { verbose: true }))
                        .replace("{{reason}}", reason)
                    );
                }
                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(
                    `${targetUser} was timed out for 
                    ${prettyMs(msDuration, { verbose: true })}.
                    \nReason: ${reason}`
                );
                const logChDB = await logChSchema.findOne({ guildId: interaction.guildId });
                if (!logChDB && !logChDB.exist) return;
                const logCh = await interaction.guild.channels.cache.get(logChDB.penaltyLog);
                embed
                    .setColor('Red')
                    .setAuthor({ name: 'Member Time out' })
                    .setDescription(langData.success
                        .replace("{{targetUser}}", targetUser)
                        .replace("{{prettyDuration}}", prettyMs(msDuration, { verbose: true }))
                        .replace("{{reason}}", reason)
                    )
                    .setTimestamp()
                await logCh.send({ embeds: [embed] });
                break;
            case "clear":
                langData = langData.clear;
                const { options, channel, } = interaction;
                let amount = interaction.options.getInteger("amount");
                const target = interaction.options.getUser("target");
                const multiMsg = amount === 1 ? langData.message : langData.messages;
                if (!amount || amount < 1) {
                    amount = 100;
                }
                const channelMessages = await channel.messages.fetch();

                if (amount > channelMessages.size) amount = channelMessages.size;
                embed.setColor("Green");
                await interaction.deferReply({ ephermeral: true });
                let messagesToDelete = [];
                if (target) {
                    let i = 0;
                    channelMessages.forEach((m) => {
                        if (m.author.id === target.id && messagesToDelete.length < amount) {
                            messagesToDelete.push(m);
                            i++;
                        }
                    });
                    embed.setDescription(langData.personSuccess
                        .replace("{{messagesToDelete}}", messagesToDelete.length)
                        .replace("{{target}}", messagesToDelete.target)
                        .replace("{{channel}}", messagesToDelete.channel)
                    );
                } else {
                    messagesToDelete = channelMessages.first(amount);
                    embed.setDescription(langData.success
                        .replace("{{messageCount}}", messagesToDelete.length)
                        .replace("{{messages}}", multiMsg)
                        .replace("{{channel}}", channel)
                    );
                }
                if (messagesToDelete.length > 0) {
                    await channel.bulkDelete(messagesToDelete, true);
                }
                await interaction.editReply({ embeds: [embed] })
                break;
            case "chance-user-name":
                if (!interaction.memberPermissions.has('ManageNicknames')) {
                    await interaction.reply(langData.permissions);
                    return;
                }
                langData = langData.chanceUserName;
                targetUserId = interaction.options.getUser('target-user').id;
                const name = interaction.options.get('set-name').value;
                const targetMember = await interaction.guild.members.fetch(targetUserId);
                await interaction.deferReply({ ephemeral: true });
                if (!targetMember) {
                    await interaction.reply(langData.userNotFound);
                    return;
                }
                await targetMember.setNickname(name).then(async () => {
                    interaction.editReply(langData.success.replace("{{targetUser}}", targetMember).replace("{{name}}", name));
                    return;
                }).catch(error => {
                    interaction.editReply(langData.roleError);
                    return;
                });
                break;
            case "ban":
                if (!interaction.memberPermissions.has('BanMembers')) {
                    await interaction.reply(langData.permissions);
                    return;
                }
                targetUserId = interaction.options.get('target-user').value;
                reason = interaction.options.get('reason')?.value || langData.noReason;

                langData = langData.ban;

                await interaction.deferReply();

                targetUser = await interaction.guild.members.fetch(targetUserId);
                if (!targetUser) {
                    await interaction.editReply("That user doesn't exist in this server.");
                    return;
                }

                if (targetUser.id === interaction.guild.ownerId) {
                    await interaction.editReply(
                        "You can't ban that user because they're the server owner."
                    );
                    return;
                }

                targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
                botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
                if (targetUserRolePosition >= requestUserRolePosition) {
                    await interaction.editReply(
                        "You can't ban that user because they have the same/higher role than you."
                    );
                    return;
                }
                if (targetUserRolePosition >= botRolePosition) {
                    await interaction.editReply(
                        "I can't ban that user because they have the same/higher role than me."
                    );
                    return;
                }

                // Ban the targetUser
                try {
                    await targetUser.ban({ reason });
                    await interaction.editReply(
                        `User ${targetUser} was banned\nReason: ${reason}`
                    );
                } catch (error) {
                    console.log(`There was an error when banning: ${error}`);
                }

                break;
        }
    }
}

