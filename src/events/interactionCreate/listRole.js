const { Interaction } = require("discord.js");
const rolesInfoSchema = require("../../models/RolesInfo");
const AutoRole = require('../../models/AutoRole');
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData

/**
 *
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu() || !interaction.customId) return;
    const autoRole = await AutoRole.findOne({ guildId: interaction.guildId });
    if (!autoRole) return;

    const registerRole = interaction.guild.roles.cache.get(autoRole.roleId);
    if (!registerRole) return;


    const [type, member, action] = interaction.customId.split('.');
    if (type == "language_select_menu" || type == "helpMenu") return;

    langData = await LanguageService.getLocalizedString(interaction.guildId, "events");
    langData = langData.listRole
    // await interaction.deferReply({ ephemeral: true });
    const query = {
        guildId: interaction.guild.id,
        roleType: type
    };
    const rolesInfo = await rolesInfoSchema.findOne(query);


    await interaction.deferReply({ ephemeral: true });

    let rolId
    let _roles = [];
    for (let i in rolesInfo.listRoles) {
        _roles.push(rolesInfo.listRoles[i].value);
    }
    for (let i in rolId) {
        _roles.push(interaction.guild.roles.cache.get(rolId[i]))
    }
    if (!_roles) {
        interaction.editReply(langData.findError);
        return;
    }
    for (let i in _roles) {
        const hasRole = interaction.member.roles.cache.has(_roles[i]);
        if (hasRole) {
            await interaction.member.roles.remove(_roles[i]);
            const label = listLabel(rolesInfo.listRoles, _roles[i]);
            await interaction.editReply(langData.roleRemove.replace('{{label}}', label));
            break;
        }
    }
    for (let i in interaction.values) {
        await interaction.member.roles.add(interaction.values[i]);
        const label = listLabel(rolesInfo.listRoles, interaction.values[i]);
        await interaction.editReply(langData.roleAdd.replace('{{label}}', label));
        break;
    }
}
function listLabel(list, _roles) {
    const array = list
    const targetValue = _roles; // Aradığınız value
    for (const item of array) {
        if (item.value === targetValue) {
            return item.label;
        }
    }


}