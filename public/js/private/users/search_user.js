const searchModeTags = document.querySelectorAll('.tag')

//El codigo del año
const selectSearchMode = (e) => {
    try {
        e.preventDefault
        const searchModeTags = document.querySelectorAll('.tag')
        const tag = e.target
        const tagIsActive = JSON.parse(tag.attributes.active.value)
    
        const tagsCont = document.querySelector('.tagsCont')
        const tagsContIsOpen = JSON.parse(tagsCont.attributes.isopen.value)
        if(!tagsContIsOpen){
            tagsCont.attributes.isopen.value = 'true'
            const hiddenTags =  Array.from(searchModeTags).filter(tag => !(JSON.parse(tag.attributes.active.value)))
            for (const hidden of hiddenTags) {
                hidden.style.display = 'flex'
            }
            return
        }
        if(tagIsActive){
            tagsCont.attributes.isopen.value = 'false'
            const hiddenTags =  Array.from(searchModeTags).filter(tag => !(JSON.parse(tag.attributes.active.value)))
            for (const hidden of hiddenTags) {
                hidden.style.display = 'none'
            }
        }
        if(!tagIsActive){
            tag.attributes.active.value = 'true'
            tag.style.position = 'relative'
            tagsCont.attributes.isopen.value = 'false'
            const hiddenTags = Array.from(searchModeTags).filter(tagElmt => tagElmt!=tag)
            console.log(hiddenTags)
            for (const hiddenTag of hiddenTags) {
                hiddenTag.attributes.active.value = 'false'
                hiddenTag.style.display = 'none'
                hiddenTag.style.position = 'absolute'
                hiddenTag.remove()
                tagsCont.append(hiddenTag)
            }
        }
        
    } catch (error) {
        alert('error')
        console.log(error)
    }
}

for (const tag of searchModeTags) {
    tag.onclick = selectSearchMode
}



const searchBar = document.querySelector('.userSearchbar')

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