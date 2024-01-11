const { EmbedBuilder, DiscordjsError ,Client} = require("discord.js");
/**
 * @param {Object} param0 
 * @param {DiscordjsError} param0.err
 * @param {Client} param0.client
 */
module.exports = async (err, client) => {
    const myGuildId = '873218817566867477'; // Sizin sunucunuzun ID'si
    const ChannelID = "1185937683541930004";

    const errorMessage = err.message || "Bilinmeyen bir hata oluştu";

    console.error("Discord API Error:", errorMessage);


    // Hata stack bilgisinden dosya adını çıkartma
    const fileNameRegex = /at\s\S+\s\((.*?):\d+:\d+\)/;
    const match = err.stack.match(fileNameRegex);
    const fileName = match ? match[1] : "Bilinmeyen Dosya";

    const Embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTimestamp()
        .setFooter({ text: "⚠️ Anti Crash system" })
        .setTitle("Error Encountered")
        .setDescription(`**Discord API Error/Catch:\n\n** \`\`\`${errorMessage}\`\`\``)
        .addFields(
            { name: 'Hata Olan Kod Sayfası', value: fileName, inline: false }
        );
    const Channel = client.guilds.cache.get(myGuildId).channels.cache.get(ChannelID);
    if (!Channel) return;
    Channel.send({ embeds: [Embed] });
}