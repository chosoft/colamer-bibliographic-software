const { DeleteBook } = require('../../models/books')

const Delete = () => {
    return new Promise(async(resolve,reject) => {
        try {
            await DeleteBook()
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Delete