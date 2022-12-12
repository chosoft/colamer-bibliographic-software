const express = require('express')
const router = express.Router()

const userAuthentification = require('../../middleware/auth/user-authentification')

router.use(userAuthentification())

router.get('/',async(req,res,next) => {
    try {
        res.render('private/borrowings/index',{user:req.user})
    } catch (error) {
        next(error)
    }
})

module.exports = router