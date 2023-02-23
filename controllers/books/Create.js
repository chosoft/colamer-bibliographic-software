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
    },
    borrowed: {
        type:"number",
    },
    code: {
        type:"number",
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
            const { borrowed, copies, available } = bookData
            if(REQUIRED_FIELDS_LENGTH > BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`New book data can't be empty or with missing fields`)
            }
            if(REQUIRED_FIELDS < BOOKDATA_FIELDS_LENGTH) {
                throw new Error(`New book data can't be with more fields than needed`)
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
            if (borrowed > copies) {
                throw new Error(`The number of books borrowed cannot be more than the number of copies`,{cause:'UserInput'})
            }
            if (borrowed == copies) {
                if(available) {
                    throw new Error(`Being the same number of books borrowed as the existing ones, the book cannot be available`,{cause:'UserInput'}) 
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
            const { title, barcode, code } = bookData
            const searchByTitle = await SearchBook({title})
            const searchByCode = await SearchBook({code})
            const searchByBarcode = await SearchBook({barcode})
            if (searchByTitle) {
                throw new Error(`The title ${title} is already taken, pls change it`, {cause:'UserInput'})
            }
            if (searchByCode) {
                throw new Error(`The code ${code} is already taken, pls change it`, {cause:'UserInput'})
            }
            if (searchByBarcode) {
                throw new Error(`The barcode ${barcode} is already taken, pls change it`, {cause:'UserInput'})
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Create