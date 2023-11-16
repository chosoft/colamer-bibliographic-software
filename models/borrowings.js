const mongoose = require('mongoose')
const { Schema,model } = mongoose

const BORROWINGS_SCHEMA = new Schema({
    bookref: ObjectId,
    startAt: Date,
    endAt: Date,
    lender: Schema.ObjectId ,
    borrower: Number,
    deliverAt: Date,
    finish:Boolean
})

const Borrowing = new model('Borrowings', BORROWINGS_SCHEMA)

const CreateBorrowing = (borrowingData) => {
    return new Promise(async(resolve,reject) =>{
        try {
            const newBorrowing = await new Borrowing(borrowingData)
            await newBorrowing.save()
            resolve()
        } catch (error) {
            reject(error)
        }
    } )
}

module.exports = { CreateBorrowing }