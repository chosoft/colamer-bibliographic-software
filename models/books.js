const mongoose = require('mongoose')
const { Schema,model } = mongoose
const bcrypt = require('bcrypt')

const BOOK_SCHEMA = new Schema({
    tittle:String,
    autor:String,
})