const errorChecker = (err,req,res,next) =>  {
    const errorCause = err.cause || false
    if(errorCause === 'UserInput'){
        res.statusCode = 400
        res.send({msg:err.message})
    }else{
        next(err)
    }
}

module.exports = errorChecker