import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import fireImgTimer from "../../assets/001-fire.png";

const CarCard = ({ card }) => {
  // Memoize the targetTime to prevent unnecessary recalculations
  const targetTime = useMemo(() => (card.auction_date ? new Date(card.auction_date) : null), [card.auction_date]);
  const { days, hours, minutes, seconds } = useTimer(targetTime);

  // Determine if the auction date is in the future or null
  const isAuctionDateFuture = targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);


  return (
    <div className="w-[330px]  mx-auto lg:w-[25.3vw] xl:w-[18.3vw] rounded-xl shadow-lg">
    <div className="p-5 relative w-full lg:p-[1vw]">
      <img
        className="w-full  rounded-xl xl:w-[15.8vw] h-[290px] lg:h-[31.2vh]"
        src={card.image}
        alt="Car"
      />
          <div className="absolute  bottom-8 left-1/2 transform -translate-x-1/2 w-[185px] h-10 bg-white rounded-2xl z-50 flex justify-center items-center">
          <div className="flex justify-center items-center gap-x-2 px-2">
            <div>
              <img src={fireImgTimer}  alt="img_bid"/>
            </div>
            <div>
              <p className="font-bold text-nowrap">
              {card.auction_date
                  ? isAuctionDateFuture
                    ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
                    : "Bidding Over"
                  : "Future"}
              </p>
            </div>
          </div>
        </div>
    </div> 
    <div>
      <div className="flex justify-between px-5 lg:px-[1vw] font-urbanist text-[18px] lg:text-[1.17vw] font-bold py-2 leading-[3vh] text-left">
        {card.title.length > 20 ? `${card.title.slice(0, 20)}...` : card.title}

      </div>
      <div>
        <div className="flex px-5 pb-[1vh]  ">
          <div className="flex justify-between items-center   w-full">
            <div className="flex flex-col">
              <div className="flex gap-x-1">
                <p className="py-[0.5vh] font-semibold">
                  Lot:
                </p>
                <p className="py-[0.5vh]">{card.lot_id}</p>
              </div>
              <div className="flex gap-x-1">
                <p className="py-[0.5vh] font-semibold">
                  Status:
                </p>
                <p className="py-[0.5vh]">{card.status}</p>
              </div>
              <div className="flex gap-x-1 flex-n">
                <p className="py-[0.5vh] font-semibold">
                  Location:
                </p>
                <p className="py-[0.5vh] text-nowrap">
                  {card.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link to={`vehicle-detail/${card.lot_id}`}>
        <button className=" w-[270px] mb-[1vh] lg:w-[15vw]  rounded-xl h-[40px] lg:h-[5.5vh] text-[16px] lg:text-[1.04vw] bg-[#7a798a] text-white font-urbanist mt-3 hover:bg-[#ca0000] duration-200">
          Bid Now
        </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default CarCard;
