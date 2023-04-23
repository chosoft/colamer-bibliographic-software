/* This file contains the main page in wich the users have the posibility to search any book */
//Essential Functions to create the router of the route
const express = require('express')
const router = express.Router()
//This render the main page of the app
router.get('/',(req,res,next) => {
    try {
        res.render('public/book-search')
    } catch (error) {
        next(error)
    }
})
module.exports = router