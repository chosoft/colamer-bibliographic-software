const searchBar = document.querySelector('.userSearchbar')

const defaultErrorSpam = (error) => {

}

const searchUser = async(e) => {
    try {
        const searchBar = e.target
        const queryValue = searchBar.value
        const filterSelect = document.querySelector('#filter')
        const queryFilter = filterSelect.value
        
    } catch (error) {
        defaultErrorSpam(error)
    }
}

searchBar.onkeydown = searchUser