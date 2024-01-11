const { Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const AutoRole = require('../../models/AutoRole');

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

        const registerRole = interaction.guild.roles.cache.get(autoRole.roleId);
        const hasRole = interaction.member.roles.cache.has(registerRole.id);
        if (!hasRole) return interaction.reply({
            content: "You already singed our server",
            ephemeral: true,
        });
        const modal = new ModalBuilder()
            .setTitle(`REGISTER "${guild}" SERVER`)
            .setCustomId(`register_${interaction.member}`);
        const nameTextInput = new TextInputBuilder()
            .setCustomId('member-name')
            .setLabel("Whats your real name?")
            .setPlaceholder("Fahri")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(50);
        const ageTextInput2 = new TextInputBuilder()
            .setCustomId('member-age')
            .setLabel("how old are you age?")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("25")
            .setRequired(true)
            .setMaxLength(2);

        const nameActionRow = new ActionRowBuilder().addComponents(nameTextInput);
        const ageActionRow = new ActionRowBuilder().addComponents(ageTextInput2);
        modal.addComponents(nameActionRow, ageActionRow);
        await interaction.showModal(modal);
        const filter = (i) => i.customId === `register_${interaction.member}`;

        const modalInteraction = await interaction.awaitModalSubmit({
            filter,
            time: 1000 * 60 * 3,
        }).catch((error) => console.log(error));

            await modalInteraction.deferReply({
                content: 'Creating new a name ,please wait...',
                ephemeral: true,
            })
            const memberName = modalInteraction.fields.getTextInputValue('member-name');
            const memberage = modalInteraction.fields.getTextInputValue('member-age');
            const userName=memberName + " || " + memberage;
            interaction.member.setNickname(userName)
            .then(userName => {
                modalInteraction.editReply(`Kullanıcı adı değiştirildi: ${userName}`);
                interaction.member.roles.remove(registerRole);
            }).catch(error => {
                modalInteraction.editReply('Kullanıcı adı değiştirme hatası:', error);
                return;

            });

}