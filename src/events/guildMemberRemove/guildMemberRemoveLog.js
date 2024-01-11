const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");


module.exports = async (member) => {
    let logChDB = await logChSchema.findOne({ guildId: member.guild.id });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await member.guild.channels.cache.get(logChDB.leftLog);
    if (!channel) return;
    try {
        member.guild.fetchAuditLogs({
            type: AuditLogEvent.GuildMemberRemove,
        })
            .then(async audit => {
                if (member.user.bot) return;
                const name = member.user.tag;
                const id = member.user.id;
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setAuthor({ name: 'Member Left', iconURL: member.displayAvatarURL() })
                    .setDescription(`<@${id}> ${name}`)
                    .setTimestamp()
                return  await channel.send({ embeds: [embed] });
            })
    } catch (error) {
        console.log(error);
    }
};