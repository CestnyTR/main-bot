const { Message, EmbedBuilder } = require("discord.js")
const LanguageService = require("../../utils/LanguageService");
let langData

// Spam engelleme için gerekli ayarlar
const spamDetectionThreshold = 3; // Belirli bir süre içinde kaç mesajın spam sayılacağı
const spamDetectionInterval = 2000; // Spam algılama süresi (milisaniye cinsinden)
const timeOut = 30_000; // Spam algılama süresi (milisaniye cinsinden)
const deleteMessageCount = 30; // Silinecek mesaj sayısı algılama süresi (milisaniye cinsinden)

// Kullanıcıların mesajlarını takip etmek için bir harita
const userMessages = new Map();
/**
 * @param {import { "discord.js"}.Message;} message
 */
module.exports = async (message) => {
    // Botun kendi mesajlarına yanıt vermemesi için kontrol
    if (message.author.bot || message.member.permissions.has('Administrator')) return;
    langData = await LanguageService.getLocalizedString(message.guild.id, 'antiSpam');

    // Kullanıcının kimliği
    const userId = message.author.id;

    // Kullanıcının daha önce gönderdiği mesajları takip et
    const userMessageCount = userMessages.get(userId) || 0;
    userMessages.set(userId, userMessageCount + 1);
    const antiSpamEmbed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: langData.title })
        .setDescription(langData.desc)
        .setTimestamp()
    // Belirlenen süre içinde kullanıcının gönderdiği mesaj sayısı eşik değerini geçerse
    if (userMessageCount >= spamDetectionThreshold) {
        // Kullanıcının bütün mesajlarını sil
        const userMessages = await message.channel.messages.fetch({ limit: deleteMessageCount });
        const userMessagesToDelete = userMessages.filter(msg => msg.author.id === userId);

        if (userMessagesToDelete.size > 1) {
            await message.channel.bulkDelete(userMessagesToDelete, true);
        }
        // Spam olarak işaretle ve kullanıcıya 30 saniyeliğine konuşma cezası ver
        message.author.send({ embeds: [antiSpamEmbed], ephermeral: true })
        const targetUser = await message.guild.members.fetch(userId);
        await targetUser.timeout(timeOut, langData.reason);

        // İsterseniz burada ek bir eylem de gerçekleştirebilirsiniz.
    }
    // Belirtilen süre içinde kullanıcının gönderdiği mesajları sıfırla
    setTimeout(() => {
        userMessages.set(userId, 0);
    }, spamDetectionInterval);
}
