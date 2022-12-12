const express = require('express')
const router = express.Router()

const Create = require('./../../controllers/users/Create')
const UpdateUsername = require('./../../controllers/users/UpdateUsername')
const UpdateRol = require('./../../controllers/users/UpdateRol')
const DeleteUser = require('./../../controllers/users/Delete')

const userAuthentification = require('./../../middleware/auth/user-authentification')

router.use(userAuthentification('admin'))

router.get('/', async(req,res,next) => {
    try {
        res.render('private/users/index')
    } catch (error) {
        next(error)
    }
})

router.post('/',async(req,res,next) => {
    try {
        const userData = req.body
        await Create(userData)
        res.json({msg:'User Created'})
    } catch (error) {
        next(error)
    }
})
//To update functions
router.put('/username', async(req,res,next ) => {
    try {
        const { _id,username } = req.user
        const { usernameToUpdate } = req.body
        await UpdateUsername(usernameToUpdate,_id)
        res.json({ msg: `The username ${username} has been changed for ${usernameToUpdate}`})
    } catch (error) {
        next(error)
    }
})

router.put('/rol', async(req,res,next) => {
    try {
        const { _id,rol } = req.body
        await UpdateRol(_id,rol)
        res.json({ msg:"The rol of the user has been changed" })
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
        const { _id:userReference } = req.body
        const { _id:involvedReference } = req.user
        if(userReference === involvedReference){
            res.json({ msg:'You cannot delete you :C' })
        }else{
            await DeleteUser(userReference)
            res.json({ msg:"User deleted" })
        }
    } catch (error) {
        next(error)
    }
})
module.exports = router