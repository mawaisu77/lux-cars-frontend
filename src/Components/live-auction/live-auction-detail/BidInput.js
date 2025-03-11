import React, { memo, useEffect, useRef } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import CircularProgress from "./ui/CircularProgress";
import nearReserve from "../../../assets/audios/reserve.mp3";
import reserveMet from "../../../assets/audios/pure-sale.mp3";


const BidInput = ({
  car,
  manualBid,
  setManualBid,
  currentBid,
  // handleReset,
  activeBid,
  resetTimer,
  setResetTimer,
  bonusTime,
  setBonusTime

}) => {

  const nearReserveSound = useRef(new Audio(nearReserve));
  const reserveMetSound = useRef(new Audio(reserveMet));

  const prevBidState = useRef({
    wasNearReserve: false,
    wasReserveMet: false
  });

  useEffect(() => {
    if (!car?.minPrice || !activeBid) return;

    const priceDifference = car.minPrice - activeBid;
    const isNearReserve = priceDifference <= 100 && priceDifference > 0;
    const isReserveMet = activeBid >= car.minPrice;

    // Play near reserve sound only when first entering near reserve state
    if (isNearReserve && !prevBidState.current.wasNearReserve) {
      nearReserveSound.current.play();
    }

    // Play reserve met sound only when first exceeding reserve
    if (isReserveMet && !prevBidState.current.wasReserveMet) {
      reserveMetSound.current.play();
    }

    // Update previous state
    prevBidState.current = {
      wasNearReserve: isNearReserve,
      wasReserveMet: isReserveMet
    };
  }, [activeBid, car?.minPrice]);

  const getBidStatus = () => {
    if (!car?.minPrice || !activeBid) return null;
  
    const priceDifference = car.minPrice - activeBid;
    const baseStyles = "font-bold text-xl uppercase animate-pulse border-2 px-3 py-1 rounded-md";
    const strokeTextStyle = {
      WebkitTextStroke: '1px currentColor',
      WebkitTextFillColor: 'transparent',
    };
  
    if (activeBid < car.minPrice) {
      if (priceDifference <= 100 && priceDifference > 0) {
        return (
          <span 
            className={`${baseStyles} border-yellow-500 text-yellow-500`}
            style={strokeTextStyle}
          >
            Near Reserve
          </span>
        );
      }
      return (
        <span 
          className={`${baseStyles} border-red-500 text-red-500`}
          style={strokeTextStyle}
        >
          On Reserve
        </span>
      );
    } else {
      return (
        <span 
          className={`${baseStyles} border-green-500 text-green-500`}
          style={strokeTextStyle}
        >
          Pure Sale
        </span>
      );
    }
  };
  
  return ( 
    <>  
      <div className="mb-[0.625vw] w-[150px] lg:w-[100%] flex     flex-col items-center justify-between">
      {getBidStatus()}
      {/* add space */}
      <br />
      {car?.minPrice}
        <div className="   lg:h-full lg:w-full flex justify-center items-center">
         <CircularProgress resetTimer={resetTimer} setResetTimer={setResetTimer} bonusTime={bonusTime} setBonusTime={setBonusTime} currentBid={currentBid} activeBid={activeBid} />
        </div>

        <div className="flex my-[0.625vw] w-full">
          <div className="relative flex items-center justify-center w-full">
            <input
              value={manualBid || currentBid}
              onChange={(e) => setManualBid(Number(e.target.value))}
              className="w-[70px] lg:max-w-[6.215vw] border text-[14px] lg:text-16 border-gray-300 rounded-sm lg:rounded-[0.625vw] px-1 py-1 lg:py-[0.417vw] text-center"
            />  
          </div>
          <span
              onClick={() => {
                // handleReset();
              }}
              className="cursor-pointer  flex justify-center items-center text-gray-500 hover:text-gray-700"
            >
              <MdRestartAlt className="lg:text-20 md:text-[1.25vw]" />
            </span>
          <div className="flex items-center gap-1">
            <span
              onClick={() => setManualBid((prev) => prev - 100)}
              className="lg:text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.317vw] cursor-pointer hover:bg-red-600/10"
            >
              <IoIosRemove />
            </span>
            <span
              onClick={() => setManualBid((prev) => prev + 100)}
              className="lg:text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.317vw] cursor-pointer hover:bg-red-600/10"
            >
              <IoIosAdd />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BidInput;
