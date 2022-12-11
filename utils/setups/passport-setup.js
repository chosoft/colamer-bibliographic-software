const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const SQLiteStore = require('connect-sqlite3')(session)
const { secret,env } = require('../../configs/env')

const { SearchUser } = require('./../../models/users')

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