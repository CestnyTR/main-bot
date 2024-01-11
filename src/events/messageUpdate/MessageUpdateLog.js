const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");


module.exports = async (oldMessage, newMessage, client) => {
    try {
        let logChDB = await logChSchema.findOne({ guildId: oldMessage.guildId });
        if (!logChDB) return;
        if (!logChDB.exist) return;
        const channel = await oldMessage.guild.channels.cache.get(logChDB.messageLog);
        if (!channel) return;

        oldMessage.guild.fetchAuditLogs({
            type: AuditLogEvent.MessageUpdate,
        })
            .then(async audit => {
                if (oldMessage.author.bot) return;
                const mes = oldMessage.content;
                if (!mes) return;
                if (oldMessage.content.includes('https://')) return;
                if (newMessage.content.includes('http://')) return;
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle('🌐 chat message updated ')
                    .addFields({ name: 'server name', value: `${oldMessage.guild.name}` })
                    .setDescription(`**Message sent by **<@${oldMessage.member.user.id}> \n**Edited in** <#${oldMessage.channel.id}> \n[Jump To Message](https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${newMessage.id})`)
                    .addFields({ name: 'Before message', value: `${oldMessage}` })
                    .addFields({ name: 'After Message', value: `${newMessage}` })
                    .addFields({ name: 'Command user', value: `${oldMessage.author.username} / ${oldMessage.author.id}` })
                    .setTimestamp()
                    .setFooter({ text: 'chat message updated used' });
                return channel.send({ embeds: [embed] });
            })




    } catch (error) {
        console.error(error);
    }
};