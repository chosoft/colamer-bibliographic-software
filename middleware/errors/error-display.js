const errorDisplay = (err,req,res,next) => {
    const method = req.method
    res.statusCode = 500
    if(method === 'GET'){
        res.render('defaults/500')
        next(err)
    }else{
        res.json({msg:'Something went wron please try later :C'})
        next(err)
    }
}

module.exports = errorDisplay