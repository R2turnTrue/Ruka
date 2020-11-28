/* 큰돈을 벌거야 크하하하하하하하하하하하 */

const discord = require('discord.js')
module.exports.name = '돈벌기'
module.exports.category = 'game'

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

    if (result.hungry === 50) {
      msg.channel.send('배가 고파서 일을 할 수 없습니다. 편의점에 가서 음식을 먹고 와주세요.')
      return
    }

    msg.channel.send('할 일을 3초 안에 골라주세요.\n:one:: 광질').then((mesg) => {
      mesg.react('1️⃣')

      const f1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === msg.author.id
      const collector1 = mesg.createReactionCollector(f1, { time: 3000 }) // 빈응 컬렉터 생성

      collector1.on('collect', (reaction, user) => {
        mesg.delete()
        let wone = 0
        mesg.channel.send('15초 안에 클릭한 횟수만큼 돈을 획득합니다! 벌 수 있는 돈: 0원').then((meesg) => {
          meesg.react('⛏️')
          const filter = (reaction, user) => reaction.emoji.name === '⛏️' && user.id === msg.author.id
          const collector = meesg.createReactionCollector(filter, { time: 15000 })

          collector.on('collect', (reacti, usr) => {
            wone += 10
            meesg.edit('15초 안에 클릭한 횟수만큼 돈을 획득합니다! 벌 수 있는 돈: ' + wone + '원')
            meesg.reactions.resolve('⛏️').users.remove(msg.member.id)
          })

          collector.on('end', (collected, reason) => {
            meesg.delete()
            meesg.channel.send('💰 ' + wone + '원을 벌었습니다.')

            const newdata = result
            result.money += wone
            result.hungry += 10

            fu.update(newdata, msg.member.id, (res2) => {
              if (res2.error !== undefined) {
                meesg.channel.send(getErrorEmbed('`' + res2.error + '`'))
              }
            })
          })
        })
      })
    })
  })
}
