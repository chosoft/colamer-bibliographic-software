const next = document.querySelector(".next");
const back = document.querySelector(".back");
const page = document.querySelector(".page");

next.addEventListener("click", (e) => {
    const min = page.getAttribute("min")
    const actual = page.getAttribute("actual")
    const max = page.getAttribute("max")
    const oversteps = page.getAttribute("oversteps")
    let ms = actual + 1
    let mxs = ms + 3
    let sk = actual
    if (mxs > max) {
        oversteps = mxs - max
        if (oversteps > 0) {
            mxs = actual + oversteps
        }
    }
    page.setAttribute("min", ms)
    page.setAttribute("actual", mxs)
    page.setAttribute("oversteps", oversteps)
})