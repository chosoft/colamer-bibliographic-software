const express = require('express')
const router = express.Router()

const userAuthentification = require('../../middleware/auth/user-authentification')

router.use(userAuthentification())

router.get('/',async(req,res,next) => {
    try {
        const RENDER_INFO = {
            user:req.user,
            page:{
                name:"borrowings"
            }
        }
        res.render('private/borrowings/index',RENDER_INFO)
    } catch (error) {
        next(error)
    }
})

router.post('/',async(req,res,next) => {
    try {
         
    } catch (error) {
        next(error)
    }
})

module.exports = router