const { SearchUser } = require('./../../models/users')

const LocalStrategy = require('passport-local')

const bcrypt = require('bcrypt')

const FIELDS_CONFIG = {
    usernameField:'email',
    passwordField:'password'
}

const loginUserStrategy = new LocalStrategy(FIELDS_CONFIG,async(email,password,cb) => {
    try {
        const userData = await SearchUser({email})
        if(!userData){
            cb(null,false,{ message:`The email/password provided is not valid: ${email}` })
        }
        if(! await bcrypt.compare(password,userData.hash)){
            cb(null,false,{ message:`The email/password provided is not valid: ${email}` })
        }
        delete userData.hash
        cb(null,userData)
    } catch (error) {
        cb(error)
    }
})

module.exports = loginUserStrategy