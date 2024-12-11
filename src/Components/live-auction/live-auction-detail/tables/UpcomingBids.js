import React, { useEffect } from 'react';
import useGetUpcomingBids from '../../../../hooks/live-auction/useGetUpcomingBids';
import UpcomingCountDown from '../ui/UpcomingCountDown';
import { Link } from 'react-router-dom';

const UpcomingBids = () => {
  const { upcomingBids, loading, error, fetchUpcomingBids } = useGetUpcomingBids();

  useEffect(() => {
    fetchUpcomingBids();
  }, []);

  console.log("upcomingBids",upcomingBids)

  return (
    <div className="bg-white h-[21.615vw] shadow-custom rounded-lg p-[1vw] w-full">
      <div className="flex justify-between items-center mb-[0.625vw]">
        <h2 className="text-16 font-semibold">Upcoming Bids</h2>
        <button className="text-16 text-gray-500 hover:text-blue-600"> <strong>Total Bids: {upcomingBids?.cars?.length || 0}</strong></button>
      </div>

      <div className="grid grid-cols-12 border p-[0.625vw] border-gray-200 gap-x-[10px] mb-[0.625vw] text-14 text-left text-gray-500 w-full">
        <div className="col-span-7 text-15 font-medium text-gray-500 uppercase">VEHICLE INFO</div>
        <div className="col-span-2 text-left text-15 font-medium text-gray-500 uppercase">Current</div>
        <div className="col-span-3 text-right text-15 font-medium text-gray-500 uppercase">Live In</div>
      </div>

      {/* Scrollable Section */}
      <div className="h-[75%] no-scrollbar overflow-y-scroll w-full">
        {loading && (
          <div className="text-center text-gray-500 py-4">Loading...</div>
        )}

        {error && (
          <div className="text-center text-red-500 py-4">Error loading bids. Please try again later.</div>
        )}

        {!loading && !error && upcomingBids?.cars?.length === 0 && (
          <div className="text-center text-gray-500 py-4">No upcoming bids available.</div>
        )}

        {!loading && !error && upcomingBids?.cars?.map((bid) => (
          <div
            key={bid.id}
            className="grid grid-cols-12 p-[0.625vw] border-b border-l border-r border-gray-200 gap-x-[0.625vw] w-full"
          >
            <div className="col-span-7 w-full">
              <div className="flex gap-[0.625vw]">
                <div className="relative w-[4.2vw] h-[3vw]">
                  <img
                    src={bid.carImages[0] || ""}
                    alt={`${bid.year}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute -bottom-1 -right-1 w-[1vw] h-[1vw] bg-green-500 rounded-full" />
                </div>
                <div className="w-full">
                  <div className="font-medium text-15 w-full flex justify-between items-center">
                    {bid.year} {bid.make} {bid.model}
                  </div>
                  <div className="text-14 text-gray-500 flex items-center justify-start">
                    <span>vin : {bid.vin || "N/A"}</span>
                  </div>
                  <div className="text-14 text-gray-500 flex items-center justify-start">
                    <span>Odo : {bid.mileage || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 text-left font-medium text-15">${bid.currentBid || 0}</div>
            <div className="col-span-3 text-right">
               <UpcomingCountDown auctionEndTime={bid?.auction_date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBids;
