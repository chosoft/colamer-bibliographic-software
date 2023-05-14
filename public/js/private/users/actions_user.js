const spamAlert = (msg) => {
    Swal.fire({
        title: 'Ten cuidado',
        text:msg,
        icon:'warning',
        confirmButtonText: 'Continuar'
    })
}
const checkPosibility = (target) => {
    return new Promise(async(resolve,reject) => {
        try {
            const userRol = target.attributes.rolUser.value
            if(userRol === 'admin'){
                reject('Un Usuario administrador no puede ser eliminado/editado')
                return
            }
            const userId = target.attributes.idReference.value
            const actualUserId = document.querySelector('.asideBarMain').attributes.u_id.value
            if(userId === actualUserId){
                reject('No te puedes eliminar/editar a ti mismo')
                return
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
const deleteUser = async(target) => {
    try {
        await checkPosibility(target)
        const username = target.attributes.username.value
        const { isConfirmed } = await Swal.fire({
            title:'Seguro?',
            icon: 'warning',
            text: `Estas apunto de eliminar a ${username}, esto no se arreglara`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: `Eliminar a ${username}`,
        })
        if(!isConfirmed){
            return
        }
        await axios.delete('/users',{data:{_id:target.attributes.idReference.value}})
        window.location.reload()
    } catch (error) {
        spamAlert(error)
    }
}
const editUser = async(target) => {
    try {
        await checkPosibility(target)
        const username = target.attributes.username.value
        const { value:newUsername,isConfirmed }  = await Swal.fire({
            title: 'Ten cuidado',
            input:'text',
            inputLabel: `Nuevo nombre para ${username}`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: `Editar a ${username}`,
            inputValidator: (value) => {
                if (!value) {
                  return 'Necesitas ingresar un nombre nuevo!'
                }
              }
        })
        if(!isConfirmed){
            return
        }
    } catch (error) {
        spamAlert(error)
        
    }
}
document.addEventListener('click', (e) => {
    const target = e.target.closest('.button-user-result')
    if(!target){
        return
    }
    console.log(target.attributes)
    switch(target.attributes.actionType.value){
        case 'delete':
            deleteUser(target)
            break
        case 'edit':
            editUser(target)
            break
        default:
            break
    }

})