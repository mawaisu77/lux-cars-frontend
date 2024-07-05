import React from 'react'
import { TfiReload } from "react-icons/tfi";
// import image10 from  "../assets/IMG (14).pn";
import AwesomeSlider from 'react-awesome-slider';
import {archieved} from "../../data/data"
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
// import SwiperCard from "./SwiperTextReviewCard";
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Archieved = () => {
  const AutoplaySlider =(AwesomeSlider);


  return (
    <>
     <div  className='h-[784px] lg:h-[90vh] w-full lg:w-[98.9vw] mt-[5vh]  '>
        <div className="">
          <div className='flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw]  '>
           Archieved Listings
          </div>
          
          <hr className='h-1 bg-red-500 mt-[30px] w-20 mx-auto' />
          <Swiper
         slidesPerView={1}
          spaceBetween={50}
          breakpoints={{
            // when window width is below medium (md) breakpoint
            640: {
              slidesPerView: 1,
            },
            740: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
          // onSwiper={(swiper) => (swiperRef.current = swiper)}
          scrollbar={{ draggable: true }}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
         className=" w-full  lg:w-[72vw]   h-[550px] lg:h-[66vh]  mt-[40px] flex justify-center items-center"
        >
          <div className='w-[74vw] flex justify-center mx-auto gap-[1.3vw] items-center mt-[9vh] '>
            
          {archieved.map((card, index) => (
            <SwiperSlide  className=" relative w-[370px]">
            <div key={index}className='w-[327px] rounded-xl shadow-lg mx-auto lg:w-[17.3vw] h-[514px] lg:h-[58.5vh]'>
              <div className ='p-5 lg:p-[1vw]'>
                <img className='w-[290px]  lg:w-[15.8vw] h-[290px] lg:h-[31.2vh]' src={card.img} alt="Car" />
              </div>
              <div>
                <div className='px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-3 leading-[3vh] text-left'>
                  {card.title}
                </div>
                <div className='flex justify-between border-b'>
                  <div className='flex gap-2 px-5 lg:px-[1vw] pb-[1vh]'>
                    {/* <img className='h-[4.5vh] w-[2.2vw]' src={image10} alt="Lot" /> */}
                    <div>
                      <div  className='font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh] py-2 text-left'>
                        Lot: {card.lot}
                      </div>
                      <div  className='font-urbanist text-[15px] lg:text-[1vw] font-bold leading-[2.5vh] text-left'>
                        VIN: {card.vin}
                      </div>
                    </div>
                  </div>
                  <div>
                   
                  </div>
                </div>

                <div className='flex justify-between  px-5 lg:p-[1vw]  font-urbanist'>
                  <div className='text-left'>
                    <p className='text-[#7a798a] text-[13px] lg:text-[0.84vw]'>{card.bid}</p>
                    <p className='text-[18px] lg:text-[1.17vw] font-bold'> {card.price}</p>
                  </div>
                  <div className='flex justify-center items-center     text-right lg:gap-[0.3vw]  '>
                    <TfiReload /> 
                    <p  className='text-[#7a798a] text-[5px] lg:text-[1.5vw] font-semibold'>{card.view}</p>
                  </div>
                </div>
              </div>
            </div>
            </SwiperSlide>
          ))}
             
        </div>
        </Swiper>
        </div>
        </div>
    </>
  )
}

export default Archieved