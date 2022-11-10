const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const errorLog = require('./../../middleware/errors/error-log')
const errorDisplay = require('./../../middleware/errors/error-display')

const { sentry_dsn } = require('./../../configs/env')
const errorHandlerSetup = (server) => {
    Sentry.init({ dsn:sentry_dsn })
    server.use(errorChecker)
    server.use(Sentry.Handlers.errorHandler())
    server.use(errorDisplay)
    server.use(errorLog)
}

module.exports = errorHandlerSetup