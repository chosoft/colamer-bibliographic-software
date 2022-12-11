const { SearchBook, CreateBook } = require("./../../models/books")

const REQUIRED_FIELDS = {
    title: {
        type:"string",
    },
    author: {
        type:"string",
    },
    signature: {
        type:"string",
    },
    barcode: {
        type:"string",
    },
    collectionType: {
        type:"string",
    },
    copies: {
        type:"number",
    },
    available: {
        type:"boolean",
    },
    img: {
        type:"string",
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
                if(!(REQUIRED_FIELDS[field].type === typeof bookData[field])){
                    console.log(typeof REQUIRED_FIELDS.type)
                    throw new Error(`The datatype of ${field} is ${typeof REQUIRED_FIELDS[field]}`,{cause:'UserInput'})
                }
            }
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

const searchRepeatBookData = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const { title } = bookData
            const searchByTitle = await SearchBook({title})
            if (searchByTitle) {
                throw new Error(`The title ${title} is already taken, pls change it`, {cause:'UserInput'})
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Create