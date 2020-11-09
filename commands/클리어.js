const discord = require('discord.js')
module.exports.name = '클리어'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  if (!isNaN(parseInt(msg.content.split(' ')[2]))) {
    msg.channel.bulkDelete(parseInt(msg.content.split(' ')[2]) + 1)
  }
}
