const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData
module.exports = async (channel) => {
    try {
        let logChDB = await logChSchema.findOne({ guildId: channel.guildId });
        if (!logChDB || !logChDB.exist) return;

        const ch = await channel.guild.channels.cache.get(logChDB.voiceLog);
        if (!ch) return;

        // Dil servisini kullanarak dil dosyasını yüklüyoruz
        langData = await LanguageService.getLocalizedString(channel.guild.id, 'events');
        langData = langData.channelDelete

        const name = channel.name;
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setAuthor({ name: langData.title, iconURL: channel.guild.iconURL({ dynamic: true }) })
            .setDescription(langData.description.replace('{{name}}', name))
            .setTimestamp()
            .setFooter({ text: langData.footer.replace('{{id}}', channel.id) });

        return ch.send({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
};
