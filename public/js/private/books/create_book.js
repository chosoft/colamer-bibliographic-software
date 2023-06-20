// Variables that i want to use
//Submit Btn element
const saveBook = document.querySelector(".submitBtn")
var input = document.querySelector('.img');
var image = document.querySelector('.image');
const number = document.querySelectorAll('.number');

// Fuction of create the book
const createBook = async (info) => {
    return new Promise(async(resolve,reject) => {
    try {
        const { copies, borrowed } = info
        if (copies > borrowed) {
            info.available = true
        }
        else if (copies == borrowed) {
            info.available = false
        } else if (copies < borrowed) {
            throw new Error("No puede haber mas libros prestados que los existentes")
        }
        // Save the answer of the peticion 
        const respuesta = await axios.post(`books`,info)
        // Print the answer
        console.log(respuesta)
        resolve()
    } catch (error) {
        const { copies, borrowed } = info
            if (copies < borrowed) {
                alert("No puede haber mas libros prestados que los existentes")
            } else {
                // Print the error
                    alert("Error al intentar subir, revise los campos nuevamente")
                    reject("Error al intentar subir el libro")
            }
        console.log(error)
    }})
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
        // And for last one create the book
        await createBook(info)
        alert("El libro se ha creado correctamente")
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
})

for (let i = 0; i < number.length; i++) {
    const numbers = number[i];
    numbers.addEventListener('keydown', (event) => {
        var keyCode = event.which ? event.which : event.keyCode;
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
          event.preventDefault();
          return false;
        }
      });
}

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