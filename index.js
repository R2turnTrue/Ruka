const discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const client = new discord.Client()

let commands = []

const fu = require('./util/file_util')
const {isInputedThatCommand, getErrorEmbed, getSuccessEmbed} = require('./util/command_util')


// 만약에 클라이언트가 준비되었다면, 아래의코드를 실행합니다
// 이 이벤트는 봇이 로그인 되고 한번만 실행될것입니다
client.once('ready', () => {
  console.log("디스코드 봇이 준비되었습니다");
});

// 히익 왜 node_modules가 없....A
// 수정하ㅣㅅ고 저장하시면 몇초 뒤 바로 반영됩니다
// 지금 보니 버그가 꽤 많네요
//흑..저는 아직도 초보임당..
// 하다보면ㅠ나져요 감사합니당!


client.on('message', (msg) => {
    if(msg.author.bot) return
    if(msg.channel.type === 'dm') {
        return msg.channel.send('DM에서는 이용하실 수 없습니다.')
    }

    commands.forEach((elem) => {
        if(isInputedThatCommand(msg.content, elem.name)) {
            elem.onCommand(client, msg)
        }
    })

    /*
    if(isInputedThatCommand(msg.content, '클리어') && !isNaN(parseInt(msg.content.split(' ')[2]))) {
        msg.channel.bulkDelete(parseInt(msg.content.split(' ')[2]) + 1)
    }

    if(msg.author !== client.user) {
        if(isInputedThatCommand(msg.content, '퐁')) {
            msg.channel.send('퐁!');
        }
    }

    if (isInputedThatCommand(msg.content, '내정보')) {
        fu.getDB(msg.member.id, (result) => {
            if(result.error !== undefined) {
                if(result.error === 'nodata') {
                    msg.channel.send('가입을 먼저 진행해주세요. `!가입`')
                    return
                }
                msg.channel.send('오류가 발생하였습니다. `' + result.error + '`')
                return
            }
            
            //msg.channel.send(JSON.stringify(result))

            const embed = new discord.MessageEmbed()
            .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)

            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
            // Send the embed to the same channel as the message
            msg.channel.send(embed);
        })
        
        
    }

    if (isInputedThatCommand(msg.content, '가입')) {
        const result = fu.register(msg.member.id, msg.author.tag, (result) => {
            if(result.error !== undefined) {
                if(result.error === 'already_exists') {
                    const embed = getErrorEmbed('이미 가입되어있습니다!')
                    msg.channel.send(embed);
                    return
                } else {
                    const embed = getErrorEmbed('`' + result.error + '`')
                    msg.channel.send(embed);
                    //msg.channel.send('오류가 발생하였습니다. `' + result.error + '`')
                    return
                }
            }
            msg.channel.send(getSuccessEmbed('성공적으로 가입되었습니다.'))
            //msg.channel.send('<a:check:774797069138657290> 성공적으로 가입되었습니다.')
        })

        
    }

    if (isInputedThatCommand(msg.content, '도박')) {

    }


    
    if (isInputedThatCommand(msg.content, '프사')) {
        // Send the user's avatar URL
        msg.channel.send(msg.author.displayAvatarURL());
    }

    if(isInputedThatCommand(msg.content, '임배드')) {
        const embed = new discord.MessageEmbed()
            .setTitle('A slick little embed')
            // Set the color of the embed
            .setColor(0xff0000)

            // Set the main content of the embed
            .setDescription('Hello, this is a slick embed!');
        // Send the embed to the same channel as the message
        msg.channel.send(embed);
      }

      if(isInputedThatCommand(msg.content, '현재시각')) {
            let date = new Date()
            const embed = new discord.MessageEmbed()
            .setTitle('현재 시각입니다. (서버 위치 기준)')
            .setColor(0xff0000)
            .setDescription(`${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`)
            /*
            .addField('시', date.getHours())
            .addField('분', date.getMinutes())
            .addField('초', date.getSeconds())
            msg.channel.send(embed);
            //msg.channel.send(`${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`)
        }

        // 여기 안쪽에 적어주세요 :)
        */

});

console.log('명령어 로딩중...')
const list = fs.readdirSync('./commands/')
list.forEach((elem) => {
    if(elem.endsWith('.js')) {
        commands[commands.length] = require('./commands/' + elem.replace('.js', ''))
        console.log(elem.replace('.js', '') + ' 로딩 완료!')
    }
})

// 디스코드 토큰으로 디스코드에 로그인합니다
client.login(`NzczMTUzMzcyNTkyNTM3NjIx.X6FFMA.kmLO6bC90K9lmsVDG0CZAhU-isE`); // 네?