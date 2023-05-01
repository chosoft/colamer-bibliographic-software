var input = document.querySelector('.link');
var image = document.querySelector('.image');

input.addEventListener('paste', (e) => {
    var url = e.clipboardData.getData("text")
    console.log(url)
    image.setAttribute('src', url)
})