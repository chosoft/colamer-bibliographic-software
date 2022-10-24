const express = require('express')
const server = express()
const { port } = require('./configs/env')
const helmet = require('helmet')

server.use(express.json())
server.use(helmet())
server.listen(port, () => {
    console.log(`SERVER IS RUNNING http://localhost:8080/`)
})