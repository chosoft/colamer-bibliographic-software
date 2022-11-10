const mongoose = require('mongoose')
const { Schema,model } = mongoose
const bcrypt = require('bcrypt')

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
            const { password } = userData
            bcrypt.hash(password,5,async(err,hash) => {
                try {
                    if(err){
                        reject(err)
                    }
                    delete userData.password
                    userData.hash = hash
                    const newUser = await new User(userData)
                    await newUser.save()
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const SearchUser = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const userFound = await User.findOne(filter)
            
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    CreateUser
}