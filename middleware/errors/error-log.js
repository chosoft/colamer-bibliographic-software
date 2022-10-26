const fs = require('fs')
const path = require('path')

const errorLog = (err,req,res,next) => {
    const error_moment = new Date()
    const TIME_STAMP = `${error_moment.getHours()}:${error_moment.getMinutes()} ${error_moment.getDate()}-${error_moment.getMonth()+1}-${error_moment.getFullYear()}`
    const ERROR_MSG = `${err.message} - ${TIME_STAMP} \n ${err.stack} \n\n -------------------- \n`
    fs.writeFile(path.join(__dirname,'./../../.log'),ERROR_MSG,{flag:'a'},(err) => {
        if(err){
            throw new Error(err)
        }
    })
}

module.exports = errorLog