const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
module.exports = async (member) => {
    // Üyenin sunucuya katıldığı sırada mevcut davet bağlantılarını çek
    const invites = await member.guild.invites.fetch();
    let logChDB = await logChannels.findOne({ guildId: member.guild.id });
    if (!logChDB && !logChDB.exist) return;
    // Üyenin katıldığı sırada kullanılan davet bağlantısını bul
    const inviteUsed = invites.find(invite => invite.uses < invite.uses + 1);
    // Davet edenin bilgilerini kontrol et
    if (!inviteUsed) return console.log(`Üye ${member.user.tag}, herhangi bir davet bağlantısı ile katıldı.`);
    const channel = member.guild.channels.cache.get(logChDB.joinLog);// LOG_KANAL_ID'yi kendi log kanalınızın ID'si ile değiştirin
    if (!channel) return;
    const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('Member Joined via Invite')
        .addFields(
            { name: 'Member:', value: `<@${member.id}>`, inline: true },
            { name: 'Invite Code:', value: inviteUsed.code, inline: true },
            { name: 'Inviter:', value: `<@${inviteUsed.inviter.id}>`, inline: true },
            { name: 'Invites Used:', value: inviteUsed.uses.toString(), inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Member Join System' });
    await channel.send({ embeds: [embed] });
};
