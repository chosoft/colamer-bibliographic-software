const express = require('express')
const router = express.Router()

const Create = require('../../controllers/books/Create')
const Uptade = require('../../controllers/books/Uptade')

router.get('/',(req,res,next) => {
    try {
        res.render('private/books')
    } catch (error) {
        next(error)
    }
})

router.post('/', async(req,res,next) => {
    try {
        const bookData = req.body
        await Create(bookData)
        res.json({msg: "Book Created"})
    } catch (error) {
        next(error);
    }
})

router.put('/', async(req,res,next) => {
    try {
        const bookData = req.body
        await Uptade(bookData)
        res.json({msg: "Book Uptaded"})
    } catch (error) {
        next(error);
    }
})

module.exports = router