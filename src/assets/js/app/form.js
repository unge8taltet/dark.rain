const productCardForm = document.querySelector('.product-card-form')
const productCardSizes = document.querySelectorAll('.product-card__size')
if (productCardForm && productCardSizes) {
    const btnToCard = productCardForm.querySelector('.to-card')
    if (btnToCard) {
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

        productCardForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const formdata = new FormData(productCardForm)

            if (!formdata.get('size')) {
                btnToCard.classList.add('btn--outline')
                btnToCard.classList.remove('btn--dark')
                btnToCard.setAttribute('disabled', "true")
                btnToCard.textContent = "Выберите размер"
            }
        })
    }
}
