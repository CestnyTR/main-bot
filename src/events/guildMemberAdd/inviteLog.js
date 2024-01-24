const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
const LanguageService = require('../../utils/LanguageService');
let langData
module.exports = async (member) => {
    // Üyenin sunucuya katıldığı sırada mevcut davet bağlantılarını çek
    let logChDB = await logChannels.findOne({ guildId: member.guild.id });

    if (!logChDB && !logChDB.exist) return;

    console.log(member);

    const channel = member.guild.channels.cache.get(logChDB.joinLog);// LOG_KANAL_ID'yi kendi log kanalınızın ID'si ile değiştirin
    if (!channel) return;
    langData = await LanguageService.getLocalizedString(member.guild.id, 'events');
    langData = langData.memberJoinLog
    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(langData.title)
        .addFields(
            { name: langData.member, value: `<@${member.id}>`, inline: true },
            { name: langData.bot, value: member.bot === false ? langData.true : langData.false, inline: true },
            { name: langData.joinDate, value: member.joinedAt.toLocaleString(), inline: true }, // Katılma tarihi
            { name: langData.creationDate, value: member.user.createdAt.toLocaleString(), inline: true }, // Hesap oluşturulma tarihi
            { name: langData.accountAge, value: calculateAccountAge(member.user.createdAt), inline: true }, // Hesap yaşı (fonksiyon kullanılarak hesaplanıyor)
        )
        .setTimestamp()
        .setFooter({ text: langData.footer });
    channel.send({ embeds: [embed] });
};

// Hesap yaşını hesaplamak için yardımcı bir fonksiyon
function calculateAccountAge(creationDate) {
    const now = new Date();
    const accountAge = now - creationDate;
    const days = Math.floor(accountAge / (1000 * 60 * 60 * 24));
    return `${days} gün`;
}