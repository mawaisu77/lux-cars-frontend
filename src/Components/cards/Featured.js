import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useGetAllBidsCar from "../../hooks/useGetAllBidsCar";
import Shimmer from "../../utils/loaders/Shimmer";
import "./swiperstyles.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import CarCard from "./CarCard";

const BuyNow = () => {
  const { carData, carLoading, carError } = useGetAllBidsCar(
    "cars/get-all-cars/testing?buy_now=true"
  );
  console.log("first", carData);
  if (carLoading) {
    return <Shimmer />;
  }

  if (carError) {
    return (
      <div className="text-2xl font-bold p-10 text-[#ca0000]">
        Error: No Available Data
        {carError}
      </div>
    );
  }

  return (
    <>
      <div className="h-[784px] lg:h-[90vh] relative w-full lg:w-[98.9vw] bg-[#f8f8f8]   ">
        <div className="">
          <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5vh]">
            Buy Now
          </div>
          <hr className="h-1 bg-[#ca0000] mt-[15px]  w-20 mx-auto" />

          <div className="relative ">
            <Swiper
              style={{
                "--swiper-pagination-color": "#FFBA08",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "16px",
                "--swiper-pagination-bullet-horizontal-gap": "6px",
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
                nextEl: ".arrow-right",
                prevEl: ".arrow-left",
              }}
              pagination={{
                clickable: true,
                renderBullet: (index, className) => {
                  if (index < 4) {
                    return `<span class="${className}"></span>`;
                  }
                  return "";
                },
              }}
              modules={[Navigation, Pagination]}
              className="w-full  lg:w-[82vw] h-[550px] lg:h-[68vh] mt-[40px]"
            >
              <div className="w-[90vw]  flex justify-center mx-auto  items-center mt-[9vh]">
                {carData &&
                  carData.map((card, index) => (
                    <SwiperSlide key={index} className="relative ">
                      <CarCard card={card} isBuy={true} />
                      {/* <div className="w-[330px]  mx-auto lg:w-[25.3vw] xl:w-[18.3vw] bg-yellow-200 rounded-xl shadow-lg">
                        <div className="p-5 w-full bg-blue-400 lg:p-[1vw]">
                          <img
                            className="w-full  rounded-xl xl:w-[15.8vw] h-[290px] lg:h-[31.2vh]"
                            src={card.image}
                            alt="Car"
                          />
                        </div> 
                        <div>
                          <div className="flex justify-between px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-2 leading-[3vh] text-left">
                            {card.title.length > 20 ? `${card.title.slice(0, 20)}...` : card.title}
            
                          </div>
                          <div>
                            <div className="flex px-5 pb-[1vh]  ">
                              <div className="flex justify-between items-center   w-full">
                                <div className="flex flex-col">
                                  <div className="flex gap-x-1">
                                    <p className="py-[0.5vh] font-semibold">
                                      Lot:
                                    </p>
                                    <p className="py-[0.5vh]">{card.lot_id}</p>
                                  </div>
                                  <div className="flex gap-x-1">
                                    <p className="py-[0.5vh] font-semibold">
                                      Status:
                                    </p>
                                    <p className="py-[0.5vh]">{card.status}</p>
                                  </div>
                                  <div className="flex gap-x-1 flex-n">
                                    <p className="py-[0.5vh] font-semibold">
                                      Location:
                                    </p>
                                    <p className="py-[0.5vh] text-nowrap">
                                      {card.location}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Link to={'vehicle-detail/1249363'}>
                            <button className=" w-[270px] mb-[1vh] lg:w-[15vw]  rounded-xl h-[40px] lg:h-[5.5vh] text-[16px] lg:text-[1.04vw] bg-[#7a798a] text-white font-urbanist mt-3 hover:bg-[#ca0000] duration-200">
                              Bid Now
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div> */}
                    </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
          <button className="arrow-left arrow">
            <IoIosArrowDropleft
              size={35}
              className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
            />
          </button>
          <button className="arrow-right arrow">
            <IoIosArrowDropright
              size={35}
              className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
