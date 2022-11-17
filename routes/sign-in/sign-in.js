const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) => {
    try {
        const errors = req.flash('error')
        res.render('public/sign-in',{errorList:errors})
    } catch (error) {
        next(error)
    }
})

router.post('/',(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = router