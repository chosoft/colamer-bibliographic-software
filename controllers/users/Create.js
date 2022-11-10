const REQUIRED_FIELDS = {
    username: {
        type:"string",
        regex:/^[A-Za-z0-9_-]{3,20}/g
    },
    hash: {
        type:"string",
        regex:/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,30}$/g
    },
    email:{
        type:"string",
        regex:/\w{3,}@colamer.edu.co/g
    },
    rol: {
        type:"string",
        regex:/admin|developer|user|assitent/g
    }
}
const Create = (userData) => {
    return new Promise(async(resolve,reject) => {
        try {
            await dataChecker(userData)
            await dataValidator(userData)
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

const dataChecker = (userData) => {
    return new Promise(async(resolve,reject) => {
        try {
            const REQUIRED_FIELDS_LENGTH = Object.keys(REQUIRED_FIELDS).length
            const USERDATA_FIELDS_LENGTH = Object.keys(userData).length
            if(USERDATA_FIELDS_LENGTH > REQUIRED_FIELDS_LENGTH){
                throw new Error(`New User data can't be with more fields than needed`,{cause:'UserInput'})
            }
            if(USERDATA_FIELDS_LENGTH < REQUIRED_FIELDS_LENGTH){
                throw new Error(`New User data can't be empty or with missing fields`,{cause:'UserInput'})
            }
            for (const field in userData) {
                console.log(field)
                if(!REQUIRED_FIELDS.hasOwnProperty(field)){
                    throw new Error(`Unknow Field: ${field}`,{cause:'UserInput'})
                }
                if(!(typeof REQUIRED_FIELDS[field].type === typeof userData[field])){
                    throw new Error(`The datatype of ${field} is ${typeof REQUIRED_FIELDS[field]}`,{cause:'UserInput'})
                }
            }
            resolve();
        }catch (error) {
            reject(error)
        }
    })
}

const dataValidator = (userData) => {
    return new Promise(async(resolve,reject) => {
        try {
            for (const field in userData) {
                const fieldRegex = REQUIRED_FIELDS[field].regex
                const fieldValue = userData[field]
                console.log(fieldRegex.test(fieldValue))
                if(!fieldRegex.test(fieldValue)){
                    throw new Error(`The value of ${field} is not Valid`,{cause:'UserInput'})
                }
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Create