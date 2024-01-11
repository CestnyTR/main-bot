const { EmbedBuilder } = require("discord.js");

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

    try {
        const level = await Level.findOne(query);

        if (level) {
            level.xp += xpToGive;

            if (level.xp > calculateLevelXp(level.level)) {
                level.xp = 0;
                level.level += 1;

                let logChDB = await logChSchema.findOne({ guildId: message.guildId });

                if (logChDB) {
                    if (!logChDB.exist) return;
                    const channel = await message.guild.channels.cache.get(logChDB.messageLog);
                    if (!channel) return;
                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setTitle('🌐 user level up')
                        .addFields({ name: 'server name', value: `${message.member} you have leveled up to **level ${level.level}**.` })
                        .setTimestamp()
                        .setFooter({ text: 'chat message updated used' });
                    channel.send({ embeds: [embed] });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Green")
                        .setTitle('🌐 user level up ')
                        .addFields({ name: 'server name', value: `${message.member} you have leveled up to **level ${level.level}**.` })
                        .setTimestamp()
                        .setFooter({ text: 'chat message updated used' });
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
    } catch (error) {
        console.log(`Error giving xp: ${error}`);
    }
};
