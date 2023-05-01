// Variables that i want to use
//Submit Btn element
const saveBook = document.querySelector(".submitBtn")
var input = document.querySelector('.link');
var image = document.querySelector('.image');

// Fuction of check the information
const emptyChecker = async (inputs) => {
    return new Promise(async(resolve,reject) => {
        try {
            const necesaryOkInputs = Object.entries(inputs)
            let okInputs = 0
            for (const fieldName in inputs) {

                const fieldValue = inputs[fieldName] || null
                if(!(fieldValue)){
                    const errorFieldContainer = document.querySelector(`#e${fieldName}`)
                    errorFieldContainer.textContent = `${fieldName} needs to be filled`
                }else{
                    okInputs += 1
                }
            }
            if(!(necesaryOkInputs === okInputs)){
                reject('All inputs need to be filled')
            }
            resolve()
        } catch (error) {
            reject(error)
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
            img: document.querySelector('.link').value,
        };

        // First go through the checker
        await emptyChecker(info)
        // And for last one create the book
        createBook(info)
        
    } catch (error) {
        console.log(error)
    }
})



// Fuction of create the book
const createBook = async (info) => {
    try {
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

// Fuction to preview the image
input.addEventListener('paste', (e) => {
    // Save the url in a variable
    var url = e.clipboardData.getData("text")
    // Change the attribute of the image for the url
    image.setAttribute('src', url)
})