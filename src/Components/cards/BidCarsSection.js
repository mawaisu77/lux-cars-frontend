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
      <div className="relative w-full lg:w-[98.9vw] bg-light-gray py-10">
        <div className="" id="startBidding">
        <div className=" w-full sm:w-[85vw] flex justify-between items-center mx-auto ">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-start items-center font-urbanist text-[26px] lg:text-34 font-bold leading-[2vw] pt-[2vh]">
                Bid Car
              </div>
              <hr className="h-1 bg-primary-red w-16 " />
            </div>

            <div className="flex justify-center text-primary-red text-18  items-center gap-x-1">
              <button
                onClick={handleViewAllClick}
                className="font-bold text-sm hover:underline"
              >
                View All
              </button>
              <FaExternalLinkAlt size={13} />
            </div>
          </div>
          <div className="relative mt-4 mx-auto sm:w-[85vw] gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {carData &&
                  carData.map((card, index) => (
                      <CarCard key={index} card={card} isBuy={false} />
                  ))}
          </div>
       
        </div>
      </div>
    </>
  );
};

export default BidCarsSection;
