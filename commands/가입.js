const discord = require('discord.js')
module.exports.name = '가입'

const captcha = require('nodejs-captcha')

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = async (client, msg) => {
  fu.exist(msg.member.id, msg.author.tag, (result) => {
    if (result.error !== undefined) {
      if (result.error === 'already_exists') {
        const embed = getErrorEmbed('이미 가입되어있습니다!')
        msg.channel.send(embed)
        return
      }
    }
    let newCaptcha = captcha()
    let value = newCaptcha.value
    console.log(value)
    let imagebase64 = newCaptcha.image
    msg.channel.send(new discord.MessageAttachment(Buffer.from(imagebase64.replace('data:image/jpeg;base64,', ''), 'base64'))).then((mesg) => {
      const filter = m => m.author.id == msg.author.id;
      msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']})
      .then(collected => {
        if(collected.first().content == value) {
          fu.register(msg.author.id, msg.author.tag, (status) => {
            if (status.error !== undefined) {
              const embed = getErrorEmbed('`' + status.error + '`')
              msg.channel.send(embed)
              return
            }

            msg.channel.send(getSuccessEmbed('성공적으로 가입되었습니다.'))
          })
        } else {
          msg.channel.send(getErrorEmbed('캡챠가 맞지 않습니다.'))
        }
      })
      .catch(collected => {
        
      })
      
    })
    
    // msg.channel.send('<a:check:774797069138657290> 성공적으로 가입되었습니다.')
  })
}
