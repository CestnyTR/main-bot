const { Schema, model } = require('mongoose');

const guildConfigurationSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    suggestionCategoryId: {
        type: String,
        default: null,
    },
    suggestionChannelId: {
        type: String,
        default: null,
    },
});

module.exports = model('GuildConfiguration', guildConfigurationSchema);
