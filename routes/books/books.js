const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    try {
        res.render('private/books')
    } catch (error) {
        next(error)
    }
})

module.exports = router