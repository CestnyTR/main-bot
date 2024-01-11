const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");


module.exports = async (guild, user) => {
    let logChDB = await logChSchema.findOne({ guildId: guild.guild.id });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await guild.guild.channels.cache.get(logChDB.banLog);
    if (!channel) return;
    try {
        const banLogs = await guild.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd });
        const banEntry = banLogs.entries.first();
        const executor = banEntry.executor;
        const name = banEntry.target.username;
        const id = banEntry.target.id;
        const img = banEntry.target.displayAvatarURL({ extension: 'jpg' })


        const embed = new EmbedBuilder()
            .setTitle('User Ban Removed')
            .setColor('Green')
            .setDescription(`The User: ${name} (\`${id}\`)`)
            .addFields({ name: 'Unbans from', value: `${executor.tag} (\`${executor.id}\`)` })
            .setImage(img);

        return await channel.send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
    }
};