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
            if (mxs > max) {
                let oversteps = max - ms
                if (oversteps >= 1) {
                    mxs = ms + oversteps
                }
                else if (oversteps == 0) {
                    oversteps++
                    mxs = ms + oversteps
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

back.addEventListener("click", (e) => {
    try {
        const max = parseInt(page.getAttribute("max"))
        const min = parseInt(page.getAttribute("min"))
        const actual = parseInt(page.getAttribute("actual"))
        const oversteps = parseInt(page.getAttribute("oversteps"))
        let sk = parseInt(page.getAttribute("skipSteps"))
        if (!(min == 1 )) {
            let mxa = min - 1
            let ma = mxa - 3
            sk = sk - 4
            page.setAttribute("min", ma)
            page.setAttribute("actual", mxa)
            page.setAttribute("skipSteps", sk)
        }
    } catch (error) {
        
    }
})

let firstTime = false;