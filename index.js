const express = require('express')
const server = express()

const SERVER_PORT = 8080

server.listen(SERVER_PORT, () => {
    console.log(`SERVER IS RUNNING http://localhost:8080/`)
})

