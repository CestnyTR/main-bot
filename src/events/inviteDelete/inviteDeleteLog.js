const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");

module.exports = async (invite, client) => {
    try {
        const guild = await client.guilds.fetch(invite.guild.id);

        if (guild) {
            const invites = await guild.invites.fetch();
            console.log('Sunucunun güncel davet bağlantıları:');

            invites.forEach((currentInvite) => {
                console.log(`- Kod: ${currentInvite.code}, Kullanıldı: ${currentInvite.uses}, Oluşturan: ${currentInvite.inviter ? currentInvite.inviter.tag : 'Bilinmiyor'}`);
            });
        } else {
            console.error('Sunucu bulunamadı.');
        }
    } catch (error) {
        console.error('Error handling inviteDelete event:', error);
    }
};
