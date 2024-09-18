import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSimilarCars from "../../hooks/useSimilarCars";
import "./swiperstyles.css";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import CarCard from "./CarCard";

const VehicleCards = React.memo(({ carData }) => {
  const { cars, loading, error } = useSimilarCars(carData.year, carData.make);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="relative w-full lg:w-[98.9vw] bg-[#f8f8f8]  ">
          <div className="" id="startBidding">
        <div className="pl-2 w-full sm:w-[85vw] md:w-[88vw] lg:w-[82vw] justify-center items-center mx-auto flex flex-col gap-y-2">
          <div className="flex justify-center font-urbanist text-[36px] lg:text-[2vw]  font-bold leading-[2vw] pt-[2vh]">
          Similar Listing
          </div>
          <hr className="h-1 bg-[#ca0000] mt-[4px] w-16 " />
        </div>
            <div className="relative">
              <Swiper
                style={{
                  "--swiper-pagination-color": "#FFBA08",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "12px",
                "--swiper-pagination-bullet-horizontal-gap": "3px",
                }}
                // slidesPerView={1}
                spaceBetween={0}
                breakpoints={{
                  440: { slidesPerView: 1 },
                  580: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  840: { slidesPerView: 4 },
                  1024: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                  1440: { slidesPerView: 5 },
                  1620: { slidesPerView: 5 },
                  1920: { slidesPerView: 5 },
                }}
                scrollbar={{ draggable: true }}
                loop={true}
                navigation={{
                  nextEl: ".arrow-right-bid",
                  prevEl: ".arrow-left-bid",
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
                className="w-full sm:w-[85vw] md:w-[88vw] lg:w-[82vw]"
              >
                <div className="w-[90vw] flex justify-center mx-auto  items-center mt-[9vh]">
                  {cars?.data?.cars &&
                    cars.data.cars.map((card, index) => (
                      <SwiperSlide
                        key={index}
                        className="relative py-5 mb-5"
                      >
                        <CarCard card={card} />
                      </SwiperSlide>
                    ))}
                </div>
              </Swiper>
            </div>
            <button className="arrow-left-bid arrow-bid">
              <IoIosArrowDropleft
                size={35}
                className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
              />
            </button>
            <button className="arrow-right-bid arrow-bid sm:block ">
              <IoIosArrowDropright
                size={35}
                className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
});

export default VehicleCards;
