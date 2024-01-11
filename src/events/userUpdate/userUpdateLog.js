const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");

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
                const oldImg = oldMember.displayAvatarURL({ format: 'jpg', dynamic: true });
                const newImg = newMember.displayAvatarURL({ format: 'jpg', dynamic: true, });

                const avatarChangeLog = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle('Kullanıcı Avatar Değiştirdi')
                    .setDescription(`${newMember.username} avatarını değiştirdi.`)
                    .addFields(
                        { name: 'Old avatar', value: `[before](${oldImg}) `, inline: true },
                        { name: '>', value: `>`, inline: true },
                        { name: 'New avatar', value: `[after](${newImg})`, inline: true },
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
