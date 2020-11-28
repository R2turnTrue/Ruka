const discord = require('discord.js')
const e = require('express')
module.exports.name = '도움말'
module.exports.category = 'util'

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 * @param {Array} commands
 */
module.exports.onCommand = (client, msg, commands) => {
    // now category: util, game, profile, admin, test(ONLY DEVVERSION)
    if(msg.content.split(' ').length === 2) {
        msg.channel.send('올바른 도움말 명령어 사용법이에요!\n`ㄹ 도움말 <카테고리>`\n\n아래의 카테고리를 참고해 도움말을 사용하세요!\n`util, game, profile, admin`')
        return
    }


        let embed = new discord.MessageEmbed()
        embed.setTitle('`' + msg.content.split(' ')[2] + '` 카테고리의 명령어')
        let uhh = '`'

        commands.forEach((elem) => {
            if(elem.category === msg.content.split(' ')[2]) {
                uhh += elem.name + ','

            }
        })
        uhh += '`'
        embed.setDescription(uhh)
        msg.channel.send(embed)
    

    return
}