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
        const copies = target.attributes.copies.value
        const img = target.attributes.img.value
        const author = target.attributes.author.value
        const collectionType = target.attributes.collectionType.value
        const available = target.attributes.available.value
        const signature = target.attributes.signature.value
        const borrowed = target.attributes.borrowed.value
        const code = parseInt(target.attributes.code.value)
        const ititle = document.querySelector("#title2")
        const ibarcode = document.querySelector("#barcode2")
        const iimg = document.querySelector("#img2")
        const iauthor = document.querySelector("#author2")
        const icode = document.querySelector("#code2")
        const icollectionType = document.querySelector("#collectionType2")
        const isignature = document.querySelector("#signature2")
        const image = document.querySelector(".image2")
        const input = document.querySelector(".img2")
        const bg = document.querySelector('.popUpBg2')
        const modal = document.querySelector('.modal2')
        const btnActiver = document.querySelector('.activer2')
        const btnCloser = document.querySelector('.modalCloser2')
        const btnSubmit = document.querySelector('.submitBtn2')
        bg.style.top = "0"
        bg.style.opacity = "1"
        ititle.value = title
        iauthor.value = author
        isignature.value = signature
        ibarcode.value = barcode
        icode.value = code
        iimg.value = img
        icollectionType.value = collectionType
        image.setAttribute("src", img)

        input.addEventListener('paste', (e) => {
            try {
                // Save the url in a variable
                var url = e.clipboardData.getData("text")
                // Change the attribute of the image for the url
                image.setAttribute('src', url)
            } catch (error) {
                console.log("Error al colocar la imagen")
            }
        })
        btnSubmit.addEventListener("click", async (e) => {
            e.preventDefault()
            let boleano = (available === "true")
            const data = {
                title: document.querySelector("#title2").value,
                author: document.querySelector("#author2").value,
                barcode: document.querySelector("#barcode2").value,
                code: parseInt(document.querySelector("#code2").value),
                signature: document.querySelector("#signature2").value,
                collectionType: document.querySelector("#collectionType2").value,
                img: document.querySelector("#img2").value,
                copies: parseInt(copies),
                borrowed: parseInt(borrowed),
                available: boleano
            }
            await axios.put(`books/${barcode}`, data)
            alert("El libro se ha actualizado correctamente")
            window.location.reload()
        })
        btnCloser.onclick = (e) => {
            e.preventDefault()
            bg.style.top = "200%"
            bg.style.opacity = "0"
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