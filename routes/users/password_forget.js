const express = require('express')
const router = express.Router()

const PasswordRecover = require('./../../controllers/users/PasswordRecovery')
const PasswordChange = require('./../../controllers/users/PasswordChange')

router.get('/',async(req,res,next) => {
    try {
        const errors = req.flash('error')
        const sucess = req.flash('success')
        res.render('public/password_forget',{errorList:errors,successList:sucess})
    } catch (error) {
        next(error)
    }
})
router.get('/:changeToken', async(req,res,next) => {
    try {
        const changeToken = req.params.changeToken
        await PasswordChange(changeToken)
        res.send('Cambia tu contraseña')
    } catch (error) {
        next(error)
    }
})
router.post('/',async(req,res,next) =>{
    try {
        const { email } = req.body
        await PasswordRecover(email)
        req.flash('success','El link fue enviado')
        res.redirect('/password-forget')
    } catch (error) {
        next(error)
    }
})

module.exports = router