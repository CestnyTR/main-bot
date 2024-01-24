const { Guild, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const welcomeSchema = require('../../models/Welcome');
const Canvas = require('canvas')
const LanguageService = require("../../utils/LanguageService");

/**
 * @param {Object} param0 
 * @param {Guild} param0.member
 */
module.exports = async (member) => {

    const guildId = member.guild.id;
    const data = await welcomeSchema.findOne({ Guild: guildId });
    if (!data) return;
    const channelId = data.Channel;
    const registerChannelId = data.registerChannel;

    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;
    const langData = await LanguageService.getLocalizedString(guildId, 'welcome');

    const canvas = Canvas.createCanvas(1024, 500) // Create Canvas
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/873226675570216990/1194029579556364418/umLOhA3.jpg?ex=65aeddb3&is=659c68b3&hm=cd17017e42df8d0cd5f6f8adf018f794bf69708f8cc17d3fb5afb136cbc748d3&') // Using Link
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height) // Setting Background Image
    ctx.strokeStyle = '#4F82F5' // Keeping Stroke Color

    // Making A Circle Around Avatar
    ctx.beginPath()
    ctx.arc(512, 166, 128, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.fillStyle = '#4F82F5'
    ctx.fill()

    // Welcome Text
    ctx.font = '72px sans-serif' // Font For Welcome Text
    ctx.fillStyle = '#FFFFFF' // Colour For Welcome Text
    ctx.fillText('Welcome', 360, 360) // Display Welcome Text On Image

    // Username
    const name = `${member.user.username}` // Username Of User
    if (name.length >= 16) { // If Name Is Greater Than 16
        ctx.font = '42px sans-serif' // Font For Displaying Name
        ctx.textAlign = 'center' // Keeping The Text In Center
        ctx.fillStyle = '#0FEEF3' //Colour Of Name
        ctx.fillText(name, 512, 410) // Displaying Name On Image
    } else { // If Name Is Less Than 16
        ctx.font = '47px sans-serif' // Font For Displaying Name
        ctx.textAlign = 'center' // Keeping The Text In Center
        ctx.fillStyle = '#0FEEF3' //Colour Of Name
        ctx.fillText(name, 512, 410) // Displaying Name On Image
    }

    // Member Count
    const member_count = langData.memberCount.replace('{{count}}', member.guild.memberCount);
    ctx.font = '34px sans-serif' // Font For Displaying Member Count
    ctx.textAlign = 'center' // Keeping The Text In Center
    ctx.fillStyle = '#21FBA1' //Colour Of Member Count
    ctx.fillText(member_count, 512, 455) // Displaying Member Count On Image

    // Avatar
    ctx.beginPath()
    ctx.arc(512, 166, 119, 0, Math.PI * 2, true) // Avatar Of User
    ctx.closePath()
    ctx.clip() // Making Avatar Circle
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg' })) // getting Users Avatar
    ctx.drawImage(avatar, 393, 47, 238, 238) // Adjusting Avatar In Circle

    const attachment = new AttachmentBuilder(await canvas.toBuffer(), {
        name: 'welcome.png'
    }) // Sending Image As Attachment

    let message = data.Message
    if (!message || message === null) message = langData.svMessage.replace('{{guildName}}', member.guild.name);
    let rule = data.registerChannel
    if (!rule || rule === null) rule = registerChannelId

    const welcomeEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTimestamp()
        .setAuthor({
            name: langData.title,
            iconURL: member.guild.iconURL()
        })
        .setImage('attachment://welcome.png')
        .setDescription(`
        ${langData.message} <@${member.id}>
        ${langData.registerChannel} <#${registerChannelId}>
        `);

    const row = new ActionRowBuilder();
    row.components.push(
        new ButtonBuilder()
            .setCustomId("register")
            .setLabel("Register")
            .setStyle(ButtonStyle.Primary)
    );

    await channel.send({ content: `<@${member.id}>\n${message}`, embeds: [welcomeEmbed], files: [attachment] }) // Send Embed, Image And Mess


}
