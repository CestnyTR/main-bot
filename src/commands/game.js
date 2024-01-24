const { ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder, } = require('discord.js')
const UserProfile = require('../models/User')
const trLang = require("../lang/tr.json").buildCommands.playGames;
const enLang = require("../lang/en.json").buildCommands.playGames;

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
        if (!interaction.inGuild()) {
            interaction.reply({
                content: 'You can only run this command inside a server.',
                ephemeral: true,
            });
            return;
        }
        const embed = new EmbedBuilder()

        const mainSubCommand = interaction.options.getSubcommand();
        switch (mainSubCommand) {
            case "gamble":
                const amount = interaction.options.getInteger('amount');

                if (amount < 100) {
                    interaction.reply("You have to gamble atleast 100 Meteorites");
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
                    interaction.reply("You dont have enough Meteorites to gamble idiot.");
                    return;
                }

                const didWin = Math.random() > 0.5;

                if (!didWin) {
                    userProfile.balance -= amount;
                    await userProfile.save();

                    interaction.reply("You didn't win anything because your shit, L bozo");
                    return;
                }

                const amountWon = Number((amount * (Math.random() + 0.65)).toFixed(0));

                userProfile.balance += amountWon;
                await userProfile.save();

                interaction.reply(`You won +${amountWon}\nYou now have ${userProfile.balance} Meteorites. Don't worry i wont let you win again.`)
                break;
            case "rps":
                const targetUser = interaction.options.getUser("user");

                if (interaction.user.id === targetUser.id) {
                    interaction.reply({
                        content: "You can't play rock paper scissors with yourself.",
                        ephemeral: true,
                    });
                    return;
                }

                if (targetUser.bot) {
                    interaction.reply({
                        content: "You can't play rock paper scissors with a bot.",
                        ephemeral: true,
                    });
                    return;
                }

                embed
                    .setTitle("Rock Paper Scissors")
                    .setDescription(`It's currently ${targetUser}'s turn.`)
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
                    content: `${targetUser}, you have been challenged to a game of Rock Paper Scissors, by ${interaction.user}. To start playing, click one of the buttons below.`,
                    embeds: [embed],
                    components: [row],
                });
                const targetUserInteraction = await reply.awaitMessageComponent({
                    filter: (i) => i.user.id === targetUser.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(`Game over.${targetUser} did not respond in time`)
                    await reply.edit({ embeds: [embed], components: [] })
                })
                if (!targetUserInteraction) return;
                const targetUserChoice = choices.find(
                    (choice) => choice.name === targetUserInteraction.customId,
                )
                await targetUserInteraction.reply({
                    content: `You picked ${targetUserChoice.name + targetUserChoice.emoji}`,
                    ephemeral: true,
                })
                //! edit embet with the updated user turn
                embed.setDescription(`Its currently ${interaction.user}'s turn`);
                await reply.edit({
                    content: `${interaction.user} it's your turn now`,
                    embeds: [embed],
                })
                const initialUserInteraction = await reply.awaitMessageComponent({
                    filter: (i) => i.user.id === interaction.user.id,
                    time: 30_000,
                }).catch(async (error) => {
                    embed.setDescription(`Game over.${interaction.user} did not respond in time`)
                    await reply.edit({ embeds: [embed], components: [] })
                })
                if (!initialUserInteraction) return;
                const initialUserChoice = choices.find(
                    (choice) => choice.name === initialUserInteraction.customId,
                )
                let result;
                if (targetUserChoice.beats === initialUserChoice.name) {
                    result = `${targetUser} 👑 Won 👑`
                }
                if (initialUserChoice.beats === targetUserChoice.name) {
                    result = `${interaction.user} 👑 Won 👑`
                }
                if (initialUserChoice.name === targetUserChoice.name) {
                    result = `It was a tie`
                }
                embed.setDescription(
                    `${targetUser} picked ${targetUserChoice.name + targetUserChoice.emoji}\n${interaction.user} picked ${initialUserChoice.name + initialUserChoice.emoji}\n\n${result}`
                )
                reply.edit({ embeds: [embed], components: [] })
                break;

        }
    },

}