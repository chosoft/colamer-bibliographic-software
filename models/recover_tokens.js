const mongoose = require('mongoose')
const { Schema, model } = mongoose

const TOKEN_SCHEMA = new Schema({
    associatedId:Schema.ObjectId,
    tokenHash:String,
    createdAt: { type:Date, default: Date.now() },
    available: Boolean
})

const Token = new model('Tokens',TOKEN_SCHEMA)

const CreateToken = (tokenData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const newToken = await new Token(tokenData)
            await newToken.save()
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const SearchToken = (tokenHash) => {
    return new Promise(async(resolve,reject) => {
        try {
            const tokenData = Token.findOne({tokenHash})
            resolve(tokenData)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    CreateToken,
    SearchToken
}