const { Interaction } = require("discord.js");
const Suggestion = require("../../models/Suggestion");
const formatResults = require("../../utils/formatResults");
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData

/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;
    const [type, suggestionId, action] = interaction.customId.split('.');

    if (type !== 'suggestion') return;
    langData = await LanguageService.getLocalizedString(interaction.guildId, "suggestHandler");

    await interaction.deferReply({ ephemeral: true });

    const targetSuggestion = await Suggestion.findOne({ suggestionId });
    const targetMessage = await interaction.channel.messages.fetch(targetSuggestion.messageId);
    const targetMessageEmbed = targetMessage.embeds[0];
    if (action === 'approve') {
        if (!interaction.memberPermissions.has('Administrator')) {
            await interaction.editReply(langData.approvePermissionError)
            return;
        }
        targetSuggestion.status = 'approved';
        targetMessageEmbed.data.color = 0x84e660;
        targetMessageEmbed.fields[1].value = langData.approve;

        await targetSuggestion.save();

        interaction.editReply(langData.approveSuccess);
        targetMessage.edit({
            embeds: [targetMessageEmbed],
            components: [],
        })
        return;
    }
    if (action === 'reject') {
        if (!interaction.memberPermissions.has('Administrator')) {
            await interaction.editReply(langData.rejectPermissionError);
            return;
        }
        targetSuggestion.status = 'rejected';
        targetMessageEmbed.data.color = 0xff6161;
        targetMessageEmbed.fields[1].value = langData.reject;

        await targetSuggestion.save();
        interaction.editReply(langData.rejectSuccess)
        targetMessage.edit({
            embeds: [targetMessageEmbed],
            components: [],
        })
        return;
    }
    const hasVoted = targetSuggestion.upvotes.includes(interaction.user.id) || targetSuggestion.downvotes.includes(interaction.user.id);

    if (action === 'upvote') {
        if (hasVoted) {
            await interaction.editReply(langData.alreadyVotedError)
            return;
        }
        targetSuggestion.upvotes.push(interaction.user.id);
        await targetSuggestion.save();
        interaction.editReply(langData.upvoteSuccess)
        targetMessageEmbed.fields[2].value = formatResults(
            targetSuggestion.upvotes,
            targetSuggestion.downvotes,
        );
        targetMessage.edit({
            embeds: [targetMessageEmbed]
        })
        return;
    }
    if (action === 'downvote') {
        if (hasVoted) {
            await interaction.editReply(langData.alreadyVotedError)
            return;
        }
        targetSuggestion.downvotes.push(interaction.user.id);
        await targetSuggestion.save();
        interaction.editReply(upvoteSuccess.downvoteSuccess)
        targetMessageEmbed.fields[2].value = formatResults(
            targetSuggestion.upvotes,
            targetSuggestion.downvotes,
        );
        targetMessage.edit({
            embeds: [targetMessageEmbed]
        })
        return;
    }
}