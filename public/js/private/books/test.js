var img = document.querySelector('.link')

img.addEventListener('input', (e) => {
    e.preventDefault
    console.log("Esta siendo cambiado")
    var test = "Preba"
})

var img2 = document.querySelector('.img')

img2.setAttribute(src, test)