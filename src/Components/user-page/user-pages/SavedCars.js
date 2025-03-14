import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Select from "react-select";
import CarCard from "../../cards/CarCard";
import LocalCarsCard from "../../cards/LocalCarsCard";
import useGetSavedCars from "../../../hooks/useGetUserSavedCars";
import useGetSavedLocalCars from "../../../hooks/useGetUserSavedLocalCars";

const SavedCars = () => {
  const [selectedOption, setSelectedOption] = useState("bidding");
  const { error, fetchSavedCars, loading, savedCars } = useGetSavedCars();
  const {
    savedLocalCars,
    localCarLoading,
    localCarError,
    fetchSavedLocalCars,
  } = useGetSavedLocalCars();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState({ value: "all", label: "All Statuses" });
  const [sortOption, setSortOption] = useState({ value: "newest", label: "Newest Auction" });

  // Status filter options for React Select
  const statusOptions = [
    { value: "all", label: "Show All" },
    { value: "stationary", label: "Stationary" },
    { value: "unknown", label: "Unknown" },
    { value: "run & drive", label: "Run & Drive" },
    { value: "start", label: "Start" }
  ];

  // Sort options for React Select
  const sortOptions = [
    { value: "newest", label: "Newest Auction" },
    { value: "oldest", label: "Oldest Auction" }
  ];

  // Custom styles for React Select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e5e7eb',
      minHeight: '42px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#D0021B'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#D0021B' : state.isFocused ? '#ffe5e5' : null,
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  useEffect(() => {
    if (selectedOption === "bidding") {
      fetchSavedCars();
    }
    if (selectedOption === "local") {
      fetchSavedLocalCars();
    }
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Filter and sort cars based on search term, status, and auction date
  const filteredBiddingCars = React.useMemo(() => {
    if (!savedCars?.data) return [];
    
    // First filter by search term and status
    let result = savedCars.data.filter(car => {
      // Filter by title
      const titleMatch = car?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const statusMatch = statusFilter.value === "all" || 
                         (car?.status?.toLowerCase() === statusFilter.value.toLowerCase());
      
      return titleMatch && statusMatch;
    });
    
    // Then sort by auction date
    return result.sort((a, b) => {
      const dateA = new Date(a?.auction_date  || 0);
      const dateB = new Date(b?.auction_date  || 0);
      
      if (sortOption.value === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [savedCars?.data, searchTerm, statusFilter.value, sortOption.value]);

  // Filter and sort local cars based on search term, status, and auction date
  const filteredLocalCars = React.useMemo(() => {
    if (!savedLocalCars?.data) return [];
    
    // First filter by search term and status
    let result = savedLocalCars.data.filter(car => {
      // Filter by title
      const titleMatch =  car?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      const statusMatch = statusFilter.value === "all" || 
                         (car?.status?.toLowerCase() === statusFilter.value.toLowerCase()) ||
                         (car?.carStatus?.toLowerCase() === statusFilter.value.toLowerCase());
      
      return titleMatch && statusMatch;
    });
    
    // Then sort by auction date or creation date
    return result.sort((a, b) => {
      const dateA = new Date(a?.auction_date || a?.createdAt || 0);
      const dateB = new Date(b?.auction_date || b?.createdAt || 0);
      
      if (sortOption.value === "newest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [savedLocalCars?.data, searchTerm, statusFilter.value, sortOption.value]);

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (localCarError) {
    return <p className="text-center text-red-500">Error: {localCarError}</p>;
  }

  return (
    <>
      <div className="w-[90vw] lg:w-[85vw] mx-auto mt-6 lg:mt-[1.5vw] text-black">
        <div className="flex justify-between items-center">
          <h1 className="text-[24px] md:text-[36px] lg:text-[2.3vw] font-urbanist text-left font-bold">
            Saved Cars
          </h1>
          <div className="flex justify-center space-x-4 lg:space-x-[1vw] ">
            <button
              className={`px-2 md:px-4 lg:px-[1vw] py-1 md:py-2 lg:py-[0.5vw] text-[13px] lg:text-[1vw] font-semibold rounded lg:rounded-[0.5vw] ${selectedOption === "bidding" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
              onClick={() => handleOptionChange("bidding")}
            >
              Bidding Cars
            </button>
            <button
              className={`px-2 md:px-4 lg:px-[1vw] py-1 md:py-2 lg:py-[0.5vw] text-[13px] lg:text-[1vw] font-semibold rounded lg:rounded-[0.5vw] ${selectedOption === "local" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
              onClick={() => handleOptionChange("local")}
            >
              Local Cars
            </button>
          </div>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 mt-4">
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
          
          <div className="flex w-full md:w-auto space-x-3">
            {/* Status Filter Dropdown */}
            <div className="w-full md:w-40">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                options={statusOptions}
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable={false}
                placeholder="Filter by status"
              />
            </div>
            
            {/* Sort by Auction Date Dropdown */}
            <div className="w-full md:w-48">
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
       
        {selectedOption === "bidding" ? (
          loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader size={50} color={"#D0021B"} loading={loading} />
            </div>
          ) : (
            <div className="w-[90vw] lg:w-[85vw]  mx-auto  mt-[50px] text-black">
              {!savedCars?.data || filteredBiddingCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                  <p className="text-2xl font-bold text-gray-500">
                    {searchTerm || statusFilter.value !== "all" 
                      ? "No matching cars found" 
                      : "No Saved Cars Found"}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {searchTerm || statusFilter.value !== "all"
                      ? "Try adjusting your search or filters."
                      : "It looks like you haven't saved any car yet."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-x-2 font-urbanist font-semibold">
                    <h1 className="text-center text-xl md:text-2xl lg:text-[1.875vw] lg:leading-[2.25vw] ">
                      Saved Bidding Cars ({filteredBiddingCars.length})
                    </h1>
                  </div>
                  <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
                    {filteredBiddingCars.map((car, index) => (
                      <CarCard key={index} card={car} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        ) : selectedOption === "local" ? (
          localCarLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader
                size={50}
                color={"#D0021B"}
                loading={localCarLoading}
              />
            </div>
          ) : (
            <div className="w-[90vw] lg:w-[85vw]  mx-auto  mt-[50px] lg:mt-[2.604vw] text-black">
              {!savedLocalCars?.data || filteredLocalCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                  <p className="text-2xl font-bold text-gray-500">
                    {searchTerm || statusFilter.value !== "all" 
                      ? "No matching local cars found" 
                      : "No Saved Local Cars Found"}
                  </p>
                  <p className="text-gray-400 mt-2">
                    {searchTerm || statusFilter.value !== "all"
                      ? "Try adjusting your search or filters."
                      : "It looks like you haven't saved any Local car yet."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-x-2 font-urbanist font-semibold">
                    <h1 className="text-center text-xl md:text-2xl lg:text-[1.875vw] lg:leading-[2.25vw] ">
                      Saved Local Cars ({filteredLocalCars.length})
                    </h1>
                  </div>
                  <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
                    {filteredLocalCars.map((car, index) => (
                      <LocalCarsCard key={index} card={car} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default SavedCars;
