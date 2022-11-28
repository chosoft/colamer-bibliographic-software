const { SearchUser } = require('./../../models/users')

const LocalStrategy = require('passport-local')

const bcrypt = require('bcrypt')

const FIELDS_CONFIG = {
    usernameField:'email',
    passwordField:'password'
}

const loginUserStrategy = new LocalStrategy(FIELDS_CONFIG,async(email,password,cb) => {
    try {
        
    } catch (error) {
        cb(error)
    }
})

const loginUser = (email,password) => { 
    return new Promise(async(resolve,reject) => {
        try {
            const userData = await SearchUser({email})
            if(!userData){
                throw new Error(`The email/password provided is not valid: ${email}`, { cause:'UserInput' })
            }
            if(! await bcrypt.compare(password,userData.hash)){
                throw new Error(`The email/password provided is not valid: ${email}`, { cause:'UserInput' })
            }
            delete userData.hash
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = loginUser