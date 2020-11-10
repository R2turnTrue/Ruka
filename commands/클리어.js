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
    if(msg.member.hasPermission('ADMINISTRATOR')) {
      msg.channel.bulkDelete(parseInt(msg.content.split(' ')[2]) + 1)
    } else {
      msg.channel.send(getErrorEmbed('권한이 없습니다. 관리자 권한을 획득하세요.'))
    }
    
  }
}
