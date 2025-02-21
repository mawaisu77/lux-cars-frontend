import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Shimmer from "../../utils/loaders/Shimmer";
import "./swiperstyles.css";
import { IoIosArrowDropright, IoIosArrowDropleft, IoIosArrowForward } from "react-icons/io";
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
    "local-cars/get-all-local-cars?size=8&status=Approved"
  );
  if (carLoading) {
    return <Shimmer />;
  }

  if (carError) {
    return ( 
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-2xl font-bold text-gray-500">
        {carError}
        </p>
        <p className="text-gray-400 mt-2">
          Please try again later
        </p>
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

            <div className="flex justify-center text-white px-2 py-1 sm:px-[0.52vw] sm:py-[0.26vw] rounded-full bg-primary-red hover:bg-primary-red/90 text-[16px] sm:text-20 items-center gap-x-[10px] sm:gap-x-[0.2vw]">
              <button
                onClick={handleViewAllClick}
                className=""
              >
                See All
              </button>
              <IoIosArrowForward />
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
