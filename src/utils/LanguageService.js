// LanguageService.js
const LanguageModel = require("../models/lang");

async function getGuildLanguage(guildId) {
    const guildLanguage = await LanguageModel.findOne({ guildId }).select('language');
    return guildLanguage ? guildLanguage.language : 'en';
}

async function getLocalizedString(guildId, key) {
    const language = await getGuildLanguage(guildId);
    const langData = require(`../lang/${language}.json`);
    return langData[key] || key;
}

module.exports = {
    getGuildLanguage,
    getLocalizedString,
};
