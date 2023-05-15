// Variables that i want to use
//Submit Btn element
const saveBook = document.querySelector(".submitBtn")
var input = document.querySelector('.img');
var image = document.querySelector('.image');

// Fuction of create the book
const createBook = async (info) => {
    try {
        const { copies, borrowed } = info
        if (copies > borrowed) {
            info.available = true
        }
        else if (copies <= borrowed) {
            info.available = false
        }
        // Save the answer of the peticion 
        const respuesta = await axios.post(`books`,info)
        // Print the answer
        console.log(respuesta)
    } catch (error) {
        // Print the error
        const msg = error.response.data.msg
        console.log(msg)
    }
}

// Fuction of check the information
const emptyChecker = async (inputs) => {
    return new Promise(async(resolve,reject) => {
        try {
            const necesaryOkInputs = Object.keys(inputs).length
            let okInputs = 0
            for (const fieldName in inputs) {
                const fieldValue = inputs[fieldName] || null
                if(!(fieldValue)){
                    alert(`El campo ${fieldName} no puede estar vacio`)
                }else{
                    okInputs += 1
                }
            }
            if(!(necesaryOkInputs == okInputs)){
                reject('All inputs need to be filled')
            }
            resolve()
        } catch (error) {
            console.log(error)
        }
    })
}

// Fuction to create the book
saveBook.addEventListener('click', async(e) => {
    try {
        // Reset de configs of de event
        e.preventDefault()
        // Get the info of the input
        const info = {
            title: document.querySelector('#title').value,
            author: document.querySelector('#author').value,
            barcode: document.querySelector('#barcode').value,
            code: parseInt(document.querySelector('#code').value),
            signature: document.querySelector('#signature').value,
            collectionType: document.querySelector('#collectionType').value,
            copies: parseInt(document.querySelector('#copies').value),
            borrowed: parseInt(document.querySelector('#borrowed').value),
            img: document.querySelector('#img').value,
        };
        console.log(collectionType)
        // First go through the checker
        await emptyChecker(info)
        console.log("Paso")
        // And for last one create the book
        createBook(info)
        
    } catch (error) {
        console.log(error)
    }
})




// Fuction to preview the image
input.addEventListener('paste', (e) => {
    try {
        // Save the url in a variable
        var url = e.clipboardData.getData("text")
        // Change the attribute of the image for the url
        image.setAttribute('src', url).catch(() => {console.log("Error")})
    } catch (error) {
        console.log("Error al colocar la imagen")
    }
})