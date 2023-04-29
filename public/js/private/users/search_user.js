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
            for (const hiddenTag of hiddenTags) {
                hiddenTag.attributes.active.value = 'false'
                hiddenTag.style.display = 'none'
                hiddenTag.style.position = 'absolute'
                hiddenTag.remove()
                tagsCont.append(hiddenTag)
            }
        }
        
    } catch (error) {

    }
}

for (const tag of searchModeTags) {
    tag.onclick = selectSearchMode
}

//Codigo para la parte de filtrar por
const addFilter = document.querySelector('#addFilter')

const toggleFilterView = (e) => {
    e.preventDefault()
    const avaibleOpts = Array.from(document.querySelectorAll('.optFilter')).filter(opt => !(JSON.parse(opt.attributes.selected.value)))
    const optsCont = document.querySelector('.addOpts')
    if(!avaibleOpts.length){
        addFilter.attributes.isselecting.value = 'false'
        optsCont.style.display = 'none'
        return
    }
    const isSelecting = JSON.parse(addFilter.attributes.isselecting.value)

    if(!isSelecting){
        addFilter.attributes.isselecting.value = 'true'
        optsCont.style.display = 'flex'
        return
    }
    addFilter.attributes.isselecting.value = 'false'
    optsCont.style.display = 'none'
}

addFilter.onclick = toggleFilterView

const allDeleteFilterBtns = document.querySelectorAll('.deleteOpt')

const toggleFilterSelecteds = (e) =>{
    e.preventDefault()
    const idWord = e.target.attributes.idWord.value
    const optToHide = document.querySelector(`#${idWord}Opt`)
    const btnToDisplay = document.querySelector(`#${idWord}Filter`)
    btnToDisplay.attributes.selected.value = 'false'
    optToHide.attributes.selected.value = 'false'
}

for (const deleteBtn of allDeleteFilterBtns) {
    deleteBtn.onclick = toggleFilterSelecteds
}


const allFilterBtns = document.querySelectorAll('.optFilter')

const toggleSelectedState = (e) => {
    e.preventDefault()
    const filtersCont = document.querySelector('#addFilter')
    const idWord = e.target.attributes.idWord.value
    const btnClicked = document.querySelector(`#${idWord}Filter`)
    const optToChange = document.querySelector(`#${idWord}Opt`)
    btnClicked.attributes.selected.value = 'true'
    optToChange.attributes.selected.value = 'true'
    filtersCont.click()

}

for (const btn of allFilterBtns) {
    btn.onclick = toggleSelectedState
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