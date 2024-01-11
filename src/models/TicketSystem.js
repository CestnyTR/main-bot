const { Schema, model } = require("mongoose")
const ticketSystemSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
    forDeleteCategoryId: {
        type: String,
        required: true,
    },
    staffRoleId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
});
module.exports = model('TicketSystem', ticketSystemSchema)