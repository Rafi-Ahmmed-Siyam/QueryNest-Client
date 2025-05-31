import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import img1 from '../assets/sliderImg/Slide1.jpg'
import img2 from '../assets/sliderImg/Slide2.jpg'
import img3 from '../assets/sliderImg/Slide3.jpg'

const Slider = () => {
   return (
      <div className='w-150px md:container lg:container  py-10  px-5 lg:px-8 mx-auto'>
         <Swiper

            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 5000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
         >
            <SwiperSlide>
               <Slide img={img1}
                  hedding='Find Better Alternatives'
                  subtext='Tired of low-quality products? Post your query and discover community-recommended better options.'
                  btnContent='Explore Queries'
                  link='/allQueries'
               />
            </SwiperSlide>
            <SwiperSlide>
               <Slide img={img2}
                  hedding='Real Users. Real Reviews.'
                  subtext='See what others are recommending. Make smarter decisions with real-time suggestions from real people.'
                  btnContent='Add Your Query'
                  link='/addQueries'
               />
            </SwiperSlide>
            <SwiperSlide>
               <Slide img={img3}
                  hedding='Ask. Answer. Improve.'
                  subtext='Ask your questions, get trusted recommendations, and help others with your product insights.'
                  btnContent='Add Your Query'
                  link='/'
               />
            </SwiperSlide>

         </Swiper>
      </div>
   );
};

export default Slider;