import React, { useRef, useState, useEffect } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/bundle';
import '../stylesheets/SwiperGallery.css';

// import required modules
function SwiperGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  //   useEffect(() => {
  //     const mySwiper = new Swiper('.swiper-container', {
  //       // Swiper 選項配置
  //       slidesPerView: 3,
  //       spaceBetween: 30,
  //       // 其他選項...
  //     });

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-1.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-5.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-6.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-7.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-8.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-9.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-10.jpg' />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-1.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-5.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-6.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-7.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-8.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-9.jpg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://swiperjs.com/demos/images/nature-10.jpg' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default SwiperGallery;
