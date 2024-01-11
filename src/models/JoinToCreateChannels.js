const { Schema, model } = require('mongoose')
const joinToCreateChannelsSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
    Channel: {
        type: String,
        required: true,
    },

});
module.exports = model('joinToCreateChannels', joinToCreateChannelsSchema)