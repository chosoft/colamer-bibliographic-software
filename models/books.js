const mongoose = require('mongoose')
const { Schema,model } = mongoose

const BOOK_SCHEMA = new Schema({
    title:String,
    author:String,
    signature:String,
    barcode:String,
    collectionType:String,
    copies:Number,
    available:Boolean,
    img:String
})

const Book = new model('Books',BOOK_SCHEMA);

const CreateBook = (bookData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const newBook = await new Book(bookData)
            await newBook.save()
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

const SearchBook = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const bookFound = await Book.findOne(filter)
            resolve(bookFound)
        } catch (error) {
            reject(error)
        }
    })
}

const UpdateBook = (bookData, filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const {title, author, signature, barcode, collection, copies, available, img} = bookData
            const bookUpdate = await Book.updateOne({barcode: filter}, { $set: { title, author, signature, barcode, collection, copies, available, img }})
            resolve (bookUpdate)
        } catch (error) {
            reject(error)
        }
    })
}

const DeleteBook = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const bookDelete = await Book.deleteOne({barcode: filter})
            resolve(bookDelete)
        } catch (error) {
            reject(error)
        }
    })
}

const SearchDelete = (filter) => {
    return new Promise(async(resolve,reject) => {
        try {
            const bookFound = await Book.findOne({barcode: filter})
            resolve(bookFound)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { CreateBook, SearchBook, UpdateBook, DeleteBook, SearchDelete }