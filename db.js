const mongoose = require('mongoose')
const { db_user,db_password,db_host } = require('./configs/env')

const URI = `mongodb+srv://${db_user}:${db_password}@${db_host}`

mongoose.connect(URI)