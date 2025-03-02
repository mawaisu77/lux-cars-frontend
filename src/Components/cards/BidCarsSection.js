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
import { useSavedCars } from "../../context/SavedCarIdsContext";

const BidCarsSection = () => {
  const navigate = useNavigate();

  const { carData, carLoading, carError } = useGetAllBidsCar(
    "bid-cars/find-bid-cars?document=clean&size=8"
  );
  const { savedIds, loading, error } = useSavedCars();
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

  // Return null if there are no cars to display
  if (!carData || carData.length === 0) {
    return null;
  }

  // Handler for "View All" button
  const handleViewAllClick = () => {
    localStorage.setItem("apiEndpoint", "bid-cars/find-bid-cars");
    navigate("/search-page");
  };

  return (
    <>
      <div className="bg-secondary-gray relative w-full mx-auto py-[30px] lg:py-[4.167vw]">
        <div
          className="max-w-[85vw] lg:max-w-[73.229vw] mx-auto"
          id="startBidding"
        >
          <div className="flex justify-between items-center ">
            <div className="flex flex-col gap-y-[6px] lg:gap-y-2">
              <div className="flex justify-start items-center font-urbanist text-[22px] lg:text-36 font-bold lg:leading-[2vw] lg:pt-[2vh]">
                Bid Car
              </div>
              <hr className="h-[2px] lg:h-[0.26vw] bg-primary-red w-[30px] lg:w-[4vw] " />
            </div>

            <div className="flex justify-center text-primary-red text-[16px] lg:text-24 items-center gap-x-[10px] lg:gap-x-[0.625vw]">
              <button
                onClick={handleViewAllClick}
                className="font-bold text-[16px] lg:text-24 hover:underline"
              >
                View All
              </button>
              <FaExternalLinkAlt size={13} />
            </div>
          </div>
          <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
            {carData &&
              carData.map((card, index) => (
                <CarCard key={index} card={card} isBuy={false} savedIds={savedIds} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BidCarsSection;
