
const searchBar = document.querySelector('.userSearchbar')

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
                console.log(filterName)
                const selectFilterValue = document.querySelector(`#${filterName}SelectOpt`).value
                filters[filterName]  = selectFilterValue
            }
            resolve(filters)
        } catch (error) {
            reject(error)
        }
    })
}
const searchUser = async(e) => {
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
        
        console.log(searchFilters)
    } catch (error) {
        console.log(error)
        defaultErrorSpam(error)
    }
}

searchBar.onkeyup = searchUser