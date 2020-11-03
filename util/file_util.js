const fs = require('fs')
const datatemplate = { userid: '', nickname: '', level: 1, exp: 0, money: 0, dobak_machine_num: 0 }

module.exports.getDB = (userid, callback) => {
    if(fs.existsSync('./data/' + userid + '.json')) {

        fs.readFile('./data/' + userid + '.json', (err, data) => {
            if (err) {
                callback({error: err.message})
                return
            } 

            callback(JSON.parse(data))
            return
        })

    } else {
        callback({error: 'nodata'})
        return
    }
}

module.exports.register = (userid, usertag, callback) => {
    if(fs.existsSync('./data/' + userid + '.json')) {
        return {error: 'already_exists'}
    } else {
    
        let newData = datatemplate
        newData.userid = userid
        newData.nickname = usertag

        this.update(newData, userid, (result) => {
            if(result.error !== undefined) {
                callback({error: result.error})
                return
            }
    
            callback({status: 'ok'})
            return
        })
    }
}

module.exports.update = (newdata, userid, callback) => {
    fs.writeFile('./data/' + userid + '.json', JSON.stringify(newdata), (err) => {
        if(err) {
            callback({error: err.message})
            return
        }

        callback({status: 'ok'})
        return
    })
}