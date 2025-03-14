import React, { useEffect, useState } from "react";
import Select from "react-select";

import User from "../../cards/User";
import useGetAllUserBids from "../../../hooks/useGetAllUserBids";
import { ClipLoader } from "react-spinners"; 
import useGetAllLocalBids from "../../../hooks/useGetAllLocalCarsBids";
import { customStyles } from "./dropdownStyle";

const AllBids = () => {
  const { bids, loading, error, fetchBids } = useGetAllUserBids();
  const { localBids, loading: localLoading, error: localError, fetchLocalBids } = useGetAllLocalBids();
  const [selectedOption, setSelectedOption] = useState("bidding"); // Default to "Bidding Cars"
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState({ value: "all", label: "All Bids" });
  const [sortOption, setSortOption] = useState({ value: "newest", label: "Sort by: Newest" });

  // Filter options for React Select
  const filterOptions = [
    { value: "all", label: "All Bids" },
    { value: "active", label: "Active Bids" },
    { value: "expired", label: "Expired Bids" }
  ];

  // Sort options for React Select
  const sortOptions = [
    { value: "newest", label: "Sort by: Newest" },
    { value: "oldest", label: "Sort by: Oldest" }
  ];

 

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

  // Filter and sort the data
  const filteredAndSortedData = React.useMemo(() => {
    if (!data) return [];
    
    // First filter by search term
    let result = data.filter(bid => 
      bid?.carDetails?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Then filter by status
    if (filterOption.value === "active") {
      result = result.filter(bid => bid.isValid);
    } else if (filterOption.value === "expired") {
      result = result.filter(bid => !bid.isValid);
    }
    
    // Finally sort
    return result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      
      if (sortOption.value === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [data, searchTerm, filterOption.value, sortOption.value]);

  return (
    <>
 <div className="w-[90%] md:w-[650px]  lg:w-[85vw] mx-auto mt-6 lg:mt-[1.5vw]  text-black ">
  <div className="flex justify-between items-center">
      <h1 className="text-[24px] md:text-[36px] lg:text-[2.3vw] font-urbanist  text-left font-bold">My Bids</h1>

      <div className="flex justify-end lg:justify-start space-x-4 mb-3  lg:mb-[1.5vw]">
        <button
          className={`px-[1vw] py-[0.5vw] lg:text-[1vw] font-semibold rounded-md lg:rounded-[0.25vw] ${selectedOption === "bidding" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleOptionChange("bidding")}
        >
          Bidding Cars
        </button>
        <button
          className={`px-[1vw] py-[0.5vw] lg:text-[1vw] font-semibold rounded-md lg:rounded-[0.25vw] ${selectedOption === "local" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleOptionChange("local")}
        >
          Local Cars
        </button>
      </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
          />
        </div>
        
        {/* Filter and Sort Dropdowns */}
        <div className="flex space-x-3 w-full md:w-auto">
          <div className="w-40">
            <Select
              value={filterOption}
              onChange={setFilterOption}
              options={filterOptions}
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
            />
          </div>
          
          <div className="w-48">
            <Select
              value={sortOption}
              onChange={setSortOption}
              options={sortOptions}
              styles={customStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable={false}
            />
          </div>
        </div>
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
        {filteredAndSortedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl  font-bold text-gray-500">
              {searchTerm ? "No matching bids found" : "No bids available for any car"}
            </p>
            <p className="text-gray-400 mt-2">
              {searchTerm ? "Try adjusting your search or filters." : "It looks like you haven't placed any bids yet."}
            </p>
          </div>
        ) : (
          <div className=" w-full lg:w-[85vw] mx-auto overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Car Image</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Title</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">VIN</th>

                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">No Of Bids</th>
                {/* <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">Posted</th> */}
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Bid Price</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Time Left</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Current Bid</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Bid On</th>
                <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((bid) => (
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
