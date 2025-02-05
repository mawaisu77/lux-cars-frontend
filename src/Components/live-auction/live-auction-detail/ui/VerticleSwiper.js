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

export default function VerticleSwiper({images}) {

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
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        direction='vertical'
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-[30vw] "
      >
       {images && images.map((image, index) => (
        <SwiperSlide className='rounded-md md:rounded-[0.5vw]' key={index}>
          <div className='w-full h-[6.823vw] rounded-md md:rounded-[0.5vw]'>
            <img src={image} className='w-full h-full object-cover rounded-md md:rounded-[0.5vw]'  alt={`Vehicle_Image ${index + 1}`} />
          </div>
        </SwiperSlide>
        ))}
   
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
