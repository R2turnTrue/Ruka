const discord = require('discord.js')
module.exports.name = '도박'

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

    if (result.dobak_machine_num == 3) {
      msg.channel.send('하루 도박 제한에 도달해서 도박을 할 수 없습니다. 내일 다시 와주세요! :)')
      return
    }

    msg.channel.send('돈을 선택해 걸어주세요.\n:one:: 100원\n:two:: 1000원\n:three:: 5000원\n:four:: 10000원').then((mesg) => {
      mesg.react('1️⃣')
      mesg.react('2️⃣')
      mesg.react('3️⃣')
      mesg.react('4️⃣')

      const f1 = (reaction, user) => reaction.emoji.name === '1️⃣' && user.id === msg.author.id
      const collector1 = mesg.createReactionCollector(f1, { time: 60000 }) // 빈응 컬렉터 생성

      const f2 = (reaction, user) => reaction.emoji.name === '2️⃣' && user.id === msg.author.id
      const collector2 = mesg.createReactionCollector(f2, { time: 60000 }) // 빈응 컬렉터 생성

      const f3 = (reaction, user) => reaction.emoji.name === '3️⃣' && user.id === msg.author.id
      const collector3 = mesg.createReactionCollector(f3, { time: 60000 }) // 빈응 컬렉터 생성

      const f4 = (reaction, user) => reaction.emoji.name === '4️⃣' && user.id === msg.author.id
      const collector4 = mesg.createReactionCollector(f4, { time: 60000 }) // 빈응 컬렉터 생성

      collector1.on('collect', (reaction, user) => {
        buy(client, msg, 100)
      })
      collector2.on('collect', (reaction, user) => {
        buy(client, msg, 1000)
      })
      collector3.on('collect', (reaction, user) => {
        buy(client, msg, 5000)
      })
      collector4.on('collect', (reaction, user) => {
        buy(client, msg, 10000)
      })
    })
  })
}

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 * @param {Number} money
 */
function buy (client, msg, money) {
  fu.getDB(msg.author.id, (result) => {
    if (result.error !== undefined) {
      if (result.error === 'nodata') {
        msg.channel.send(getErrorEmbed('가입을 먼저 진행해주세요. `!가입`'))
        return
      }
      msg.channel.send(getErrorEmbed('오류가 발생하였습니다. `' + result.error + '`'))
      return
    }

    if (result.money < money) {
      msg.channel.send(getErrorEmbed('돈이 부족합니다.'))
      return
    }

    msg.channel.send('두구두구두구!')
    setTimeout(() => {
      const ran1 = Math.floor(Math.random() * 100)
      console.log(ran1)

      if (ran1 > 70) { // 30%
        msg.channel.send('당첨되었습니다! 돈을 더 획득합니다!')
        const newdata = result
        newdata.money += money
        newdata.dobak_machine_num += 1
        fu.update(newdata, msg.author.id, (result) => {
          if (result.error !== undefined) {
            msg.channel.send(getErrorEmbed('오류가 발생하였습니다! 돈과 도박 제한 횟수는 변하지 않습니다! `' + result.error + '`'))
          }
        })
        return
      }
      msg.channel.send('실패하였습니다.. 돈을 잃습니다..')
      const newdata = result
      newdata.money -= money
      newdata.dobak_machine_num += 1
      fu.update(newdata, msg.author.id, (result) => {
        if (result.error !== undefined) {
          msg.channel.send(getErrorEmbed('오류가 발생하였습니다! 돈과 도박 제한 횟수는 변하지 않습니다! `' + result.error + '`'))
        }
      })
    }, 3000)
  })
}
