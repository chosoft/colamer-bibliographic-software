const { UptadeBook } = require("../../models/books")

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
    collectionType: {
        type:"String",
    },
    copies: {
        type: Number,
    },
    available: {
        type:"Boolean",
    },
    img: {
        type:"String",
    }
}

const Uptade = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            await dataChecker(bookData)
            await UptadeBook(bookData)
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
                throw new Error(`For uptade the book can't be with more fields than needed`)
            }
            if(REQUIRED_FIELDS < BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`For uptade the book can't be empty or with missing fields`)
            }
            for (const field in bookData) {
                if(!REQUIRED_FIELDS.hasOwnProperty(field)){
                    throw new Error(`Unknow Field: ${field}`,{cause:'UserInput'})
                }
                if(!(typeof REQUIRED_FIELDS[field].type === typeof bookData[field])){
                    throw new Error(`The datatype of ${field} is ${typeof REQUIRED_FIELDS[field]}`,{cause:'UserInput'})
                }
            }
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = Uptade