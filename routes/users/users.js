const express = require('express')
const router = express.Router()

const Create = require('./../../controllers/users/Create')

const userAuthentification = require('./../../middleware/auth/user-authentification')
const rolAuthorization = require('./../../middleware/auth/rol-authorization')

router.post('/',userAuthentification,rolAuthorization('admin'),async(req,res,next) => {
    try {
        const userData = req.body
        await Create(userData)
        res.json({msg:'User Created'})
    } catch (error) {
        next(error)
    }
})

module.exports = router