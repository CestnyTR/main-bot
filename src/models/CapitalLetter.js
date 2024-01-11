const { Schema, model } = require("mongoose")
const capitalLetter = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
});
module.exports = model('CapitalLetter', capitalLetter)