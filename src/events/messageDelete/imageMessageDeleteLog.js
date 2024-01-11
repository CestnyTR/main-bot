const { EmbedBuilder ,AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");


module.exports = async (message, member) => {

    let logChDB = await logChSchema.findOne({ guildId: message.guildId });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await message.guild.channels.cache.get(logChDB.messageLog);
    if (!channel) return;
    try {


        message.guild.fetchAuditLogs({
            type: AuditLogEvent.MessageDelete,
        }).then(async audit => {
            if (message.author.bot) return;
            const mes = message.attachments.first()?.url;
            if (!mes) return;
            if (message.content.length >= 1) return;
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: `${message.member.user.tag}`, iconURL: message.member.displayAvatarURL() })
                .setDescription(`**Image sent by **<@${message.member.user.id}> **Deleted in** <#${message.channel.id}>`)
                .setImage(mes)
                .setTimestamp()
                .setFooter({ text: `Message ID: ${message.id}` });
            return channel.send({ embeds: [embed] });
        })
    } catch (error) {
console.log(error);
    }


};