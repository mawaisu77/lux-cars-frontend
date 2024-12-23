import React from "react";
import useGetAllBidsCar from "../../hooks/useGetAllBidsCar";
import Shimmer from "../../utils/loaders/Shimmer";
import CarCard from "./CarCard";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BuyNow = () => {
  const navigate = useNavigate();
  
  const { carData, carLoading, carError } = useGetAllBidsCar(
    `${process.env.REACT_APP_API_CARS_LIVE}?document=clean&buy_now=true`
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

  const handleViewAllClick = () => {
    localStorage.setItem("apiEndpoint", `${process.env.REACT_APP_API_CARS_LIVE}?buy_now=true`);
    navigate("/search-page");
  };

  console.log("---------process.env.REACT_APP_API_CARS_LIVE-----------------", process.env.REACT_APP_API_CARS_LIVE)
  return (
    <>
      <div className="bg-secondary-gray relative w-[100vw] mx-auto py-[30px] sm:py-[4.167vw] ">
      <div className="max-w-[85vw] sm:max-w-[73.229vw] mx-auto" id="startBidding">
      <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-y-[6px] sm:gap-y-2">
          <div className="flex justify-start items-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2vw] sm:pt-[2vh]">
           Buy Now
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
              <FaExternalLinkAlt />
            </div>
          </div>
          <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {carData &&
            carData.slice(0, -2).map((card, index) => (
                <CarCard key={index} card={card} isBuy={true}  />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNow;
