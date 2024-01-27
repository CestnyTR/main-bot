const { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder, } = require('discord.js')
const UserProfile = require('../models/User')
const trLang = require("../lang/tr.json").buildCommands.playGames;
const enLang = require("../lang/en.json").buildCommands.playGames;
const LanguageService = require("../utils/LanguageService");
let langData
const choices = [
    { name: "Rock", emoji: "🗿", beats: "Scissors" },
    { name: "Paper", emoji: "📄", beats: "Rock" },
    { name: "Scissors", emoji: "✂️", beats: "Paper" },
];

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
        .addSubcommand(gambleSubcommand =>
            gambleSubcommand
                .setName(enLang.gamble.name)
                .setNameLocalizations({
                    tr: trLang.gamble.name,
                })
                .setDescription(enLang.gamble.description)
                .setDescriptionLocalizations({
                    tr: trLang.gamble.description,
                })
                .addIntegerOption(option => option
                    .setName(enLang.gamble.options.amount.name)
                    .setNameLocalizations({
                        tr: trLang.gamble.options.amount.name,
                    })
                    .setDescription(enLang.gamble.options.amount.description)
                    .setDescriptionLocalizations({
                        tr: trLang.gamble.options.amount.description,
                    })
                    .setRequired(true)
                )
        )
        .addSubcommand(rpsSubcommand =>
            rpsSubcommand
                .setName(enLang.rps.name)
                .setNameLocalizations({
                    tr: trLang.rps.name,
                })
                .setDescription(enLang.rps.description)
                .setDescriptionLocalizations({
                    tr: trLang.rps.description,
                })
                .addUserOption(option => option
                    .setName(enLang.rps.options.user.name)
                    .setNameLocalizations({
                        tr: trLang.rps.options.user.name,
                    })
                    .setDescription(enLang.rps.options.user.description)
                    .setDescriptionLocalizations({
                        tr: trLang.rps.options.user.description,
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
        const embed = new EmbedBuilder()

        const mainSubCommand = interaction.options.getSubcommand();
        switch (mainSubCommand) {
            case "gamble":
                langData = langData.game.gamble;
                const amount = interaction.options.getInteger('amount');

                if (amount < 100) {
                    interaction.reply(langData.amountError);
                    return;
                }

                let userProfile = await UserProfile.findOne({
                    userId: interaction.user.id,
                });
                if (!userProfile) {
                    userProfile = new UserProfile({
                        userId: interaction.user.id,
                    });
                }

                if (amount > userProfile.balance) {
                    interaction.reply(langData.notEnoughBalance);
                    return;
                }

                const didWin = Math.random() > 0.5;

                if (!didWin) {
                    userProfile.balance -= amount;
                    await userProfile.save();

                    interaction.reply(langData.lossMessage);
                    return;
                }

                const amountWon = Number((amount * (Math.random() + 0.65)).toFixed(0));

                userProfile.balance += amountWon;
                await userProfile.save();

                interaction.reply(langData.winMessage
                    .replace("{{amountWon}}", amountWon)
                    .replace("{{userProfile.balance}}", userProfile.balance)
                );
                break;
            case "rps":
                langData = langData.game.rps;

                const targetUser = interaction.options.getUser("user");

                if (interaction.user.id === targetUser.id) {
                    interaction.reply({
                        content: langData.selfPlayError,
                        ephemeral: true,
                    });
                    return;
                }

                if (targetUser.bot) {
                    interaction.reply({
                        content: langData.botPlayError,
                        ephemeral: true,
                    });
                    return;
                }

                embed
                    .setTitle(langData.title)
                    .setDescription(langData.turnMessage.replace("{{user}}", targetUser))
                    .setColor("Yellow")
                    .setTimestamp(new Date())

                const buttons = choices.map((choice) => {
                    return new ButtonBuilder()
                        .setCustomId(choice.name)
                        .setLabel(choice.name)
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(choice.emoji)
                });

                const row = new ActionRowBuilder().addComponents(buttons);

                const reply = await interaction.reply({
                    content: langData.challengeMessage.replace("{{challenger}}", targetUser).replace("{{challenged}}", interaction.user),
                    embeds: [embed],
                    components: [row],
                });
                const targetUserInteraction = await reply.awaitMessageComponent({
                    filter: (i) => i.user.id === targetUser.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(langData.timeoutMessage.replace("{{user}}", targetUser))
                    await reply.edit({ embeds: [embed], components: [] })
                })
                if (!targetUserInteraction) return;
                const targetUserChoice = choices.find(
                    (choice) => choice.name === targetUserInteraction.customId,
                )
                await targetUserInteraction.reply({
                    content: langData.picked.replace("{{choice}}", targetUserChoice.name + targetUserChoice.emoji),
                    ephemeral: true,
                })
                //! edit embet with the updated user turn
                embed.setDescription(langData.turnMessage.replace("{{user}}", interaction.user));
                await reply.edit({
                    content: langData.turnMessage.replace("{{user}}", interaction.user),
                    embeds: [embed],
                })
                const initialUserInteraction = await reply.awaitMessageComponent({
                    filter: (i) => i.user.id === interaction.user.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(langData.timeoutMessage.replace("{{user}}", interaction.user))
                    await reply.edit({ embeds: [embed], components: [] })
                })
                if (!initialUserInteraction) return;
                const initialUserChoice = choices.find(
                    (choice) => choice.name === initialUserInteraction.customId,
                )
                let result;
                if (targetUserChoice.beats === initialUserChoice.name) {
                    result = langData.winResult.replace("{{winner}}", targetUser);
                }
                if (initialUserChoice.beats === targetUserChoice.name) {
                    result = langData.winResult.replace("{{winner}}", interaction.user);
                }
                if (initialUserChoice.name === targetUserChoice.name) {
                    result = langData.tieResult;
                }
                embed.setDescription(
                    langData.resultMessage
                        .replace("{{challenger}}", targetUser)
                        .replace("{{challengerChoice}}", targetUserChoice.name + targetUserChoice.emoji)
                        .replace("{{challenged}}", interaction.user)
                        .replace("{{challengedChoice}}", initialUserChoice.name + initialUserChoice.emoji)
                        .replace("{{result}}",result)
                )
                reply.edit({ embeds: [embed], components: [] })
                break;

        }
    },

}