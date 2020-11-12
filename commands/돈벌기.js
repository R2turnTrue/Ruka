/* 큰돈을 벌거야 크하하하하하하하하하하하 */

const discord = require('discord.js')
module.exports.name = '돈벌기'

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
    
        if (result.dobak_machine_num === 3) {
          msg.channel.send('하루 도박 제한에 도달해서 도박을 할 수 없습니다. 내일 다시 와주세요! :)')
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
                const collector = meesg.createReactionCollector(filter, {time:15000})

                collector.on('collect', (reacti, usr) => {
                    wone += 10
                    meesg.edit('15초 안에 클릭한 횟수만큼 돈을 획득합니다! 벌 수 있는 돈: ' + wone + '원')
                    reacti.remove()
                })
            })
          })
        })
      })
}
