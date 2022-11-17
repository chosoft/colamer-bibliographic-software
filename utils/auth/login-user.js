const { SearchUser } = require('./../../models/users')

const bcrypt = require('bcrypt')

const loginUser = (email,password,rol) => {
    return new Promise(async(resolve,reject) => {
        try {
            const userData = await SearchUser({email})
            if(!userData){
                throw new Error(`The email/password provided is not valid: ${email}`, { cause:'UserInput' })
            }
            if(! await bcrypt.compare(password,userData.hash)){
                throw new Error(`The email/password provided is not valid: ${email}`, { cause:'UserInput' })
            }
            delete userData.hash
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = loginUser