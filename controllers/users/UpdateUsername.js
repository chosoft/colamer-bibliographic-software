const { UpdateUser } = require('./../../models/users')
const UpdateUsername = (usernameToUpdate,_id) => {
    return new Promise(async (resolve,reject) => {
        try {
            const usernameRegex = /^[A-Za-z0-9_-]{3,20}/
            if(!usernameRegex.test(usernameToUpdate)){
                throw new Error(`${usernameToUpdate} is a invalid username`)
            }
            await UpdateUser({_id},{username:usernameToUpdate})
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = UpdateUsername