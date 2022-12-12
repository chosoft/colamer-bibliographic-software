const { DeleteUser } = require('./../../models/users')

const Delete = (userReference) => {
    return new Promise(async(resolve,reject) => {
        try {
            await DeleteUser(userReference)
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Delete