const temp = document.querySelectorAll('[data-selector]')

temp.forEach(elem => {
    elem.addEventListener('click', changeSelector)
});

let selector

function changeSelector(e) {
    selector = e.target.dataset.selector
    console.log(selector)
}

