const { UpdateUser } = require('../../models/users')
const bcrypt = require('bcrypt')

//Check if the password sending by the user have the minium requirements of security
const validatePwd = ({pwd, pwdConf}) => {
    return new Promise((resolve,reject) => {
        try {
            //I use a regex to simply this process
            const pwdRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,30}$/
            // # 1 Confirm that the two pwds sending by the user match
            if(!(pwd === pwdConf)){
                resolve({status:'fail',ctx:'Passwords must match'})
            }
            // # 2 Test the password with the regex
            const pwdIsValid = pwdRegex.test(pwd)
            if(!pwdIsValid){
                resolve({status:'fail',ctx:'Password is not valid'})
            }
            resolve({status:'success',ctx:'Everything is ok'})
        } catch (error) {
            reject(error)
        }
    })
}
//Do the change in the Users DB
const updatePwd = (pwd,_id) => {
    return new Promise(async(resolve,reject) => {
        try {
            //First hash the new PWD
            bcrypt.hash(pwd, 5, async(err,hash) => {
                try {
                    if(err){
                        reject(err)
                    }
                    //Use the update user function to change the old password
                    //!!!! REMEMBER That the _id field is require to change the pwd
                    await UpdateUser(_id, {hash})
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
//Main function 
const ChangePwd = (pwds,_id) => {
    return new Promise(async(resolve,reject) => {
        try {
            //Call the pwd validate
            const result = await validatePwd(pwds)
            if(result.status === 'fail'){
                resolve(false)
            }
            //Call the pwd updater
            await updatePwd(pwds.pwd,_id)
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = ChangePwd