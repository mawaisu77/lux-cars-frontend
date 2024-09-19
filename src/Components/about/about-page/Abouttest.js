import React, { useContext } from 'react';
import { testi } from '../../../data/data';
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
// import { IslandContext } from '../../../context/IslandContext';

const Abouttest = () => {
    // const { selectedIsland } = useContext(IslandContext);

    return (
        <>
           {/* <div>
            {selectedIsland ? (
                <p>Selected Island: {selectedIsland}</p>
            ) : (
                <p>No island selected</p>
            )}
        </div> */}
            <div className='h-[822px] lg:h-[77vh]   bg-[#f8f8f8]'>
                <div className='text-[36px] lg:text-[2.3vw] font-urbanist font-semibold mb-[5vh] pt-[9.3vh]'>
                    Testimonials
                    <hr className='h-1 bg-red-500 w-20 mx-auto' />
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={80}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        740: { slidesPerView: 1 },
                        1024: { slidesPerView: 2 },
                        1440: { slidesPerView: 2},
                    }}
                    loop={true}
                    // navigation={{
                    //     prevEl: <IoIosArrowBack />,
                    //     nextEl: <IoIosArrowForward />,
                    // }}
                    navigation={false}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className='w-full lg:w-[72vw] h-[480px] lg:h-[53vh] mt-[40px] flex justify-center items-center'
                >
                    {testi.map((testimonial, index) => (
                        <SwiperSlide key={index} className='relative w-[370px] '>
                            <div className='flex flex-col justify-center items-center mb-10'>
                                <div className='w-[340px] lg:w-[30vw] h-[420px] bg-white lg:h-[40vh] mx-auto rounded-lg shadow-lg   p-[1vw]'>
                                    <p className='text-[18px] lg:text-[1.17vw] font-urbanist'>{testimonial.para}</p>
                                    <p className='text-[24px] lg:text-[1.56vw] font-bold font-urbanist mt-[4vh]'>
                                        {testimonial.name}
                                    </p>
                                    <p className='text-[14px] lg:text-[0.91vw] font-urbanist'>{testimonial.designation}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center -mt-[12vh]'>
                                    <img src={testimonial.image} alt='Client' className='w-[150px] lg:w-[10vw] h-[158px] lg:h-[22.4vh]' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default Abouttest;



