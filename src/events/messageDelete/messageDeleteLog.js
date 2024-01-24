const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData

module.exports = async (message, member) => {
    if (message.author.bot) return;
    let logChDB = await logChSchema.findOne({ guildId: message.guildId });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await message.guild.channels.cache.get(logChDB.messageLog);
    if (!channel) return;
    const mes = message.content;
    if (!mes) return;
    langData = await LanguageService.getLocalizedString(message.guild.id, 'events');
    langData = langData.messageDeleteLog
    const embed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: `${message.member.user.tag}`, iconURL: message.member.displayAvatarURL() })
        .setDescription(langData.desc
            .replace("{{message.member.user.id}}", message.member.user.id)
            .replace("{{message.channel.id}}", message.channel.id)
            .replace("{{mes}}", mes))
        .setImage(message.attachments.first()?.url || null)
        .setTimestamp()
        .setFooter({ text: langData.footer.replace("{{message.id}}", message.id) });
    return channel.send({ embeds: [embed] });

};