const discord = require('discord.js')
module.exports.name = '내정보'
module.exports.category = 'profile'

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
      .setTitle('내 정보')
    // Set the color of the embed
      .setColor(0x00ff00)

    // Set the main content of the embed
      .setDescription('```✏ 닉네임: ' + result.nickname + '\n💡 봇 사용 레벨/경험치: ' + result.level + '/' + result.exp + '\n💰 돈: ' + result.money + '\n✨ 하루에 도박을 한 횟수: ' + result.dobak_machine_num + '/5\n🍗 배고픔: ' + result.hungry + '/50\n```')
    // Send the embed to the same channel as the message
    msg.channel.send(embed)
  })
}
