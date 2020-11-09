const discord = require('discord.js')
module.exports.name = '내정보'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  fu.getDB(msg.member.id, (result) => {
    if (result.error !== undefined) {
      if (result.error === 'nodata') {
        msg.channel.send('가입을 먼저 진행해주세요. `!가입`')
        return
      }
      msg.channel.send('오류가 발생하였습니다. `' + result.error + '`')
      return
    }

    // msg.channel.send(JSON.stringify(result))

    const embed = new discord.MessageEmbed()
      .setTitle('A slick little embed')
    // Set the color of the embed
      .setColor(0xff0000)

    // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!')
    // Send the embed to the same channel as the message
    msg.channel.send(embed)
  })
}
