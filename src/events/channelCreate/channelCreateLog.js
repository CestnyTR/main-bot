const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData
module.exports = async (channel) => {
    let logChDB = await logChSchema.findOne({ guildId: channel.guildId });
    if (!logChDB || !logChDB.exist) return;

    const ch = await channel.guild.channels.cache.get(logChDB.voiceLog);
    if (!ch) return;

    const name = channel.name;
    const id = channel.id;

    // Dil servisini kullanarak dil dosyasını yüklüyoruz
    langData = await LanguageService.getLocalizedString(channel.guildId, 'events');
    langData = langData.channelCreate

    const embed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: langData.title, iconURL: channel.guild.iconURL({ dynamic: true }) })
        .setDescription(langData.description.replace('{{id}}', id).replace('{{name}}', name))
        .setTimestamp()
        .setFooter({ text: langData.footer.replace('{{id}}', id) });

    return ch.send({ embeds: [embed] });
};
