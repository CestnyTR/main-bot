const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData
module.exports = async (oldMember, newMember, client) => {
    getExistingGuildIds().then(async (guildIds) => {
        for (const guildId of guildIds) {
            const logChDB = await logChannels.findOne({ guildId });
            if (!logChDB || !logChDB.exist) continue;

            // Sunucu kanalını bulma
            const channel = client.channels.cache.get(logChDB.userLog);
            if (!channel) return;

            // Eğer kullanıcının avatarı değiştiyse
            if (oldMember.avatar !== newMember.avatar) {
                langData = await LanguageService.getLocalizedString(guildId, 'userUpdateLog');

                const oldImg = oldMember.displayAvatarURL({ format: 'jpg', dynamic: true });
                const newImg = newMember.displayAvatarURL({ format: 'jpg', dynamic: true, });

                const avatarChangeLog = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle(langData.title)
                    .setDescription(langData.desc.replace("{{newMember.username}}", newMember.username))
                    .addFields(
                        { name: langData.oldAvatar, value: langData.before.replace("{{oldImg}}", oldImg), inline: true },
                        { name: '>', value: `>`, inline: true },
                        { name: langData.newAvatar, value: langData.after.replace("{{newImg}}", newImg), inline: true },
                    )
                    .setThumbnail(newImg)
                    .setTimestamp();

                channel.send({ embeds: [avatarChangeLog] });
            }
        }
    });
};


async function getExistingGuildIds() {
    try {
        // 'exist' alanı true olan bütün sunucuların 'guildId'lerini filtrele
        const existingGuilds = await logChannels.find({ exist: true }).distinct('guildId');

        return existingGuilds;
    } catch (error) {
        console.error('Sunucu ID\'leri alınırken bir hata oluştu:', error);
        return [];
    }
}
