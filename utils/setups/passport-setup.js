//The Main package to allow the app use a Authentication strategy -> Passport JS
const passport = require('passport')
//This is a package to allow the use of session in the server side
const session = require('express-session')
//Flash is a package to maintain the error messages in the server with the intention to display
//them to the user
const flash = require('connect-flash')
//Connect-Sqlite3 is a minimalistic session store this work with express-session
const SQLiteStore = require('connect-sqlite3')(session)
//Some Env variables to the right work of the User auth
const { secret } = require('../../configs/env')
//User model Search Function to find the user that will be auth
const { SearchUser } = require('./../../models/users')
//
const userAuth = require('./../../auth/login-user')

const SESSION_CONFIG = {
    secret:secret,
    cookie:{
        maxAge:10800000,
        httpOnly:true,
        expires: new Date(Date.now() + 10800000 * 5),
        sameSite:'strict'
    },
    resave: false,
    saveUninitialized:false,
    store:new SQLiteStore
}

const passportSetup = (server) => {
    //Session persistent 
    server.use(session(SESSION_CONFIG))
    //Flash messages for auth errors
    server.use(flash())
    //Passport Local Strategy
    passport.use(userAuth)

    passport.serializeUser((user,cb) => {
        process.nextTick(async() => {
            cb(null,user._id)
        })
    })
    passport.deserializeUser((id,cb) => {
        process.nextTick(async() => {
            const userInfo = await SearchUser({_id:id},{username:1,email:1,rol:1})
            cb(null,userInfo)
        })
    })
    server.use(passport.initialize())
    server.use(passport.session())
}

module.exports = passportSetup