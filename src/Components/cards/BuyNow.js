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
    "cars/get-all-cars"
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
        <div className="" id="startBidding" > 
          <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5vh]">
            Bid Now
          </div>
          <hr className="h-1 bg-[#ca0000] mt-[15px]  w-20 mx-auto" />

          <div className="relative">
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
              className="w-full lg:w-[82vw] h-[550px] lg:h-[68vh] mt-[40px]"
            >
              <div className="w-[90vw]  flex justify-center mx-auto  items-center mt-[9vh]">
                {carData &&
                  carData.map((card, index) => (
                    <SwiperSlide key={index} className="relative ">
                      <CarCard card={card} isBuy={false} />
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
    </>
  );
};

export default BuyNow;
