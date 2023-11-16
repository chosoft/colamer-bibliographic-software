//Get the btn to append to it a event listener
const updateBtn = document.querySelector('#uploadPwd')
//Get the pwd fields to append a event listener
const passwordInputs = document.querySelectorAll('.changerPwd')

//
const checkPwdInput = async(e) => {
    try {
        const input = e.target
        const inputValue = input.value
        const pwdRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{10,30}$/
        const pwdIsValid = pwdRegex.test(inputValue)
        const errorSpam = document.querySelector('#errorSpam')
        if(!pwdIsValid){
            input.style.borderColor = "red"
            errorSpam.textContent = "La contraseña no es valida"
            return
        }
        input.style.borderColor = "green"
        errorSpam.textContent = ""
        return
    } catch (error) {
        
    }
}

const changePwdRequest = (pwds) => {
    return new Promise(async(resolve,reject) => {
        try {
            const serverRes = await axios.put('/profile/pwd',pwds)
            if(serverRes === 'fail'){
                
            }
        } catch (error) {
            reject(error)
        }
    })
}

updateBtn.onclick = async(e) => {
    try {
        e.preventDefault()
        const errorSpam = document.querySelector('#errorSpam')
        errorSpam.textContent = ''
        const pwds = {
            pwd:document.querySelector('#pwdToChange').value,
            pwdCf:document.querySelector('#pwdToChangeConf').value
        }
        if(!(pwds.pwd === pwds.pwdCf)){
            errorSpam.textContent = 'Las contraseñas deben coincidir'
            return
        }
        if(pwds.pwd.length <= 0 || pwds.pwdCf.length <= 0){
            errorSpam.textContent = 'Ambos campos deben estar completados'
            return
        }
        await changePwdRequest(pwds)
        return
    } catch (error) {
        console.log(error)
        const errorSpam = document.querySelector('#errorSpam')
        errorSpam.textContent = 'Tenemos problemas con este apartado intentalo mas tarde'
    }
}

passwordInputs.forEach( pwdInput => pwdInput.onkeyup = checkPwdInput)