const userAuthentification = async(req,res,next) => {
    try {
        const isAuth = req.isAuthenticated()
        console.log(req.user)
        if(isAuth){
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

module.exports = userAuthentification