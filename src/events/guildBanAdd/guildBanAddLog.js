const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");


module.exports = async (guild, user) => {
    const guildId=guild.guild.id;
    let logChDB = await logChSchema.findOne({ guildId: guildId});
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await guild.guild.channels.cache.get(logChDB.banLog);
    if (!channel) return;
    const banLogs = await guild.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanAdd });
    const banEntry = banLogs.entries.first();
    const executor = banEntry.executor;
    const name = banEntry.target.username;
    const id = banEntry.target.id;
    const img = banEntry.target.displayAvatarURL({ extension: 'jpg' })
    const langData = await LanguageService.getLocalizedString(guildId, 'userBanned');

    const embed = new EmbedBuilder()
        .setTitle(langData.title)
        .setColor("Red")
        .setDescription(langData.description
            .replace('{{username}}', name)
            .replace('{{userID}}', id))
        .addFields({ name: langData.bannedBy, value: `${executor.tag} (\`${executor.id}\`)` })
        .addFields({ name: langData.reason, value: `${banEntry.reason || langData.noReason}` })
        .setImage(img);

    await channel.send({ embeds: [embed] });
}