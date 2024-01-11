const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const GuildConfiguration = require("../../models/GuildConfiguration")
const Suggestion = require("../../models/Suggestion");
const formatResults = require("../../utils/formatResults");
/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;

    const command = interaction.customId;
    if (command !== "suggestBtnId") return;
    const embed = new EmbedBuilder()

    const guildConfiguration = await GuildConfiguration.findOne({ guildId: interaction.guildId });
    if (!guildConfiguration?.suggestionChannelId) {
        await interaction.reply('This server has not been configure to use suggestions yet.\nAsk an admin to "/config-suggestions add" to set this up');
        return;
    }
    if (!guildConfiguration.suggestionChannelId.includes(interaction.channelId)) {
        await interaction.reply(
            `This Channel has not been configure to use suggestions.Try one of these channel instead: ${guildConfiguration.
                suggestionChannelId.map((id) => `<#${id}>`)
                .join(',')} `
        );
        return;
    }

    const modal = new ModalBuilder()
        .setTitle('create a suggestion')
        .setCustomId(`suggestion-${interaction.user.id}`);
    const textInput = new TextInputBuilder()
        .setCustomId('suggestion-input')
        .setLabel("what would you like to suggest ?")
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
        suggesstionMessage = await interaction.channel.send('Creating suggestion, please wait...');
    } catch (error) {
        modalInteraction.editReply('Failed to create suggestions message in this channel. I may not have enough permissions.')
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
    modalInteraction.editReply("Suggestion created");
    //! sugggestion embed
    embed
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ size: 256 }),
        })
        .addFields([
            { name: 'Suggestion', value: suggesstionText },
            { name: 'Status', value: '⏳ Pending' },
            { name: 'Votes', value: formatResults() }
        ])
        .setColor('Yellow');
    //! Buttons
    const upvoteButton = new ButtonBuilder()
        .setEmoji('👍🏼')
        .setLabel("Upvote")
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.upvote`)
    const downvoteButton = new ButtonBuilder()
        .setEmoji('👎🏼')
        .setLabel("Downvote")
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.downvote`)
    const approveButton = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel("Approve")
        .setStyle(ButtonStyle.Success)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.approve`)

    const rejectButton = new ButtonBuilder()
        .setEmoji("🗑")
        .setLabel("Reject")
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`suggestion.${newSuggestion.suggestionId}.reject`)

    //!Rows 
    const firstRow = new ActionRowBuilder().addComponents(upvoteButton, downvoteButton);
    const secondaRow = new ActionRowBuilder().addComponents(approveButton, rejectButton);

    suggesstionMessage.edit({
        content: `${interaction.user} Suggestion Created!`,
        embeds: [embed],
        components: [firstRow, secondaRow]
    })
    return;
}