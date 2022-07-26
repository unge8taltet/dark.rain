import Swiper, {Navigation, Pagination} from "swiper";

window.addEventListener('DOMContentLoaded', () => {

    const basketOpen = document.querySelector('.basket__open')
    const basketItems = document.querySelector('.basket__items')
    const basketEditing = document.querySelector('.basket__editing')

    if (basketOpen && basketItems) {
        basketOpen.addEventListener('click', (e) => {
            e.preventDefault()

            basketItems.classList.toggle('basket__items--active')
            basketOpen.classList.toggle('basket__open--active')
            basketEditing.classList.toggle('basket__editing--active')

            if (basketItems.classList.contains('basket__items--active')) {
                basketItems.style.height = basketItems.scrollHeight + "px"
            } else {
                basketItems.style.height = "0px"
            }
        })
    }

    const productCardTitle = document.querySelector('.product-card__title > h1')
    const productCardLike = document.querySelector('.product-card__like')
    if (productCardTitle && productCardLike) {
        const productCardTitleWidth = productCardTitle.clientWidth
        productCardLike.style.left = productCardTitleWidth + 20 + "px"
    }

    const productPackageCheckbox = document.querySelector('.product-package-checkbox')
    if (productPackageCheckbox) {
        const productPackage = document.querySelector('.product-package')

        if (productPackage) {
            productPackageCheckbox.addEventListener('change', () => {
                if (productPackageCheckbox.checked) {
                    productPackage.classList.add('product-package--is')
                } else {
                    productPackage.classList.remove('product-package--is')
                }
            })
        }
    }

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

    new Swiper('.card-gallary__main', {
        spaceBetween: 20,
        nested: true,
        slidesPerView: 1,
        modules: [Pagination],
        pagination: {
            el: ".product-pagination"
        },
        on: {
            init: (s) => {
                let html = ""
                const itemsContainer = document.querySelector('.card-gallary__items')

                for (let i = 0; i < s.imagesToLoad.length; i++) {
                    html += s.imagesToLoad[i].outerHTML
                }

                itemsContainer.innerHTML = html

                const items = itemsContainer.querySelectorAll('img')
                items.forEach((el, i) => {
                    el.addEventListener('click', () => {
                        s.slideTo(i)
                    })
                })
            }
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


    function initMap() {
        if (document.querySelector('#map-shops')) {
            google.maps.event.addDomListener(window, 'load', init);
        }

        function init() {
            let coords = document.getElementById('map-shops').dataset.coords,
                coordsArray = coords.split(','),
                locations = [];

            for (let i = 0; i < coordsArray.length; i++) {
                if (i % 2 !== 0) {
                    continue;
                }
                locations.push(coordsArray[i] + ',' + coordsArray[i + 1])
            }

            let styles = [
                    {
                        stylers: [
                            {hue: "#00ffe6"},
                            {saturation: -100}
                        ]
                    }, {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [
                            {lightness: 100},
                            {visibility: "simplified"}
                        ]
                    }, {
                        featureType: "road",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }
                ],

                image = {
                    url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg width="29" height="39" viewBox="0 0 29 39" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                        '<path d="M25.6068 23.6451L2.94824 23.6451L14.0918 38.5582L25.6068 23.6451Z" fill="black"/>\n' +
                        '<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2799 29.2644C22.1664 29.2644 28.5597 22.8711 28.5597 14.9846C28.5597 7.09802 22.1664 0.704712 14.2799 0.704712C6.39331 0.704712 0 7.09802 0 14.9846C0 22.8711 6.39331 29.2644 14.2799 29.2644ZM14.2794 21.5072C17.8817 21.5072 20.802 18.5869 20.802 14.9846C20.802 11.3823 17.8817 8.46204 14.2794 8.46204C10.6771 8.46204 7.75684 11.3823 7.75684 14.9846C7.75684 18.5869 10.6771 21.5072 14.2794 21.5072Z" fill="black"/>\n' +
                        '</svg>'),
                    size: new google.maps.Size(200, 200),
                    scaledSize: new google.maps.Size(32, 32),
                    anchor: new google.maps.Point(16, 16),
                    labelOrigin: new google.maps.Point(16, 16)
                },

                mapOptions = {
                    center: {lat: 58.275649, lng: 33.457609},
                    styles: styles,
                    icon: image,
                    zoom: 5,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.DEFAULT,
                    },
                    disableDoubleClickZoom: true,
                    mapTypeControl: false,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    },
                    scaleControl: true,
                    scrollwheel: false,
                    panControl: true,
                    streetViewControl: false,
                    draggable: true,
                    overviewMapControl: true,
                    overviewMapControlOptions: {
                        opened: false,
                    },
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                },

                mapElement = document.getElementById('map-shops'),
                map = new google.maps.Map(mapElement, mapOptions);

            for (let i = 0; i < locations.length; i++) {

                let latlng = locations[i].split(',');

                new google.maps.Marker({
                    position: new google.maps.LatLng(latlng[0], latlng[1]),
                    map: map,
                    icon: image
                });
            }
        }
    }
    initMap()
})