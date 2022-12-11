const express = require('express')
const router = express.Router()

const Create = require('./../../controllers/users/Create')

const userAuthentification = require('./../../middleware/auth/user-authentification')
const rolAuthorization = require('./../../middleware/auth/rol-authorization')

router.get('/',userAuthentification,rolAuthorization('admin'))

router.post('/',userAuthentification,rolAuthorization('admin'),async(req,res,next) => {
    try {
        const userData = req.body
        await Create(userData)
        res.json({msg:'User Created'})
    } catch (error) {
        next(error)
    }
})

router.put('/username', async(req,res,next ) => {
    try {
        console.log(req.user.username)
    } catch (error) {
        next(error)
    }
})
router.put('/rol', async(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})
router.put('/password', async(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})
router.delete('/',async(req,res,next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})
module.exports = router