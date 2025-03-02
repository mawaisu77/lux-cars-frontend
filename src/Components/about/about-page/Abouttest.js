import React, { useContext } from "react";
import { testi } from "../../../data/data";
import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
// import SwiperCard from "./SwiperTextReviewCard";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { IslandContext } from '../../../context/IslandContext';

const Abouttest = () => {
  // const { selectedIsland } = useContext(IslandContext);

  return (
    <div className="w-[100vw] bg-secondary-gray py-[30px] sm:py-[4.167vw]">
      {/* <div>
            {selectedIsland ? (
                <p>Selected Island: {selectedIsland}</p>
            ) : (
                <p>No island selected</p>
            )}
        </div> */}

      <div className="max-w-[90vw] sm:max-w-[85vw] mx-auto">
        <div className="text-[22px] lg:text-36 font-urbanist font-semibold mb-[5vh]">
          Testimonials
          <hr className='h-1 w-16 lg:w-20 mx-auto bg-red-600' />
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 2 },
            740: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1440: { slidesPerView: 4 },
          }}
          loop={true}
          // navigation={{
          //     prevEl: <IoIosArrowBack />,
          //     nextEl: <IoIosArrowForward />,
          // }}
          navigation={false}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="w-full h-[370px] lg:h-[24.938vw] flex justify-center items-center"
        >
          {testi.map((testimonial, index) => (
            <SwiperSlide key={index} className="relative cursor-pointer ">
              <div className="flex bg-white h-[300px] lg:h-[20.938vw] flex-col justify-center items-center">
                <div className="h-full mx-auto rounded-lg shadow-md p-[1.667vw] ">
                  <div className="flex flex-col justify-center items-center text-[#062A3F]">
                    <p className="text-[14px] sm:text-18 font-urbanist text-justify">
                      {testimonial.para}
                    </p>
                    <div className="flex flex-col justify-center items-center mt-[2.5vw]">
                      <p className="text-[20px] sm:text-24 font-bold font-urbanist ">
                        {testimonial.name}
                      </p>
                      <p className="text-[16px] sm:text-14 font-urbanist text-primary-gray">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>

                  <div className="lg:absolute bottom-0 lg:left-1/2 transform lg:-translate-x-1/2 mx-auto flex flex-col  justify-center w-[100px] lg:w-[vw] items-center">
                    <img
                      src={testimonial.image}
                      alt="Client"
                      className="w-full h-full object-cover "
                    />
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

export default Abouttest;