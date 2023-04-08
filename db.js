//Mongo DB driver
const mongoose = require('mongoose')
//Mongo DB Atlas - Credentials
const { db_user,db_password,db_host,db_name } = require('./configs/env')
//Connection Configs
const DB_OPTIONS = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}
//Connection URL - This is composed by the Atlas credentials
const URI = `mongodb+srv://${db_user}:${db_password}@${db_host}${db_name}?retryWrites=true&w=majority`

mongoose.connect(URI,DB_OPTIONS,() => {
})