const errorDisplay = (err,req,res,next) => {
    const method = req.method
    if(method === 'GET'){
        res.statusCode = 500
        res.render('defaults/500')
        next(err)
    }else{
        res.send('Something went wrong please try later :c')
        next(err)
    }
}

module.exports = errorDisplay