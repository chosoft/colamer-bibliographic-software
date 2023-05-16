const spamAlert = (msg) => {
    Swal.fire({
        title: 'Ten cuidado',
        text:msg,
        icon:'warning',
        confirmButtonText: 'Continuar'
    })
}

const deleteBook = async(target) => {
    try {
        const barcode = target.attributes.barcode.value
        console.log(barcode)
        const title = target.attributes.title.value
        const { isConfirmed } = await Swal.fire({
            title:'Seguro?',
            icon: 'warning',
            text: `Estas apunto de eliminar a ${title}, esto no se arreglara`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: `Eliminar el libro ${title}`,
        })
        if(!isConfirmed){
            return
        }
        await axios.delete(`/books/${barcode}`)
        alert("El libro se ha eliminado correctamente")
        window.location.reload()
    } catch (error) {
        spamAlert(error)
    }
}
const editBook = async(target) => {
    try {
        await checkPosibility(target)
        const title = target.attributes.title.value
        const { value:newUsername,isConfirmed }  = await Swal.fire({
            title: 'Ten cuidado',
            input:'text',
            inputLabel: `Nuevo nombre para ${title}`,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: `Editar a ${title}`,
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
    const target = e.target.closest('.button-book-result')
    if(!target){
        return
    }
    console.log(target.attributes)
    switch(target.attributes.actionType.value){
        case 'delete':
            deleteBook(target)
            break
        case 'edit':
            editBook(target)
            break
        default:
            break
    }

})