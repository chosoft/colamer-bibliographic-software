const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/',(req,res,next) => {
    try {
        const errors = req.flash('error')
        res.render('public/sign-in',{errorList:errors})
    } catch (error) {
        next(error)
    }
})

router.post('/password',passport.authenticate('local',{
    successRedirect:'/borrowings',
    failureRedirect: '/sign-in',
    failureFlash:true
}))

module.exports = router