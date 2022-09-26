import data from "./data.json" assert { type: "json" };
const contentTime = document.querySelectorAll('.content-time') // Used for DOM Update

const init = (() => {
    const selections = document.querySelectorAll('[data-selection]') // Daily, Weekly, Monthly

    const focusLastSelection = (() => {
        if (localStorage.length === 0) localStorage.setItem('lastSelection', 'daily') // Prevents Error on Empty Local Storage

        selections.forEach(elem => {
            if (localStorage.lastSelection === elem.dataset.selection) elem.focus()
        })
    })()

    selections.forEach(elem => {
        elem.addEventListener('click', changeSelection)
    });

    function changeSelection(e) {
        const lastSelection = localStorage.lastSelection
        const currSelection = e.target.dataset.selection

        if (lastSelection === currSelection) return
        localStorage.setItem('lastSelection', currSelection)
        updateDOM(currSelection)
    }

    updateDOM(localStorage.lastSelection)
})()



function updateDOM() {

    const determinePreviousStr = (selection) => {
        if (selection === 'daily') return 'Yesterday'
        if (selection === 'weekly') return 'Last Week'
        if (selection === 'monthly') return 'Last Month'
    }

    const determineHourNum = (hourNum) => {
        if (hourNum == 1) return 'hr'
        return 'hrs'
    }

    for (let i = 0; i < contentTime.length; i++) {
        // Gets Needed Info from data.json According to Last Selection of Daily/Weekly/Monthly
        let selectedData = data[i].timeframes[localStorage.lastSelection] 

        const current = contentTime[i].children[0];
        current.textContent = `${selectedData.current}${determineHourNum(selectedData.previous)}`

        const previous = contentTime[i].children[1];
        previous.textContent = `${determinePreviousStr(localStorage.lastSelection)} 
        - ${selectedData.previous}${determineHourNum(selectedData.previous)}`
    }
}

