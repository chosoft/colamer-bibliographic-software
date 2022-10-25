require('dotenv').config()

const ENVIROMENT_CONFIG = {
    port: process.env.PORT_NUMBER,
    secret: process.env.SECRET
}

module.exports = ENVIROMENT_CONFIG
