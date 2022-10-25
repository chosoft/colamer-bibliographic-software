const express = require('express')
const server = express()
const router = require('./routes/router')
const helmet = require('helmet')
const path = require('path')
const { port } = require('./configs/env')


server.use(express.static(path.join(__dirname,'public')))
server.use(express.json())
server.use(express.urlencoded({ extended:true }))
server.use(helmet())

server.disable('x-powered-by')

server.use(router)
server.listen(port, () => {
    console.log(`SERVER IS RUNNING http://localhost:8080/`)
})