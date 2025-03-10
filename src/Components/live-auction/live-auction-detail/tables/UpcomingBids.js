import { useState } from 'react';
import React from 'react';
import { useSavedLocalCars } from '../../../../context/SavedLocalCarsIdscontext';

const UpcomingBids = ({upcomingBids}) => {
  const { savedIds, loading, error, refetchSavedIds } = useSavedLocalCars();

  return (
    <div className="bg-white h-[300px] lg:h-[21.615vw] shadow-sm rounded-lg p-[1vw] w-full  mt-[0.4vw]">
      <div className="flex justify-between items-center mb-[0.625vw]">
        <h2 className="text-[12px] lg:text-16 font-semibold">Upcoming Lots</h2>
        <button className="text-[12px] lg:text-16 text-gray-500 hover:text-blue-600"> <strong>Total Remaining Lots: {upcomingBids?.length || 0}</strong></button>
      </div>

      <div className="grid grid-cols-12 border p-[0.625vw] border-gray-200 gap-x-[10px] mb-[0.625vw] text-14 text-left text-gray-500 w-full">
       <div className='grid grid-cols-12 w-[400px]  '>
         <div className="col-span-7 text-[12px] lg:text-15 font-medium text-gray-500 uppercase">VEHICLE INFO</div>
        <div className="col-span-2 text-left text-[12px] lg:text-15 font-medium text-gray-500 uppercase">Current</div>
        <div className="col-span-3 text-right text-[12px] lg:text-15 font-medium text-gray-500 uppercase">Status</div>
       </div>
      </div>

      {/* Scrollable Section */}
     <div className='w-full'>
     <div className="h-[75%]    no-scrollbar overflow-x-scroll  overflow-y-scroll ">
      
      { upcomingBids?.length === 0 && (
        <div className="text-center text-gray-500 py-4">No upcoming bids available.</div>
      )}

      {upcomingBids?.map((bid) => { 
    const isSaved = savedIds?.data?.includes(bid.id); // Check if the bid is saved

        return (
          <div
          key={bid.id}
          className={`relative grid grid-cols-12 p-[0.625vw] border-b border-l border-r border-gray-200 gap-x-[0.625vw] w-[400px]
          ${isSaved ? "bg-yellow-200" : ""}`} // Apply yellow background if saved
        >
          <div className="col-span-7 w-full">
            <div className="flex gap-[0.625vw]">
              <div className="relative w-[60px] h-[60px] lg:w-[4.2vw] lg:h-[3vw]">
                <img
                  src={bid.carImages[0] || ""}
                  alt={`${bid.year}`}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute -bottom-1 -right-1 w-[1vw] h-[1vw] bg-green-500 rounded-full" />
              </div>
              <div className="w-full">
                <div className="font-medium  text-[12px] lg:text-15 w-full flex justify-between items-center">
                  {bid.year} {bid.make} {bid.model}
                </div>
                <div className="text-[12px] lg:text-15 text-gray-500 flex items-center justify-start">
                  <span>vin : {bid.vin || "N/A"}</span>
                </div>
                <div className="text-[12px] lg:text-15 text-gray-500 flex items-center justify-start">
                  <span>Odo : {bid.mileage || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 text-left font-medium text-[12px] lg:text-15">${bid.currentBid || 0}</div>
          <div className="col-span-3 text-right">
          <span className="text-[12px] lg:text-15 font-medium bg-green-700/20 border border-green-700/20 px-2 py-0.5 rounded-lg">
            {`pending`}
          </span>
          </div>
            <div className='absolute text-gray-500 flex gap-x-1 text-xs bottom-[1px] right-[1px]'>
           <span className=" cursor-pointer" >Est time</span>
           <span className=" cursor-pointer" >{bid?.timeUntilAuction || ""}</span>
            </div>
        </div>


        )})}
    </div>
     </div>
    </div>
  );
};

export default UpcomingBids;
