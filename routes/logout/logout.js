const express = require('express')
const router = express.Router()
//Credentials and Claims authentification for the endpoint -> This is a Middleware
const userAuthentification = require('./../../middleware/auth/user-authentification')
//session log out -> Destroy the session
router.get("/", userAuthentification(), async(req,res,next) => {
    try {
        req.logOut((error) => {
            if(error){
                next(error)
            }else{
                res.redirect('/sign-in')
            }
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router