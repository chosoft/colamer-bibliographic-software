require('dotenv').config()

const ENVIROMENT_CONFIG = {
    port: process.env.PORT_NUMBER,
    secret: process.env.SECRET,
    env: process.env.ENV,
    sentry_dsn:process.env.SENTRY_DSN,
    db_user:process.env.DB_USER,
    db_password:process.env.DB_PASSWORD,
    db_host:process.env.DB_HOST
}

module.exports = ENVIROMENT_CONFIG
