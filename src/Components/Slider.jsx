import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

import img1 from '../../src/assets/sliderImg/slide1.jpg'
import img2 from '../../src/assets/sliderImg/slide2.jpg'
import img3 from '../../src/assets/sliderImg/slide3.jpg'
import img4 from '../../src/assets/sliderImg/slide4.jpg'
import img5 from '../../src/assets/sliderImg/desktop-with-notebook-watch.jpg'

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
               <Slide img={img3}
                  hedding='Get Help Choosing Accessories'
                  subtext='See what others are asking about keyboards, mice, monitors, and other essentials for a better setup.'
                  btnContent='Explore Accessories Queries'
                  link='/allQueries'
               />
            </SwiperSlide>

            <SwiperSlide>
               <Slide img={img1}
                  hedding='Confused About Which Phone to Buy?'
                  subtext='Not sure which phone suits your needs? Ask your question and let the community help you choose the right one.'
                  btnContent='Add Phone Query'
                  link='/addQueries'
               />
            </SwiperSlide>

            <SwiperSlide>
               <Slide img={img5}
                  hedding='Discover Smartwatches That Fit You'
                  subtext='Read questions and answers about fitness trackers, smartwatches, and what’s trending in wearable tech.'
                  btnContent='See Wearable Queries'
                  link='/allQueries'
               />
            </SwiperSlide>

            <SwiperSlide>
               <Slide img={img2}
                  hedding='Looking for the Best Sound Gear?'
                  subtext='Post your query about earbuds, headphones, or speakers and get real recommendations from others.'
                  btnContent='Add Audio Query'
                  link='/addQueries'
               />
            </SwiperSlide>



         </Swiper>
      </div>
   );
};

export default Slider;