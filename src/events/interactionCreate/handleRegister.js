const { Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const AutoRole = require('../../models/AutoRole');
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData
/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isButton() || !interaction.customId) return;

    const command = interaction.customId;
    if (command !== "register") return;

    let guild = interaction.guild;
    const autoRole = await AutoRole.findOne({ guildId: guild.id });
    if (!autoRole) return;
    langData = await LanguageService.getLocalizedString(interaction.guildId, "register");

    const registerRole = interaction.guild.roles.cache.get(autoRole.roleId);
    const hasRole = interaction.member.roles.cache.has(registerRole.id);
    if (!hasRole) return interaction.reply({
        content: langData.alreadySigned,
        ephemeral: true,
    });

    const modal = createRegisterModal(interaction.member);
    await interaction.showModal(modal);

    const filter = (i) => i.customId === `register_${interaction.member}`;
    const modalInteraction = await interaction.awaitModalSubmit({
        filter,
        time: 1000 * 60 * 3,
    }).catch((error) => console.log(error));

    await modalInteraction.reply({
        content: langData.creatingName,
        ephemeral: true,
    });

    const memberName = modalInteraction.fields.getTextInputValue('member-name');
    const memberAge = modalInteraction.fields.getTextInputValue('member-age');
    const userName = `${memberName} || ${memberAge}`;

    interaction.member.setNickname(userName)
        .then((newUserName) => {
            modalInteraction.editReply(langData.usernameChanged.replace("{{newUserName}}", newUserName));
            interaction.member.roles.remove(registerRole);
        })
        .catch((error) => {
            modalInteraction.editReply(langData.usernameChangeError.replace("{{error}}", error));
            return;
        });
};

function createRegisterModal(member) {
    const modal = new ModalBuilder()
        .setTitle(langData.modalTitle.replace("{{guildName}}", member.guild.name))
        .setCustomId(`register_${member}`);

    const nameTextInput = createTextInput('member-name', langData.realNameLabel, 'Fahri', 50);
    const ageTextInput = createTextInput('member-age', langData.ageLabel, '25', 2);

    const nameActionRow = createActionRow(nameTextInput);
    const ageActionRow = createActionRow(ageTextInput);

    modal.addComponents(nameActionRow, ageActionRow);
    return modal;
}

function createTextInput(customId, label, placeholder, maxLength) {
    return new TextInputBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setPlaceholder(placeholder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true)
        .setMaxLength(maxLength);
}

function createActionRow(component) {
    return new ActionRowBuilder().addComponents(component);
}
