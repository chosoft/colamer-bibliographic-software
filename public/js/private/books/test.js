var img = document.querySelector('.link')
var img2 = document.querySelector('.image')

console.log(img.value)

img.addEventListener("onchange", async () => {
        img2.setAttribute("src", img.value)
        console.log(img2.src)
    })

const prueba = (info) => {
    console.log(info)
}  