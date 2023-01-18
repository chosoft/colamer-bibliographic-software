// Calling the models of the books
const { SearchBook, CreateBook } = require("./../../models/books")

// The fields that i need
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

// Fuction of Create
const Create = (bookData) => {
    return new Promise(async(resolve,reject) => {
        // Try to do this
        try {
            // First go to the funtion for check the data
            await dataChecker(bookData)
            // Then go to the fuction of search if it exist a book with the same fields
            await searchRepeatBookData(bookData)
            // And then go to the fuction of create the book
            await CreateBook(bookData)
            resolve()
        // If exist an error this catch it
        } catch (err) {
            reject(err)
        }
    })
}

// Fuction that check the data
const dataChecker = (bookData) => {
    return new Promise(async(resolve,reject) => {
        // Try to do this
        try {
            // Save in a constant the amount of fields of the fields that i want
            const REQUIRED_FIELDS_LENGTH = Object.keys(REQUIRED_FIELDS).length
            // Save in a constant the amount of fields that the user gave me
            const BOOKDATA_FIELDS_LENGTH = Object.keys(bookData).length
            // I save specific fields of the user data
            const { borrowed, copies, available } = bookData
            // This compare if the amount of fields that i want is greater that the user gave me
            if(REQUIRED_FIELDS_LENGTH > BOOKDATA_FIELDS_LENGTH) {
                // If so throw a error
                throw new Error(`New book data can't be empty or with missing fields`)
            }
            // This compare if the amount of fields that i want is minor that the user gave me
            if(REQUIRED_FIELDS < BOOKDATA_FIELDS_LENGTH) {
                // If so throw a error
                throw new Error(`New book data can't be with more fields than needed`)
            }
            // This is a loop that save in a constant field the fields that the user gave me
            for (const field in bookData) {
                // This check if the field that the user gave me is diferent that i need it
                if(!REQUIRED_FIELDS.hasOwnProperty(field)){
                    // If so throw an error
                    throw new Error(`Unknow Field: ${field}`,{cause:'UserInput'})
                }
                // This check if the type of data that the user gave me is the same that i need it
                if(!(REQUIRED_FIELDS[field].type === typeof bookData[field])){
                    // If so appear in console
                    console.log(typeof REQUIRED_FIELDS.type)
                    // And throw an error
                    throw new Error(`The datatype of ${field} is ${typeof REQUIRED_FIELDS[field]}`,{cause:'UserInput'})
                }
            }
            resolve()
        // If exist an error this catch it
        } catch (err) {
            reject(err)
        }
    })
}

// This fuction is for search if is already exist a book with the same 
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