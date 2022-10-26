const index = require('./home/index')
const signIn = require('./sign-in/sign-in')
const router = (server) => {
    //Put the routes and his router inside this
    //Ex: server.use('/ruta',router)
    server.use('/',index)
    server.use('/sign-in',signIn)
}

module.exports = router