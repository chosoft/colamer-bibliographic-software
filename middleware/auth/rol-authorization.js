const rolAuthorization = (authorizedRol) => {
    return async(req,res,next) => {
        try {
            const { rol } = req.user ?? ''
            if(authorizedRol === rol){
                next()
            }else{
                const method = req.method
                res.statusCode = 404
                if(method === 'GET'){
                    res.render('defaults/404')
                }else{
                    res.send({msg:'What you are looking for is not here'})
                }
            }
        } catch (error) {
        }
    }
}

module.exports = rolAuthorization