const express = require('express')
const server = express()
//Helmet -> Package that allow the proctection of the app using some http headers rules
const { default:helmet } = require('helmet')
const path = require('path')
//Router Function -> This handle each route inside the app
const router = require('./routes/router')
//Error Handler -> This function check every error inside the app
const errorHandlerSetup = require('./utils/setups/error-handler-setup')
//Server Running variables
const { port,env } = require('./configs/env')
//Simply config of helmet
const HELMET_CONFIG = require('./configs/helmet')
//Passport -> Package that handle the user sessions and user authentication or authorizations
const passportSetup = require('./utils/setups/passport-setup')
//Retrieve the DB connection and put it works in the main file
require('./db')
//View engine configuration
server.set('views',path.join(__dirname,'views'))
server.set('view engine','pug')
//Static Files configuration
server.use(express.static(path.join(__dirname,'public')))
//Reciving data configuration
server.use(express.json())
server.use(express.urlencoded({ extended:true }))
//Put helmet to work
server.use(helmet(HELMET_CONFIG))
//Disable this header to made more secure the app
server.disable('x-powered-by')
//Running the passport Authentication Strategy
passportSetup(server)
//Running the router function
router(server)
//Running the error handler function
errorHandlerSetup(server)
//Running the server
server.listen(port, () => {
    const STARTUP_MSG = `SERVER IS RUNNING http://localhost:${port}/sign-in`
    if(env === 'development'){
        console.log(STARTUP_MSG)
    }
})