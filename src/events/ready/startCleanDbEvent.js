const { EmbedBuilder } = require("discord.js");
const logChannels = require("../../models/logChannels");
module.exports = async (client) => {
    try {
        console.log(`Bot is ready!`);
    } catch (error) {
        console.log("Error Encountered in guildMemberAddLog.js : ", error);
    }
};