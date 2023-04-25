//Main Button Element
const createUserBtn = document.querySelector('.submitBtn')
//Retrieve all fields of the form
const fields = document.querySelectorAll('.field')
//This is a event function that allow update the field after try to upload the form without any value
//this dont work for the password field
const fieldRecover = (e) => {
    //Retrieve the input element of the event 
    const field = e.target
    //The id is using to retrieve other elements that belongs to the input
    const keyId = field.id //Retrieve the id tag of the element
    //Retrieve the content in which the error was displayed
    const posibleErrorElement = document.querySelector(`#${keyId}PosibleError`)
    //Retrieve the label in which the error was displayed
    const label = document.querySelector(`#${keyId}Label`)
    //Delete the text inside the error element
    posibleErrorElement.innerText = ''
    //Change the color of the label
    label.style.color = "#4180E2"
    //Change the border color of the input
    field.style.border = "2px solid transparent"
}
//This function have two task
//The first is update the field components after trying to submit it empty
//The second is check that the value of the input has all the necesary features to considerate a valid password
//all this process happend at the moment in which the user press any key inside the input
const passwordRecover = (e) => {
    //PSDT: I've the task of change this part of code because its repetetive(I need use the DRY method)
    //Retrieve the pwd field
    const pwdField = e.target
    //Retrieve the ID
    const fieldId = pwdField.id //This id allow the work with other elements that belongs to this input
    //Retrieve the error element
    const posibleErrorElement = document.querySelector(`#${fieldId}PosibleError`)
    //Retrieve the label element
    const labelPwdElemnt = document.querySelector(`#${fieldId}Label`)
    //Change the label font color
    labelPwdElemnt.style.color = "#4180E2"
    //Delete the text inside the error element
    posibleErrorElement.innerText = ''
    //Change the border color of the field
    pwdField.style.border = "2px solid transparent"
    //This is the process to chechk the necesary features to consider the password a valid password

    //This object contains all the REGEX that check each feature of the password
    const featuresToCheck = {digit: /[0-9]/, uppercase: /[A-Z]/, characters: /^[a-zA-Z0-9]{10,30}$/}
    //Retrieve the value of the password
    const value = pwdField.value
    //This loop will check each feature and will test it using the REGEX inside of them
    for (const key in featuresToCheck) {
        //Key refers to the name of the feature that is processing
        //This extract the regex of the feature
        const featureRegex = featuresToCheck[key]
        //This retrieve the element of the feature list using the key
        const elementToChange = document.querySelector(`#${key}Feature`)
        //Check if the feature is in the value of the input
        if(featureRegex.test(value)){
            //If the feature is in the value it will change the color(to green) of the element that represent in the list
            elementToChange.style.color = "#48e015"
        }else{
            //Otherwise the color of the element in the list will be red
            elementToChange.style.color = "#FA2828"
        }
    }
}
//This loop asing to each field the update function
for (const field of fields) {
    //If the field is the password field it assing the right function to that field
    if(field.id === 'password'){
        field.onkeyup = passwordRecover
    }else{
        field.onkeydown = fieldRecover
    }
}

//This function notify the error from the API to the user
const defaultErrorSpam = (error) => {
    const processContext = document.querySelector('.processContext')
    processContext.style.display = 'block'
    processContext.style.background = '#FA2828'
    processContext.innerText = error.response.data.msg
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
        const btn = e.target
        const processContext = document.querySelector('.processContext')
        processContext.style.display = 'none'
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
        btn.setAttribute('disabled','true')
        //Time to send the data to the endpoint and create the new user
        await axios.post('/users',newUserData)
        btn.removeAttribute('disabled')
        //Here is the successful msg
        processContext.style.background = '#48e015'
        processContext.style.display = 'block'
        processContext.innerText = `${username} se ha añadido como nuevo usuario`
    } catch (error) {
        createUserBtn.removeAttribute('disabled')
        if(error === 'okerror'){
            return
        }
        defaultErrorSpam(error)
    }
}
//Append the main function to the event listener of the submit Btn
createUserBtn.onclick = createNewUser