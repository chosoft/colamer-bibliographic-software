const mongoose = require('mongoose')
const { Schema,model } = mongoose

const BOOK_SCHEMA = new Schema({
    title:String,
    author:String,
    signature:String,
    barcode:String,
    collection:String,
    copies:Number,
    available:Boolean,
    img:String
})