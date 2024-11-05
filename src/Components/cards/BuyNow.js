import React from "react";
import useGetAllBidsCar from "../../hooks/useGetAllBidsCar";
import Shimmer from "../../utils/loaders/Shimmer";
import "./swiperstyles.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import CarCard from "./CarCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const BuyNow = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const { carData, carLoading, carError } = useGetAllBidsCar(
    process.env.REACT_APP_API_CARS_LIVE
  );
  if (carLoading) {
    return <Shimmer />;
  }

  if (carError) {
    return (
      <div className="text-2xl font-bold p-10 text-[#ca0000]">{carError}</div>
    );
  }

  // Handler for "View All" button
  const handleViewAllClick = () => {
    localStorage.setItem("apiEndpoint", process.env.REACT_APP_API_CARS_LIVE);
    navigate("/search-page");
  };

  return (
    <>
      <div className="relative w-[100vw] mx-auto sm:py-[4.167vw]">
        <div className="max-w-[73.229vw] mx-auto" id="startBidding">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-start items-center font-urbanist text-[26px] lg:text-36 font-bold leading-[2vw] pt-[2vh]">
                Buy Now
              </div>
              <hr className="h-[0.26vw] bg-primary-red w-[4vw] " />
            </div>

            <div className="flex justify-center text-primary-red text-24 items-center gap-x-[0.625vw]">
              <button
                onClick={handleViewAllClick}
                className="font-bold text-20 hover:underline"
              >
                View All
              </button>
              <FaExternalLinkAlt size={13} />
            </div>
          </div>

          <div className="relative mt-[2.2625vh] mx-auto gap-[1.094vw]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {carData &&
              carData
                .slice(0, -2)
                .map((card, index) => (
                  <CarCard key={index} card={card} isBuy={false} />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
