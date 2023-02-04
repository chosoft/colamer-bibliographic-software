const express = require('express')
const router = express.Router()

router.get('/', (req,res,next) => {
    try {
        res.render('defaults/404')
    } catch (error) {
        next(error)
    }
})

module.exports = router