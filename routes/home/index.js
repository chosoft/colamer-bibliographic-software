const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    try {
        res.render('public/book-search')
    } catch (error) {
        next(error)
    }
})
module.exports = router