const { Client, GuildMember } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

/**
 * @param {Object} param0 
 * @param {GuildMember} param0.member
 */
module.exports = async (member) => {
    try {
        let guild = member.guild;
        if (!guild) return;

        const autoRole = await AutoRole.findOne({ guildId: guild.id });
        if (!autoRole) return;

        await member.roles.add(autoRole.roleId);

        const userName = "Name || Age";
        member.setNickname(userName).catch(error => {
            console.log(+'Kullanıcı adı değiştirme hatası:', error);
            return;

        });


    } catch (error) {
        console.log(`Error giving role automatically: ${error}`);
    }
};
