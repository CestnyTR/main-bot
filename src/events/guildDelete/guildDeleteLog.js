const {  EmbedBuilder } = require('discord.js');
const AutoRole = require("../../models/AutoRole");
const CapitalLetter = require("../../models/CapitalLetter");
const Forbidden = require("../../models/Forbidden");
const GuildConfiguration = require("../../models/GuildConfiguration");
const JoinToCreate = require("../../models/JoinToCreate");
const JoinToCreateChannels = require("../../models/JoinToCreateChannels");
const Level = require("../../models/Level");
const linkAccessRoleSettings = require("../../models/linkAccessRoleSettings");
const logChannels = require("../../models/logChannels");
const musicSys = require("../../models/musicSys");
const RolesInfo = require("../../models/RolesInfo");
const Suggestion = require("../../models/Suggestion");
const ticketSystem = require("../../models/TicketSystem");
const User = require("../../models/User");
const Welcome = require("../../models/Welcome");



module.exports = async (guildDelete,client) => {
        // Sunucu ile ilişkili verileri sil
        await AutoRole.deleteOne({ guildId: guildDelete.id });
        await CapitalLetter.deleteOne({ guildId: guildDelete.id });
        await Forbidden.deleteOne({ guildId: guildDelete.id });
        await GuildConfiguration.deleteOne({ guildId: guildDelete.id });
        await JoinToCreate.deleteOne({ guildId: guildDelete.id });
        await JoinToCreateChannels.deleteOne({ guildId: guildDelete.id });
        await Level.deleteOne({ guildId: guildDelete.id });
        await linkAccessRoleSettings.deleteOne({ guildId: guildDelete.id });
        await RolesInfo.deleteOne({ guildId: guildDelete.id });
        await Suggestion.deleteOne({ guildId: guildDelete.id });
        await logChannels.deleteOne({ guildId: guildDelete.id });
        await User.deleteOne({ guildId: guildDelete.id });
        await Welcome.deleteOne({ Guild: guildDelete.id });
        await musicSys.deleteOne({ guildId: guildDelete.id });
        await ticketSystem.deleteOne({ guildId: guildDelete.id });

        const myGuildId = '873218817566867477'; // Sizin sunucunuzun ID'si
        const ChannelID = "1185971937906794566";
        const logEmbed = new EmbedBuilder()
            .setColor("Red")
            .setTimestamp()
            .setFooter({ text: "⚠️ This server deleted system" })
            .setTitle("Server deleted")
            .addFields( 
                { name: 'Server Name', value: guildDelete.name, inline: false },

            );
        const Channel = client.guilds.cache.get(myGuildId).channels.cache.get(ChannelID);
        Channel.send({ embeds: [logEmbed] });
};
