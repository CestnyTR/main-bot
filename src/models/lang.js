const { Schema, model } = require('mongoose')

const languageSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true
    },
    language: {
        type: String,
        //? en ,tr
        default: 'en'
    },
});
module.exports = model('lang', languageSchema)