/* This file contains the user session auth process */

//This is a function from the model that search an user
const { SearchUser } = require('../models/users')
//The package from passport that allows to conver a function in a passport strategy
const LocalStrategy = require('passport-local')
//Encrypt packages
const bcrypt = require('bcrypt')
//This config is for set the name of the fields that passport strategy will read 
const FIELDS_CONFIG = {
    usernameField:'email',
    passwordField:'password'
}
//Main auth function converting in a local strategy
const loginUserStrategy = new LocalStrategy(FIELDS_CONFIG,async(email,password,cb) => {
    try {
        //1 -> Search if the email provided by the user exists
        const userData = await SearchUser({email})
        if(!userData){
            //If the email no exists it will throw an error
            cb(null,false,{ message:`The email/password provided is not valid: ${email}` })
            return
        }
        //2 -> Check if the hash and the password provided by the user match
        if(! await bcrypt.compare(password,userData.hash)){
            //If the password and hash didnt match it will throw an error
            cb(null,false,{ message:`The email/password provided is not valid: ${email}` })
            return
        }
        //3 -> If all the previous process are right, the function will send the user data to serialize
        cb(null,userData)
    } catch (error) {
        cb(error)
    }
})

module.exports = loginUserStrategy