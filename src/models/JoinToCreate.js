const { Schema, model } = require('mongoose')
const joinToCreateSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    Channel: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    VoiceLimit: {
        type: Number,
    },
});
module.exports = model('joinToCreate', joinToCreateSchema)