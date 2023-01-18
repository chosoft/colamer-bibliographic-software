
const searchBar = document.querySelector('.bookSearchbar')

const getTheSearchMode = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const modeTags = Array.from(document.querySelectorAll('.tag'))
            const activeTag = modeTags.filter(tag => JSON.parse(tag.attributes.active.value))[0]
            resolve(activeTag.attributes.mode.value)
        } catch (error) {
            reject(error)
        }
    })
}
const getQueryFilters = () => {
    return new Promise(async(resolve,reject) => {
        try {
            const filterOpts = Array.from(document.querySelectorAll('.selectedOpt'))
            const activeFilters = filterOpts.filter(filter => JSON.parse(filter.attributes.selected.value))
            if(!(activeFilters.length)){
                resolve({})
                return
            }
            let filters = {}
            for (const filter of activeFilters) {

                const filterName = filter.attributes.idWord.value
                const selectFilterValue = document.querySelector(`#${filterName}SelectOpt`).value
                filters[filterName]  = selectFilterValue
            }
            resolve(filters)
        } catch (error) {
            reject(error)
        }
    })
}

const createBooksHtml = (booksList) => {
    return new Promise(async(resolve,reject) => {
        try {
            let allTemplates = ''
            for (const book of booksList) {
                const { title,author,copies,available,signature,img,collectionType,barcode} = book
                const template = `<div class="bookResult">
                                    <div class="headerResult">
                                        <div class="img">
                                            <img src="${img}">
                                        </div>
                                        <div class="infoContainer">
                                            <h3 class="book-result-title">${title}</h3>
                                            <h4 class="book-result-author">${author}</h4>
                                            <h3 class="book-result-copies">${copies} - Ejemplares</h3>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <span class="signature">${signature}</span>
                                        <span class="avaible">${available ? 'Disponible':'No Disponible'}</span>
                                        <span class="collectionType">${collectionType}</span>
                                    </div>
                                </div>`
                allTemplates += template
            }
            resolve(allTemplates)
        } catch (error) {
            reject(error)
        }
    })
}

const innerFoundBooks = (booksList) => {
    return new Promise(async(resolve,reject) => {
        try {
            console.log(booksList)
            const resultsContainer = document.querySelector('.results')
            const booksListTemplate = await createBooksHtml(booksList)
            resultsContainer.innerHTML = booksListTemplate
        } catch (error) {
            reject(error)
        }
    })
}

const searchBook = async(e) => {
    try {
        const searchBar = e.target
        const queryValue = searchBar.value
        const searchMode = await getTheSearchMode()
        const searchFilters = await getQueryFilters()
        const searchParams = {
            mode:searchMode,
            query:queryValue,
            filters:searchFilters,
            skipSteps:0
        }
        const { data } = await axios.post('/books/search',searchParams)
        await innerFoundBooks(data )

    } catch (error) {
        defaultErrorSpam(error)
    }
}

const defaultErrorSpam = (error) => {
    console.log(error)
}

searchBar.onkeyup = searchBook