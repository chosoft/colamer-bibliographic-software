const mongoose = require('mongoose')
const { db_user,db_password,db_host,db_name } = require('./configs/env')

const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}

const URI = `mongodb+srv://${db_user}:${db_password}@${db_host}${db_name}?retryWrites=true&w=majority`

mongoose.connect(URI,DB_OPTIONS,() => {
})