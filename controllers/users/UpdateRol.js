const { SearchUser,UpdateUser } = require('./../../models/users')

const UpdateRol = (userReference, rolToUpdate) => {
    return new Promise(async(resolve,reject) => {
        try {
            const userToUpdate = await SearchUser({_id:userReference})
            await checkUserRol(userToUpdate)
            await UpdateUser({_id:userReference},{rol:rolToUpdate})
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

const checkUserRol = ({rol,username}) => {
    return new Promise(async(resolve,reject) => {
        try {
            if(rol === 'admin'){
                throw new Error(`${username} cannot be alterated, because have the admin rol`, { cause:'UserInput' })
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = UpdateRol