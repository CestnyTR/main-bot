const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData
module.exports = async (invite) => {
    // Davet bağlantısının oluşturulduğu sunucunun logChannels belgesini bul
    const logChDB = await logChannels.findOne({ guildId: invite.guild.id });
    if (!logChDB || !logChDB.exist) return;
    // Davet bağlantısının başlangıç tarihini ve süresini belirle
    const now = Date.now();
    const expiryTime = now + (invite.maxAge * 1000); // maxAge saniye cinsinden olduğu için 1000 ile çarptık

    // Log kanalını bul ve mesaj gönder
    const channel = invite.guild.channels.cache.get(logChDB.inviteLog);
    if (!channel) return;
    langData = await LanguageService.getLocalizedString(invite.guild.id, "events");
    langData = langData.inviteCreateLog
    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(langData.title)
        .addFields(
            { name: langData.code, value: invite.code, inline: false },
            { name: langData.name, value: `<@${invite.inviterId}>`, inline: true },
            { name: langData.id, value: invite.inviterId, inline: true },
            { name: langData.expires, value: `${expiryTime}`, inline: true },

        )
        .setTimestamp()
        .setFooter({ text: langData.footer });
    await channel.send({ embeds: [embed] });

    return;

};

