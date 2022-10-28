const LocalStrategy = require('passport-local')

const FIELDS_CONFIG = {
    usernameField:'email',
    passwordField:'password'
}

const userAuth = new LocalStrategy(FIELDS_CONFIG,async(email,password,cb) => {
    try {
        
    } catch (error) {
        cb(null,false,error)
    }
})

module.exports = userAuth