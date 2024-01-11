const { EmbedBuilder } = require('discord.js');
let joinedTime = {};
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const logChSchema = require("../../models/logChannels");
const minTime = 5;
function getRandomXp(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async (oldState, newState) => {

    const xpToGive = getRandomXp(5, 15);
    const query = {
        userId: newState.member.id,
        guildId: newState.guild.id,
    };
    try {
        const level = await Level.findOne(query);
        const userId = newState.member.id;
        const guildName = newState.guild.name;
        const channelName = oldState.channelId;
        const joinedTimestamp = new Date(newState.guild.joinedTimestamp);
        const formattedDate = joinedTimestamp.toLocaleString(); // İsteğe bağlı olarak farklı formatlama yöntemleri de kullanabilirsiniz
        const guildId = newState.guild.id;
        if (oldState && oldState.channelId && !newState.channelId) {
            //* User left a voice channel
            const currentTime = new Date().getTime();
            const key = `${userId}-${guildId}`;

            if (joinedTime[key]) {
                const elapsedTimeInMilliseconds = currentTime - joinedTime[key];
                const elapsedTimeInMinutes = elapsedTimeInMilliseconds / 60_000;

                //* Send a notification to the user
                const spendTime = new EmbedBuilder()
                    .setColor('Green')
                    .setTimestamp()
                    .setFooter({ text: "Voice state info" })
                    .setTitle(`>${guildName} Server`)
                    .addFields(
                        { name: "Server joinned", value: `>**${formattedDate}**` },
                        { name: "Channel Name", value: `>https://discord.com/channels/${guildId}/${channelName}` },
                        { name: "Time Spent", value: `>${elapsedTimeInMinutes.toFixed(1)} minute` }

                    );

                try {
                    await oldState.member.send({ embeds: [spendTime] });
                } catch (error) {
                }

                const remainTime = elapsedTimeInMinutes.toFixed(2);



                //!level up log
                if (remainTime > minTime) {
                    //*give xp
                    if (!level) {
                        // create new level
                        const newLevel = new Level({
                            userId: message.author.id,
                            guildId: message.guild.id,
                            xp: xpToGive,
                        });

                        await newLevel.save();
                    }
                    if (level) {
                        const multyExp = Math.floor(remainTime / minTime)
                        level.xp += xpToGive * multyExp;
                        if (level.xp > calculateLevelXp(level.level)) {
                            level.xp = 0;
                            level.level += 1;
                            await level.save()
                            let logChDB = await logChSchema.findOne({ guildId: guildId });
                            if (logChDB) {
                                if (!logChDB.exist) return;
                                const channel = await newState.guild.channels.cache.get(logChDB.levelLog);
                                if (!channel) return;
                                const embed = new EmbedBuilder()
                                    .setColor("Green")
                                    .setTitle('🌐 user level up')
                                    .addFields({ name: 'server name', value: `${newState.member} you have leveled up to **level ${level.level}**.` })
                                    .setTimestamp()
                                    .setFooter({ text: 'chat newState updated used' });
                                channel.send({ embeds: [embed] });
                            }
                        }
                    }
                    // if (!level)
                    else {
                        // create new level
                        const newLevel = new Level({
                            userId: newState.author.id,
                            guildId: newState.guild.id,
                            xp: xpToGive,
                        });
                        await newLevel.save();
                    }
                }
                joinedTime[key] = undefined;
            }
        } else if (!oldState.channelId && newState.channelId) {
            // User joined a voice channel
            joinedTime[`${userId}-${guildId}`] = new Date().getTime();
        }
    } catch (error) {
        console.log(`Error giving voice XP: ${error}`);
    }
}
