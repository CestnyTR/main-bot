const { EmbedBuilder } = require("discord.js");
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData

module.exports = async (oldMessage, newMessage, client) => {
    let logChDB = await logChSchema.findOne({ guildId: oldMessage.guildId });
    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await oldMessage.guild.channels.cache.get(logChDB.messageLog);
    if (!channel) return;
    if (oldMessage.author.bot) return;
    const mes = oldMessage.content;
    if (!mes) return;

    langData = await LanguageService.getLocalizedString(oldMessage.guildId, 'messageUpdatedLog');


    if (oldMessage.content.includes('https://')) return;
    if (newMessage.content.includes('http://')) return;
    const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(langData.title)
        .setDescription(langData.desc
            .replace("{{oldMessage.member.user.id}}", oldMessage.member.user.id)
            .replace("{{oldMessage.channel.id}}", oldMessage.channel.id)
            .replace("{{oldMessage.guild.id}}", oldMessage.guild.id)
            .replace("{{oldMessage.channel.id}}", oldMessage.channel.id)
            .replace("{{newMessage.id}}", newMessage.id)

        )
        .addFields(
            { name: langData.svName, value: `${oldMessage.guild.name}` },
            { name: langData.beforeMessage, value: `${oldMessage}` },
            { name: langData.afterMessage, value: `${newMessage}` },
            { name: langData.commandMessage, value: `${oldMessage.author.username} / ${oldMessage.author.id}` }
        )
        .setTimestamp()
        .setFooter({ text: 'chat message updated used' });
    return channel.send({ embeds: [embed] });
};