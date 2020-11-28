const discord = require('discord.js')
const ytdl = require('ytdl-core')
module.exports.name = '음악'
module.exports.category = 'util'

const queueSrv = new Map()

const { getErrorEmbed, getSuccessEmbed } = require('../util/command_util')
const fu = require('../util/file_util')
/**
 *
 * @param {String} url
 * @param {discord.Message} msg
 */
function playMusic (url, msg, connection) {
  connection.play(ytdl(url, { filter: 'audioonly' })).end(() => {
    const queue = queueSrv.get(msg.member.voice.channel.id)
    if (queue.queue[queue.now + 1] != undefined) {
      queue.now += 1
      queueSrv.set(msg.member.voice.channel.id, queue)
      playMusic(queue.queue[queue.now], msg, connection)
    } else {
      msg.channel.send(':musical_note: 큐에 더이상 재생할 음악이 없어 정지했어요.')
    }
  })
  msg.channel.send(':musical_note: 현재 재생중: ' + url)
}

/**
 *
 * @param {discord.Client} client
 * @param {discord.Message} msg
 */
module.exports.onCommand = (client, msg) => {
  if (msg.content.split(' ')[2] != undefined) {
    switch (msg.content.split(' ')[2]) {
      case '재생':
        if (msg.member.voice.channel) {
          if (msg.content.split(' ')[3] != undefined) {
            if (msg.content.split(' ')[3].startsWith('https://www.youtube.com') || msg.content.split(' ')[3].startsWith('https://youtube.com') || msg.content.split(' ')[3].startsWith('https://www.youtu.be') || msg.content.split(' ')[3].startsWith('https://youtu.be')) {
              msg.member.voice.channel.join().then((connection) => {
                if (queueSrv.has(msg.member.voice.channel.id)) {
                  const arrList = queueSrv.get(msg.member.voice.channel.id)
                  arrList.queue[arrList.queue.length] = msg.content.split(' ')[3]
                } else {
                  const qObj = { queue: [msg.content.split(' ')[3]], now: 0 }

                  queueSrv.set(msg.member.voice.channel.id, qObj.length)

                  playMusic(qObj.queue[qObj.now], msg, connection)
                }
              })
            }
          } else {
            msg.channel.send('음악 YouTube 주소까지 적어주세요.')
          }
        } else {
          msg.channel.send(getErrorEmbed('음성 채널에 먼저 들어가 주세요!'))
        }
        break
      case '멈춤':
        if (msg.member.voice.channel && client.voice.connections.get(msg.member.voice.id) && queueSrv.has(msg.member.voice.channel.id)) {
          queueSrv.delete(msg.member.voice.channel.id)
          msg.member.voice.channel.leave()
        }
        break
    }
  }
}
