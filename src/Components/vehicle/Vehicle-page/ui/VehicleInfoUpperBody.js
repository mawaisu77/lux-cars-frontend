import React from 'react'
import { RxCopy } from "react-icons/rx";
import { toast } from "react-toastify";
import TimeLeftCounter from "../TimeLeftCounter";

const VehicleInfoUpperBody = ({ carDetailData, liveData, currentBidValue, days, hours, minutes, seconds, ValidDate }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-[0.5vw]  justify-between lg:mt-[1vw]">
        <div className="flex flex-col space-y-2 lg:space-x-0 lg:leading-[1.5vw] bg-white justify-evenly lg:w-[50%] p-2  lg:px-[0.5vw] lg:py-[0.5vw]   rounded-[0.5vw] ">
          <div className="flex border-b lg:border-b-0 items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-[13px] lg:text-[0.85vw] lg:ml-[0.5vw]">Lot:</p>
            <p className="font-urbanist flex gap-1 lg:gap-[0.5vw] items-center font-semibold lg:font-bold text-[13px] lg:text-[0.97vw] lg:ml-[0.5vw]">{carDetailData?.data?.lot_id || "N/A"} <RxCopy
              title="Copy Lot ID"
              className="cursor-pointer py-[0.1vh] text-[14px] lg:text-[1vw] text-gray-600 hover:text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText(carDetailData?.data?.lot_id);
                toast.success("Copied to clipboard!");
              }}
            /></p>
            
          </div>

          <div className="flex border-b lg:border-b-0 items-center  justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-[13px] lg:text-[0.85vw]  lg:ml-[0.5vw]">VIN :</p>
            <p className="font-urbanist flex items-center gap-1 lg:gap-[0.5vw] font-semibold lg:font-bold text-[13px] lg:text-[0.97vw]  lg:ml-[0.5vw]">{carDetailData?.data?.vin || "N/A"}
            <RxCopy
              title="Copy VIN"
              className="cursor-pointer py-[0.1vh] text-[14px] lg:text-[1vw] text-gray-600 hover:text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText(carDetailData?.data?.vin);
                toast.success("Copied to clipboard!");
              }}
            />
            </p>
            
          </div>

          <div className="flex border-b lg:border-b-0 items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-[13px] lg:text-[0.85vw]  lg:ml-[0.5vw]">Year/Make :</p>
            <p className="font-urbanist gap-1 lg:gap-[0.5vw] font-semibold lg:font-bold text-[13px] lg:text-[0.97vw]  lg:ml-[0.5vw]">{carDetailData?.data?.year + " " + carDetailData?.data?.make}</p>
          </div>

          <div className="flex border-b lg:border-b-0 items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-[13px] lg:text-[0.85vw]  lg:ml-[0.5vw]">Model:</p>
            <p className="font-urbanist gap-1 lg:gap-[0.5vw] font-semibold lg:font-bold text-[13px] lg:text-[0.97vw]  lg:ml-[0.5vw]">{carDetailData?.data?.model || "N/A"}</p>
          </div>

          <div className="flex lg:border-b-0 items-center justify-between lg:justify-start ">
            <p className="font-urbanist tracking-wider font-semibold text-[#6a6978] text-[13px] lg:text-[0.85vw]  lg:ml-[0.5vw]">Actual Cash Value:</p>
            <p className="font-urbanist gap-1 lg:gap-[0.5vw] font-semibold lg:font-bold text-[13px] lg:text-[0.97vw]  lg:ml-[0.5vw]">{`${carDetailData?.data?.cost_priced?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          }) || "0"}`}</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-col justify-between  lg:leading-[4.33vh] lg:w-[50%] rounded-[0.5vw] ">
          <div className="flex flex-col space-y-2 lg:space-x-0 bg-white p-2 lg:px-[0.5vw] lg:py-[1.08vh] justify-between rounded-[0.5vw]">
            <div className="flex lg:border-b-0 border-b items-center justify-between lg:justify-start lg:w-auto w-full">
              <p className="font-urbanist tracking-wider font-semibold  text-[#6a6978] text-[13px] lg:text-[0.85vw] ">Current Bid:</p>
              <p className="font-urbanist font-semibold lg:font-bold text-[13px] lg:text-[1vw] lg:ml-[0.5vw]">{liveData?.currentBid ? liveData?.currentBid?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          }) : currentBidValue?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}</p>
            </div>
            <div className="flex items-center justify-between lg:justify-start lg:w-auto w-full">
              <p className="font-urbanist tracking-wider font-semibold  text-[#6a6978] text-[13px] lg:text-[0.85vw] ">No of Bids :</p>
              <p className="font-urbanist font-semibold lg:font-bold text-sm lg:text-[1vw] ">{liveData.noOfBids ? liveData.noOfBids : carDetailData?.data?.noOfBids}</p>
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