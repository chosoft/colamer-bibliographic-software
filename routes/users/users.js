//Express and Router function for the route working
const express = require('express')
const router = express.Router()
//Controllers Functions of the different endpoints
const Create = require('./../../controllers/users/Create')
const Search = require('./../../controllers/users/Search')
const UpdateUsername = require('./../../controllers/users/UpdateUsername')
const UpdateRol = require('./../../controllers/users/UpdateRol')
const DeleteUser = require('./../../controllers/users/Delete')
//Auth middleware of all endpoints
const userAuthentification = require('./../../middleware/auth/user-authentification')
//Middleware to protect routes from a browser request page
const onlyJson = require('./../../middleware/various/only_json_request')
router.use(userAuthentification('admin'))
//Get Route - This send the HTML page
router.get('/', async(req,res,next) => {
    try {
        const RENDER_INFO = {
            user:req.user,
            page:{
                name:'users'
            }
        }
        res.render('private/users/index',RENDER_INFO)
    } catch (error) {
        next(error)
    }
})
//Read and Query Users
/* The Structure of the need body to receive is the following
    {
        mode: name_field,
        query: value_of_the_search_bar,
        filters:{ //An object that contains all the keys/fields and his values
            key:value,
            rol:admin
        }
        skipSteps: 4 //This indicate the range in wich the model will retrieve the users
    }


*/
router.post('/search',async(req,res,next) => {
    try {
        const searchParams = req.body
        const result = await Search(searchParams)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
//Create new user ENDPOINT
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