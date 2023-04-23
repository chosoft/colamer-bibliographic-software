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
//The strategy of auth that passport will be use
const userAuth = require('./../../auth/login-user')
//All the config of the session storage
const SESSION_CONFIG = {
    secret:secret,//Here is the key that helps to encrypt the session Info
    cookie:{//Coookie config
        maxAge:10800000,//Limit time of life
        httpOnly:true,
        expires: new Date(Date.now() + 10800000 * 5),//Time of life
        sameSite:'strict'//The cookie only works in the same domain
    },
    resave: false,
    saveUninitialized:false,
    store:new SQLiteStore//The DB where the session will be storage
}
//Main Function of the User Session Auth
const passportSetup = (server) => {
    //Session persistent 
    server.use(session(SESSION_CONFIG))
    //Flash messages for auth errors
    server.use(flash())
    //Passport Local Strategy
    passport.use(userAuth)
    //Serialize -> Send the id of the user to the DB and relates to a session
    passport.serializeUser((user,cb) => {
        process.nextTick(async() => {
            cb(null,user._id)
        })
    })
    //Get the Id that is storage in the DB and retrieve the user info
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