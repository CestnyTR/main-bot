const { Interaction, EmbedBuilder } = require("discord.js");
const logChSchema = require("../../models/logChannels");

/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    try {
        if (!interaction.inGuild()) return;
        if (!interaction.isCommand()) return;
        let logChDB = await logChSchema.findOne({ guildId: interaction.guildId });
        if (!logChDB||!logChDB.exist) return;
        const channel = await interaction.guild.channels.cache.get(logChDB.commandLog);
        const server = interaction.guild.name;
        const user = interaction.user.username;
        const userID = interaction.user.id;

        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle('🌐 chat command used')
            .addFields({ name: 'server name', value: `${server}` })
            .addFields({ name: 'chat command', value: `${interaction}` })
            .addFields({ name: 'Command user', value: `${user} / ${userID}` })
            .setTimestamp()
            .setFooter({ text: 'chat command used' }); // pass an object with a `text` property

        await channel.send({ embeds: [embed] });
    } catch (error) {
        console.error("error in comandsLog.js" + error);
    }

}