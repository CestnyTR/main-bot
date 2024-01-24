const { Message, EmbedBuilder } = require("discord.js")
const forbiddenDb = require("../../models/Forbidden")
const capitalLetterDb = require("../../models/CapitalLetter")
const LanguageService = require("../../utils/LanguageService");
let langData
let messageSended = false;
/**
 * @param {import { "discord.js"}.Message;} message
 */
module.exports = async (message) => {
    if (message.author.bot) return;
    const queryForbid = {
        guildId: message.guild.id,
    };
    const forbid = await forbiddenDb.findOne(queryForbid);
    const queryCapitalLetter = {
        guildId: message.guild.id,
    };
    const capitalLetter = await capitalLetterDb.findOne(queryCapitalLetter);
    //!FORBIN WORDS
    langData = await LanguageService.getLocalizedString(message.guild.id, 'events');
    langData = langData.fixSentence;
    if (forbid && forbid.forbiddenWord) {
        for (const forbiddenWord of forbid.forbiddenWord) {
            await handleForbiddenWord(message, forbiddenWord.toLowerCase());
        }

    }
    //!capital WORDS
    if (
        capitalLetter
        && !containsOnlyNumbers(message.content)
        && message.content.length > 2
        && capitalLetter.status
        && message.content.toUpperCase() === message.content
        && !messageSended
        && (
            message.mentions.users.size === 0 ||  // No user mentions
            (message.mentions.users.size === 1 && message.mentions.users.has(message.author.id))  // Only mentions the author
        )
        && message.mentions.roles.size === 0  // No role mentions
    ) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(langData.title)
            .addFields(
                { name: langData.please, value: langData.desc.replace("{{message.author}}", message.author), inline: false },
                { name: langData.correctSentence, value: message.content.toLowerCase(), inline: false }
            )
            .setTimestamp()
        await message.author.send({ embeds: [embed], ephermeral: true });
        message.delete();
    }

    messageSended = false;
    return;
}

async function handleForbiddenWord(message, forbiddenWord) {
    const lowerContent = message.content.toLowerCase();

    if (lowerContent.includes(` ${forbiddenWord} `) || lowerContent.startsWith(`${forbiddenWord} `) || lowerContent.endsWith(` ${forbiddenWord}`) || lowerContent === forbiddenWord) {
        // Yasaklı kelimenin tamamını sansürle
        const correctedMessage = message.content.replace(new RegExp(`\\b${forbiddenWord}\\b`, "gi"), (match) => {
            return "*".repeat(match.length);
        });
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(langData.title)
            .addFields(
                { name: langData.please, value: langData.desc.replace("{{message.author}}", message.author), inline: false },
                { name: langData.correctSentence, value: correctedMessage.toLowerCase(), inline: false }
            )
            .setTimestamp()
        await message.author.send({ embeds: [embed], ephermeral: true });
        messageSended = true;
        message.delete();
        return;
    }
}
function containsOnlyNumbers(str) {
    // Check if the string contains only numbers
    return /^\d+$/.test(str);
}