//Routers of each route
const index = require('./home/index')
const signIn = require('./sign-in/sign-in')
const logout = require('./logout/logout')
const users = require('./users/users')
const books = require('./books/books')
const borrowings = require('./borrowings/borrowings')
const password_forget = require('./users/password_forget')
const profile = require('./users/profile')
//Default not Found page router
const NotFound = require('./http/404')
const router = (server) => {
    //Put the routes and his router inside this
    //Ex: server.use('/route',router)
    server.use('/',index)
    server.use('/sign-in',signIn)
    server.use('/logout', logout)
    server.use('/users',users)
    server.use('/books', books)
    server.use('/borrowings', borrowings)
    server.use('/password-forget', password_forget)
    server.use('/profile', profile)
    //If the route not exists the Not Found router start working
    server.use('*',NotFound)
}

module.exports = router