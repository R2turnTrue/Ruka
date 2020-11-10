const discord = require('discord.js')
module.exports.name = '입장채널'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')
const fs = require('fs')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  if (msg.member.hasPermission('ADMINISTRATOR')) {
    if (msg.content.split(' ')[2] !== undefined) {
      switch (msg.content.split(' ')[2]) {
        case '설정':
          if (msg.mentions.channels.first() !== undefined) {
            fs.writeFile('./data/guild_join_channel_' + msg.guild.id + '.txt', msg.mentions.channels.first().id, (err) => {
              if (err) {
                msg.channel.send(getErrorEmbed('`' + err.message + '`'))
              }
              msg.channel.send(getSuccessEmbed('성공적으로 설정되었습니다.'))
            })
          }
          break
        case '메시지설정':
          if (msg.content.split(' ')[3] !== undefined) {
            fs.writeFile('./data/guild_join_message_' + msg.guild.id + '.txt', msg.content.split('"')[1], (err) => {
              if (err) {
                msg.channel.send(getErrorEmbed('`' + err.message + '`'))
              }
              msg.channel.send(getSuccessEmbed('성공적으로 설정되었습니다.'))
            })
          }
          break
      }
    }
  } else {
    msg.channel.send(getErrorEmbed('권한이 없습니다. 관리자 권한을 획득하세요.'))
  }
}
