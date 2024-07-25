import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"; // These icon imports are not used in your component
import { Navigation, Pagination } from "swiper/modules";
import { live } from "../../data/data"; // Assuming 'live' is an array of objects containing auction details

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LocalOfferz = () => {
  return (
    <>
      <div className="h-[784px] lg:h-[90vh] w-full lg:w-[98.9vw]      ">
        <div className="">
          <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5vh]">
            LocalOfferz
          </div>
          <hr className="h-1 bg-red-500 mt-[15px] w-20 mx-auto" />

          <div className="relative">
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
              <div className="w-[74vw]  flex justify-center mx-auto gap-[1.3vw] items-center mt-[5vh]">
                {live.map((card, index) => (
                  <SwiperSlide key={index} className="relative w-[370px]">
                    <div className="w-[327px] bg-white mx-auto lg:w-[17.3vw] h-[442px] lg:h-[54.5vh]  rounded-xl shadow-lg">
                      <div className="p-5 lg:p-[1vw]">
                        <img
                          className="w-[290px]  lg:w-[15.8vw] h-[290px] lg:h-[31.2vh]"
                          src={card.img1}
                          alt="Car"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-3 leading-[3vh] text-left">
                          "{card.Car}"
                          <button className="flex justify-center text-center mr-5 lg:mr-[0.5vw] mt-[0.75vw] text-[12px] lg:text-[0.78vw] h-[24px] lg:h-[3vh]  w-[43px] lg:w-[2.7vw] border text-white bg-[#ca0000] rounded-lg">
                            BID
                          </button>
                        </div>
                        <div>
                          <div className="flex   px-5 pb-[1vh]  ">
                            {/* The following image element is commented out since it's not needed */}
                            {/* <img className="h-[4.7vh] w-[2.5vw]" src={image10} alt="Lot" /> */}
                            <div className="flex justify-between items-center    w-full">
                              <div className="flex flex-col">
                                <div className="font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh] text-left">
                                  {card.heading}
                                </div>
                                <div className="font-urbanist text-[18px] lg:text-[1vw] font-bold leading-[2.5vh] text-left">
                                  {card.Name}
                                </div>
                              </div>
                              <div className="flex flex-col text-right">
                                <div className="font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh]">
                                  {card.Bid}
                                </div>
                                <div className="font-urbanist text-[18px] lg:text-[1vw] font-bold leading-[2.5vh]">
                                  {card.Price}
                                </div>
                              </div>
                            </div>
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
      </div>
    </>
  );
};
  

export default LocalOfferz