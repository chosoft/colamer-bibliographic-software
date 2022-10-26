require('dotenv').config()

const ENVIROMENT_CONFIG = {
    port: process.env.PORT_NUMBER,
    secret: process.env.SECRET,
    env: process.env.ENV,
    sentry_dsn:process.env.SENTRY_DSN
}

module.exports = ENVIROMENT_CONFIG
