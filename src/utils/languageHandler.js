// languageHandler.js
const { CommandKit } = require('commandkit');
const LanguageModel = require('../models/lang'); // LanguageModel'ini oluşturmanız gerekiyor

class CustomCommandKit extends CommandKit {
  constructor(options) {
    super(options);
  }

  async handleCommandInteraction(interaction) {
    // Dil tercihini kontrol et
    const guildLanguage = await LanguageModel.findOne({ guildId: interaction.guild.id }).select('language');
    const language = guildLanguage ? guildLanguage.language : 'en'; // Varsayılan dil: İngilizce
    const messages = require(`../lang//${language}.json`);

    // Komut işleme aşamasında dil tercihini iletebilirsiniz
    const context = {
      ...interaction,
      language,
      messages,
    };

    // Super class'ın handleCommandInteraction metodu ile işlemi devam ettir
    super.handleCommandInteraction(context);
  }
}

module.exports = CustomCommandKit;
