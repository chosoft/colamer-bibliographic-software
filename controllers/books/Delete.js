const { DeleteBook, SearchDelete } = require('../../models/books')

const Delete = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            await Search(filter)
            await DeleteBook(filter)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const Search = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const searchByBarcode = await SearchDelete(filter)
            if (!searchByBarcode) {
                throw new Error(`The book doesn't exist`, {cause:'UserInput'})
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Delete