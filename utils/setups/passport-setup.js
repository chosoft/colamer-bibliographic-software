const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const SQLiteStore = require('connect-sqlite3')(session)
const { secret,env } = require('../../configs/env')

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

const setup = (server) => {
    server.use(session(SESSION_CONFIG))
    server.use(flash())
    
}