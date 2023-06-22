'use strict';
const btnSubmit = document.querySelector('#btnSubmit')
const emailInput = document.querySelector('#email')
//Able or Disable the Submit btn state
const toggleBtnState = (toggle) => {
    const btn = document.querySelector('#btnSubmit')
    if(!toggle){
        btn.setAttribute('disabled','')
        return
    }
    btn.removeAttribute('disabled')
}
//Clear the text of the label
const clearErrorLabel = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const errorLabel = document.querySelector('#contextLabel')
            errorLabel.removeAttribute('state')
            errorLabel.textContent = ''
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
//Insert an error text to the label
const innerErrorLabel = (errorText,state) => {
    return new Promise(async(resolve,reject) => {
        try {
            const errorLabel = document.querySelector('#contextLabel')
            errorLabel.setAttribute("state",state)
            errorLabel.textContent = errorText
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

//Send request to the API
const requestChangeLink = async(e) => {
    try {
        e.preventDefault()
        toggleBtnState(0)
        await clearErrorLabel()
        const emailInput = document.querySelector('#email').value
        if(!emailInput){
            await innerErrorLabel('Este campo no puede estar vacio','error')
            return
        }
        const { data:{msg} } = await axios.post('/password-forget',{email:emailInput})
        await innerErrorLabel(msg,'success')
        toggleBtnState(1)
        return
    } catch (error) {
        toggleBtnState(1)
        const { response:{status,data:{msg}} } = error
        if(status === 400){
            await innerErrorLabel(msg,'error')
            return
        }
    }
}
//This change the state(able) of the btn after an empty submit
emailInput.onkeydown = async(e) => {
    toggleBtnState(1)
}

btnSubmit.onclick = requestChangeLink
emailInput.onkeydown = changeBtnState