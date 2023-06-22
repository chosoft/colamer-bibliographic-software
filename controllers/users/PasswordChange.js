const uuid = require('uuid')

const {SearchToken} = require('./../../models/recover_tokens')

const validateUUIDToken = (token) => {
    return new Promise(async(resolve,reject) => {
        try {
            const tokenIsValid = uuid.validate(token)
            if(!tokenIsValid){
                reject({page:'errorToken',renderData:{errorMsg:'Este token no existe o ha expirado'}})
                return
            }
            await validateTokenUsability(token)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const validateTokenUsability = (token) => {
    return new Promise(async(resolve,reject) => {
        try {

            const DBToken = await SearchToken(token)
            if(!DBToken){
                reject({page:'errorToken',renderData:{errorMsg:'Este token no existe o ha expirado'}})
                return
            }
            await tokenIsAlreadyUsed(DBToken)
            await tokenUsedInAInvalidTime(DBToken)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const tokenIsAlreadyUsed = (tokenData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const { available } = tokenData
            if(!available){
                reject({page:'errorToken',renderData:{errorMsg:'Este token no existe o ha expirado'}})
                return
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const tokenUsedInAInvalidTime = (tokenData) => {
    return new Promise(async(resolve,reject) =>{
        try {
            const tokenDate = new Date(tokenData.createdAt).getTime()
            const actualDate = Date.now()
            const difference = actualDate - tokenDate
            const minutesDifference = Math.round(difference/60000)
            if(minutesDifference >= 10){
                reject({page:'errorToken',renderData:{errorMsg:'Este token no existe o ha expirado'}})
                return
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const PasswordChange = (token) => {
    return new Promise(async (resolve,reject) => {
        try {
            await validateUUIDToken(token)
            await validateTokenUsability(token)
            resolve({page:'changePassword',renderData:{token}})
        } catch (error) {
            const hasPage = error.page  ? true:false
            if(hasPage){
                resolve(error)
                return
            }
            reject(error)
        }
    })
}

module.exports = PasswordChange