const searchBook = async () => {
    const respuesta = await axios.get('books')
    console.log(respuesta)
}

searchBook()