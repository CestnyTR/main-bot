const { PermissionFlagsBits, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const AutoRole = require('../models/AutoRole');
const logChSchema = require("../models/logChannels");
const ms = require('ms');
let reason = "some reason";
let targetUserId;
let targetUser;
let targetUserRolePosition;
let requestUserRolePosition;
let botRolePosition;
let target;
module.exports = {

    data: new SlashCommandBuilder()
        .setName("modrate-system")
        .setDescription("Modarate server members")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addSubcommand(addSubcommand => addSubcommand
            .setName("kick")
            .setDescription('Kicks a member from this server.')
            .addUserOption((option) => option
                .setName("target-user")
                .setDescription('The user you want to kick.')
                .setRequired(true)
            )
            .addStringOption((option) => option
                .setName("reason")
                .setDescription('The reason you want to kick.')
            )
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName('move-all')
            .setDescription('Move all members in the specified channel to target channel')
            .addChannelOption(option =>
                option.setName('source')
                    .setDescription('The source channel of the member to be moved')
                    .addChannelTypes(ChannelType.GuildVoice)
                    .setRequired(true))
            .addChannelOption(option =>
                option.setName('target')
                    .setDescription('The target channel to move the member to')
                    .addChannelTypes(ChannelType.GuildVoice)
                    .setRequired(true))
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName("remove-role")
            .setDescription('Remove all role from selected user and give him register role')
            .addUserOption((option) => option
                .setName("target-user")
                .setDescription('The user you want to remove role.')
                .setRequired(true)
            )
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName("timeout")
            .setDescription('Timeout a user.')
            .addUserOption((option) => option
                .setName('target-user')
                .setDescription('The user you want to timeout.')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('duration')
                .setDescription('Timeout duration (30m, 1h, 1 day).')
                .setRequired(true))
            .addStringOption((option) => option
                .setName('reason')
                .setDescription('The reason for the timeout.')
            )
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName("clear")
            .setDescription("Clear a specific amount of messages from a target or channel.")
            .addIntegerOption((option) =>
                option
                    .setName("amount")
                    .setDescription("Amount of messages to clear.(1-100)")
            )
            .addUserOption((option) =>
                option
                    .setName("target")
                    .setDescription("Select a target to clear their messages.")
            )
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName("chance-user-name")
            .setDescription('Chance your selected user name')
            .addUserOption((option) => option
                .setName("target-user")
                .setDescription("Select user")
                .setRequired(true))
            .addStringOption((option) => option
                .setName("set-name")
                .setDescription("Set user name")
                .setRequired(true))
        )
        .addSubcommand(addSubcommand => addSubcommand
            .setName("ban")
            .setDescription('Bans a member from this server.')
            .addUserOption((option) => option
                .setName("target-user")
                .setDescription('The user you want to ban.')
                .setRequired(true)
            )
            .addStringOption((option) => option
                .setName("reason")
                .setDescription('The reason you want to ban.')
                .setRequired(true)
            )
        ),
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
    */
    run: async ({ interaction }) => {

        if (!interaction.inGuild()) {
            interaction.reply({
                content: 'You can only run this command inside a server.',
                ephemeral: true,
            });
            return;
        }
        if (!interaction.memberPermissions.has('ManageChannels')) {
            await interaction.reply("You dont have enough Permissions");
            return;
        }
        const mainSubCommand = interaction.options.getSubcommand();
        const queryGuild = {
            guildId: interaction.guild.id,
        };
        const embed = new EmbedBuilder()

        switch (mainSubCommand) {
            case "kick":
                targetUserId = interaction.options.get('target-user').value;
                reason = interaction.options.get('reason')?.value || 'No reason provided';

                await interaction.deferReply();
                targetUser = await interaction.guild.members.fetch(targetUserId);
                if (!targetUser) {
                    await interaction.editReply("That user doesn't exist in this server.");
                    return;
                }

                if (targetUser.id === interaction.guild.ownerId) {
                    await interaction.editReply(
                        "You can't kick that user because they're the server owner."
                    );
                    return;
                }

                targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
                botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot
                if (targetUserRolePosition >= requestUserRolePosition) {
                    await interaction.editReply(
                        "You can't kick that user because they have the same/higher role than you."
                    );
                    return;
                }
                if (targetUserRolePosition >= botRolePosition) {
                    await interaction.editReply(
                        "I can't kick that user because they have the same/higher role than me."
                    );
                    return;
                }

                // kick the targetUser
                try {
                    await targetUser.kick({ reason });
                    await interaction.editReply(
                        `User ${targetUser} was kick\nReason: ${reason}`
                    );
                } catch (error) {
                    console.log(`There was an error when kick: ${error}`);
                }
                break;
            case "move-all":
                const sourceChannel = interaction.options.getChannel('source');
                const targetChannel = interaction.options.getChannel('target');
                await sourceChannel.members.forEach(member => {
                    member.voice.setChannel(targetChannel);
                });
                interaction.reply({ content: 'Done.', ephemeral: true });
                break;
            case "remove-role":
                target = interaction.options.getUser("target-user");
                const autoRole = await AutoRole.findOne({ guildId: interaction.guildId });

                // Kullanıcının tüm rollerini al
                const member = interaction.guild.members.cache.get(target.id);
                let registerRole = null;
                if (autoRole) {
                    registerRole = interaction.guild.roles.cache.find(role => role.id === autoRole.roleId);
                }
                await member.roles.set([]);
                // Register rolünü bul
                if (registerRole) {
                    await member.roles.set([registerRole]);
                    return await interaction.reply(`Removed all roles from ${target.tag} and added the register role.`);
                }
                // Tüm rolleri kaldır ve Autorol rolünü ekle

                await interaction.reply(`Removed all roles from ${target.tag}`);

                break;
            case "timeout":
                const mentionable = interaction.options.get('target-user').value;
                const duration = interaction.options.get('duration').value; // 1d, 1 day, 1s 5s, 5m
                reason = interaction.options.get('reason')?.value || 'No reason provided';
                if (!interaction.memberPermissions.has('Administrator')) {
                    await interaction.reply("You dont have enough Permissions");
                    return;
                }


                await interaction.deferReply();
                targetUser = await interaction.guild.members.fetch(mentionable);
                if (!targetUser) {
                    await interaction.editReply("That user doesn't exist in this server.");
                    return;
                }

                if (targetUser.user.bot) {
                    await interaction.editReply("I can't timeout a bot.");
                    return;
                }

                const msDuration = ms(duration);
                if (isNaN(msDuration)) {
                    await interaction.editReply('Please provide a valid timeout duration.');
                    return;
                }

                if (msDuration < 5000 || msDuration > 2.419e9) {
                    await interaction.editReply('Timeout duration cannot be less than 5 seconds or more than 28 days.');
                    return;
                }

                const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
                const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
                const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

                if (targetUserRolePosition >= requestUserRolePosition) {
                    await interaction.editReply("You can't timeout that user because they have the same/higher role than you.");
                    return;
                }

                if (targetUserRolePosition >= botRolePosition) {
                    await interaction.editReply("I can't timeout that user because they have the same/higher role than me.");
                    return;
                }
                // Timeout the user
                const { default: prettyMs } = await import('pretty-ms');

                if (targetUser.isCommunicationDisabled()) {
                    await targetUser.timeout(msDuration, reason);
                    await interaction.editReply(`${targetUser}'s timeout has been updated to ${prettyMs(msDuration, { verbose: true })}\nReason: ${reason}`);
                }

                await targetUser.timeout(msDuration, reason);
                await interaction.editReply(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`);
                const logChDB = await logChSchema.findOne({ guildId: interaction.guildId });
                if (!logChDB && !logChDB.exist) return;
                const logCh = await interaction.guild.channels.cache.get(logChDB.penaltyLog);
                embed
                    .setColor('Red')
                    .setAuthor({ name: 'Member Time out' })
                    .setDescription(`${targetUser} was timed out for ${prettyMs(msDuration, { verbose: true })}.\nReason: ${reason}`)
                    .setTimestamp()
                await logCh.send({ embeds: [embed] });
                break;
            case "clear":

                const { options, channel, } = interaction;

                let amount = interaction.options.getInteger("amount");
                target = interaction.options.getUser("target");
                const multiMsg = amount === 1 ? "message" : "messages"
                if (!amount || amount < 1) {
                    amount = 100;
                }

                const channelMessages = await channel.messages.fetch();

                if (amount > channelMessages.size) amount = channelMessages.size;
                embed.setColor("Random");
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
                    embed.setDescription(`\'✅\'Succesfuly Cleard \'${messagesToDelete.length}\' from ${target} in ${channel} `);
                } else {
                    messagesToDelete = channelMessages.first(amount);
                    embed.setDescription(`\'✅\'Succesfuly Cleard \'${messagesToDelete.length}\' ${multiMsg} in ${channel} `);
                }
                if (messagesToDelete.length > 0) {
                    await channel.bulkDelete(messagesToDelete, true);
                }
                await interaction.editReply({ embeds: [embed] })
                break;
            case "chance-user-name":
                targetUserId = interaction.options.getUser('target-user').id;
                const name = interaction.options.get('set-name').value;
                const targetMember = await interaction.guild.members.fetch(targetUserId);
                await interaction.deferReply({ ephemeral: true });
                if (!targetMember) {
                    await interaction.reply("That user doesn't exist in this server.");
                    return;
                }
                await targetMember.setNickname(name).then(async () => {
                    interaction.editReply("username set successfully : " + name);
                    return;
                }).catch(error => {
                    interaction.editReply("You can't set name that user because they have the same/higher role than you.");
                    console.log('Kullanıcı adı değiştirme hatası:' + error);
                    return;
                });
                break;
            case "ban":
                targetUserId = interaction.options.get('target-user').value;
                reason = interaction.options.get('reason')?.value || 'No reason provided';
                if (!interaction.memberPermissions.has('BanMembers')) {
                    await interaction.reply("You dont have enough Permissions");
                    return;
                }
                await interaction.deferReply();
                try {
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
                } catch (error) {
                    console.log(`There was an error when banning: ${error}`);

                }
                break;
        }
    }
}

