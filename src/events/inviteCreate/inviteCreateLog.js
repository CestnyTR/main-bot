const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");

// Davet bağlantısı süresini takip etmek için bir nesne
const inviteExpiryTimes = {};

module.exports = async (invite) => {
    try {
        // Davet bağlantısının oluşturulduğu sunucunun logChannels belgesini bul
        const logChDB = await logChannels.findOne({ guildId: invite.guild.id });
        if (!logChDB || !logChDB.exist) return;
        // Davet bağlantısının başlangıç tarihini ve süresini belirle
        const now = Date.now();
        const expiryTime = now + (invite.maxAge * 1000); // maxAge saniye cinsinden olduğu için 1000 ile çarptık

        // Log kanalını bul ve mesaj gönder
        const channel = invite.guild.channels.cache.get(logChDB.inviteLog);
        if (!channel) return;

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle('Invite Created')
            .addFields(
                { name: 'Invite Code:', value: invite.code, inline: false },
                { name: 'inviter name:', value: `<@${invite.inviterId}>`, inline: true },
                { name: 'inviter id:', value: invite.inviterId, inline: true },
                { name: 'invite expires:', value: `${expiryTime}`, inline: true },

            )
            .setTimestamp()
            .setFooter({ text: "Invite Created System" });
        await channel.send({ embeds: [embed] });

        return;
    } catch (error) {
        console.log("Error Encountered in inviteCreateLog.js : ", error);
    }
};

