const updateBtn = document.querySelector('uploadPwd')

updateBtn.onclick = (e) => {
    e.preventDefault()
    const pwds = {
        pwd:document.querySelector('#pwdToChange').value,
        pwdCf:document.querySelector('#pwdToChangeConf').value
    }
    if(!(pwds.pwd === pwds.pwdCf)){
        alert('Las contraseñas deben coincidir')
        return
    }
    alert('Sending request')
}