const discord = require('discord.js')
module.exports.name = '가입'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = async (client, msg) => {
  fu.register(msg.member.id, msg.author.tag, (result) => {
    if (result.error !== undefined) {
      if (result.error === 'already_exists') {
        const embed = getErrorEmbed('이미 가입되어있습니다!')
        msg.channel.send(embed)
        return
      } else {
        const embed = getErrorEmbed('`' + result.error + '`')
        msg.channel.send(embed)
        // msg.channel.send('오류가 발생하였습니다. `' + result.error + '`')
        return
      }
    }
    msg.channel.send(getSuccessEmbed('성공적으로 가입되었습니다.'))
    // msg.channel.send('<a:check:774797069138657290> 성공적으로 가입되었습니다.')
  })
}
