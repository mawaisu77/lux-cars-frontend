import React from 'react'
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import TimeLeftCounter from "../TimeLeftCounter";

const VehicleInfoUpperBody = ({ carDetailData, liveData, currentBidValue, days, hours, minutes, seconds, ValidDate }) => {
    return (
        <div className="flex flex-col  lg:flex-row gap-2 justify-between mt-[1vw]">
        <div className="flex flex-col bg-white justify-evenly lg:w-[60%]  px-[0.5vw] py-[1.08] leading-[4.33vh] rounded-lg ">
          <div className="flex items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] lg:text-[0.85vw] ml-2">Lot:</p>
            <p className="font-urbanist flex gap-2 items-center font-bold lg:text-[0.97vw] ml-2">{carDetailData?.data?.lot_id || "N/A"} <RxCopy
              title="Copy Lot ID"
              className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText(carDetailData?.data?.lot_id);
                toast.success("Copied to clipboard!");
              }}
            /></p>
            
          </div>
          <div className="flex items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] lg:text-[0.85vw] ml-2">VIN :</p>
            <p className="font-urbanist flex items-center gap-2 font-bold lg:text-[0.97vw] ml-2">{carDetailData?.data?.vin || "N/A"}
            <RxCopy
              title="Copy VIN"
              className="cursor-pointer py-[0.1vh] text-[14px] text-gray-600 hover:text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText(carDetailData?.data?.vin);
                toast.success("Copied to clipboard!");
              }}
            />
            </p>
            
          </div>
          <div className="flex items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] lg:text-[0.85vw] ml-2">Year/Make :</p>
            <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">{carDetailData?.data?.year + " " + carDetailData?.data?.make}</p>
          </div>
          <div className="flex items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-sm lg:text-[0.85vw] ml-2">Model:</p>
            <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">{carDetailData?.data?.model || "N/A"}</p>
          </div>
          <div className="flex items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-sm lg:text-[0.85vw] ml-2">Actual Cash Value:</p>
            <p className="font-urbanist font-bold lg:text-[0.97vw] ml-2">{`$${carDetailData?.data?.cost_priced || "N/A"}`}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col justify-between    leading-[4.33vh] lg:w-[40%] rounded-[0.5vw] ">
          <div className="flex flex-col bg-white px-[0.5vw] py-[1.08vh] justify-between rounded-[0.5vw]">
            <div className="flex items-center">
              <p className="font-urbanist tracking-wider font-semibold  text-[#6a6978] text-md lg:text-[0.85vw] ml-[0.5vw]">Current Bid:</p>
              <p className="font-urbanist font-bold lg::text-[0.97vw] ml-2">${liveData.currentBid ? liveData.currentBid : currentBidValue}</p>
            </div>
            <div className="flex items-center">
              <p className="font-urbanist tracking-wider font-semibold  text-[#6a6978] text-md lg:text-[0.85vw] ml-[0.5vw]">No of Bids :</p>
              <p className="font-urbanist font-bold text-sm lg::text-[0.97vw] ml-[0.5vw]">{liveData.noOfBids ? liveData.noOfBids : carDetailData?.data?.noOfBids}</p>
            </div>
          </div>
  
          {carDetailData?.data?.auction_date ? (
            ValidDate ? (
              <TimeLeftCounter days={days} hours={hours} minutes={minutes} seconds={seconds} />
            ) : (
              // bidding over
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>
  )
}

export default VehicleInfoUpperBody