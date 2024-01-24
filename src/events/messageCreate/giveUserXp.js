const { EmbedBuilder } = require("discord.js");
const LanguageService = require("../../utils/LanguageService");
let langData
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const cooldowns = new Set();
const logChSchema = require("../../models/logChannels");

function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {import { "discord.js"}.Message;} message
 */

module.exports = async (message) => {
    const { guild, author, } = message;
    if (!guild || author.bot || author.system || cooldowns.has(message.author.id)) { return; }

    const xpToGive = getRandomXp(5, 15);

    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };
    const level = await Level.findOne(query);

    if (level) {
        langData = await LanguageService.getLocalizedString(message.guild.id, 'userLevelUp');

        level.xp += xpToGive;

        if (level.xp > calculateLevelXp(level.level)) {
            level.xp = 0;
            level.level += 1;

            let logChDB = await logChSchema.findOne({ guildId: message.guildId });
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle(langData.title)
                .addFields({
                    name: langData.serverName, value: langData.desc
                        .replace("{{member}}", message.member)
                        .replace("{{level.level}}", level.level)
                })
                .setTimestamp()
                .setFooter({ text: langData.footer });
            if (logChDB) {
                if (!logChDB.exist) return;
                const channel = await message.guild.channels.cache.get(logChDB.messageLog);
                if (!channel) return;
                channel.send({ embeds: [embed] });
            } else {
                message.channel.send({ embeds: [embed] });
            }
        }

        await level.save().catch((e) => {
            console.log(`Error saving updated level ${e}`);
            return;
        });
        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 60000);
    }

    // if (!level)
    else {
        // create new level
        const newLevel = new Level({
            userId: message.author.id,
            guildId: message.guild.id,
            xp: xpToGive,
        });

        await newLevel.save();
        cooldowns.add(message.author.id);
        setTimeout(() => {
            cooldowns.delete(message.author.id);
        }, 60000);
    }

};
