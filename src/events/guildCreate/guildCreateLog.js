const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = async (guildCreate, client) => {
  try {
    const inviteLink = 'https://discord.gg/frzvrNfH38';
    const myGuildId = '873218817566867477'; // server id
    const ChannelID = "1185971937906794566";  //channel id
    await guildCreate.channels.create({
      name: "cestnytr-bot-welcome-channel",
      type: ChannelType.GuildText,
    }).then(async (channel) => {
      const joinnedServer = new EmbedBuilder()
        .setColor("#3498db") // Mavi renk
        .setTitle("Welcome to My Bot!")
        .addFields(
          { name: 'Hello!', value: 'I am your friendly bot.', inline: false },
          { name: 'Slash Commands', value: 'I am only running on slash commands. Use `/play` to get started.', inline: false },
          { name: 'Voice Channel', value: 'Join a voice channel and type `/play` to begin.', inline: false },
          { name: 'Available Commands', value: 'Type `/help` to see all available commands.', inline: false },
          { name: 'Need Help?', value: 'Join our support server for assistance.', inline: false },
          { name: 'Invite Me', value: `[Click Here](${inviteLink})`, inline: false },
          { name: 'Permissions', value: 'Make sure I have all required permissions to work properly.', inline: false }
        );
      await channel.send({ embeds: [joinnedServer] })
    })

    const logEmbed = new EmbedBuilder()
      .setColor("Aqua")
      .setTimestamp()
      .setFooter({ text: "⚠️ new server joined system" })
      .setTitle("new server joined")
      .addFields(
        { name: 'Server Name', value: guildCreate.name, inline: false },

      );
    const Channel = client.guilds.cache.get(myGuildId).channels.cache.get(ChannelID);
    Channel.send({ embeds: [logEmbed] });

  } catch (error) {
    console.error(error);
  }
};

