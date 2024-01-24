const { Interaction, EmbedBuilder } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData
/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    if (!interaction.inGuild()) return;
    if (!interaction.isCommand()) return;
    let logChDB = await logChSchema.findOne({ guildId: interaction.guildId });
    if (!logChDB || !logChDB.exist) return;
    const channel = await interaction.guild.channels.cache.get(logChDB.commandLog);
    if (!channel) return;
    langData = await LanguageService.getLocalizedString(interaction.guildId, 'events');
    langData = langData.commandLog
    const server = interaction.guild.name;
    const user = interaction.user.username;
    const userID = interaction.user.id;

    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(langData.title)
        .addFields({ name: langData.serverName, value: `${server}` })
        .addFields({ name: langData.chatCommand, value: `${interaction}` })
        .addFields({ name: langData.commandUser, value: `${user} / ${userID}` })
        .setTimestamp()
        .setFooter({ text: langData.footer });

    await channel.send({ embeds: [embed] });
}