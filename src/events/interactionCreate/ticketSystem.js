const { Interaction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ChannelType, } = require("discord.js");
const ticketSystemSchema = require("../../models/TicketSystem")

/**
 * @param {Object} param0
 * @param {Interaction} param0.interaction
 */
module.exports = async (interaction) => {

    if (interaction.isButton() && interaction.customId == "ticketBtnId") {
        const ticketdb = findGuild(interaction.guild.id);
        const tickedModal = new ModalBuilder()
            .setCustomId("ticketModalId")
            .setTitle("Support Ticket");
        const topicInput = new TextInputBuilder()
            .setCustomId("topicId")
            .setLabel("Topic")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("What is the topic of your issue ?")
            .setMinLength(3)
            .setMaxLength(25)
            .setRequired(true);
        const issueInput = new TextInputBuilder()
            .setCustomId("issueId")
            .setLabel("Issue")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("What is the issue of your facing ?")
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
                .setTitle('Ticket Opened')
                .setDescription("Ticked created, please wait for staff member to respond.")
                .setTimestamp()
                .addFields(
                    { name: 'User', value: `\`\`\`${interaction.user.username}\`\`\`` },
                    { name: 'Topic', value: `\`\`\`${topic}\`\`\`` },
                    { name: 'Issue', value: `\`\`\`${issue}\`\`\`` },
                );
            const closeTicketBtn = new ButtonBuilder()
                .setEmoji("🔒")
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger)
                .setCustomId("closeTicketBtnId");
            const pingBtn = new ButtonBuilder()
                .setEmoji("🔔")
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("pingStaffId")
            const row = new ActionRowBuilder().addComponents(closeTicketBtn, pingBtn);
            await channel.send({ embeds: [ticketOpenedEmbed], components: [row] })
            await interaction.reply({
                content: `${interaction.user.tag}, your ticket has been succesfully created! you can view it here ${channel}`,
                ephemeral: true,
            });
        })

        return;
    }
    else if (interaction.isButton() && interaction.customId == "closeTicketBtnId") {
        const ticketdb = findGuild(interaction.guild.id)
        interaction.channel.delete();
        const dmEmbed = new EmbedBuilder()
            .setTitle("Ticket Closed")
            .setDescription("Thank you for contacting support. Your ticket has been successfully closed. If you need assistance again please press the button below")
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: `Sent from ${interaction.guild.name}` })
        const dmButton = new ButtonBuilder()
            .setLabel('Return')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${ticketdb.channelId}`)
        const dmRow = new ActionRowBuilder().addComponents(dmButton);
        interaction.user.send({ embeds: [dmEmbed], components: [dmRow] })
        return;
    }
    else if (interaction.isButton() && interaction.customId == "pingStaffId") {
        const ticketdb = findGuild(interaction.guild.id)
        const staffEmbed = new EmbedBuilder()
            .setTitle("Staff Pinged")
            .setDescription("The staff have been pinged please wait.")
            .setColor("Blue")
            .setTimestamp()
            .setFooter({ text: "Staff pinged at" });
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