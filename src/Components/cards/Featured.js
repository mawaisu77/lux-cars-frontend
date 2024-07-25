import React from 'react';
 // Make sure to import images correctly
 
import { Featured } from '../../data/data';
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
// import SwiperCard from "./SwiperTextReviewCard";
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedListings = () => {
  const swiperRef = useRef(null);

  return (
 
   
    <div className='h-[784px] lg:h-[90vh] w-full lg:w-[98.9vw] mt-[5vh] bg-[#f8f8f8]'>
         <div className='flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[9.5vh]'>
           Featured Listings
           
        
      </div>
      <hr className="h-1 bg-red-500 mt-[15px] w-20 mx-auto" />
    
    <div className='relative'>
    <Swiper
              slidesPerView={1}
              spaceBetween={80}
              breakpoints={{
                640: { slidesPerView: 1 },
                740: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
              scrollbar={{ draggable: true }}
              loop={true}
              navigation={true}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
          className="w-full lg:w-[72vw] h-[550px] lg:h-[66vh] mt-[40px]    flex justify-center items-center"
        >
              {Featured.map((card, index) => (
           <SwiperSlide  className=" relative w-[370px]">
       
          <div key={index} className='w-[327px] bg-white mx-auto lg:w-[17.3vw] h-[514px] lg:h-[58.5vh]  rounded-xl shadow-lg'>
            <div className='p-5 lg:p-[1vw]'>
              <img className='w-[290px]  lg:w-[15.8vw] h-[290px] lg:h-[31.2vh]' src={card.img} alt="Car" />
            </div>
            <div>
              <div className='px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-3 leading-[3vh] text-left'>
                {card.title}
              </div>
              <div className='flex justify-between border-b'>
                <div className='flex gap-2 px-5 lg:px-[1vw] pb-3 lg:pb-[1vh]'>
                  {/* <img className='h-[4.5vh] w-[2.2vw]' src={image10} alt="Lot" /> */}
                  <div>
                    <div className='font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh] py-2 text-left'>
                      Lot: {card.lot}
                    </div>
                    <div className='font-urbanist text-[15px] lg:text-[1vw] font-bold leading-[2.5vh] text-left'>
                      VIN: {card.vin}
                    </div>
                  </div>
                </div>
                <div>
                  <button className='flex justify-center text-center mr-5 lg:mr-[0.5vw] mt-[0.75vw] text-[12px] lg:text-[0.78vw] h-[24px] lg:h-[3vh]  w-[43px] lg:w-[2.7vw] border text-white bg-[#ca0000] rounded-lg'>
                    BID
                  </button>
                </div>
              </div>

              <div className='flex p-5 lg:p-[1vw] justify-between font-urbanist'>
                <div className='text-left'>
                  <p className='text-[#7a798a] text-[13px] lg:text-[0.84vw]'>Estimated Bid</p>
                  <p className='text-[18px] lg:text-[1.17vw] font-bold'>{card.estimatedBid}</p>
                </div>
                <div className='text-right'>
                  <p className='text-[#7a798a] text-[13px] lg:text-[0.84vw]'>Potential Savings</p>
                  <p className='text-[#7a798a] text-[18px] lg:text-[1.17vw] font-semibold'>{card.potentialSavings}</p>
                </div>
              </div>
            </div>
          </div>
    
           </SwiperSlide>
         ))}
        </Swiper>
    </div>
    </div>
    
  );
};

export default FeaturedListings;
