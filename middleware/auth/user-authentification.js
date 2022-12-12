const userAuthentification = (authorizedRol='all') => {
    return async(req,res,next) => {
        try {
            const isAuth = req.isAuthenticated()
            if(isAuth){
                //Check the user privilegies to use the endpoint
                if(authorizedRol === 'all'){
                    next()
                }else{
                    const { rol } = req.user
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
                }
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

module.exports = userAuthentification