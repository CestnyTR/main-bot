const { Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, } = require("discord.js");
const ms = require('ms');
const giveawaySystemSchema = require("../../models/giveaway")

/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    const giveawaydb = await findGuild(interaction.guild.id);
    const embed = new EmbedBuilder();
    if (!interaction.isButton() && !giveawaydb) return;
    const theKey = interaction.customId;
    switch (theKey) {
        case "giveawayBtnId":
            const giveawayModal = new ModalBuilder()
                .setCustomId("giveawayModalId")
                .setTitle("Start giveaway");
            const prizeInput = new TextInputBuilder()
                .setCustomId("prizeId")
                .setLabel("Prize")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("What is the prize of your giveaway ?")
                .setMinLength(3)
                .setMaxLength(25)
                .setRequired(true);
            const winnersCountInput = new TextInputBuilder()
                .setCustomId("winnersCountId")
                .setLabel("winners Count")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("What is the winners count of your giveaway ?")
                .setMinLength(1)
                .setMaxLength(2)
                .setRequired(true);
            const backupWinnersCountInput = new TextInputBuilder()
                .setCustomId("backupWinnersCountId")
                .setLabel("backup winners Count")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("What is the backup winners count of your giveaway ?")
                .setMinLength(1)
                .setMaxLength(3)
                .setRequired(true);
            const endDateCountInput = new TextInputBuilder()
                .setCustomId("endDateId")
                .setLabel("End Date Count")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("What is the end date of your giveaway (30m, 1h, 1 day)?")
                .setMinLength(1)
                .setMaxLength(10)
                .setRequired(true);
            const prizeInputRow = new ActionRowBuilder().addComponents(prizeInput);
            const winnersCountInputRow = new ActionRowBuilder().addComponents(winnersCountInput);
            const backupWinnersCountInputRow = new ActionRowBuilder().addComponents(backupWinnersCountInput);
            const endDateCountInputRow = new ActionRowBuilder().addComponents(endDateCountInput);
            giveawayModal.addComponents(prizeInputRow, winnersCountInputRow, backupWinnersCountInputRow, endDateCountInputRow);
            await interaction.showModal(giveawayModal);
            break;

        case "giveawayModalId":
            const prize = interaction.fields.getTextInputValue('prizeId');
            const winners = interaction.fields.getTextInputValue('winnersCountId');
            const backupWinners = interaction.fields.getTextInputValue('backupWinnersCountId');
            const endDate = interaction.fields.getTextInputValue('endDateId');
            const msDuration = ms(endDate);
            if (isNaN(msDuration)) {
                await interaction.channel.send({ content: 'Please provide a valid time duration.', ephermal: true });
                return;
            }

            if (msDuration < 5000 || msDuration > 2.419e9) {
                await interaction.editReply('Giveaway duration cannot be less than 5 seconds or more than 28 days.');
                return;
            }
            const { default: prettyMs } = await import('pretty-ms');

            embed
                .setTitle(`${prize} giveaways`)
                .setColor("Green")
                .setTimestamp()
                .addFields(
                    { name: 'whose giveaway', value: `\`\`\`${interaction.user.username}\`\`\`` },
                    { name: 'The prize', value: `\`\`\`${prize}\`\`\`` },
                    { name: 'Winner count', value: `\`\`\`${winners}\`\`\`` },
                    { name: 'End date', value: `\`\`\`${prettyMs(msDuration, { verbose: true })}\`\`\`` },

                );
            const closeGiveawayBtn = new ButtonBuilder()
                .setEmoji("🔒")
                .setLabel('Close Giveaway')
                .setStyle(ButtonStyle.Danger)
                .setCustomId("closeGiveawayBtnId");
            const joinGiveawayBtn = new ButtonBuilder()
                .setEmoji("✅")
                .setLabel('join Giveaway')
                .setStyle(ButtonStyle.Success)
                .setCustomId("joinGiveawayBtnId");
            const row = new ActionRowBuilder().addComponents(joinGiveawayBtn, closeGiveawayBtn,);

            await interaction.channel.send({ embeds: [embed], components: [row] })
            await interaction.reply({
                content: `${interaction.user.tag}, your giveaways has been succesfully created!`,
                ephemeral: true,
            });
            break;
    }
















    async function findGuild(guild) {
        const giveawaySystem = await giveawaySystemSchema.findOne({ guildId: guild });
        if (!giveawaySystem) return;
        return await giveawaySystem;
    }
}  