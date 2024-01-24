const { Message, EmbedBuilder } = require("discord.js")
const linkAccessRoleDb = require("../../models/linkAccessRoleSettings")
const logChSchema = require("../../models/logChannels");
const LanguageService = require("../../utils/LanguageService");
let langData


/**
 * @param {import { "discord.js"}.Message;} message
 */
module.exports = async (message) => {
    if (message.author.bot) {
        return;
    }
    const linkAccessRole = await linkAccessRoleDb.findOne({ guildId: message.guild.id });
    if (!linkAccessRole) return;
    if (!message.content.match(/https?:\/\/[^\s]+/)) return;

    if (message.member.roles.cache.has(linkAccessRole.roleId) || message.author.id == message.guild.ownerId || message.member.permissions.has('Administrator')) {
        return;
    }
    langData = await LanguageService.getLocalizedString(message.guild.id, 'events');
    langData = langData.antiLink
    message.delete();
    try {
        message.member.timeout(120000, langData.reason)
    } catch (error) {
        return console.error(error);;
    }

    // dm message
    const warningEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle(langData.warningEmbed)
        .setDescription(langData.warningEmbedDesc)
    try {
        message.author.send({ embeds: [warningEmbed] })
    } catch (error) { }

    //!log System
    let logChDB = await logChSchema.findOne({ guildId: message.guild.id });
    const name = message.author.tag;
    const id = message.author.id;
    const content = message.content;

    if (!logChDB) return;
    if (!logChDB.exist) return;
    const channel = await message.guild.channels.cache.get(logChDB.addsLog);

    const antlikLogEmbed = new EmbedBuilder()
        .setColor('Red')
        .setAuthor({ name: langData.logEmbed, iconURL: message.author.displayAvatarURL() })
        .setDescription(langData.logEmbedDesc
            .replace("{{id}}", id)
            .replace("{{name}}", name)
            .replace("{{content}}", content)
        )
        .setTimestamp()
    try {
        await channel.send({ embeds: [antlikLogEmbed] });
    } catch (error) { }

    return;

}