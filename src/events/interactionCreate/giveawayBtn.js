const { Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, } = require("discord.js");
const ms = require('ms');
const giveawaySystemSchema = require("../../models/giveawaySys")
const giveawaySchema = require("../../models/giveaway");

/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;
    const command = interaction.customId;
    if (command !== "giveawayBtnId") return;
    const embed = new EmbedBuilder()
    const giveawayModal = new ModalBuilder()
        .setCustomId(`giveawayModalId-${interaction.user.id}`) // Çekiliş ID'sini kullanarak benzersiz bir customId oluştur
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
    const filter = (i) => i.customId === `giveawayModalId-${interaction.user.id}`;
    const modalInteraction = await interaction.awaitModalSubmit({
        filter,
        time: 1000 * 60 * 3,
    }).catch((error) => console.log(error));

    await modalInteraction.deferReply({ ephemeral: true })

    const prizeText = modalInteraction.fields.getTextInputValue('prizeId');
    const winnersCount = modalInteraction.fields.getTextInputValue('winnersCountId');
    const backupWinnersCount = modalInteraction.fields.getTextInputValue('backupWinnersCountId');
    // Validate winnersCount and backupWinnersCount
    if (isNaN(winnersCount) || isNaN(backupWinnersCount)) {
        await modalInteraction.editReply('Please enter valid numeric values for Winners Count and Backup Winners Count.');
        return;
    }
    const time = modalInteraction.fields.getTextInputValue('endDateId');
    // Validate the time input
    const durationInMilliseconds = ms(time);
    if (isNaN(durationInMilliseconds)) {
        await modalInteraction.editReply('Please enter a valid duration (e.g., "30m", "1h", "1d").');
        return;
    }
    let giveawayMessage;
    try {
        giveawayMessage = await interaction.channel.send('Creating giveaway, please wait...');
    } catch (error) {
        modalInteraction.editReply('Failed to create giveaway message in this channel. I may not have enough permissions.')
        return;
    }
    const newGiveAway = new giveawaySchema({
        authorId: interaction.user.id,
        guildId: interaction.guildId,
        messageId: giveawayMessage.id,
        prize: prizeText,
        winnerscount: winnersCount,
        backupWinnersCount: backupWinnersCount,
    })
    await newGiveAway.save();
    modalInteraction.editReply("Giveaway created");
    //! giveaway embed
    embed
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ size: 256 }),
        })
        .addFields([
            { name: 'GiveAway', value: prizeText },
            { name: 'Status', value: '⏳ Pending' , inline: false},
            { name: 'Giveaway entries ', value: "0", inline: false },
            { name: 'Winners count ', value: winnersCount , inline: true},
            { name: 'Backup Winners count ', value: backupWinnersCount, inline: true },
            { name: 'Giveaway duration', value: time, inline: true }


        ])
        .setColor('Yellow');
    //! Buttons
    const closeGiveawayBtn = new ButtonBuilder()
        .setEmoji("🔒")
        .setLabel('Close Giveaway')
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.close`);
    const doAGiveawayBtn = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel('do a  Giveaway')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.do`);
    const joinGiveawayBtn = new ButtonBuilder()
        .setEmoji("✅")
        .setLabel('join Giveaway')
        .setStyle(ButtonStyle.Success)
        .setCustomId(`giveaway.${newGiveAway.giveawayId}.join`);
    const firstRow = new ActionRowBuilder().addComponents(joinGiveawayBtn,);
    const secondaRow = new ActionRowBuilder().addComponents(doAGiveawayBtn, closeGiveawayBtn,);

    giveawayMessage.edit({
        content: `${interaction.user} giveaway Created!`,
        embeds: [embed],
        components: [firstRow, secondaRow]
    })
    return;
}