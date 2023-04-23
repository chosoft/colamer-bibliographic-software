//This file contains all the necesary packages that involves the error check process(Middleware)
//Sentry Package -> Sentry is a third pary services that allows the app notifiy any issue that happend 
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
//This first module check if the error ocurred by the user or if the app is broken
const errorChecker = require('./../../middleware/errors/error-checker')
//This module write the error in the .log file to also keep the error log in the server in wich the app is located
const errorLog = require('./../../middleware/errors/error-log')
//This module have the task to display the error msg to the user, this can be a page or a msg
const errorDisplay = require('./../../middleware/errors/error-display')
//Basic config of Sentry
const { sentry_dsn } = require('./../../configs/env')
//The main Function(Middleware) Contains all the modules in the order they will be executed
const errorHandlerSetup = (server) => {
    Sentry.init({ 
        dsn:sentry_dsn,
        integrations:[new Tracing.Integrations.Mongo({useMongoose:true})]
    })
    server.use(errorChecker)
    server.use(Sentry.Handlers.errorHandler())
    server.use(errorDisplay)
    server.use(errorLog)
}

module.exports = errorHandlerSetup