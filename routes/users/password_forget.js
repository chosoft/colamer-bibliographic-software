const express = require('express')
const router = express.Router()

const PasswordRecover = require('./../../controllers/users/PasswordRecovery')
const PasswordChange = require('./../../controllers/users/PasswordChange')

//Display the main route
router.get('/',async(req,res,next) => {
    try {
        const errors = req.flash('error')
        const sucess = req.flash('success')
        res.render('public/password_forget',{errorList:errors,successList:sucess})
    } catch (error) {
        next(error)
    }
})
//Display the link sent to the user mail
router.get('/:changeToken', async(req,res,next) => {
    try {
        const changeToken = req.params.changeToken
        const {page,renderData} = await PasswordChange(changeToken)
        res.render(`public/${page}`,renderData)
    } catch (error) {
        next(error)
    }
})
//Endpoint to require the change link
router.post('/',async(req,res,next) =>{
    try {
        const { email } = req.body
        await PasswordRecover(email)
        res.json({msg:'El link fue enviado'})
    } catch (error) {
        next(error)
    }
})

module.exports = router