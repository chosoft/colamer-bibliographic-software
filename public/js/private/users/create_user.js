const createUserBtn = document.querySelector('.submitBtn')

const fields = document.querySelectorAll('.field')

const fieldRecover = (e) => {
    const field = e.target
    const keyId = field.id
    const posibleErrorElement = document.querySelector(`#${keyId}PosibleError`)
    const label = document.querySelector(`#${keyId}Label`)
    posibleErrorElement.innerText = ''
    label.style.color = "#4180E2"
    field.style.border = "2px solid transparent"
}

const passwordRecover = (e) => {
    const pwdField = e.target
    const fieldId = pwdField.id
    const posibleErrorElement = document.querySelector(`#${fieldId}PosibleError`)
    posibleErrorElement.innerText = ''
    const featuresToCheck = {digit: /[0-9]/, uppercase: /[A-Z]/, characters: /^[a-zA-Z0-9]{10,30}$/}
    const value = pwdField.value
    for (const key in featuresToCheck) {
        const featureRegex = featuresToCheck[key]
        const elementToChange = document.querySelector(`#${key}Feature`)
        if(featureRegex.test(value)){
            elementToChange.style.color = "#48e015"
        }else{
            elementToChange.style.color = "#FA2828"
        }
    }
}

for (const field of fields) {
    if(field.id === 'password'){
        field.onkeyup = passwordRecover
    }else{
        field.onkeydown = fieldRecover
    }
}

const defaultErrorSpam = (error) => {
    const errorContext = document.querySelector('.errorContext')
    errorContext.innerText = error.message
    createUserBtn.style.background = "#FA2828"
    createUserBtn.innerText = "Ha ocurrido un error"
}

const checkNewUserFields = (fieldsToCheck) => {
    return new Promise(async(resolve,reject) => {
        try {
            let necesaryOkFields = Object.keys(fieldsToCheck).length
            let okFields = 0
            for (const key in fieldsToCheck) {
                if(fieldsToCheck[key] === null){
                    const inputToReact = document.querySelector(`#${key}`)
                    const labelToReact = document.querySelector(`#${key}Label`)
                    const posibleErrorContent = document.querySelector(`#${key}PosibleError`)
                    posibleErrorContent.innerText = `El campo "${labelToReact.innerText}" no puede estar vacio`
                    inputToReact.style.border = " 2px solid #FA2828"
                    labelToReact.style.color = "#FA2828"
                }else{
                    okFields+=1
                }
            }
            if(okFields === necesaryOkFields){
                resolve()
                return
            }
            reject('okerror')
        } catch (error) {
            reject(error)
        }
    })
}

const checkUserPwd = (password) => {
    return new Promise(async(resolve,reject) => {
        try {
            const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,30}$/
            const result = regex.test(password)
            if(result){
                resolve()
            }else{
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}
const createNewUser = async(e) => {
    try {
        e.preventDefault()
        //Get the value of the fields of the new user
        const email = document.querySelector('#email').value || null
        const username = document.querySelector('#username').value|| null
        const password = document.querySelector('#password').value || null
        const rol = document.querySelector('#rol').value || null
        //Put all the fields in a object
        const newUserData = {email,username,rol,password}
        //check the fields value and display his errors
        await checkNewUserFields(newUserData)
        await checkUserPwd(password)
        //Time to send the data to create the new user
        await axios.post('/users',newUserData)
        alert('usuario creado')
    } catch (error) {
        console.log(error)
        if(error === 'okerror'){
            return
        }
        defaultErrorSpam(error)
    }
}


createUserBtn.onclick = createNewUser