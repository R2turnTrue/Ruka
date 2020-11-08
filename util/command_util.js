const { MessageEmbed } = require("discord.js")

module.exports.prefixes = ['ㄹ ', 'r ', '루카야 ']

/**
 * Check is inputed command from message
 * @returns {Boolean}
 * @param {String} message 
 * @param {String} command 
 */
module.exports.isInputedThatCommand = (message, command) => {

    let match = false

    this.prefixes.forEach((elem) => {
        if(message.startsWith(elem + command)) {
            match = true
        }
    })

    return match
}

/**
 * get error embed
 * @returns {MessageEmbed}
 */

 module.exports.getErrorEmbed = (errorDesc) => {
    const embed = new MessageEmbed()
        .setTitle('<a:check_no:774795433901293580> 오류!')
        .setColor(0xff0000)
        .setDescription(errorDesc);

    return embed
 }

 /**
 * get success embed
 * @returns {MessageEmbed}
 */

module.exports.getSuccessEmbed = (desc) => {
    const embed = new MessageEmbed()
        .setTitle('<a:check_yes:774797069138657290> 성공!')
        .setColor(0x00ff00)
        .setDescription(desc);

    return embed
 }
 //