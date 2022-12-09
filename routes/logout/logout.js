const express = require('express')
const router = express.Router()

const userAuthentification = require('./../../middleware/auth/user-authentification')


router.post("/", userAuthentification, async(req,res,next) => {
    try {
        req.logOut()
    } catch (error) {
        next(error)
    }
})

module.exports = router