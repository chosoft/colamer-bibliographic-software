const LocalStrategy = require('passport-local')

const FIELDS_CONFIG = {
    usernameField:'email',
    passwordField:'password'
}

const loginUser = require('./../utils/auth/login-user')

const userAuth = new LocalStrategy(FIELDS_CONFIG,async(email,password,cb) => {
    try {
        const userInfo = await loginUser(email,password)
        cb(null,userInfo)
    } catch (error) {
        cb(null,false,error)
    }
})

module.exports = userAuth