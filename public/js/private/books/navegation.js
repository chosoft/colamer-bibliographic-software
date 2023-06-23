const next = document.querySelector(".next");
const back = document.querySelector(".back");
const page = document.querySelector(".page");

next.addEventListener("click", (e) => {
    try {
        const min = parseInt(page.getAttribute("min"))
        const actual = parseInt(page.getAttribute("actual"))
        const max = parseInt(page.getAttribute("max"))
        if (!(min == max || actual == max)) {
            let sk = actual
            let ms = actual + 1
            let mxs = ms + 3
            if (ms == max) {}
            else if (mxs > max) {
                let oversteps = mxs - max
                if (oversteps > 0) {
                    mxs = ms + oversteps
                    sk = mxs
                }
                page.setAttribute("oversteps", oversteps)
            }
            page.setAttribute("min", ms)
            page.setAttribute("actual", mxs)
            page.setAttribute("skipSteps", sk)
        }
    } catch (error) {
        console.log(error)
    }
})

let firstTime = false;

back.addEventListener("click", (e) => {
    try {
        const min = parseInt(page.getAttribute("min"))
        const actual = parseInt(page.getAttribute("actual"))
        const max = parseInt(page.getAttribute("max"))
        const oversteps = parseInt(page.getAttribute("oversteps"))
        let sk = parseInt(page.getAttribute("skipSteps"))
        if (!sk == 0) {
            if (!firstTime) {
                sk = min - 4
                if (sk == 1) {
                    sk = sk -1
                }
                firstTIme = true
                page.setAttribute("skipSteps", sk)
            }
            if (oversteps > 0) {
                actual = actual - oversteps
                oversteps = 0
            }
            let mxa = min - 1 
            let ma = mxa - 3
            sk = min
            if (ma == 1) {
                sk = 0
            }
            if (mxa <= 0) {
                sk = 0
                ma = 1
                mxa = 4
            }
            page.setAttribute("min", ma)
            page.setAttribute("actual", mxa)
            page.setAttribute("skipSteps", sk)
         }
     } catch (error) {
         console.log(error)
    }
})