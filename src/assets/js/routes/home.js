import Swiper, {Navigation} from 'swiper';

export default {
    init() {
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
    },
    finalize() {
        console.log('home finalize')
    }
}
