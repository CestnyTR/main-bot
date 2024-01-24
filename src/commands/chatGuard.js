const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, EmbedBuilder } = require('discord.js');
const linkAccessRole = require("../models/linkAccessRoleSettings")
const capitalLetterDB = require('../models/CapitalLetter');
const forbiddenDb = require('../models/Forbidden');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat-guard-system")
        .setDescription("Set your chat guard")
        .addSubcommandGroup(addSubcommandGroup =>
            addSubcommandGroup
                .setName("anti-link")
                .setDescription("Enable or disable the anti-link system and specify a role with link access.")
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("enable")
                        .setDescription("Enable your auto-role for this server.")
                        .addRoleOption(option =>
                            option
                                .setName("link-access-role")
                                .setDescription('Specify a role with access to send links.')
                                .setRequired(true)
                        )
                )
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("disable")
                        .setDescription("Disable your auto-role for this server.")
                )
        )
        .addSubcommandGroup(subcommand =>
            subcommand
                .setName("capital-letter")
                .setDescription("Activate or deactivate forbid writing with capital letter")
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("enable")
                        .setDescription("Enable delete writing with capital letter")
                )
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("disable")
                        .setDescription("Disable don't delete writing with capital letter")
                )
        )
        .addSubcommandGroup(subcommand =>
            subcommand
                .setName("slow-mode")
                .setDescription('Configure your auto-role for this server.')
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("enable")
                        .setDescription("Enable your Discord chat slow mode")
                        .addIntegerOption(option =>
                            option
                                .setName("duration")
                                .setDescription('Set Discord chat slow mode timer')
                                .setRequired(true)
                        )
                        .addChannelOption(option =>
                            option
                                .setName("channel")
                                .setDescription('Set a timer for a Discord chat room of your choice')
                                .addChannelTypes(ChannelType.GuildText)
                        )
                )
                .addSubcommand(subsubcommand =>
                    subsubcommand
                        .setName("disable")
                        .setDescription("Disable your Discord chat slow mode")
                        .addChannelOption(option =>
                            option
                                .setName("channel")
                                .setDescription('Disable a timer for a Discord chat room of your choice')
                                .addChannelTypes(ChannelType.GuildText)
                        )
                )
        )
        .addSubcommand(subsubcommand =>
            subsubcommand
                .setName("forbid-word")
                .setDescription("Add your forbidden word")
                .addStringOption(option =>
                    option
                        .setName("word")
                        .setDescription("Add word")
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
        const mainSubCommand = interaction.options.getSubcommandGroup();
        const subcommand = interaction.options.getSubcommand();

        const queryGuild = {
            guildId: interaction.guild.id,
        };
        const embed = new EmbedBuilder()

        switch (mainSubCommand) {
            case "anti-link":
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

                                interaction.editReply({ embeds: [embed], ephemeral: true }); return;
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