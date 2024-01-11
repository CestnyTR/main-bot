const { EmbedBuilder, VoiceStateManager, ChannelType } = require('discord.js')
const joinDb = require('../../models/JoinToCreate');
const joinChannelDb = require('../../models/JoinToCreateChannels');

module.exports = async (oldState, newState) => {
    try {
        if (newState.member.guild === null) return;
    } catch (err) {
        return console.error("newState error events/joinToCreate:" + err);
    }
    const joinData = await joinDb.findOne({ guildId: newState.member.guild.id })
    let joinChannelData = await joinChannelDb.findOne({ guildId: newState.member.guild.id, UserId: newState.member.id })
    const voiceChannel = newState.channel;

    if (!joinData) return;
    if (!voiceChannel) return;
    if (voiceChannel.id === joinData.Channel) {
        if (joinChannelData) {
            try {
                await newState.member.send({ content: `You already have a voice channel open right now **<#${joinChannelData.Channel}>**`, ephemeral: true });
                return;
            } catch (error) {
                return;
            }
        } else {
            try {
                //!create Channel
                try {
                    const channel = await newState.member.guild.channels.create({
                        type: ChannelType.GuildVoice,
                        name: `${newState.member.user.username}-room`,
                        userLimit: joinData.VoiceLimit,
                        parent: joinData.Category,
                    })
                    try {
                        await newState.member.voice.setChannel(channel.id);
                    } catch (error) {
                        return;
                    }
                    //!db work
                    try {
                        setTimeout(() => {
                            joinChannelDb.create({
                                guildId: newState.member.guild.id,
                                Channel: channel.id,
                                UserId: newState.member.id,
                            });
                        }, 500);
                    } catch (error) {
                        return;
                    }

                    //!embed work
                    const embed = new EmbedBuilder()
                        .setColor('Green')
                        .setTimestamp()
                        .setAuthor({ name: "Join to create system" })
                        .setFooter({ text: "Channel Created" })
                        .setTitle('>Channel Created')//<#${joinChannelData.Channel}>
                        .addFields({ name: "Channel Created", value: `>Your voice Channel has been \n> Created in **${newState.member.guild.name}** \n> Your voice Channel is **<#${channel.id}>**` })
                    try {
                        await newState.member.send({ embeds: [embed] })
                    } catch (error) {
                        return;
                    }
                } catch (error) {
                    return;
                }

            } catch (error) {
                try {
                    await newState.member.send({ content: "I could not create your channel. I may be missing permission", ephemeral: true })
                } catch (error) {
                    return;
                }
              //  console.error(error);
                return;
            }
        }
    }
}