//This file contains all the headers rule abour Cross site requests to the right work of Helmet
const HELMET_CONFIG = {
    contentSecurityPolicy: {
        directives:{
            //This allows the frontend to retrieve JS files -> this is to load libraries like Axios http
            "script-src": ["'self'","cdn.jsdelivr.net"], //Permitir descargar archicos de CDNJS
            //This allows the frontend to retrieve the necesary images in diferent sites
            "img-src":["'self'","res.cloudinary.com","www.colamer.edu.co",'blob:'],
            "object-src":["'self'"],
            "style-src":['*']
        }
    },
}

module.exports = HELMET_CONFIG