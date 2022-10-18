const express = require('express')
const server = express()

server.listen(8080, () => {
    console.log(`SERVER IS RUNNING http://localhost:8080/`)
})