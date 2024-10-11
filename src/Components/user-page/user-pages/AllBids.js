import React, { useEffect } from "react";

import User from "../../cards/User";
import useGetAllUserBids from "../../../hooks/useGetAllUserBids"; // Adjust the path to your hook file
import { ClipLoader } from "react-spinners"; // Optional spinner library

const AllBids = () => {
  const { bids, loading, error, fetchBids } = useGetAllUserBids();

  useEffect(() => {
    fetchBids();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#D0021B"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  console.log("+++++",bids)

  return (
    <>
      <div className="w-full lg:w-[74vw]  mx-auto  mt-[50px] text-black">
        {/* <div className="flex flex-col lg:flex-row    lg:justify-between">
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search here..."
              className=" w-[283px] md:w-[580px]   lg:w-[15vw] h-[46px] lg:h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex  w-[60px] lg:w-[3.5vw] h-[46px] lg:h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div>
        </div> */}
        {bids && bids?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
              No bids available for any car
            </p>
            <p className="text-gray-400 mt-2">
              It looks like you haven't placed any bids yet.
            </p>
          </div>
        ) : (
          <div className=" overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Car Image</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Title</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Posted</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Bid Price</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Time Left</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Lot ID</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Location</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Current Bid</th>
                <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {bids && bids?.data?.map((bid) => (
                <User key={bid.id} bid={bid} />
              ))}
            </tbody>
          </table>
        </div>

        )}
      </div>
    </>
  );
};

export default AllBids;
