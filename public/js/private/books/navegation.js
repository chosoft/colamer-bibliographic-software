const next = document.querySelector(".next");
const back = document.querySelector(".back");
const page = document.querySelector(".page");

next.addEventListener("click", (e) => {
    const min = parseInt(page.getAttribute("min"))
    const actual = parseInt(page.getAttribute("actual"))
    const max = parseInt(page.getAttribute("max"))
    let ms = actual + 1
    let mxs = ms + 3
    let sk = mxs
    if (mxs > max) {
        let oversteps = mxs - max
        if (oversteps > 0) {
            mxs = actual + oversteps
        }
        page.setAttribute("oversteps", oversteps)
    }
    page.setAttribute("min", ms)
    page.setAttribute("actual", mxs)
    page.setAttribute("skipSteps", sk)
})