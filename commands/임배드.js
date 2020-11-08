const discord = require('discord.js')
module.exports.name = '임배드'

const {getErrorEmbed, getSuccessEmbed} = require('../util/command_util')
const fu = require('../util/file_util')

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} msg 
 */
module.exports.onCommand = (client, msg) => {
    const embed = new discord.MessageEmbed()
            .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)

            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        msg.channel.send(embed);
}