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
        const title = target.attributes.title.value
        const { isConfirmed } = await Swal.fire({
            title:'Alerta',
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
        const title = target.attributes.title.value
        const barcode = target.attributes.barcode.value
        const { value,isConfirmed }  = await Swal.fire({
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
        const resp = await axios.put(`/books/${barcode}`,data)
    } catch (error) {
        spamAlert(error)
        
    }
}

document.addEventListener('click', (e) => {
    const target = e.target.closest('.button-book-result')
    if(!target){
        return
    }
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