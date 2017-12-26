import Swiper from 'swiper/dist/js/swiper.min.js';
import ImagesZoom from 'staticDir/imageszoom/imageszoom.js'

window.onload = function(){
    setTimeout(() => {
        /** 公司简介 **/
        // 图片放大
        ImagesZoom.init({
            elem: '.imgzoom-main'
        });
        // 幻灯片
        const mySwiper = new Swiper('.swiper-container', {
            // loop: true,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // 分页器
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }, 2000);
};
