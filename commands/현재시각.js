const discord = require('discord.js')
module.exports.name = '현재시각'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  const date = new Date()
  const embed = new discord.MessageEmbed()
    .setTitle('현재 시각입니다. (서버 위치 기준)')
    .setColor(0xff0000)
    .setDescription(`${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`)
  /*
            .addField('시', date.getHours())
            .addField('분', date.getMinutes())
            .addField('초', date.getSeconds())
            */
  msg.channel.send(embed)
  // msg.channel.send(`${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`)
}
