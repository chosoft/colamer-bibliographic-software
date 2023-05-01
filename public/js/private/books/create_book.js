// Variables that i want to use
const saveBook = document.querySelector(".submitBtn")
var input = document.querySelector('.link');
var image = document.querySelector('.image');

// Fuction to create the book
saveBook.addEventListener('click', (e) => {
    // Reset de configs of de event
    e.preventDefault()
    // Declare the info of the input
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
    console.log(info.author)
    // First go through the checker
    Checker(info)
    // And for last one create the book
    createBook(info)
})

// Fuction of check the information
const Checker = async (info) => {
    try {
        // Save only the copies and borrowed of the variable info
        const { copies, borrowed } = info
        // Validate if the copies is > than borrowed
        if (copies > borrowed) {
            // Add the new variable avaible but in this case in true
            info.available = true;
        }
        // Validate if the copies is <= than borrowed
        else if (copies <= borrowed) {
            // Add the new variable but in false
            info.available = false;
        }
    } catch (error) {
        // Print the error
        console.log(error)
    }
}

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