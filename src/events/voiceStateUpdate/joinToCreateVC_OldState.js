const { EmbedBuilder, VoiceStateManager, ChannelType } = require('discord.js');
const joinChannelDb = require('../../models/JoinToCreateChannels');

module.exports = async (oldState, newState) => {
    try {
        if (oldState.member.guild === null) return;
    } catch (err) {
        return console.error("oldState error events/joinToCreate:" + err);
    }

    const leaveChannelData = await joinChannelDb.findOne({ guildId: oldState.member.guild.id, UserId: oldState.member.id });

    if (!leaveChannelData) return;
    
    const voiceChannel = oldState.member.guild.channels.cache.get(leaveChannelData.Channel);

    if (!voiceChannel) return;

    if (newState.channelId === voiceChannel.id) {
        // The user joined the channel, do nothing for now
    } else if (oldState.channelId === voiceChannel.id && newState.channelId !== voiceChannel.id) {
        // The user left the channel, delete the channel
        try {
            await voiceChannel.delete();
        } catch (err) {
            console.error("Error deleting channel:", err);
        } finally {
            // Delete data from the database
            await joinChannelDb.deleteMany({ guildId: oldState.member.guild.id, UserId: oldState.member.id });

            // Send a notification to the user
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setTimestamp()
                .setAuthor({ name: "Join to create system" })
                .setFooter({ text: "Channel deleted" })
                .setTitle('>Channel deleted')
                .addFields({ name: "Channel deleted", value: `>Your voice Channel has been \n> deleted in **${newState.member.guild.name}**` });

            try {
                await oldState.member.send({ embeds: [embed] });
            } catch (error) {
                console.error("Error sending message to user:", error);
            }
        }
    }
};
