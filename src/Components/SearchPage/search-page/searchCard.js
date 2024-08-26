import React, { useMemo } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import useTimer from "../../../hooks/useTimer";
import fireImgTimer from "../../../assets/001-fire.png";
import { Link } from "react-router-dom";
import { BsFire } from "react-icons/bs";
import { MdNotInterested } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa6";

function SearchCard({ data }) {
  return (
    <div className="w-[54vw] container mx-auto mt-10">
      <div className="flex flex-wrap gap-4">
        {data && data.map((card, index) => <Card key={index} card={card} />)}
      </div>
    </div>
  );
}

function Card({ card }) {
  // const targetTime = useMemo(
  //   () => new Date(card.auction_date),
  //   [card.auction_date]
  // );
  // const { days, hours, minutes, seconds } = useTimer(targetTime);
  // console.log("target time", targetTime);
   // Memoize the targetTime to prevent unnecessary recalculations
   const targetTime = useMemo(() => (card.auction_date ? new Date(card.auction_date) : null), [card.auction_date]);
   const { days, hours, minutes, seconds } = useTimer(targetTime);
 
   // Determine if the auction date is in the future or null
   const ValidDate = targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);
 

  return (
    <div className="w-[343px] lg:w-[17.2vw] mx-auto rounded-xl shadow-lg">
      <div className="relative px-4">
        <img
          src={card.image || null}
          className="w-[290px] lg:w-[14.9vw] h-[290px] lg:h-[31vh] rounded-xl mx-auto object-cover"
          alt={card.model}
        />
        <div className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 w-[185px] h-10 bg-white rounded-2xl z-50 flex justify-center items-center">
          <div className="flex justify-center items-center gap-x-2 px-2">
            <div>
            {card.auction_date ? (
                ValidDate ? (
                  <BsFire className="text-red-600" />
                ) : (
                  <MdNotInterested className="text-red-600" />
                )
              ) : (
                <FaHourglassHalf className="text-red-600" />
              )}
            </div>
            <div>
              <p className="font-bold">
              {card.auction_date
                  ? ValidDate
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : "Bidding Over"
                  : "Future"}
                  </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[0.8vw]">
        <div className="text-left px-3 lg:px-2 border-b font-urbanist">
          <p className="font-semibold py-[0.5vh] text-[1.17vw]">
            {card.title.length > 20
              ? `${card.title.slice(0, 20)}...`
              : card.title}
          </p>
          <div className="flex gap-x-1">
            <p className="text-sm lg:text-[0.9vw] py-[0.5vh] font-semibold">
              VIN :
            </p>
            <p className="text-sm lg:text-[0.9vw] py-[0.5vh] font-semibold">
              {card.vin}
            </p>
          </div>
          <div className="text-xs lg:text-[0.84vw] text-gray-500 py-[1vh]">
            <div className="flex gap-x-1">
              <p className="py-[0.5vh] font-semibold">Lot :</p>
              <p className="py-[0.5vh]">{card.lot_id}</p>
            </div>
            <div className="flex gap-x-1">
              <p className="py-[0.5vh] font-semibold">Status :</p>
              <p className="py-[0.5vh]">{card.status}</p>
            </div>
            <div className="flex gap-x-1">
              <p className="py-[0.5vh] font-semibold">Location :</p>
              <p className="py-[0.5vh]">{card.location}</p>
            </div>
          </div>
        </div>
        <div className="flex px-3 lg:px-2 justify-between border-t py-[0.8vh] lg:py-[2vh]">
          <div className="py-[0.5vh]">
            <p className="text-xs lg:text-[0.84vw] text-gray-500">
              {card.Price}
            </p>
            <p className="text-base lg:text-[1vw] font-semibold">
              {card.amount}
            </p>
          </div>
          <div className="flex justify-center items-center ">
            {/* <TfiReload className="mr-1" /> */}
            {/* <p className="text-xs lg:text-[1vw] text-gray-500">{card.view}</p> */}
            <Link to={`/vehicle-detail/${card.lot_id}`}>
            <button className=" w-[270px] mb-[1vh] lg:w-[15vw]  rounded-xl h-[40px] lg:h-[5.5vh] text-[16px] lg:text-[1.04vw] bg-[#7a798a] text-white font-urbanist  hover:bg-[#ca0000] duration-200">
              BID NOW
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
