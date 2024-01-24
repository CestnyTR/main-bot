const { Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ms = require('ms');
const giveawaySchema = require("../../models/giveaway");
const LanguageService = require("../../utils/LanguageService");

/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;
    const command = interaction.customId;
    if (command !== "giveawayBtnId") return;

    const langData = await LanguageService.getLocalizedString(interaction.guildId, "giveawayBtn");

    const embed = new EmbedBuilder();
    const giveawayModal = new ModalBuilder()
        .setCustomId(`giveawayModalId-${interaction.user.id}`)
        .setTitle(langData.startGiveaway);

    const prizeInput = new TextInputBuilder()
        .setCustomId("prizeId")
        .setLabel(langData.prizeLabel)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(langData.prizePlaceholder)
        .setMinLength(3)
        .setMaxLength(25)
        .setRequired(true);

    const winnersCountInput = new TextInputBuilder()
        .setCustomId("winnersCountId")
        .setLabel(langData.winnersCountLabel)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(langData.winnersCountPlaceholder)
        .setMinLength(1)
        .setMaxLength(2)
        .setRequired(true);

    const backupWinnersCountInput = new TextInputBuilder()
        .setCustomId("backupWinnersCountId")
        .setLabel(langData.backupWinnersCountLabel)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(langData.backupWinnersCountPlaceholder)
        .setMinLength(1)
        .setMaxLength(3)
        .setRequired(true);

    const endDateCountInput = new TextInputBuilder()
        .setCustomId("endDateId")
        .setLabel(langData.endDateLabel)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder(langData.endDatePlaceholder)
        .setMinLength(1)
        .setMaxLength(10)
        .setRequired(true);

    const prizeInputRow = new ActionRowBuilder().addComponents(prizeInput);
    const winnersCountInputRow = new ActionRowBuilder().addComponents(winnersCountInput);
    const backupWinnersCountInputRow = new ActionRowBuilder().addComponents(backupWinnersCountInput);
    const endDateCountInputRow = new ActionRowBuilder().addComponents(endDateCountInput);

    giveawayModal.addComponents(prizeInputRow, winnersCountInputRow, backupWinnersCountInputRow, endDateCountInputRow);
    await interaction.showModal(giveawayModal);

    const filter = (i) => i.customId === `giveawayModalId-${interaction.user.id}`;
    const modalInteraction = await interaction.awaitModalSubmit({
        filter,
        time: 1000 * 60 * 3,
    }).catch((error) => console.log(error));

    await modalInteraction.deferReply({ ephemeral: true });

    const prizeText = modalInteraction.fields.getTextInputValue('prizeId');
    const winnersCount = modalInteraction.fields.getTextInputValue('winnersCountId');
    const backupWinnersCount = modalInteraction.fields.getTextInputValue('backupWinnersCountId');

    if (isNaN(winnersCount) || isNaN(backupWinnersCount)) {
        await modalInteraction.editReply(langData.invalidNumericValues);
        return;
    }

    const time = modalInteraction.fields.getTextInputValue('endDateId');
    const durationInMilliseconds = ms(time);

    if (isNaN(durationInMilliseconds)) {
        await modalInteraction.editReply(langData.invalidDuration);
        return;
    }

    let giveawayMessage;

    try {
        giveawayMessage = await interaction.channel.send(langData.creatingGiveaway);
    } catch (error) {
        modalInteraction.editReply(langData.failedToCreateGiveaway);
        return;
    }

    const newGiveAway = new giveawaySchema({
        authorId: interaction.user.id,
        guildId: interaction.guildId,
        messageId: giveawayMessage.id,
        prize: prizeText,
        winnerscount: winnersCount,
        backupWinnersCount: backupWinnersCount,
    });

    await newGiveAway.save();
    modalInteraction.editReply(langData.giveawayCreated.replace("{{user}}", interaction.user));

    embed
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ size: 256 }),
        })
        .addFields([
            { name: langData.giveaway, value: prizeText },
            { name: langData.status, value: '⏳ ' + langData.pending, inline: false },
            { name: langData.giveawayEntries, value: "0", inline: false },
            { name: langData.winnersCount, value: winnersCount, inline: true },
            { name: langData.backupWinnersCount, value: backupWinnersCount, inline: true },
            { name: langData.giveawayDuration, value: time, inline: true }
        ])
        .setColor('Yellow');

    const closeGiveawayBtn = new ButtonBuilder()
        .setEmoji("🔒")
        .setLabel(langData.closeGiveaway)
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.close`);

    const doAGiveawayBtn = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel(langData.doAGiveaway)
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.do`);

    const joinGiveawayBtn = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel(langData.joinGiveaway)
        .setStyle(ButtonStyle.Success)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.join`);

    const firstRow = new ActionRowBuilder().addComponents(joinGiveawayBtn);
    const secondRow = new ActionRowBuilder().addComponents(doAGiveawayBtn, closeGiveawayBtn);

    giveawayMessage.edit({
        content: langData.giveawayCreated.replace("{{user}}", interaction.user),
        embeds: [embed],
        components: [firstRow, secondRow]
    });

    return;
};
