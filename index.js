const express = require('express')
const server = express()
const { default:helmet } = require('helmet')
const path = require('path')
const router = require('./routes/router')
const errorHandlerSetup = require('./utils/setups/error-handler-setup')
const { port,env } = require('./configs/env')
const HELMET_CONFIG = require('./configs/helmet')

require('./db')

server.set('views',path.join(__dirname,'views'))
server.set('view engine','pug')

server.use(express.static(path.join(__dirname,'public')))
server.use(express.json())
server.use(express.urlencoded({ extended:true }))
server.use(helmet(HELMET_CONFIG))

server.disable('x-powered-by')

router(server)

errorHandlerSetup(server)

server.listen(port, () => {
    const STARTUP_MSG = `SERVER IS RUNNING http://localhost:${port}/`
    if(env === 'development'){
        console.log(STARTUP_MSG)
    }
})