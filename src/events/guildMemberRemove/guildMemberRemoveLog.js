const { EmbedBuilder, AuditLogEvent } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");


module.exports = async (member) => {
    let logChDB = await logChSchema.findOne({ guildId: member.guild.id });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await member.guild.channels.cache.get(logChDB.leftLog);
    if (!channel) return;
    const langData = await LanguageService.getLocalizedString(member.guild.id, 'memberLeftLog');

    if (member.user.bot) return;
    const name = member.user.tag;
    const id = member.user.id;
    const embed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: langData.title, iconURL: member.displayAvatarURL() })
        .setDescription(`<@${id}> ${name}`)
        .setTimestamp()
    return await channel.send({ embeds: [embed] });
};