// index.js

const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require('commandkit');
const mongoose = require('mongoose');

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const CustomCommandKit = require('./utils/languageHandler'); // languageHandler dosyanın doğru yolunu belirtmelisin


require('dotenv/config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
    ],
});

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin]
})
new CustomCommandKit({
    client,
    commandsPath: `${__dirname}/commands`,
    eventsPath: `${__dirname}/events`,
});
(async () => {
    try {
        module.exports = client;

        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB.');

        client.login(process.env.TOKEN);

    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();