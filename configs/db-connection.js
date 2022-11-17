const mongoose = require('mongoose');
const { db_book_user, db_book_password, db_book_name, db_book_host } = require('./env');

const URI = `mongodb+srv://${db_book_user}:${db_book_password}@${db_book_host}${db_book_name}?retryWrites=true&w=majority`

mongoose.connect(URI)
.then(() => console.log('Connected to Database'))
.catch((error) => (error));