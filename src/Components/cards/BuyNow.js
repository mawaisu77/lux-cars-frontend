import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useGetAllBidsCar from '../../hooks/useGetAllBidsCar';
import Shimmer from '../../utils/loaders/Shimmer';
import "./swiperstyles.css"
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { Link } from 'react-router-dom';



 const BuyNow = () => {
  const { carData, carLoading, carError } = useGetAllBidsCar('cars/get-all-cars'); 
  console.log("first", carData)
  if (carLoading) {
    return <Shimmer />;
  }

  if (carError) {
    return <div className='text-2xl font-bold p-10 text-red-600'>Error: No Available Data 
    {carError}
    </div>;
  }


  return (
    <>
      <div className="h-[784px] lg:h-[90vh] relative w-full lg:w-[98.9vw] bg-[#f8f8f8]   ">
        <div className="">
          <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5vh]">
            Buy Now
          </div>
          <hr className="h-1 bg-red-500 mt-[15px]  w-20 mx-auto" />

          <div className="relative ">
            <Swiper
            style={{
              "--swiper-pagination-color": "#FFBA08",
              "--swiper-pagination-bullet-inactive-color": "#999999",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "16px",
              "--swiper-pagination-bullet-horizontal-gap": "6px"
            }}
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
              navigation={{
                nextEl: '.arrow-right',
                prevEl: '.arrow-left',
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  if (index < 4) {
                    return `<span class="${className}"></span>`;
                  }
                  return '';
                },
              }}
              modules={[Navigation, Pagination]}
              className="w-full lg:w-[82vw] h-[550px] lg:h-[66vh] mt-[40px]"
            >
              <div className="w-[90vw]  flex justify-center mx-auto  items-center mt-[9vh]">
                {carData && carData.data.cars.map((card, index) => (
                  <SwiperSlide key={index} className="relative w-[370px]">
                    <div className="w-[327px] bg-white mx-auto lg:w-[17.3vw] h-[500px] lg:h-[54.5vh]  rounded-xl shadow-lg">
                      <div className="p-5 lg:p-[1vw]">
                        <img
                          className="w-[290px]  rounded-xl lg:w-[15.8vw] h-[290px] lg:h-[31.2vh]"
                          src={card.image}
                          alt="Car"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-2 leading-[3vh] text-left">
                          "{card.title}"
                          <Link to={`vehicle-detail/1249363`}>
                          <button className="flex justify-center text-center mr-5 lg:mr-[0.5vw]  text-[12px] lg:text-[0.78vw] h-[24px] lg:h-[3vh]  w-[43px] lg:w-[2.7vw] border text-white bg-[#ca0000] rounded-lg">
                            BID
                          </button>
                          </Link>
                        </div>
                        <div>
                          <div className="flex   px-5 pb-[1vh]  ">
                            {/* The following image element is commented out since it's not needed */}
                            {/* <img className="h-[4.7vh] w-[2.5vw]" src={image10} alt="Lot" /> */}
                            <div className="flex justify-between items-center     w-full">
                              <div className="flex flex-col">
                                <div className="font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh] text-left">
                                  {card.title}
                                </div>
                                <div className="font-urbanist text-[18px] lg:text-[1vw] font-bold leading-[2.5vh] text-left">
                                  {card.lot}
                                </div>
                              </div>
                              <div className="flex flex-col text-right">
                                <div className="font-urbanist text-[13px] lg:text-[0.75vw] leading-[2vh]">
                                  {card.vin}
                                </div>
                                <div className="font-urbanist text-[18px] lg:text-[1vw] font-bold leading-[2.5vh]">
                                  {card.status}
                                </div>

                              </div>
                              
                            </div>
                            
                          </div>
                          <button className=' w-[270px] lg:w-[15vw]  rounded-xl h-[40px] lg:h-[5.5vh] text-[16px] lg:text-[1.04vw] bg-[#7a798a] text-white font-urbanist mt-3' >
                          Bid Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          <button className="arrow-left arrow">
          <IoIosArrowDropleft size={35} className='text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150'/>
          </button>
          <button className="arrow-right arrow">
          <IoIosArrowDropright size={35} className='text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150'/>
          </button>
        </div>
      </div>
    </>
  );
};
  
 
 
 export default BuyNow