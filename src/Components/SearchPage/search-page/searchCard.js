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
    <div className="w-[100%] md:w-full lg:w-full bg-black  mx-auto mt-10">
      <div className=" w-[100%] bg-gray-300 md:w-full lg:w-full mx-auto ">
        {data && data.map((card, index) => < Card key={index} card={card} />)}
      </div>
    </div>
  );
}
function Card({ card }) {
  const targetTime = useMemo(() => (card.auction_date ? new Date(card.auction_date) : null), [card.auction_date]);
  const { days, hours, minutes, seconds } = useTimer(targetTime);
  const ValidDate = targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row py-5 my-5 w-full bg-white mx-auto rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <div className="flex justify-center items-center relative w-full  lg:w-[32vw]   px-4">
        <img
          src={card.image || null}
          className=" w-full h-full rounded-[0.5vw] object-cover"
          alt={card.model}
        />
       
      </div>
      <div className="flex flex-col lg:flex-row px-4 py-2">
        <div className="text-left px-2 border-b lg:border-r lg:border-b-0 font-urbanist">
          <p className="font-semibold   py-2 ">
            {card.title.length > 40
              ? `${card.title.slice(0, 40)}...`
              : card.title}
          </p>
          <div className="flex flex-col md:flex-row lg:flex-row">
          <div className="flex flex-col sm:flex-row sm:flex-wrap font-urbanist gap-x-2 text-[13px] lg:text-[0.875vw] py-1  ">
            <p className="w-full"><span className="font-semibold">VIN:</span> {card.vin}</p>
            <p className="w-full"><span className="font-semibold">Lot:</span> {card.lot_id}</p>
            <p className="w-full"><span className="font-semibold">Status:</span> {card.status}</p>
            <p className="w-full"><span className="font-semibold">Location:</span> {card.location}</p>
           
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-2 text-[13px] lg:text-[0.875vw] py-1  ">
          <p className="w-full"><span className="font-semibold ">Millage:</span> {card.mileage || 'Not specified'}</p>
            <p className="w-full"><span className="font-semibold">Damage:</span> {card.damage || 'None'}</p>
            <p className="w-full"><span className="font-semibold"> Engine Type:</span> {card.engine_type || 'Not specified'}</p>
            <p className="w-full"><span className="font-semibold">Color:</span> {card.color || 'Not specified'}</p>
          </div>
          </div>
        </div>
        <div className="flex lg:flex-row sm:flex-row px-2 justify-between  py-3">
          <div className="py-1 text-center sm:text-left">
            <p className="text-sm text-gray-600">{card.Price}</p>
            <p className="text-xl font-bold text-red-600">
              {card.amount}
            </p>
           <div className="flex lg:flex-col lg:mt-[4vh] flex-row gap-2">
           <div className="flex justify-center items-center lg:mt-4 sm:mt-0">
            <Link to={`/vehicle-detail/${card.lot_id}`}>
              <button className="w-[130px] lg:w-[10vw] h-[30px] lg:h-[4vh] rounded-[0.5vw]  text-md lg:text-md bg-black text-white font-urbanist hover:from-blue-600 hover:to-blue-800 duration-200">
                BID NOW
              </button>
            </Link>
          </div>
          <div className="w-[130px] lg:w-full h-[30px] lg:h-[4vh] mt-0 lg:mt-[1vh] bg-white rounded-lg flex justify-center items-center shadow-lg">
  <div className="flex items-center gap-2">
    {/* Icon Section */}
    <div className="flex justify-center items-center">
      {card.auction_date ? (
        ValidDate ? (
          <BsFire className="text-red-600 text-lg lg:text-xl" />
        ) : (
          <MdNotInterested className="text-gray-400 text-lg lg:text-xl" />
        )
      ) : (
        <FaHourglassHalf className="text-yellow-500 text-lg lg:text-xl" />
      )}
    </div>

    {/* Timer or Status Section */}
    <div className="flex justify-center items-center">
      <p className="text-black text-xs lg:text-[0.875vw] font-medium">
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
          </div>
          
        </div>
      </div>
    </div>
  );
}


  

export default SearchCard;
