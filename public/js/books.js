const btn = document.querySelector('#leave')

//FUNCION PARA LOG OUT DE LA CUENTA

function leave(){
    // window.location.href='/logout'
    window.open('/sign-in')
}

btn.onclick = leave
