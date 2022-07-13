const dropdowns = document.querySelectorAll('.dropdown')

dropdowns.forEach(dropdown => {
    const header = dropdown.querySelector('.dropdown__header')
    const main = dropdown.querySelector('.dropdown__main')

    if(dropdown.classList.contains('dropdown--active')) {
        main.style.height = main.scrollHeight + "px"
    }


    header.addEventListener('click', (e) => {
        e.preventDefault()
        dropdown.classList.toggle('dropdown--active')

        if (dropdown.classList.contains('dropdown--active')) {
            main.style.height = main.scrollHeight + "px"
        } else {
            main.style.height = "0px"
        }
    })
})