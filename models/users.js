/* This file contains all the config and functions related to the model of users in the app */
//The DB modeling package
const mongoose = require('mongoose')
const { Schema,model } = mongoose
const bcrypt = require('bcrypt')
//This is the config for the storage of documents inside the users collections
//Here are the necesary fields at the moment to storage a new document
const USER_SCHEMA = new Schema({
    username:String,
    hash:String,
    email:String,
    rol:{type:String,default:'user'},
    timestamp:{type:Date, default: Date.now}
})
//This is a default projection -> The projection limt the fields that the model will retrieve in a query
const DEFAULT_PROJECTION = {
    username:1,
    hash:1,
    email:1,
    rol:1,
    timestamp:1
}
//Create the model -> the model have the task to edit and read the documents
const User = new model('user',USER_SCHEMA)

const CreateUser = (userData) => {
    //This function create and save a new user in the collection
    return new Promise(async(resolve,reject) => {
        try {
            //Extract the user password
            const { password } = userData
            //Convert the password in a hash
            bcrypt.hash(password,5,async(err,hash) => {
                try {
                    if(err){
                        reject(err)
                    }
                    delete userData.password
                    userData.hash = hash
                    //Use the model to create the new user
                    const newUser = await new User(userData)
                    //Save the new user inside the collection
                    await newUser.save()
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const SearchUser = (filter,projection=DEFAULT_PROJECTION) => {
    //This function allow the search of any user
    //This function receive 2 arguments
    //filter -> This is an Object with the field and the value to search
    //projection -> This is an Object with contains the fields that the db will retrieve at the moment to find the user
    return new Promise(async(resolve,reject) => {
        try {
            //Use the Mongo DB function to search the user
            const userFound = await User.findOne(filter,projection)
            resolve(userFound)
        } catch (error) {
            reject(error)
        }
    })
}

const SearchUsers = (filter,config,projection={hash:0}) => {
    return new Promise(async(resolve,reject) => {
        try {
            //Need to put the limit and skip functions
            const foundUsers = await User.find(filter,projection).sort({_id:-1})
            resolve(foundUsers)
        } catch (error) {
            reject(error)
        }
    })
}

const UpdateUser = (filter,updateFields) => {
    //This function helps to update the fields of a certain user
    //The firs argument is the filter -> This will retrieve the user that will be updated
    //The second argument is the updateFields -> This fields will replace the old fields
    return new Promise(async(resolve,reject) => {
        try {
            //Use a function of the model to do this process
            await User.findOneAndUpdate(filter,updateFields)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const DeleteUser = (_id) => {
    //This function helps to delete any user only using his doc_id
    return new Promise(async (resolve,reject) => {
        try {
            //Use a model function to delete the user using his _id
            await User.deleteOne({_id})
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    CreateUser,
    SearchUser,
    SearchUsers,
    UpdateUser,
    DeleteUser
}