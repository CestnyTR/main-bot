const { EmbedBuilder } = require('discord.js');
let joinedTime = {};
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/Level');
const logChSchema = require("../../models/logChannels");
const minTime = 5;
const LanguageService = require("../../utils/LanguageService");
let langData
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
            langData = await LanguageService.getLocalizedString(newState.guild.id, 'voiceLog');

            //* Send a notification to the user
            const spendTime = new EmbedBuilder()
                .setColor('Green')
                .setTimestamp()
                .setFooter({ text: langData.footer })
                .setTitle(langData.title.replace("{{guildName}}", guildName))
                .addFields(
                    { name: langData.svJoin, value: `>**${formattedDate}**` },
                    { name: langData.chName, value: `>https://discord.com/channels/${guildId}/${channelName}` },
                    { name: langData.timeSpend, value: langData.minute.replace("{{elapsedTimeInMinutes.toFixed(1)}}", elapsedTimeInMinutes.toFixed(1)) }

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
                        userId: newState.member.id,
                        guildId: newState.guild.id,
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
                        let logChDB = await logChSchema.findOne({ guildId: newState.guild.id });
                        if (logChDB) {
                            if (!logChDB.exist) return;
                            const channel = await newState.guild.channels.cache.get(logChDB.levelLog);
                            if (!channel) return;

                            langData = await LanguageService.getLocalizedString(newState.guild.id, 'userLevelUp');

                            const embed = new EmbedBuilder()
                                .setColor("Green")
                                .setTitle(langData.title)
                                .addFields({ name: langData.serverName, value: langData.desc.replace("{{member}}", newState.member).replace("{{level.level}}", level.level) })
                                .setTimestamp()
                                .setFooter({ text: langData.footer });
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
}
