const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");


module.exports = async (channel) => {

    let logChDB = await logChSchema.findOne({ guildId: channel.guildId });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const ch = await channel.guild.channels.cache.get(logChDB.voiceLog);
    if (!ch) return;

    try {
        channel.guild.fetchAuditLogs({
            type: AuditLogEvent.ChannelDelete,
        })
            .then(async audit => {
                const name = channel.name;
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setAuthor({ name: `Channel Deleted`, iconURL: channel.guild.iconURL({ dynamic: true }) })
                    .setDescription(`Deleted Channel Name: **${name}**`)
                    .setTimestamp()
                    .setFooter({ text: `Channel ID: ${channel.id}` })
                return ch.send({ embeds: [embed] });
            })
    } catch (error) {
        console.log(error);
    }
};