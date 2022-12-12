const { DeleteBook } = require('../../models/books')

const Delete = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            await DeleteBook(filter)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Delete