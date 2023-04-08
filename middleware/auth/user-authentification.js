//File that contains all Functions and process of the user-authentification Middleware
//404 Default Function render
//This function will be used in case that the process have an internal error
const DEFAULT_404_RENDER = (req,res,errMsg='What you are looking for is not here') => {
    const method = req.method
    res.statusCode = 404
    if(method === "GET"){
        res.render('defaults/404')
        return
    }
    res.send({statusMsg:errMsg})
}
//Authentication Middleware
/* How it works ??? */
/* This middleware consists of 4 steps
1 -> Check if the user is already Authenticated
2 -> Check if the user role is consistent for the endpoint
3 -> Allow the server continuos with the Bussines logic
*/
const userAuthentification = (authorizedRol=['user','admin','superadmin']) => {
    return async(req,res,next) => {
        try {
            //Check if the request is authenticated
            const isAuth = req.isAuthenticated()
            if(!isAuth){
                DEFAULT_404_RENDER(req,res)
                return
            }
            const { rol } = req.user
            //Check how is the middleware configurated
            if(Array.isArray(authorizedRol)){
                //If the middleware is configurated to check many roles
                //Check if the role is in the list of allowing roles
                if(!authorizedRol.includes(rol)){
                    DEFAULT_404_RENDER(req,res)
                    return
                }
                next()
                return
            }
            //If the middleware is configurated to one role
            //Check if the user role is the same of the configuration role
            if(!role === authorizedRol){
                DEFAULT_404_RENDER(req,res)
                return
            }
            next()
        } catch (error) {
            //In case of any unexpected error We use the default function
            DEFAULT_404_RENDER(req,res)
        }
    }
} 

module.exports = userAuthentification