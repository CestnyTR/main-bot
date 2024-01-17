const { Schema, model } = require("mongoose");
const { randomUUID } = require('crypto');
const giveawaySchema = new Schema({
    giveawayId: {
        type: String,
        default: randomUUID
    },
    guildId: {
        type: String,
        required: true,
    },
    authorId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    prize: {
        type: String,
    },
    status: {
        type: String,
        //?"pending" , "close"
        default: "pending"
    },
    winnerscount: {
        type: Number,
        default: 1
    },
    backupWinnersCount: {
        type: Number,
        default: 1
    },
    participants: {
        type: [String],
        default: [],
    },
});
module.exports = model('giveaway', giveawaySchema)