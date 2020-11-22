const discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const Express = require('express')
const app = Express()

const client = new discord.Client()

const commands = []

const fu = require('./util/file_util')
const { isInputedThatCommand, getErrorEmbed, getSuccessEmbed } = require('./util/command_util')

// 만약에 클라이언트가 준비되었다면, 아래의코드를 실행합니다
// 이 이벤트는 봇이 로그인 되고 한번만 실행될것입니다
client.once('ready', () => {
  client.user.setActivity({
    name: `${client.guilds.cache.size}개의 서버에 사용되고있어요! | 개발버전 | 프사 콘테스트 진행중! 자세한 정보는 https://discord.gg/F3sJTkWxQX 에서 확인하세요!`,
    type: 'PLAYING'
  })
  console.log('디스코드 봇이 준비되었습니다')
})

client.on('guildMemberAdd', (member) => {
  console.log('joined')
  if (fs.existsSync(`./data/guild_join_channel_${member.guild.id}.txt`) && fs.existsSync(`./data/guild_join_message_${member.guild.id}.txt`)) {
    fs.readFile(`./data/guild_join_message_${member.guild.id}.txt`, 'utf8', (err, data) => {
      if (!err) {
        fs.readFile(`./data/guild_join_channel_${member.guild.id}.txt`, 'utf8', (err2, dataa) => {
          if (!err2) {
            // client.channels.cache.get(dataa).send(data.replace('{usermention}', '<@' + member.id + '>'))
            // member.guild.channels.cache.find(dataa).send(data.replace('{usermention}', '<@' + member.id + '>'))
            member.guild.channels.cache.find(channel => channel.id == dataa).send(data.replace('{usermention}', '<@' + member.id + '>'))
          }//
        })
      }
    })
  }
})

client.on('message', (msg) => {
  if (msg.author.bot) return
  if (msg.channel.type === 'dm') {
    return msg.channel.send('DM에서는 이용하실 수 없습니다.')
  }

  commands.forEach((elem) => {
    if (isInputedThatCommand(msg.content, elem.name)) {
      elem.onCommand(client, msg)
    }
  })
})

console.log('명령어 로딩중...')
const list = fs.readdirSync('./commands/')
list.forEach((elem) => {
  if (elem.endsWith('.js')) {
    commands[commands.length] = require('./commands/' + elem.replace('.js', ''))
    console.log(elem.replace('.js', '') + ' 로딩 완료!')
  }
})

// 디스코드 토큰으로 디스코드에 로그인합니다
client.login(require('./token.json').token) // 네?

app.use(Express.static(path.join(__dirname, 'public')))
app.listen(8888, () => {
  console.log('[WEB] web process ready')
})
