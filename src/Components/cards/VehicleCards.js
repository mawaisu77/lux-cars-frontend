import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useSimilarCars from "../../hooks/useSimilarCars";
import "./swiperstyles.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import CarCard from "./CarCard";
import { FaExternalLinkAlt } from "react-icons/fa";

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
        <div
          className="max-w-[85vw] sm:max-w-[73.229vw] mx-auto"
          id="startBidding"
        >
          <div className="flex justify-center items-center ">
            <div className="flex flex-col gap-y-[6px] sm:gap-y-2">
              <div className="flex justify-center items-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2vw] sm:pt-[2vh]">
                Similar Listings
              </div>
              <hr className="h-[2px] mx-auto sm:h-[0.26vw] bg-primary-red w-[30px] sm:w-[4vw] " />
            </div>
          </div>
          <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {cars?.data?.cars &&
              cars?.data?.cars
              .slice(0, -2)
                .map((card, index) => <CarCard key={index} card={card} />)}
          </div>
        </div>
      )}
    </>
  );
});

export default VehicleCards;
