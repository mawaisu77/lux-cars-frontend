import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Shimmer from "../../utils/loaders/Shimmer";
import "./swiperstyles.css";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";
import CarCard from "./CarCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useGetAllLocalCars from "../../hooks/useGetAllLocalCars";
import LocalCarsCard from "./LocalCarsCard";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LocalCars = () => {
  const navigate = useNavigate()
  const { localCars, carLoading, carError } = useGetAllLocalCars(
    "local-cars/get-all-local-cars?status=Approved"
  );
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

    // Handler for "View All" button
    const handleViewAllClick = () => {
      // localStorage.setItem('apiEndpoint', process.env.REACT_APP_API_CARS_LIVE);
      navigate("/search-local-cars"); 
    };


  return (
    <>
      <div className="relative w-[100vw] mx-auto py-[30px]  sm:py-[4.167vw] bg-secondary-gray">
      <div className="max-w-[85vw] sm:max-w-[73.229vw]  mx-auto">
      <div className="flex justify-between items-center ">
            <div className="flex flex-col gap-y-[6px] sm:gap-y-2">
            <div className="flex justify-start items-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2vw] sm:pt-[2vh]">
            Local Cars
              </div>
              <hr className="h-[2px] sm:h-[0.26vw] bg-primary-red w-[30px] sm:w-[4vw] " />
            </div>

            <div className="flex justify-center text-primary-red text-[16px] sm:text-24 items-center gap-x-[10px] sm:gap-x-[0.625vw]">
              <button
                onClick={handleViewAllClick}
                className="font-bold text-[16px] sm:text-24 hover:underline"
              >
                View All
              </button>
              <FaExternalLinkAlt size={13} />
            </div>
          </div>


          <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                {localCars &&
                  localCars.map((card, index) => (
                      <LocalCarsCard key={index} card={card}  />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalCars;
