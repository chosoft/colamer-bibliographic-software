const index = require('./home/index')
const signIn = require('./sign-in/sign-in')
const users = require('./users/users')
const books = require('./books/books')
const router = (server) => {
    //Put the routes and his router inside this
    //Ex: server.use('/ruta',router)
    server.use('/',index)
    server.use('/sign-in',signIn)
    server.use('/users',users)
    server.use('/books', books)   
}

module.exports = router