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

for (const field of fields) {
    field.onkeydown = fieldRecover
}

const defaultErrorSpam = (error) => {
    const errorContext = document.querySelector('.errorContext')
    errorContext.innerText = error.message
    createUserBtn.style.background = "#FA2828"
    createUserBtn.innerText = "Ha ocurrido un error"
}

const checkNewUserFields = (fieldsToCheck) => {
    try {        
        for (const key in fieldsToCheck) {
            if(fieldsToCheck[key] === null){
                const inputToReact = document.querySelector(`#${key}`)
                const labelToReact = document.querySelector(`#${key}Label`)
                const posibleErrorContent = document.querySelector(`#${key}PosibleError`)
                posibleErrorContent.innerText = `El campo "${labelToReact.innerText}" no puede estar vacio`
                inputToReact.style.border = " 2px solid #FA2828"
                labelToReact.style.color = "#FA2828"
            }
        }
    } catch (error) {

    }
}



const createNewUser = async(e) => {
    try {
        e.preventDefault()
        console.log('as')
        //Get the value of the fields of the new user
        const email = document.querySelector('#email').value || null
        const username = document.querySelector('#username').value|| null
        const rol = document.querySelector('#rol').value || null
        //Put all the fields in a object
        const newUserData = {email,username,rol}
        checkNewUserFields(newUserData)

    } catch (error) {
        defaultErrorSpam(error)
    }
}


createUserBtn.onclick = createNewUser