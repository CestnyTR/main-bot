const { Schema, model } = require("mongoose")
const forbiddenSchema = new Schema({
    guildId:  {
        type: String,
        required: true,
    },
    forbiddenWord: {
        type: [String],
        default: []
    },
});
module.exports = model("forbidden", forbiddenSchema)