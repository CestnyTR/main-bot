const { Message, EmbedBuilder } = require("discord.js")
const linkAccessRoleDb = require("../../models/linkAccessRoleSettings")
const logChSchema = require("../../models/logChannels");

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

        message.delete();
        try {
            message.member.timeout(120000, "sending link without permisions")
        } catch (error) {
            return console.error(error);;
        }

        // dm message
        const warningEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Anti-Link System')
            .setDescription(':no_entry_sign: You have been given the muted role for 2 minutes , Because you are not allowed to send links in this server!')
        try {
            message.author.send({ embeds: [warningEmbed] }).catch(console.error);
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
            .setAuthor({ name: 'Member Time out', iconURL: message.author.displayAvatarURL() })
            .setDescription(`>sending link without permisions \n<@${id}> > ${name}\n>The link : ${content}`)
            .setTimestamp()
        try {
            await channel.send({ embeds: [antlikLogEmbed] });
        } catch (error) { }

    return;

}