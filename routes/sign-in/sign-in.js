const express = require('express')
const router = express.Router()

const passport = require('passport')

//This render the sign-in page that contains the form
router.get('/',(req,res,next) => {
    try {
        //The errors contains the list of errors that happend at the moment when an user try to authenticated his credentials
        const errors = req.flash('error')
        res.render('public/sign-in',{errorList:errors})
    } catch (error) {
        next(error)
    }
})

/* Below this comment add the other auth strategies */
//Endpoint to authenticated the users input credentials -> using the user password
router.post('/password',passport.authenticate('local',{
    successRedirect:'/borrowings',
    failureRedirect: '/sign-in',
    failureFlash:true
}))

module.exports = router