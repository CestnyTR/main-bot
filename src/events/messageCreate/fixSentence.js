const { Message } = require("discord.js")
const forbiddenDb = require("../../models/Forbidden")
const capitalLetterDb = require("../../models/CapitalLetter")
let messageSended = false;
/**
 * @param {import { "discord.js"}.Message;} message
 */
module.exports = async (message) => {
    try {
        if (message.author.bot) {
            return;
        }
        const queryForbid = {
            guildId: message.guild.id,
        };
        const forbid = await forbiddenDb.findOne(queryForbid);
        const queryCapitalLetter = {
            guildId: message.guild.id,
        };
        const capitalLetter = await capitalLetterDb.findOne(queryCapitalLetter);
        //!FORBIN WORDS

        if (forbid && forbid.forbiddenWord) {
            for (const forbiddenWord of forbid.forbiddenWord) {
                await handleForbiddenWord(message, forbiddenWord.toLowerCase());
            }

        }
        //!capital WORDS
        if (capitalLetter && !containsOnlyNumbers(message.content) && message.content.length > 2 && capitalLetter.status && message.content.toUpperCase() === message.content && !messageSended) {
            message.delete();
            const content = `${message.author}, your message was incomplete. Did you mean this?\n${message.content.toLowerCase()}`
            await message.channel.send({ content: content, ephemeral: true });
        }

        messageSended = false;
        return;
    } catch (error) {
        console.error("An error occurred:", error);
    }

}

async function handleForbiddenWord(message, forbiddenWord) {
    const lowerContent = message.content.toLowerCase();

    if (lowerContent.includes(` ${forbiddenWord} `) || lowerContent.startsWith(`${forbiddenWord} `) || lowerContent.endsWith(` ${forbiddenWord}`) || lowerContent === forbiddenWord) {
        // Yasaklı kelimenin tamamını sansürle
        const correctedMessage = message.content.replace(new RegExp(`\\b${forbiddenWord}\\b`, "gi"), (match) => {
            return "*".repeat(match.length);
        });

        // Sansürlenmiş mesajı gönder
        const _content = `${message.author}, your message was flagged for using forbidden word. Please don't use that word. Correct sentence is:\n${correctedMessage.toLowerCase()}`;
        messageSended = true;
        message.delete();
        return await message.channel.send({ content: _content, ephemeral: true, });
    }
}
function containsOnlyNumbers(str) {
    // Check if the string contains only numbers
    return /^\d+$/.test(str);
}