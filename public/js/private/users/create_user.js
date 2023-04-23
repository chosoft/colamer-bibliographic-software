const createUserBtn = document.querySelector('.submitBtn')

const defaultErrorSpam = (error) => {
    const errorContext = document.querySelector('.errorContext')
    errorContext.innerText = error.message
    createUserBtn.style.background = "#FA2828"
    createUserBtn.innerText = "Ha ocurrido un error"
}

const createNewUser = async(e) => {
    try {
        const email = document.querySelector('#email').value || null
        const username = document.querySelector('#username').value|| null
        const rol = document.querySelector('#rol').value || null
        const fields_check_list = [email,username,rol]
    } catch (error) {
        defaultErrorSpam(error)
    }
}


createUserBtn.onclick = async(e) => {
    try {
        e.preventDefault()
        const newUserData = {

        }
    } catch (error) {
        defaultErrorSpam(error)
    }
}