const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");

module.exports = async (oldMember, newMember) => {

    const logChDB = await logChannels.findOne({ guildId: oldMember.guild.id });
    if (!logChDB || !logChDB.exist) return;
    const channel = oldMember.guild.channels.cache.get(logChDB.userLog);
    const langData = await LanguageService.getLocalizedString(oldMember.guild.id, 'userLog');

    // Kullanıcı isim değiştirdiğinde
    if (oldMember.displayName == newMember.displayName) return;

    const nameChangeLog = new EmbedBuilder()
        .setColor('Green')
        .setTitle(langData.title)
        .addFields(
            { name: langData.oldName, value: `${oldMember.displayName}`, inline: true },
            { name: langData.newName, value: `${newMember.displayName}`, inline: true },
        )
        .setTimestamp()
        .setFooter({ text: langData.footer });
    // Log kanalını belirleyin, 'log-kanal-id' yerine kendi log kanalınızın ID'sini ekleyin.
    return await channel.send({ embeds: [nameChangeLog] });



};