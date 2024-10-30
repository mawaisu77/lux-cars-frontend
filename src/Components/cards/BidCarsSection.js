import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useGetAllBidsCar from "../../hooks/useGetAllBidsCar";
import Shimmer from "../../utils/loaders/Shimmer";
import "./swiperstyles.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import CarCard from "./CarCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const BidCarsSection = () => {
  const navigate = useNavigate(); 

  const { carData, carLoading, carError } = useGetAllBidsCar(
    "bid-cars/find-bid-cars"
  );
  if (carLoading) {
    return <Shimmer />;
  }

  if (carError) {
    return (
      <div className="text-2xl font-bold p-10 text-[#ca0000]">      
        {carError}
      </div>
    );
  }

  // Handler for "View All" button
  const handleViewAllClick = () => {
    localStorage.setItem('apiEndpoint', 'bid-cars/find-bid-cars');
    navigate("/search-page");
};

  return (
    <>
      <div className="relative w-full lg:w-[98.9vw] bg-[#f8f8f8]   ">
        <div className="" id="startBidding">
          <div className="sm:pl-2 px-4 w-full sm:w-[85vw] flex justify-between items-center md:w-[88vw] lg:w-[82vw] mx-auto ">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-start font-urbanist text-[26px] lg:text-[2vw] font-bold leading-[2vw] pt-[2vh]">
                Bid Cars
              </div>
              <hr className="h-1 bg-[#ca0000] mt-[4px] w-16 " />
            </div>

            <div className="flex justify-center text-[#ca0000]  items-center gap-x-1">
              <button
                onClick={handleViewAllClick}
                className="font-bold text-sm hover:underline"
              >
                View All
              </button>
              <FaExternalLinkAlt size={13} />
            </div>
          </div>

          <div className="relative sm:px-0 px-10">
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
              className="w-full sm:w-[85vw] md:w-[88vw] lg:w-[82vw] "
            >
              <div className="">
                {carData &&
                  carData.map((card, index) => (
                    <SwiperSlide key={index} className="relative py-5 mb-5">
                      <CarCard card={card} isBuy={false} />
                    </SwiperSlide>
                  ))}
              </div>
            </Swiper>
          </div>
          <button className="arrow-left-bid arrow-bid sm:block">
            <IoIosArrowDropleft
              size={28}
              className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
            />
          </button>
          <button className="arrow-right-bid arrow-bid sm:block ">
            <IoIosArrowDropright
              size={28}
              className="text-[#ca0000] hover:bg-[#ca0000] rounded-full hover:text-white duration-150"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default BidCarsSection;
