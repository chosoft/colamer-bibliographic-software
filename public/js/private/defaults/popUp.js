const bg = document.querySelector('.popUpBg')
const modal = document.querySelector('.modal')

const btnActiver = document.querySelector('.activer')
const btnCloser = document.querySelector('.modalCloser')

btnActiver.onclick = (e) => {
    e.preventDefault()
    bg.style.top = "0"
    bg.style.opacity = "1"
}
btnCloser.onclick = (e) => {
    e.preventDefault()
    bg.style.top = "200%"
    bg.style.opacity = "0"
}