const express = require('express')
const router = express.Router()

const userAuthentification = require('./../../middleware/auth/user-authentification')


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