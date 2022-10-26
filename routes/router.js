const index = require('./home/index')
const router = (server) => {
    //Put the routes and his router inside this
    //Ex: server.use('/ruta',router)
    server.use('/',index)
}

module.exports = router