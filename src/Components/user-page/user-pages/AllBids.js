import React, { useEffect, useState } from "react";

import User from "../../cards/User";
import useGetAllUserBids from "../../../hooks/useGetAllUserBids";
import { ClipLoader } from "react-spinners"; 
import useGetAllLocalBids from "../../../hooks/useGetAllLocalCarsBids";

const AllBids = () => {
  const { bids, loading, error, fetchBids } = useGetAllUserBids();
  const { localBids, loading: localLoading, error: localError, fetchLocalBids } = useGetAllLocalBids();
  const [selectedOption, setSelectedOption] = useState("bidding"); // Default to "Bidding Cars"

   // Fetch data based on selected option
   useEffect(() => {
    if (selectedOption === "bidding") {
      fetchBids();
    } else {
      fetchLocalBids();
    }
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const isLoading = selectedOption === "bidding" ? loading : localLoading;
  const hasError = selectedOption === "bidding" ? error : localError;
  const data = selectedOption === "bidding" ? bids?.data : localBids?.data;

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <ClipLoader size={50} color={"#D0021B"} loading={loading} />
  //     </div>
  //   );
  // }

  // if (hasError) {
  //   return <p className="text-center text-red-500">Error: {error}</p>;
  // }

  console.log(data);

  return (
    <>
 <div className="w-[90%] md:w-[650px]  lg:w-[84vw] mx-auto mt-10 sm:mt-[50px]  text-black ">
      <h1 className="text-[28px] lg:text-[2.3vw] font-urbanist left-[10%] lg:text-left font-bold">My Bids</h1>

              {/* Header with toggle buttons */}
      <div className="flex justify-center space-x-4 mb-6 lg:mb-[1.5vw]">
        <button
          className={`px-[1vw] py-[0.5vw] lg:text-[1vw] font-semibold rounded-[0.25vw] ${selectedOption === "bidding" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleOptionChange("bidding")}
        >
          Bidding Cars
        </button>
        <button
          className={`px-[1vw] py-[0.5vw] lg:text-[1vw] font-semibold rounded-[0.25vw] ${selectedOption === "local" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleOptionChange("local")}
        >
          Local Cars
        </button>
      </div>

        {/* Loading and Error Messages */}
        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader size={30} color={"#D0021B"} loading={isLoading} />
          </div>
        )}
        {hasError && (
          <p className="text-center text-red-500 mb-4">Error: {hasError}</p>
        )}


            {/* Data Table */}
        {data && data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl  font-bold text-gray-500">
              No bids available for any car
            </p>
            <p className="text-gray-400 mt-2">
              It looks like you haven't placed any bids yet.
            </p>
          </div>
        ) : (
          <div className=" w-[90%] lg:w-[84vw] mx-auto overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Car Image</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Title</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Location</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">VIN</th>

                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">No Of Bids</th>
                {/* <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Posted</th> */}
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Bid Price</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Time Left</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Current Bid</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.map((bid) => (
                <User key={bid?.id} bid={bid} />
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
