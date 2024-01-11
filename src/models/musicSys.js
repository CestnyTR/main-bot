const { Schema, model } = require('mongoose');

const musicSysSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    mChId: {
        type: String,
        required: true,
    },


});

module.exports = model('musicSys', musicSysSchema);
