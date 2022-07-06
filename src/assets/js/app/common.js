import Swiper, {Navigation, Pagination} from "swiper";


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

    const listEls = document.querySelectorAll('.has-children')
    listEls.forEach(el => {
        const menuEl = el.querySelector('ul')
        const menuEl2 = el.parentElement.querySelector('.children-el > ul')

        el.addEventListener('mouseenter', () => {
            if (menuEl) {
                menuEl.style.height = menuEl.scrollHeight + "px"
            }
            if (menuEl2) {
                menuEl2.style.height = menuEl.scrollHeight + "px"
            }
            el.classList.add('has-children--active')
        })

        el.addEventListener('mouseleave', () => {
            if (menuEl) {
                menuEl.style.height = "0"
            }
            if (menuEl2) {
                menuEl2.style.height = "0"
            }
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

            if (menuEl2) {
                if (el.classList.contains('has-children--active')) {
                    menuEl2.style.height = menuEl2.scrollHeight + "px"
                } else {
                    menuEl2.style.height = "0"
                }
            }
        })
    })

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
        spaceBetween: 10,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        slidesPerView: "auto",
        navigation: {
            nextEl: '.category__arrow--next',
            prevEl: '.category__arrow--prev',
        },
        modules: [Navigation],
        breakpoints: {
            992: {
                spaceBetween: 30,
                slidesPerView: 3,
                freeMode: false
            }
        }
    });

    new Swiper('.bestsellers__swiper', {
        spaceBetween: 20,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        slidesPerView: "auto",
        navigation: {
            nextEl: '.bestsellers__arrow--next',
            prevEl: '.bestsellers__arrow--prev',
        },
        modules: [Navigation],
        breakpoints: {
            992: {
                spaceBetween: 30,
                slidesPerView: 4,
                freeMode: false
            }
        }
    });
    new Swiper('.inspiration__swiper', {
        spaceBetween: 10,
        freeMode: {
            enabled: true,
            sticky: true,
        },
        slidesPerView: "auto",
        navigation: {
            nextEl: '.inspiration__arrow--next',
            prevEl: '.inspiration__arrow--prev',
        },
        modules: [Navigation],
        breakpoints: {
            992: {
                spaceBetween: 30,
                slidesPerView: 4,
                freeMode: false
            }
        }
    });

    new Swiper('.product__swiper', {
        spaceBetween: 20,
        nested: true,
        slidesPerView: 1,
        slideClass: "product__slide",
        modules: [Pagination],
        pagination: {
            el: ".product-pagination"
        }
    });

    new Swiper('.catalog-categories', {
        spaceBetween: 10,
        slidesPerView: "auto",
        freeMode: {
            enabled: true
        },
        breakpoints: {
            992: {
                cssMode: true,
            }
        }
    });
})