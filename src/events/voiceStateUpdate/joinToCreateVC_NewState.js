const { EmbedBuilder, VoiceStateManager, ChannelType } = require('discord.js')
const joinDb = require('../../models/JoinToCreate');
const joinChannelDb = require('../../models/JoinToCreateChannels');
const LanguageService = require("../../utils/LanguageService");
let langData
module.exports = async (oldState, newState) => {

    if (newState.member.guild === null) return;

    const joinData = await joinDb.findOne({ guildId: newState.member.guild.id })
    let joinChannelData = await joinChannelDb.findOne({ guildId: newState.member.guild.id, UserId: newState.member.id })
    const voiceChannel = newState.channel;

    if (!joinData) return;
    if (!voiceChannel) return;
    if (voiceChannel.id === joinData.Channel) {
        langData = await LanguageService.getLocalizedString(newState.member.guild.id, 'events');
        langData=langData.jtcNewState
        if (joinChannelData) {
            try {
                await newState.member.send({ content: langData.have.replace("{{joinChannelData.Channel}}", joinChannelData.Channel), ephemeral: true });
            } catch (error) {
                return;
            }
            return;
        } else {
            //!create Channel
            const channel = await newState.member.guild.channels.create({
                type: ChannelType.GuildVoice,
                name: langData.chName.replace("{{newState.member.user.username}}", newState.member.user.username),
                userLimit: joinData.VoiceLimit,
                parent: joinData.Category,
            })
            await newState.member.voice.setChannel(channel.id);
            //!db work
            setTimeout(() => {
                joinChannelDb.create({
                    guildId: newState.member.guild.id,
                    Channel: channel.id,
                    UserId: newState.member.id,
                });
            }, 500);

            //!embed work
            const embed = new EmbedBuilder()
                .setColor('Green')
                .setTimestamp()
                .setAuthor({ name: langData.author })
                .setFooter({ text: langData.footer })
                .setTitle(langData.title)//<#${joinChannelData.Channel}>
                .addFields({
                    name: langData.name, value: langData.value
                        .replace("{{newState.member.guild.name}}", newState.member.guild.name)
                        .replace("{{channel.id}}", channel.id)
                })
            try {
                await newState.member.send({ embeds: [embed] })
            } catch (error) {
                return;
            }
            return;
        }
    }
}
