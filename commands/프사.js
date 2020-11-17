const discord = require('discord.js')
module.exports.name = '프사'

const cu = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  if(msg.mentions.members.first() !== undefined) {
    let embed = new discord.MessageEmbed()
    embed.setTitle(msg.mentions.members.first().user.tag + '님의 프로필사진')
    embed.setImage(msg.mentions.members.first().user.displayAvatarURL())
    msg.channel.send(embed)
    return
  }
  let embed = new discord.MessageEmbed()
  embed.setTitle(msg.author.tag + '님의 프로필사진')
  embed.setImage(msg.author.displayAvatarURL())
  msg.channel.send(embed)
  return
}
