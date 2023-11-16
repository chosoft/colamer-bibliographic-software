const { SearchBook } = require('./../../models/books')
const checkAvailability = (borrowingData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const { bookref } = borrowingData
            const bookToBorrow = await SearchBook(bookref)
            const { available } = bookToBorrow
            if(!available){
                throw new Error(`Book is no avaible`,{cause:'UserInput'})
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const CreateBorrowing = (borrowingData) => {
    return new Promise(async(resolve,reject) => {
        try {
            await checkAvailability(borrowingData)
            
        } catch (error) {
            reject(error)
        }
    })
}