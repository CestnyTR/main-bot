const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const GuildConfiguration = require("../../models/GuildConfiguration")
const Suggestion = require("../../models/Suggestion");
const formatResults = require("../../utils/formatResults");
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData
/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;

    const command = interaction.customId;
    if (command !== "suggestBtnId") return;

    langData = await LanguageService.getLocalizedString(interaction.guildId, "suggestBtn");

    const embed = new EmbedBuilder()
    const modal = new ModalBuilder()
        .setTitle(langData.modalTitle)
        .setCustomId(`suggestion-${interaction.user.id}`);
    const textInput = new TextInputBuilder()
        .setCustomId('suggestion-input')
        .setLabel(langData.textInputLabel)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true)
        .setMaxLength(1000);
    const actionRow = new ActionRowBuilder().addComponents(textInput);
    modal.addComponents(actionRow);
    await interaction.showModal(modal);

    const filter = (i) => i.customId === `suggestion-${interaction.user.id}`;
    const modalInteraction = await interaction.awaitModalSubmit({
        filter,
        time: 1000 * 60 * 3,
    }).catch((error) => console.log(error));
    await modalInteraction.deferReply({ ephemeral: true })
    let suggesstionMessage;
    try {
        suggesstionMessage = await interaction.channel.send(langData.creatingSuggest);
    } catch (error) {
        modalInteraction.editReply(langData.failedToCreateSuggest)
        return;
    }
    const suggesstionText = modalInteraction.fields.getTextInputValue('suggestion-input');
    const newSuggestion = new Suggestion({
        authorId: interaction.user.id,
        guildId: interaction.guildId,
        messageId: suggesstionMessage.id,
        content: suggesstionText,
    })
    await newSuggestion.save();
    modalInteraction.editReply(langData.successCreateSuggest);
    //! sugggestion embed
    embed
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ size: 256 }),
        })
        .addFields([
            { name: langData.embeds.suggest, value: suggesstionText },
            { name: langData.embeds.status, value: langData.embeds.statusValue },
            { name: langData.embeds.votes, value: formatResults() }
        ])
        .setColor('Yellow');
    //! Buttons
    const upvoteButton = new ButtonBuilder()
        .setEmoji('👍🏼')
        .setLabel(langData.upvote)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.upvote`)
    const downvoteButton = new ButtonBuilder()
        .setEmoji('👎🏼')
        .setLabel(langData.downvote)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.downvote`)
    const approveButton = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel(langData.approve)
        .setStyle(ButtonStyle.Success)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.approve`)

    const rejectButton = new ButtonBuilder()
        .setEmoji("🗑")
        .setLabel(langData.reject)
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.reject`)

    //!Rows 
    const firstRow = new ActionRowBuilder().addComponents(upvoteButton, downvoteButton);
    const secondaRow = new ActionRowBuilder().addComponents(approveButton, rejectButton);

    suggesstionMessage.edit({
        content: langData.created.replace("{{interaction.user}}", interaction.user),
        embeds: [embed],
        components: [firstRow, secondaRow]
    })
    return;
}