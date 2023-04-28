const saveBook = document.querySelector(".submitBtn")

saveBook.addEventListener('click', (e) => {
    e.preventDefault()
    const info = {
        title: document.querySelector('#tittle').value,
        author: document.querySelector('#author').value,
        barcode: document.querySelector('#barcode').value,
        code: parseInt(document.querySelector('#code').value),
        signature: document.querySelector('#signature').value,
        collectionType: document.querySelector('#collection').value,
        copies: parseInt(document.querySelector('#copies').value),
        borrowed: parseInt(document.querySelector('#borrowed').value),
        img: document.querySelector('.link').value,
    };
    Checker(info)
    createBook(info)
})

const Checker = async (info) => {
    try {
        const { copies, borrowed } = info
        if (copies > borrowed) {
            info.available = true;
        }
        else if (copies <= borrowed) {
            info.available = false;
        }
    } catch (error) {
        console.log(error)
    }
}

const createBook = async (info) => {
    try {
        const respuesta = await axios.post(`books`,info)
        console.log(respuesta)
    } catch (error) {
        console.log(error)
        console.log("Error en la API")
    }
}