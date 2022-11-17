const HELMET_CONFIG = {
    contentSecurityPolicy: {
        directives:{
            "script-src": ["'self'","cdn.jsdelivr.net"], //Permitir descargar archicos de CDNJS
            "img-src":["'self'","res.cloudinary.com","www.colamer.edu.co",'blob:'],
            "object-src":["'self'"],
            "style-src":['*']
        }
    },
}

module.exports = HELMET_CONFIG