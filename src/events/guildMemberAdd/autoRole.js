const { Client, GuildMember } = require('discord.js');
const AutoRole = require('../../models/AutoRole');
const LanguageService = require('../../utils/LanguageService');
let langData
/**
 * @param {Object} param0 
 * @param {GuildMember} param0.member
 */
module.exports = async (member) => {
    let guild = member.guild;
    if (!guild) return;

    const autoRole = await AutoRole.findOne({ guildId: guild.id });
    if (!autoRole) return;

    await member.roles.add(autoRole.roleId);
    // Dil dosyasını yükle
    langData = await LanguageService.getLocalizedString(guild.id, 'events');
    langData = langData.autoRoleAdded
    const userName = langData.defaultUserName;
    member.setNickname(userName).catch(async (error) => {
        // Kullanıcıya hata mesajını gönder
        member.send(langData.nicknameError).catch(console.error);
        return;
    });

    // Kullanıcıya başarı mesajını gönder
    member.send(langData.success).catch(console.error);
};
