const { Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, } = require("discord.js");
const ticketSystemSchema = require("../../models/TicketSystem")
const LanguageService = require("../../utils/LanguageService"); // Dil servisi eklenmiş
let langData
/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {

    if (interaction.isButton() && interaction.customId == "ticketBtnId") {
        langData = await LanguageService.getLocalizedString(interaction.guildId, "ticketSys");
        langData = langData.ticketBtn
        const ticketdb = findGuild(interaction.guild.id);
        const tickedModal = new ModalBuilder()
            .setCustomId("ticketModalId")
            .setTitle(langData.modalTitle);
        const topicInput = new TextInputBuilder()
            .setCustomId("topicId")
            .setLabel(langData.topic)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder(langData.topicPlaceHolder)
            .setMinLength(3)
            .setMaxLength(25)
            .setRequired(true);
        const issueInput = new TextInputBuilder()
            .setCustomId("issueId")
            .setLabel(langData.issue)
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder(langData.issuePlaceholder)
            .setMinLength(15)
            .setMaxLength(250)
            .setRequired(true);
        const topicInputRow = new ActionRowBuilder().addComponents(topicInput)
        const issueInputRow = new ActionRowBuilder().addComponents(issueInput)
        tickedModal.addComponents(topicInputRow, issueInputRow);
        await interaction.showModal(tickedModal);
        return;
    }
    else if (interaction.isModalSubmit() && interaction.customId == "ticketModalId") {
        langData = await LanguageService.getLocalizedString(interaction.guildId, "ticketSys");
        langData = langData.ticketModal
        const ticketdb = await findGuild(interaction.guild.id);
        const topic = interaction.fields.getTextInputValue('topicId')
        const issue = interaction.fields.getTextInputValue('issueId')
        await interaction.guild.channels.create({
            name: `${interaction.user.username}-ticket`,
            parent: ticketdb.categoryId,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: PermissionFlagsBits.ViewChannel,
                },
                {
                    id: ticketdb.staffRoleId,
                    allow: PermissionFlagsBits.ViewChannel,
                },
                {
                    //everyone cannot see
                    id: interaction.guild.roles.everyone,
                    deny: PermissionFlagsBits.ViewChannel,
                },

            ]

        }).then(async (channel) => {
            const ticketOpenedEmbed = new EmbedBuilder()
                .setTitle(langData.embedOpened)
                .setDescription(langData.embedOpenDesc)
                .setTimestamp()
                .addFields(
                    { name: langData.user, value: `\`\`\`${interaction.user.username}\`\`\`` },
                    { name: langData.topic, value: `\`\`\`${topic}\`\`\`` },
                    { name: langData.issue, value: `\`\`\`${issue}\`\`\`` },
                );
            const closeTicketBtn = new ButtonBuilder()
                .setEmoji("🔒")
                .setLabel(langData.btnClose)
                .setStyle(ButtonStyle.Danger)
                .setCustomId("closeTicketBtnId");
            const pingBtn = new ButtonBuilder()
                .setEmoji("🔔")
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("pingStaffId")
            const row = new ActionRowBuilder().addComponents(closeTicketBtn, pingBtn);
            await channel.send({ embeds: [ticketOpenedEmbed], components: [row] })
            await interaction.reply({
                content: langData.success.replace("{{interaction.user.tag}}", interaction.user.tag).replace("{{channel}}", channel),
                ephemeral: true,
            });
        })

        return;
    }
    else if (interaction.isButton() && interaction.customId == "closeTicketBtnId") {
        langData = await LanguageService.getLocalizedString(interaction.guildId, "ticketSys");
        langData = langData.closeTicketBtn
        const ticketdb = findGuild(interaction.guild.id)
        interaction.channel.delete();
        const dmEmbed = new EmbedBuilder()
            .setTitle(langData.title)
            .setDescription(langData.desc)
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: langData.footer.replace("{{interaction.guild.name}}", interaction.guild.name) })
        const dmButton = new ButtonBuilder()
            .setLabel(langData.btnLabel)
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${ticketdb.channelId}`)
        const dmRow = new ActionRowBuilder().addComponents(dmButton);
        interaction.user.send({ embeds: [dmEmbed], components: [dmRow] })
        return;
    }
    else if (interaction.isButton() && interaction.customId == "pingStaffId") {
        langData = await LanguageService.getLocalizedString(interaction.guildId, "ticketSys");
        langData = langData.pingStaff
        const ticketdb = findGuild(interaction.guild.id)
        const staffEmbed = new EmbedBuilder()
            .setTitle(langData.title)
            .setDescription(langData.desc)
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: langData.footer });
        await interaction.reply({
            content: `<@&${ticketdb.staffRoleId}>`,
            embeds: [staffEmbed]
        })
        return;
    }


    async function findGuild(guild) {
        const ticketSystem = await ticketSystemSchema.findOne({ guildId: guild });
        if (!ticketSystem) return;
        return await ticketSystem;
    }
}