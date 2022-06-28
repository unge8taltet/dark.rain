import Swiper, {Navigation} from 'swiper';

export default {
    init() {
        new Swiper('.swiper', {
            spaceBetween: 31,
            slidesPerView: 3,
            navigation: {
                nextEl: '.category__arrow--next',
                prevEl: '.category__arrow--prev',
            },
            modules: [Navigation],
        });
    },
    finalize() {
        console.log('home finalize')
    }
}
