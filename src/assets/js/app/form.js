const proudctCardForm = document.querySelector('.product-card-form')
const productCardSizes = document.querySelectorAll('.product-card__size')
const btnToCard = proudctCardForm.querySelector('.to-card')

if (btnToCard && proudctCardForm) {
    productCardSizes.forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.currentTarget.checked) {
                btnToCard.classList.remove('btn--outline')
                btnToCard.classList.add('btn--dark')
                btnToCard.removeAttribute('disabled')
                btnToCard.textContent = "Добавить в корзину"
            }
        })
    })

    proudctCardForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const formdata = new FormData(proudctCardForm)

        if (!formdata.get('size')) {
            btnToCard.classList.add('btn--outline')
            btnToCard.classList.remove('btn--dark')
            btnToCard.setAttribute('disabled', "true")
            btnToCard.textContent = "Выберите размер"
        }

        console.log(true)
    })
}