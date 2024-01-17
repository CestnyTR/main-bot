const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const giveawaySchema = require("../../models/giveaway");

/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;
    const [type, giveawayId, action] = interaction.customId.split('.');
    if (type !== 'giveaway') return;
    await interaction.deferReply({ ephemeral: true });
    const targetGiveaway = await giveawaySchema.findOne({ giveawayId });
    const targetMessage = await interaction.channel.messages.fetch(targetGiveaway.messageId);
    const targetMessageEmbed = targetMessage.embeds[0];
    switch (action) {
        case "join":
            // Check if the giveaway is open for participation
            if (targetGiveaway.status !== 'pending') {
                await interaction.editReply('This giveaway is not open for participation.');
                return;
            }

            const participantIndex = targetGiveaway.participants.indexOf(interaction.user.id);

            // Check if the user is already a participant
            if (participantIndex !== -1) {
                // User is already a participant, so remove them from the participants array
                targetGiveaway.participants.splice(participantIndex, 1);
                await interaction.editReply('You have left the giveaway.');
            } else {
                // User is not a participant, so add them to the participants array
                targetGiveaway.participants.push(interaction.user.id);
                await interaction.editReply('You have joined the giveaway!');
            }

            // Save the updated giveaway data
            await targetGiveaway.save();

            // Update the "Giveaway entries" count in the embed
            const updatedParticipantsCount = targetGiveaway.participants.length;
            targetMessageEmbed.fields.find(field => field.name === 'Giveaway entries').value = updatedParticipantsCount.toString();

            // Edit the message with the updated embed
            await targetMessage.edit({
                embeds: [targetMessageEmbed],
            });
            break;


        case "close":
            if (!interaction.memberPermissions.has('Administrator')) {
                await interaction.editReply('you do not have permission to close this giveaway')
                return;
            }
            targetGiveaway.status = 'close';
            targetMessageEmbed.data.color = 0x84e660;
            targetMessageEmbed.fields[1].value = '❌ closed';
            await targetGiveaway.save();
            await giveawaySchema.deleteOne({ giveawayId: targetGiveaway.giveawayId });

            interaction.editReply('giveaway closed !')
            targetMessage.edit({
                embeds: [targetMessageEmbed],
                components: [],
            });
            break;
        case "do":
            if (!interaction.memberPermissions.has('Administrator')) {
                await interaction.editReply('You do not have permission to do this giveaway');
                return;
            }

            // Check if there are participants
            if (targetGiveaway.participants.length === 0) {
                await interaction.editReply('No participants found for this giveaway');
                return;
            }

            // Fisher-Yates (Knuth) Shuffle algorithm to shuffle the participants array
            const shuffledParticipants = [...targetGiveaway.participants];
            for (let i = shuffledParticipants.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
            }

            // Select winners and backup winners
            const winners = shuffledParticipants.slice(0, targetGiveaway.winnerscount);
            const backupWinners = shuffledParticipants.slice(targetGiveaway.winnerscount, targetGiveaway.winnerscount + targetGiveaway.backupWinnersCount);

            // Display the winners
            const winnerList = winners.map((winner, index) => `${index + 1}. <@${winner}>`).join('\n');

            // Check if there are backup winners before creating backupWinnerList
            let backupWinnerList = '';
            if (backupWinners.length > 0) {
                backupWinnerList = backupWinners.map((backupWinner, index) => `${index + 1}. <@${backupWinner}>`).join('\n');
            }

            await interaction.editReply('Giveaway finalized');

            // Send a public message with the winners and backup winners if there are any
            if (backupWinnerList) {
                await interaction.channel.send(`🎉 **Giveaway Winners:**\n${winnerList}\n\n🎉 **Backup Winners:**\n${backupWinnerList}`);
            } else {
                await interaction.channel.send(`🎉 **Giveaway Winners:**\n${winnerList}`);
            }
            break;
    }
}