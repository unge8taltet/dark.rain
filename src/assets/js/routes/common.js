import Swiper, {Navigation} from "swiper";

window.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button')
    const blackout = document.querySelector('.blackout')

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            document.body.classList.add('is-blackout')
            document.body.classList.add('is-lock')
            searchButton.classList.add('header-top__search--visible')
        })

        if(blackout) {
            blackout.addEventListener('click', () => {
                document.body.classList.remove('is-blackout')
                document.body.classList.remove('is-lock')
                searchButton.classList.remove('header-top__search--visible')
            })
        }
    }


    new Swiper('.category__swiper', {
        spaceBetween: 30,
        slidesPerView: 3,
        navigation: {
            nextEl: '.category__arrow--next',
            prevEl: '.category__arrow--prev',
        },
        modules: [Navigation],
    });
    new Swiper('.bestsellers__swiper', {
        spaceBetween: 30,
        slidesPerView: 4,
        navigation: {
            nextEl: '.bestsellers__arrow--next',
            prevEl: '.bestsellers__arrow--prev',
        },
        modules: [Navigation],
    });
    new Swiper('.inspiration__swiper', {
        spaceBetween: 30,
        slidesPerView: 4,
        navigation: {
            nextEl: '.inspiration__arrow--next',
            prevEl: '.inspiration__arrow--prev',
        },
        modules: [Navigation],
    });
})