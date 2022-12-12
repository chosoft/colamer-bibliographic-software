const express = require('express')
const router = express.Router()

const Create = require('../../controllers/books/Create');
const Update = require('../../controllers/books/Update');
const Delete = require('../../controllers/books/Delete');

const userAuthentification = require('./../../middleware/auth/user-authentification')

router.use(userAuthentification())

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

router.put('/:filter', async(req,res,next) => {
    try {
        const bookData = req.body
        const { filter } = req.params
        await Update(bookData, filter)
        res.json({msg: "Book Uptaded"})
    } catch (error) {
        next(error);
    }
})

router.delete('/:filter', async(req,res,next) => {
    try {
        const { filter } = req.params
        await Delete(filter)
        res.json({msg: "Book Delete"})
    } catch (error) {
        next(error);
    }
})

module.exports = router