const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");

module.exports = async (oldMember, newMember) => {

    try {
        const logChDB = await logChannels.findOne({ guildId: oldMember.guild.id });
        if (!logChDB || !logChDB.exist) return;
        const channel = oldMember.guild.channels.cache.get(logChDB.userLog);

        // Kullanıcı isim değiştirdiğinde
        if (oldMember.displayName !== newMember.displayName) {

            const nameChangeLog = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Member Update System')
                .addFields(
                    { name: 'Old Name :', value: `${oldMember.displayName}`, inline: true },
                    { name: 'New Name:', value: `${newMember.displayName}`, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: 'Member Update System' });
            // Log kanalını belirleyin, 'log-kanal-id' yerine kendi log kanalınızın ID'sini ekleyin.
            return await channel.send({ embeds: [nameChangeLog] });
        }

    } catch (error) {
        console.error('Error handling guildMemberAdd event:', error);
    }
};