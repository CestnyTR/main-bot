const client = require("../../index.js");
const { EmbedBuilder } = require("discord.js");
const LanguageService = require("../../utils/LanguageService");
let langData
// const status = queue =>
//     `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

const status = async queue => {
    const guild = queue.textChannel.guild;
    langData = await LanguageService.getLocalizedString(guild.id, "events");
    langData = langData.music
    const editedStatus = langData.queue.status
        .replace('{{volume}}', queue.volume)
        .replace('{{filter}}', queue.filters.names.join(', ') || langData.queue.defaultFilter)
        .replace('{{loop}}', queue.repeatMode ? (queue.repeatMode === 2 ? langData.queue.allQueue : langData.queue.thisSong) : langData.queue.off)
        .replace('{{autoplay}}', queue.autoplay ? langData.queue.on : langData.queue.off);

    console.log(editedStatus);
    return editedStatus;
};


client.distube
    .on('playSong', async (queue, song) => {
        const guild = queue.textChannel.guild;
        langData = await LanguageService.getLocalizedString(guild.id, "events");
        langData = langData.music

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(langData.playSong.title)
            .setDescription(langData.playSong.description
                .replace('{{songName}}', song.name)
                .replace('{{duration}}', song.formattedDuration)
                .replace('{{user}}', song.user)
                .replace('{{status}}', await status(queue))
            );
        queue.textChannel.send({ embeds: [embed] });
    })
    .on('addSong', async (queue, song) => {
        const guild = queue.textChannel.guild;
        langData = await LanguageService.getLocalizedString(guild.id, "events");
        langData = langData.music

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(langData.addSong.title)
            .setDescription(langData.addSong.description
                .replace('{{songName}}', song.name)
                .replace('{{duration}}', song.formattedDuration)
                .replace('{{user}}', song.user)
            );
        queue.textChannel.send({ embeds: [embed] });
    })
    .on('addList', async (queue, playlist) => {
        const guild = queue.textChannel.guild;
        langData = await LanguageService.getLocalizedString(guild.id, "events");
        langData = langData.music

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle(langData.addList.title)
            .setDescription(langData.addList.description
                .replace('{{playlistName}}', playlist.name)
                .replace('{{songCount}}', playlist.songs.length)
                .replace('{{status}}', await status(queue))
            );
        queue.textChannel.send({ embeds: [embed] });
    })
    .on('error', async (channel, e) => {
        const myGuildId = '873218817566867477'; // Sizin sunucunuzun ID'si
        const ChannelID = "1185937683541930004";
        const fileName = "D:\\Fahri\\works\\discordBot\\main-bot\\src\\events\\distube\\distubeEvents.js";
        langData = await LanguageService.getLocalizedString(channel.guild.id, "events");
        langData = langData.music

        const embed = new EmbedBuilder()
            .setColor("Aqua")
            .setTimestamp()
            .setFooter({ text: "⚠️ Anti Crash system" })
            .setTitle(langData.error.title)
            .setDescription(`${langData.error.description}\n\`\`\`${e}\`\`\``)
            .addFields(
                { name: langData.error.fieldName, value: fileName, inline: false }
            );

        const Channel = client.guilds.cache.get(myGuildId).channels.cache.get(ChannelID);
        if (Channel) Channel.send({ embeds: [embed] });

        if (channel) channel.send(`${langData.error.errorMessage}: ${e.toString().slice(0, 1974)}`);
        else console.error(e);
    })
    .on('empty', async (channel) => {
        langData = await LanguageService.getLocalizedString(channel.guild.id, "events");
        langData = langData.music

        channel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setTitle(langData.empty.title)
                .setDescription(langData.empty.description)]
        });
    })
    .on('searchNoResult', async (message, query) => {
        langData = await LanguageService.getLocalizedString(message.guild.id, "events");
        langData = langData.music

        message.channel.send({
            embeds: [new EmbedBuilder().setColor("Red")
                .setTitle(langData.searchNoResult.title)
                .setDescription(langData.searchNoResult.description.replace('{{query}}', query))]
        });
    })
    .on('finish', async (queue) => {
        langData = await LanguageService.getLocalizedString(queue.textChannel.guild.id, "events");
        langData = langData.music

        queue.textChannel.send({
            embeds: [new EmbedBuilder().setColor("Green")
                .setTitle(langData.finish.title)
                .setDescription(langData.finish.description)]
        });
    });

module.exports = null;
