const express = require('express')
const router = express.Router()

const userAuthentification = require('../../middleware/auth/user-authentification')

router.get('/',userAuthentification,async(req,res,next) => {
    try {
        res.render('private/borrowings',{user:req.user})
    } catch (error) {
        next(error)
    }
})

module.exports = router