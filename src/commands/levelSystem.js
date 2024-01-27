const { AttachmentBuilder, SlashCommandBuilder, ChatInputCommandInteraction, } = require('discord.js');
const canvacord = require('canvacord');
const calculateLevelXp = require('../utils/calculateLevelXp');
const Level = require('../models/Level');
const User = require('../models/User');
const dailyAmount = 1000;
const trLang = require("../lang/tr.json").buildCommands.levelSystem;
const enLang = require("../lang/en.json").buildCommands.levelSystem;
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
        .addSubcommand(dailySubcommand =>
            dailySubcommand
                .setName(enLang.subcommands.daily.name)
                .setNameLocalizations({
                    tr: trLang.subcommands.daily.name,
                })
                .setDescription(enLang.subcommands.daily.description)
                .setDescriptionLocalizations({
                    tr: trLang.subcommands.daily.description,
                })
        )
        .addSubcommand(balanceSubcommand =>
            balanceSubcommand
                .setName(enLang.subcommands.balance.name)
                .setNameLocalizations({
                    tr: trLang.subcommands.balance.name,
                })
                .setDescription(enLang.subcommands.balance.description)
                .setDescriptionLocalizations({
                    tr: trLang.subcommands.balance.description,
                })
                .addUserOption(option => option
                    .setName(enLang.subcommands.balance.options.user.name)
                    .setNameLocalizations({
                        tr: trLang.subcommands.balance.options.user.name,
                    })
                    .setDescription(enLang.subcommands.balance.options.user.description)
                    .setDescriptionLocalizations({
                        tr: trLang.subcommands.balance.options.user.description,
                    })
                )
        )
        .addSubcommand(levelSubcommand =>
            levelSubcommand
                .setName(enLang.subcommands.level.name)
                .setNameLocalizations({
                    tr: trLang.subcommands.level.name,
                })
                .setDescription(enLang.subcommands.level.description)
                .setDescriptionLocalizations({
                    tr: trLang.subcommands.level.description,
                })
                .addUserOption(option => option
                    .setName(enLang.subcommands.level.options.targetUser.name)
                    .setNameLocalizations({
                        tr: trLang.subcommands.level.options.targetUser.name,
                    })
                    .setDescription(enLang.subcommands.level.options.targetUser.description)
                    .setDescriptionLocalizations({
                        tr: trLang.subcommands.level.options.targetUser.description,
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
        langData = await LanguageService.getLocalizedString(interaction.guild.id, 'commands');

        if (!interaction.inGuild()) {
            interaction.reply({
                content: langData.inGuildError,
                ephemeral: true,
            });
            return;
        }
        const query = {
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        };
        langData = langData.levelSys;
        const mainSubCommand = interaction.options.getSubcommand();
        switch (mainSubCommand) {
            case "daily":
                await interaction.deferReply();

                let user = await User.findOne(query);
                langData = langData.daily
                if (user) {
                    const lastDailyDate = user.lastDaily.toDateString();
                    const currentDate = new Date().toDateString();

                    if (lastDailyDate === currentDate) {
                        interaction.editReply(langData.alreadyCollected);
                        return;
                    }

                    user.lastDaily = new Date();
                } else {
                    user = new User({
                        ...query,
                        lastDaily: new Date(),
                    });
                }

                user.balance += dailyAmount;
                await user.save();

                interaction.editReply(langData.amountAdded.replace("{{dailyAmount}}", dailyAmount).replace("userBalance", user.balance));
                break;
            case "balance":
                const targetUserIdBalance = interaction.options.get('user')?.value || interaction.member.id;
                langData = langData.balance;
                await interaction.deferReply();

                const balanceUser = await User.findOne({ userId: targetUserIdBalance, guildId: interaction.guild.id });

                if (!balanceUser) {
                    interaction.editReply(langData.noProfile.replace("{{targetUserIdBalance}}", targetUserIdBalance));
                    return;
                }

                interaction.editReply(
                    targetUserIdBalance === interaction.member.id
                        ? langData.yourBalance.replace("{{userBalance}}", balanceUser.balance)
                        : langData.otherUserBalance.replace("{{targetUserIdBalance}}", targetUserIdBalance).replace("{{userBalance}}", balanceUser.balance)
                );
                break;
            case "level":
                await interaction.deferReply();
                langData = langData.level;

                const mentionedUserId = interaction.options.get('target-user')?.value;
                const targetUserIdLevel = mentionedUserId || interaction.member.id;
                const targetUserObj = await interaction.guild.members.fetch(targetUserIdLevel);
                const fetchedLevel = await Level.findOne({
                    userId: targetUserIdLevel,
                    guildId: interaction.guild.id,
                });

                if (!fetchedLevel) {
                    interaction.editReply(
                        mentionedUserId
                            ? langData.noLevels.replace("{{userTag}}", targetUserObj.user.tag)
                            : langData.noLevelsSelf
                    );
                    return;
                }

                let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
                    '-_id userId level xp'
                );
                allLevels.sort((a, b) => {
                    if (a.level === b.level) {
                        return b.xp - a.xp;
                    } else {
                        return b.level - a.level;
                    }
                });

                let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserIdLevel) + 1;
                const rank = new canvacord.Rank()
                    .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
                    .setRank(currentRank)
                    .setLevel(fetchedLevel.level)
                    .setCurrentXP(fetchedLevel.xp)
                    .setRequiredXP(calculateLevelXp(fetchedLevel.level))
                    .setProgressBar('#FFC300', 'COLOR')
                    .setUsername(targetUserObj.user.username)
                    .setDiscriminator(targetUserObj.user.discriminator);
                if (targetUserObj && targetUserObj.presence) {
                    rank.setStatus(targetUserObj.presence.status);
                } else {
                    rank.setStatus("offline");
                }
                const data = await rank.build();
                const attachment = new AttachmentBuilder(data);
                interaction.editReply({ files: [attachment] });
                break;

        }
    }

}