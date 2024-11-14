import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { KeyboardArrowDown } from '@mui/icons-material';
import image from '../../../../assets/Vehicle/IMG (50).png'

export default function VerticleSwiper() {
    const swiperRef = useRef(null);
    const handleNextSlide = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.slideNext();
        }
      };
  return (
    <div className=''>
      <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = { swiper };
          }}
        slidesPerView={3}
        spaceBetween={20}
        loop={true}
        direction='vertical'
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          // '@0.00': {
          //   slidesPerView: 1,
          //   spaceBetween: 10,
          // },
          // '@0.75': {
          //   slidesPerView: 2,
          //   spaceBetween: 20,
          // },
          // '@1.00': {
          //   slidesPerView: 3,
          //   spaceBetween: 40,
          // },
          // '@1.50': {
          //   slidesPerView: 4,
          //   spaceBetween: 50,
          // },
        }}
        modules={[Pagination]}
        className="mySwiper h-[500px] "
      >
        <SwiperSlide className='rounded-lg'>
          <div className='w-full h-[150px] bg-red-500 rounded-lg'>
            <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
          </div>
        </SwiperSlide>
   
        <SwiperSlide className='rounded-lg'>
          <div className='w-full h-[150px] bg-red-500 rounded-lg'>
            <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-lg'>
          <div className='w-full h-[150px] bg-red-500 rounded-lg'>
            <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-lg'>
          <div className='w-full h-[150px] bg-red-500 rounded-lg'>
            <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
          </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-lg'>
          <div className='w-full h-[150px] bg-red-500 rounded-lg'>
            <img src={image} alt="" className='w-full h-full object-cover rounded-lg' />
          </div>
        </SwiperSlide>


      </Swiper>
      <div 
      className=' flex justify-center items-center '>
        <div className='cursor-pointer bg-white' onClick={handleNextSlide}>
          <KeyboardArrowDown className='text-black text-2xl'/>
        </div>
      </div>
    </div>
  );
}
