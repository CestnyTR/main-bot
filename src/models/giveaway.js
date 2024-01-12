const { Schema, model } = require("mongoose")
const giveawaySchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
    },
    channelId: {
        type: String,
    },
    prize: {
        type: String,
    },
    winnerscount: {
        type: Number,
        default: 1
    },
    backupWinnersCount: {
        type: Number,
        default: 1
    },
    endDate: {
        type: Date,
    },
    participants: {
        type: [String],
        default: [],
    },
    winnersList: {
        type: [String],
        default: [],
    },
    backupWinnersList: {
        type: [String],
        default: [],
    },
});
module.exports = model('giveaway', giveawaySchema)