const express = require('express')
const router = express.Router()

const PasswordRecover = require('./../../controllers/users/PasswordRecovery')

router.get('/',async(req,res,next) => {
    try {
        const errors = req.flash('error')
        res.render('public/password_forget',{errorList:errors})
    } catch (error) {
        next(error)
    }
})
router.get('/:changeToken', async(req,res,next) => {
    try {
        const changeToken = req.params.changeToken
    } catch (error) {
        next(error)
    }
})
router.post('/',async(req,res,next) =>{
    try {
        /*
            1 -> Check if email exists
            2 -> Create the token, associate with user id
            3 -> Send the link with the token
        */
        const { email } = req.body
        await PasswordRecover(email)
        res.send('El link fue enviado')
    } catch (error) {
        next(error)
    }
})

module.exports = router