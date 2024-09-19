import React, { useMemo } from "react";
import useTimer from "../../../hooks/useTimer";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import ImageViewer from "react-simple-image-viewer";

import "swiper/css";

function SearchCard({ data }) {
  return (
    <div className="w-[320px] md:w-full lg:w-full   mx-auto mt-10">
      <div className=" w-[100%]  md:w-full lg:w-full mx-auto ">
        {data && data.map((card, index) => <Card key={index} card={card} />)}
      </div>
    </div>
  );
}
function Card({ card }) {
  const targetTime = useMemo(
    () => (card.auction_date ? new Date(card.auction_date) : null),
    [card.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  return (
    <div className="flex flex-col md:flex-col items-center justify-center lg:flex-row py-5 my-5 w-full     mx-auto rounded-2xl shadow-lg  hover:shadow-2xl duration-300">
      <div className="flex justify-center items-center relative  w-[320px] lg:w-[16vw]  px-4">
        {/* <img
          src={card.image || null}
          className=" w-full h-full   rounded-[0.5vw] object-cover"
          alt={card.model}
        /> */}
        <Swiper
          className="relative w-full h-full"
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          loop={true}
        >
          {card.images &&
            card.images.map((image, index) => (
              <SwiperSlide key={index} className="relative">
                <div className="">
                  <img
                    className="  h-full rounded-[0.5vw] object-cover"
                    src={image}
                    alt={`Vehicle_Image ${index + 1}`}
                    // onClick={() => openImageViewer(index)}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex flex-col   md:justify-center md:items-center    mx-auto lg:flex-row px-4 py-2">
        <div className="text-left px-2 border-b lg:border-r lg:border-b-0 font-urbanist">
          <p className="font-semibold   py-2 ">
            {card.title.length > 40
              ? `${card.title.slice(0, 40)}...`
              : card.title}
          </p>
          <div className="flex flex-col md:flex-row lg:flex-row">
            <div className="flex flex-col sm:flex-row sm:flex-wrap font-urbanist gap-x-2 text-[13px] lg:text-[0.875vw] py-1  ">
              <p className="w-full">
                <span className="font-semibold">VIN:</span> {card.vin}
              </p>
              <p className="w-full">
                <span className="font-semibold">Lot:</span> {card.lot_id}
              </p>
              <p className="w-full">
                <span className="font-semibold">Status:</span> {card.status}
              </p>
              <p className="w-full">
                <span className="font-semibold">Location:</span> {card.location}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 text-[13px] lg:text-[0.875vw] py-1  ">
              <p className="w-full">
                <span className="font-semibold ">Millage:</span>{" "}
                {card.mileage || "Not specified"}
              </p>
              <p className="w-full">
                <span className="font-semibold">Damage:</span>{" "}
                {card.damage || "None"}
              </p>
              <p className="w-full">
                <span className="font-semibold"> Engine Type:</span>{" "}
                {card.engine_type || "Not specified"}
              </p>
              <p className="w-full">
                <span className="font-semibold">Color:</span>{" "}
                {card.color || "Not specified"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-row px-2 justify-between  py-3">
          <div className="py-1 text-center sm:text-left">
            <p className="text-sm text-gray-600">{card.Price}</p>
            <p className="text-xl font-bold text-red-600">{card.amount}</p>
            <div className="flex flex-col w-[260px] lg:w-full  gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
        {/* BID NOW Button Section */}
        <div className="flex justify-center items-center   lg:mt-2 sm:mt-0">
          <Link to={`/vehicle-detail/${card.lot_id}`}>
            <button className="w-[150px] lg:w-[10vw] h-[40px] lg:h-[5vh] rounded-[8px] text-lg lg:text-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-urbanist font-semibold hover:opacity-90 duration-300 shadow-md transform hover:scale-105">
              BID NOW
            </button>
          </Link>
        </div>

          {/* Auction Date & Timer Section */}
          <div className="w-full  lg:w-full h-auto lg:h-[5vh] mt-2 lg:mt-[1.5vh] bg-white rounded-lg flex justify-center items-center p-2 shadow-md">
            <div className="flex items-center gap-3">
              {/* Icon Section */}
              <div className="flex justify-center items-center">
                {card.auction_date ? (
                  ValidDate ? (
                    <BsFire className="text-red-600 text-lg lg:text-2xl" />
                  ) : (
                    <MdNotInterested className="text-gray-400 text-lg lg:text-2xl" />
                  )
                ) : (
                  <FaHourglassHalf className="text-yellow-500 text-lg lg:text-2xl" />
                )}
              </div>

              {/* Timer or Status Section */}
              <div className="flex flex-col justify-center items-start">
                <p className="text-gray-800 text-sm lg:text-md font-medium">
                  {card.auction_date
                    ? ValidDate
                      ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                      : "Bidding Over"
                    : "Future Auction"}
                </p>
              </div>
            </div>
          </div>
       </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
