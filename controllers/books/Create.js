const { SearchBook, CreateBook } = require("./../../models/books")

const REQUIRED_FIELDS = {
    title: {
        type:"String",
    },
    author: {
        type:"String",
    },
    signature: {
        type:"String",
    },
    barcode: {
        type:"String",
    },
    collection: {
        type:"String",
    },
    copies: {
        type:"Number",
    },
    available: {
        type:"Boolean",
    },
    img: {
        type:"String",
    }
}

const Create = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            await dataChecker(bookData)
            await searchRepeatBookData(bookData)
            await CreateBook(bookData)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

const dataChecker = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const REQUIRED_FIELDS_LENGTH = Object.keys(REQUIRED_FIELDS).length
            const BOOKDATA_FIELDS_LENGTH = Object.keys(bookData).length
            if(REQUIRED_FIELDS_LENGTH > BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`New book data can't be with more fields than needed`)
            }
            if(REQUIRED_FIELDS < BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`New book data can't be empty or with missing fields`)
            }
            for (const field in bookData) {
                if(!REQUIRED_FIELDS.hasOwnProperty(field)){
                    throw new Error(`Unknow Field: ${field}`,{cause:'UserInput'})
                }
                if(!(typeof REQUIRED_FIELDS[field].type === typeof userData[field])){
                    throw new Error(`The datatype of ${field} is ${typeof REQUIRED_FIELDS[field]}`,{cause:'UserInput'})
                }
            }
        } catch (err) {
            reject(err)
        }
    })
}

const searchRepeatBookData = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const { title, author } = bookData
            const searchByTitle = await SearchBook({title})
            const searchByAuthor = await SearchBook({author})
            if (searchByTitle) {
                throw new Error(`The title ${title} is already taken, pls change it`, {cause:'UserInput'})
            }
            if (searchByAuthor) {
                throw new Error(`The title ${author} is already taken, pls change it`, {cause:'UserInput'})
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Create