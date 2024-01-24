const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");

module.exports = async (guild, user) => {
    const guildId=guild.guild.id;

    let logChDB = await logChSchema.findOne({ guildId:guildId });
    if (!logChDB) return;
    if (!logChDB.exist) return;

    const channel = await guild.guild.channels.cache.get(logChDB.banLog);
    if (!channel) return;

    const banLogs = await guild.guild.fetchAuditLogs({ type: AuditLogEvent.MemberBanRemove });
    const banEntry = banLogs.entries.find(entry => entry.target.id === user.id);
    const langData = await LanguageService.getLocalizedString(guildId, 'userUnbanned');

    if (banEntry) {

        const executor = banEntry.executor;
        const username = user.username;
        const userID = user.id;
        const img = user.displayAvatarURL({ extension: 'jpg' });

        // Dil dosyasını yükle

        const embed = new EmbedBuilder()
            .setTitle(langData.title)
            .setColor(langData.color)
            .setDescription(langData.description.replace('{{username}}', username).replace('{{userID}}', userID))
            .addFields({ name: langData.unbannedFrom, value: `${executor.tag} (\`${executor.id}\`)` })
            .setImage(img);

        await channel.send({ embeds: [embed] });
    } else {

        // Eğer yasak kaldırma kaydı bulunamazsa
        const embed = new EmbedBuilder()
            .setTitle(langData.title)
            .setColor(langData.color)
            .setDescription(langData.noBanLog);

        await channel.send({ embeds: [embed] });
    }

};
