const discord = require('discord.js')
module.exports.name = '핑'

const {getErrorEmbed, getSuccessEmbed} = require('../util/command_util')
const fu = require('../util/file_util')

/**
 * 
 * @param {discord.Client} client 
 * @param {discord.Message} msg 
 */
module.exports.onCommand = (client, msg) => {
    msg.channel.send('퐁!');
}