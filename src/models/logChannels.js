const { Schema, model } = require('mongoose');

const logChSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    exist: {
        type: Boolean,
        default: false,
        required: true,
    },
    categoryId: {
        type: String,
    },
    joinLog: {
        type: String,
    },
    leftLog: {
        type: String,
    },
    penaltyLog: {
        type: String,
    },
    addsLog: {
        type: String,
    },
    levelLog: {
        type: String,
    },
    messageLog: {
        type: String,
    },
   userLog: {
        type: String,
    },
    banLog: {
        type: String,
    },
    modLog: {
        type: String,
    },
    inviteLog: {
        type: String,
    },
    voiceLog: {
        type: String,
    },
    tagLog: {
        type: String,
    },
    commandLog: {
        type: String,
    },

});

module.exports = model('logChannels', logChSchema);