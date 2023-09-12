const toggleBtns = document.querySelectorAll('.alterView')

const toggleInputChange = (e) => {
    e.preventDefault()
    const btn = e.target.closest('.alterView')
    const fdId = btn.getAttribute('asdF')
    const fieldToToggle = document.querySelector(fdId)
    
    const state = parseInt(btn.getAttribute('state'))
    if(!state){
        fieldToToggle.setAttribute('type','text')
        btn.setAttribute('state',1)
        btn.innerText = ""
        btn.innerHTML = `<i class="ri-eye-2-line see">`
        return
    }
    fieldToToggle.setAttribute('type','password')
    btn.setAttribute('state',0)
    btn.innerText = ""
    btn.innerHTML = `<i class="ri-eye-close-line notsee">`
} 

toggleBtns.forEach(btn => btn.onclick=toggleInputChange)