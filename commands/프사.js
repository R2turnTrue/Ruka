const discord = require('discord.js')
module.exports.name = '프사'

const cu = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  msg.channel.send(msg.author.displayAvatarURL())
}
