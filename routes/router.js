const index = require('./home/index')
const signIn = require('./sign-in/sign-in')
const logout = require('./logout/logout')
const users = require('./users/users')
const books = require('./books/books')
const borrowings = require('./borrowings/borrowings')

const NotFound = require('./http/404')
const router = (server) => {
    //Put the routes and his router inside this
    //Ex: server.use('/ruta',router)
    server.use('/',index)
    server.use('/sign-in',signIn)
    server.use('/logout', logout)
    server.use('/users',users)
    server.use('/books', books)
    server.use('/borrowings', borrowings)
    server.use('*',NotFound)
}

module.exports = router