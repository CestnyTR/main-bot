const { Schema, model } = require("mongoose")
const linkAccessRoleSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    roleId: {
        type: String,
        required: true,
    },
});
module.exports = model('linkAccessRole', linkAccessRoleSchema)