const { AttachmentBuilder, SlashCommandBuilder, ChatInputCommandInteraction, } = require('discord.js');
const canvacord = require('canvacord');
const calculateLevelXp = require('../utils/calculateLevelXp');
const Level = require('../models/Level');
const User = require('../models/User');
const dailyAmount = 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level-system")
        .setDescription("level system ")
        .addSubcommand((subcommand) => subcommand
            .setName('daily').
            setDescription('Collect your dailies!')
        )
        .addSubcommand((subcommand) => subcommand
            .setName('balance')
            .setDescription("See yours/someone else's balance")
            .addUserOption((option) => option
                .setName("user")
                .setDescription('The user whose balance you want to get.'))
        )
        .addSubcommand((subcommand) => subcommand
            .setName("level")
            .setDescription("Shows your/someone's level.")
            .addUserOption((option) => option
                .setName("target-user")
                .setDescription('The user whose level you want to see.')
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
        const query = {
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        };

        const mainSubCommand = interaction.options.getSubcommand();
        switch (mainSubCommand) {
            case "daily":
                await interaction.deferReply();

                let user = await User.findOne(query);

                if (user) {
                    const lastDailyDate = user.lastDaily.toDateString();
                    const currentDate = new Date().toDateString();

                    if (lastDailyDate === currentDate) {
                        interaction.editReply(
                            'You have already collected your dailies today. Come back tomorrow!'
                        );
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

                interaction.editReply(
                    `${dailyAmount} was added to your balance. Your new balance is ${user.balance}`
                );
                break;
            case "balance":
                const targetUserIdBalance = interaction.options.get('user')?.value || interaction.member.id;

                await interaction.deferReply();

                const balanceUser = await User.findOne({ userId: targetUserIdBalance, guildId: interaction.guild.id });

                if (!balanceUser) {
                    interaction.editReply(`<@${targetUserIdBalance}> doesn't have a profile yet.`);
                    return;
                }

                interaction.editReply(
                    targetUserIdBalance === interaction.member.id
                        ? `Your balance is **${balanceUser.balance}**`
                        : `<@${targetUserIdBalance}>'s balance is **${balanceUser.balance}**`
                );
                break;
            case "level":
                await interaction.deferReply();

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
                            ? `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.`
                            : "You don't have any levels yet. Chat a little more and try again."
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