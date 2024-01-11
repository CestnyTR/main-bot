const { Schema, model } = require('mongoose');

const rolesInfoSchema = new Schema({
    guildId: {
        type: String,
        required: true,
    },
    roleType: {
        type: String,
        required: true,
    },
    roleContent: {
        type: String,
        required: true,
    },
    maxChoice: {
        type: Number,
        required: true,
    },
    minChoice: {
        type: Number,
        required: true,
    },
    listRoles: {
        type: [{
            label: String,
            description: String,
            value: String
        }],
        default: [],
        required: true,
    }

});

module.exports = model('RolesInfo', rolesInfoSchema);
