import Swiper, {Navigation} from "swiper";

window.addEventListener('DOMContentLoaded', () => {
    const searchHeader = document.querySelector('.header__search-form')
    const headerMenu = document.querySelector('.header-menu')

    if (searchHeader) {
        const searchOpen = document.querySelectorAll('.search-open')
        const searchClose = document.querySelectorAll('.search-close')

        searchOpen.forEach(openBtn => {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault()
                document.body.classList.add('is-lock')
                searchHeader.classList.add('search--visible')
                const input = searchHeader.querySelector('.search__field')
                if (input) {
                    setTimeout(() => {
                        input.focus({preventScroll: true})
                    }, 300)
                }
            })
        })

        searchClose.forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                document.body.classList.remove('is-lock')
                searchHeader.classList.remove('search--visible')
            })
        })
    }

    const nav = document.querySelector('.header__nav')
    if (nav) {
        const listEl = nav.querySelectorAll('li.has-children')
        listEl.forEach(el => {
            const menuEl = el.querySelector('ul')

            el.addEventListener('mouseenter', () => {
                menuEl.style.height = menuEl.scrollHeight + "px"
                el.classList.add('has-children--active')
            })

            el.addEventListener('mouseleave', () => {
                menuEl.style.height = "0"
                el.classList.remove('has-children--active')
            })

            el.addEventListener('click', () => {
                el.classList.toggle('has-children--active')

                if (menuEl) {
                    if (el.classList.contains('has-children--active')) {
                        menuEl.style.height = menuEl.scrollHeight + "px"
                    } else {
                        menuEl.style.height = "0"
                    }
                }
            })
        })
    }

    if (headerMenu) {
        const headerOpen = document.querySelectorAll('.header-open')
        const headerClose = document.querySelectorAll('.header-close')

        headerOpen.forEach(openBtn => {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault()
                headerMenu.classList.add('header-menu--active')
                document.body.classList.add('is-lock')
            })
        })

        headerClose.forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault()
                headerMenu.classList.remove('header-menu--active')
                document.body.classList.remove('is-lock')
            })
        })
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