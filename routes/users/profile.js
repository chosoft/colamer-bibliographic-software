//Require express
const express = require('express')
const router = express.Router()
//Controller for change pwd
const ChangePwd = require('../../controllers/profile/ChangePwd')
//User Authentification and authentication middleware
const userAuth = require('./../../middleware/auth/user-authentification')
//Protecting the route
router.use(userAuth())
//Render the page
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
//Endpoint for pwd changing
router.put('/pwd', async(req,res,next) => {
    try {
        const _id = req.user._id
        const pwds = req.body
        const result = await ChangePwd(pwds,_id)
        res.send(result.status ? 'success' : 'fail')
    } catch (error) {
        next(error)
    }
})

module.exports = router