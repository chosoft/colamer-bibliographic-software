const { UpdateBook} = require("../../models/books")

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
    },
    borrowed: {
        type:"number"
    }
}

const Update = (bookData, filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            await dataChecker(bookData)
            await UpdateBook(bookData, filter)
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
                throw new Error(`To update the book can't be empty or with missing fields`)
            }
            if(REQUIRED_FIELDS < BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`To update the book can't be with more fields than needed`)
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

module.exports = Update