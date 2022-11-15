const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const SQLiteStore = require('connect-sqlite3')(session)
const { secret,env } = require('../../configs/env')

const { SearchUser } = require('./../../models/users')

const userAuth = require('./../../utils/auth/login-user')

const SESSION_CONFIG = {
    secret,
    cookie:{
        secure: env === 'develop' ? false:true,
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
    server.use(session(SESSION_CONFIG))
    server.use(flash())
    passport.use(userAuth)
    passport.serializeUser((user,cb) => {
        process.nextTick(async() => {
            cb(null,user._id)
        })
    })
    passport.deserializeUser((_id,cb) => {
        process.nextTick(async() => {
            const userInfo = await SearchUser({_id})
            cb(null,userInfo)
        })
    })
    server.use(passport.initialize())
    server.use(passport.session())
}

module.exports = passportSetup