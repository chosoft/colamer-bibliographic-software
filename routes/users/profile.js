const express = require('express')
const router = express.Router()

const userAuth = require('./../../middleware/auth/user-authentification')

router.use(userAuth())

router.get('/', async(req,res,next) => {
    try {
        const RENDER_INFO = {
            user:req.user,
            page:{
                name:"profile"
            }
        }
        res.render('private/users/profile', RENDER_INFO)
    } catch (error) {
        next(error)
    }
})

module.exports = router