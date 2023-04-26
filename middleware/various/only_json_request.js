//This file contains the logic of the only_json_request middleware
//This middleware allows the app to identify if the intention of the request is load a page
//or if the intention is retrieve info using a http client like axios or fetch
const onlyJson = (redirectUrl='/sign-in') => {
    //The param -> redirectUrl is the url where the user will be redirect if try to enter to the protected route
    return (req,res,next) => {
        //Retrieve the header where is located the info about the actor of the request
        const REQUEST_WITH = req.headers['x-requested-with'] || 'HTML'
        //Check if the request is made by a httpClient
        if(!(REQUEST_WITH === 'XMLHttpRequest')){
            //If the request is made by a browser trying to load a new page
            //The middleware will redirect the user to the destination route
            res.redirect(redirectUrl)
            return
        }
        //Otherwise the httpclient will be able to receive the info
        next()
    }
}

module.exports = onlyJson