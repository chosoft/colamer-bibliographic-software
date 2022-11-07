const mongoose = require('mongoose')
const { Schema,model } = mongoose


const USER_SCHEMA = new Schema({
    username:String,
    hash:String,
    email:String,
    rol:{type:String,default:'user'},
    timestamp:{type:Date, default: Date.now}
})

const User = new model('user',USER_SCHEMA)

const CreateUser = (userData) => {
    return new Promise(async(resolve,reject) => {
        try {
            
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    CreateUser
}