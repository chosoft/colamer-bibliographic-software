
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
                const selectFilterValue = document.querySelector(`#${filterName}SelectOpt`).value
                filters[filterName]  = selectFilterValue
            }
            resolve(filters)
        } catch (error) {
            reject(error)
        }
    })
}

const createUsersHtml = (usersList) => {
    return new Promise(async(resolve,reject) => {
        try {
            let allTemplates = ''
            for (const user of usersList) {
                const { _id,username,rol,email } = user
                const template = `<div class="userResult" id="${_id}-userResult">
                                    <div class="headerResult">
                                        <div class="lorempic">
                                            <i class="ri-file-user-line"></i>
                                        </div>
                                        <div class="infoContainer">
                                            <h3 class="user-result-name">${username}</h3>
                                            <span class="user-result-rol">Rol - ${rol}</span>
                                            <div class="actions">
                                                <button class="button-user-result deleteUser" actionType="delete" username="${username}" rolUser="${rol}" idReference="${_id}"><i idReference="${_id}" class="ri-delete-bin-line"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <span class="idInfo" id="mongoID">${_id}</span>
                                        <span class="idInfo" id="emailID">${email}</span>
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

const innerFoundUsers = (usersList) => {
    return new Promise(async(resolve,reject) => {
        try {
            const resultsContainer = document.querySelector('.results')
            const usersListTemplate = await createUsersHtml(usersList)
            resultsContainer.innerHTML = usersListTemplate
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
        const { data } = await axios.post('/users/search',searchParams)
        await innerFoundUsers(data )

    } catch (error) {
        defaultErrorSpam(error)
    }
}

searchBar.onkeyup = searchUser