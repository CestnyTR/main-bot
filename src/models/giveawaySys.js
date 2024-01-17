const { Schema, model } = require("mongoose")
const giveawaySysSchema = new Schema({
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
});
module.exports = model('giveawaySYs', giveawaySysSchema)