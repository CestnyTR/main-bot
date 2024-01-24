// selectLang.js
const { Interaction } = require("discord.js");
const langDb = require('../../models/lang');

/**
 *
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu() || !interaction.customId) return;
    if (interaction.customId !== "language_select_menu") return;

    // Dil veritabanında güncelle
    await langDb.findOneAndUpdate({ guildId: interaction.guildId }, { language: interaction.values[0] });
    let lang = "English"
    if (interaction.values[0] == "tr") lang = "Türkçe"

    await interaction.reply({ content: `Language preference set to: **${lang}**`, ephemeral: true });

}
