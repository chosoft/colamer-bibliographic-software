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
    const labelPwdElemnt = document.querySelector(`#${fieldId}Label`)
    labelPwdElemnt.style.color = "#4180E2"
    posibleErrorElement.innerText = ''
    pwdField.style.border = "2px solid transparent"

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
    errorContext.innerText = error.response.data.msg
    createUserBtn.style.background = "#FA2828"
    createUserBtn.innerText = "Ha ocurrido un error"
}
//This function check that any field is empty -> This notify to the user is any field is empty
const checkNewUserFields = (fieldsToCheck) => {
    return new Promise(async(resolve,reject) => {
        try {
            //This const refers to the total number of fields that have to be fill
            const necesaryOkFields = Object.keys(fieldsToCheck).length
            //The number of fill fields
            let okFields = 0
            //This loop check each field and notify to the user if is empty
            for (const key in fieldsToCheck) {
                //key refers to the field that is being proccessed
                if(fieldsToCheck[key] === null){
                    //Get the DOM input
                    const inputToNotify = document.querySelector(`#${key}`)
                    //Get the DOM label
                    const labelToNotify = document.querySelector(`#${key}Label`)
                    //Get the DOM div where the user is notified
                    const posibleErrorContent = document.querySelector(`#${key}PosibleError`)
                    //Insert the error context to the DOM element
                    posibleErrorContent.innerText = `El campo "${labelToNotify.innerText}" no puede estar vacio`
                    //Change the input styles 
                    inputToNotify.style.border = " 2px solid #FA2828"
                    //Change the label styles
                    labelToNotify.style.color = "#FA2828"
                }else{
                    //If the field have any value inside it will be consider like a right input
                    okFields+=1
                }
            }
            //check if the accepted fields are equal to the necesary accepted fields
            if(okFields === necesaryOkFields){
                resolve()
                return
            }
            //otherwise the app will be reject a not fatal error
            reject('okerror')
        } catch (error) {
            reject(error)
        }
    })
}

//Function to check if the value of the password is valid -> Check the pwd features
const checkPwdField = (password) => {
    return new Promise(async(resolve,reject) => {
        try {
            //The regex of a valid password
            const pwdRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,30}$/
            //Test the password value using the regex
            const result = pwdRegex.test(password)
            //Check the result value
            if(result){
                resolve()
            }else{
                //Notify the error to the user and reject the request
                const pwdPosibleError = document.querySelector('#passwordPosibleError')
                pwdPosibleError.innerText = 'Constraseña invalida'
                //This will stop the main function
                reject('okerror')
            }
        } catch (error) {
            reject(error)
        }
    })
}
//Main Function to send The info of the new User to the API
const createNewUser = async(e) => {
    try {
        //Prevent the default form send
        e.preventDefault()
        //Get the value of the fields of the new user
        const email = document.querySelector('#email').value || null
        const username = document.querySelector('#username').value|| null
        const password = document.querySelector('#password').value || null
        const rol = document.querySelector('#rol').value || null
        //Put all the fields in a object
        const newUserData = {email,username,rol,password}
        //check the fields and his value and display his errors
        await checkNewUserFields(newUserData)
        //Check if the value of the password is valid
        await checkPwdField(password)
        //Here is the loading msg
        //Time to send the data to the endpoint and create the new user
        await axios.post('/users',newUserData)
        //Here is the successful msg
        alert('usuario creado')
    } catch (error) {
        if(error === 'okerror'){
            return
        }
        defaultErrorSpam(error)
    }
}
//Append the main function to the event listener of the submit Btn
createUserBtn.onclick = createNewUser