/* 음식을 벌거야 크하하하하ㅏㅎ하ㅏ하하ㅏ하 */

const discord = require('discord.js')
module.exports.name = '편의점'

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
        msg.channel.send(getErrorEmbed('가입을 먼저 진행해주세요. `!가입`'))
        return
      }
      msg.channel.send(getErrorEmbed('오류가 발생하였습니다. `' + result.error + '`'))
      return
    }

    msg.channel.send('먹을것을 10초 안에 골라주세요.\n:poultry_leg::150원: 25 배고픔 떨어뜨림\n🍔:300원: 50 배고픔 떨어뜨림').then((mesg) => {
      mesg.react('🍗')
      mesg.react('🍔')

      const f1 = (reaction, user) => reaction.emoji.name === '🍗' && user.id === msg.author.id
      const f2 = (reaction, user) => reaction.emoji.name === '🍔' && user.id === msg.author.id
      const collector1 = mesg.createReactionCollector(f1, { time: 10000 }) // 빈응 컬렉터 생성
      const collector2 = mesg.createReactionCollector(f2, { time: 10000 }) // 빈응 컬렉터 생성

      collector1.on('collect', (reaction, user) => {
        buy('닭다리', 150, 25, result, msg.member.id, msg)
      })

      collector2.on('collect', (reaction, user) => {
        buy('햄버거', 300, 50, result, msg.member.id, msg)
      })
    })
  })
}

/**
 *
 * @param {String} name
 * @param {Number} cost
 * @param {Number} full
 * @param {*} nowresult
 * @param {String} id
 * @param {discord.Message} msg
 */
function buy (name, cost, full, nowresult, id, msg) {
  if (nowresult.money >= cost) {
    const now = nowresult
    now.money -= cost
    now.hungry -= full
    if (now.hungry < 0) {
      now.hungry = 0
    }

    fu.update(now, id, (res) => {
      if (res.error !== undefined) {
        msg.channel.send(getErrorEmbed('`' + res.error + '`'))
        return
      }
      msg.channel.send(getSuccessEmbed(`${name}을 구매해 ${full} 만큼 배불러졌습니다!\n` + '```diff\n- 돈💰 ' + cost + '\n- 배고픔🍗 ' + full + '\n```'))
    })
  }
}
