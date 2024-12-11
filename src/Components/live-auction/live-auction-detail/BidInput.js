import React, { memo } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { MdRestartAlt } from "react-icons/md";
import CircularProgress from "./ui/CircularProgress";

const TimerSection = memo(({ timeLeft, liveTimeLeft, activeBid }) => (
  <div className="flex flex-col col-span-8 items-center w-full relative ">

 <div className="flex items-center gap-2 md:gap-[0.425vw] ">
            <span className="text-16 font-medium">Active Bid:</span>
            <span className="text-18 font-bold text-green-900 bg-green-700/30 px-2 py-0.5 md:px-[0.525vw] md:py-[0.15vw] rounded-lg md:rounded-[0.425vw]">
            ${activeBid}
            </span>
          </div> 
    <div className="relative flex items-center justify-center ">
      <CircularProgress timeLeft={timeLeft} liveTimeLeft={liveTimeLeft} />
    </div>
    <span className="text-16 mt-[0.625vw]">Highest BID!</span>
    <span className="text-16 text-gray-500">All Bids in USD!</span>
  </div>
));

const BidInput = ({
  car,
  manualBid,
  setManualBid,
  currentBid,
  handleReset,
  liveTimeLeft,
  timeLeft,
  activeBid,
}) => {
  return (
    <>
      <div className="mb-[0.625vw] flex flex-col items-center justify-between">
        <div className=" w-full flex justify-center items-center">
          <TimerSection
            activeBid={activeBid}
            timeLeft={timeLeft}
            liveTimeLeft={liveTimeLeft}
          />
        </div>

        <div className="flex my-[0.625vw] w-full">
          <div className="relative flex items-center justify-center w-full">
            <input
              value={manualBid || currentBid}
              onChange={(e) => setManualBid(Number(e.target.value))}
              className="max-w-[6.215vw] border text-16 border-gray-300 rounded-[0.625vw] py-[0.417vw] text-center"
            />  
          </div>
          <span
              onClick={handleReset}
              className="cursor-pointer flex justify-center items-center text-gray-500 hover:text-gray-700"
            >
              <MdRestartAlt className="text-20 md:text-[1.25vw]" />
            </span>
          <div className="flex items-center gap-1">
            <span
              onClick={() => setManualBid((prev) => prev - 100)}
              className="text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.317vw] cursor-pointer hover:bg-red-600/10"
            >
              <IoIosRemove />
            </span>
            <span
              onClick={() => setManualBid((prev) => prev + 100)}
              className="text-20 text-red-600 rounded-[0.417vw] border border-red-600 p-[0.317vw] cursor-pointer hover:bg-red-600/10"
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
