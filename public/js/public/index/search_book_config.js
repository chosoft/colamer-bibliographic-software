//Retrieve the button that shot the event to add a new filter
const addFilter = document.querySelector('#addFilter')
//This function toggle the display of the filter container
const toggleFilterOptsContainer = (e) => {
    //Prevent the default behavior
    e.preventDefault()
    //Retrieves the filter options and transforms them into an array
    const filterOptsElements = Array.from(document.querySelectorAll('.optFilter'))
    //Filter the options that arent selected -> if option value is 'false' it will be take like a avaible option
    const avaibleOpts = filterOptsElements.filter(opt => !(JSON.parse(opt.attributes.selected.value)))
    //Retrieve the filter options container
    const optsCont = document.querySelector('.addOpts')
    //This block of code checks if are any avaible options
    if(!avaibleOpts.length){
        //In case that the avaible options are empty the options container will have a display none
        //This line change the state of the add button
        addFilter.attributes.isselecting.value = 'false'
        //This line alter the state of the options container to desapear it
        optsCont.style.display = 'none'
        return
    }
    //If the Filter have avaible options, it'll check if the Options container is in the selecting state
    //Retrieve the state of the Options container
    const isSelecting = JSON.parse(addFilter.attributes.isselecting.value)
    //Check the state
    if(!isSelecting){
        //In case that the Container isnt in a selecting state it will change the state to selecting state
        //First change the state to the button
        addFilter.attributes.isselecting.value = 'true'
        //Next alter the DOM to display the container and his options
        optsCont.style.display = 'flex'
        return
    }
    //If the state is selecting, change it
    //First change the button to a not selecting state
    addFilter.attributes.isselecting.value = 'false'
    //And hide the Options container
    optsCont.style.display = 'none'
}
//Append the toggle Function to the button
addFilter.onclick = toggleFilterOptsContainer

//Here the code to add or active a filter
//Retrieve the filter options elements
const allFilterOpts = document.querySelectorAll('.optFilter')
//This function will change the selected state of the option
const addFilterOption = (e) => {
    //Prevent the default behavior
    e.preventDefault()
    //Retrieve the button that active the options container
    const addFilterBtn = document.querySelector('#addFilter')
    //This retrieves the name/id of the filter -> This will be used to work with the elements that belongs to that filter
    const idWord = e.target.attributes.idWord.value
    //This retrieve the button of the filter
    const btnClicked = document.querySelector(`#${idWord}Filter`)
    //This retrive the option in the selected filter containers
    const selectedOptToChange = document.querySelector(`#${idWord}Opt`)
    //This line change the unselected state of the option inside the option container
    selectedOptToChange.attributes.selected.value = 'true'
    //This will change the state of the button inside the options container to selected
    btnClicked.attributes.selected.value = 'true'
    //This close the options container
    addFilterBtn.click()

}
//This loop append to each filter option the event listener and his function
for (const filterOpt of allFilterOpts) {
    filterOpt.onclick = addFilterOption
}

//Here the function to delete the selected filters
//Retrieves all the delete buttons of the selected filters
const allDeleteFilterBtns = document.querySelectorAll('.deleteOpt')
//this function will change the state of the option filter to unselect and will change the state of the option filter inside the options container to select false
const unselectFilter = (e) =>{
    //Prevent the default behaviour
    e.preventDefault()
    //Retrieve the name/id of the option that is involved in the event -> this allow to work with other elements that belongs to that option
    const idWord = e.target.attributes.idWord.value
    //Retrieve the option that will be hidden
    const optToHide = document.querySelector(`#${idWord}Opt`)
    //Retrive the option of the options container that will be displayed
    const btnToDisplay = document.querySelector(`#${idWord}Filter`)
    //This line change the display of the button inside the options container
    btnToDisplay.attributes.selected.value = 'false'
    //This change the display of the selected option
    optToHide.attributes.selected.value = 'false'
}
//This loop append to each delete button the function to unselect the option
for (const deleteBtn of allDeleteFilterBtns) {
    deleteBtn.onclick = unselectFilter
}


//------------------------ Search Mode Toggle Code
const searchModeTags = document.querySelectorAll('.tag')

//Function for change the search mode of the search bar
const selectSearchMode = (e) => {
    try {
        //Prevent the default behaviour
        e.preventDefault
        //Retrieve the tag that invoques the event
        const tag = e.target
        //Check if the state of the tag is active
        const tagIsActive = JSON.parse(tag.attributes.active.value)
        //Retrieve the container of the mode tags
        const tagsCont = document.querySelector('.modesTagsContainer')
        console.log(tagsCont)
        //retrieve the attribute "isopen" to Check if the container is visible or not
        const tagsContIsOpen = JSON.parse(tagsCont.attributes.isopen.value)
        //check if the container visible
        if(!tagsContIsOpen){
            //In case that the container isnt open
            //Change his state to open
            tagsCont.attributes.isopen.value = 'true'
            //Change his style and change his display type
            tagsCont.style.display = 'flex'
            return
        }
        if(tagIsActive){
            //If the click is in the active tag and the container is visible
            //We've to close the container
            //Change the attribute to false
            tagsCont.attributes.isopen.value = 'false'
            //Change the style to hide the container
            tagsCont.style.display = 'none'
        }
        //In case that the event was called by an inactive tag
        if(!tagIsActive){
            //First retrieve all elements with the class "tag"
            const allTags = Array.from(document.querySelectorAll('.tag'))
            //After we have to filter and find the prevous active tag -> This process is before to change the tag or search mode
            const prevActiveTag = allTags.filter(tag => JSON.parse(tag.attributes.active.value))[0]
            //After get the previous active tag we have to delete it, and move inside the modeTagsCont
            prevActiveTag.remove()
            //change the state of the previous active tag
            prevActiveTag.attributes.active.value = 'false'
            //Append the previous tag to the modeTagsCont
            tagsCont.append(prevActiveTag)
            //Here is the process to put the new mode/tag into the parent element
            //Retrieve the parent element
            const parentTagsCont = document.querySelector('.tagsSelectCont')
            //Inserte before the mode tags container the new selected tag/mode
            parentTagsCont.insertBefore(tag,tagsCont)
            //Change is state
            tag.attributes.active.value = 'true'
            //Chante the position to place the mode tags container below it
            tag.style.position = 'relative'
            //Close the tags container -> Change his state to false
            tagsCont.attributes.isopen.value = 'false'
            //Change his styles to hide it
            tagsCont.style.display = 'none'
        }
        
    } catch (error) {
    }
}
//This loop append the function to each tag element
for (const tag of searchModeTags) {
    tag.onclick = selectSearchMode
}