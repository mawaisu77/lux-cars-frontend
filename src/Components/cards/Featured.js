import React from "react";
import useGetAllBidsCar from "../../hooks/useGetAllBidsCar";
import Shimmer from "../../utils/loaders/Shimmer";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const BuyNow = () => {
  const navigate = useNavigate();
  
  const { carData, carLoading, carError } = useGetAllBidsCar(
    `${process.env.REACT_APP_API_CARS_LIVE}?document=clean&buy_now=true&status=Run & Drive`
  );
  if (carLoading) {
    return <Shimmer />;
  }


  // if (carError) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-[50vh]">
  //       <p className="text-2xl font-bold text-gray-500">
  //         {carError}
  //       </p>
  //       <p className="text-gray-400 mt-2">
  //         Please try again later
  //       </p>
  //     </div>
  //   );
  // }

   if (carError) {
    return null
  }


  const handleViewAllClick = () => {
    localStorage.setItem("apiEndpoint", `${process.env.REACT_APP_API_CARS_LIVE}?buy_now=true`);
    navigate("/search-page");
  };

  return (
    <>
      <div className="bg-secondary-gray relative w-full py-[30px] lg:py-[4.167vw] mx-auto">
      <div className="max-w-[95vw] lg:max-w-[85vw] mx-auto" id="startBidding">
      <div className="flex justify-between items-center ">
          <div className="flex flex-col gap-y-[6px] lg:gap-y-2">
          <div className="flex justify-start items-center font-urbanist text-[22px] lg:text-36 font-bold lg:leading-[2vw] lg:pt-[2vh]">
           Buy Now
              </div>
              <hr className="h-[3px] lg:h-[0.26vw] bg-primary-red w-[30px] lg:w-[4vw] " />
            </div>

            <div className="flex justify-center text-white px-2 py-1 lg:px-[0.52vw] lg:py-[0.26vw] rounded-full bg-primary-red hover:bg-primary-red/90 text-[16px] lg:text-20 items-center gap-x-[10px] lg:gap-x-[0.2vw]">
              <button
                onClick={handleViewAllClick}
                className=""
              >
                See All
              </button>
              <IoIosArrowForward />
            </div>
          </div>
          <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
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
