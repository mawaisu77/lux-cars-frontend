import React, { useEffect, useState } from "react";
import Select from "react-select";

import { ClipLoader } from "react-spinners"; // Optional spinner library
import OfferCards from "../../cards/OfferCards";
import useGetMyLocalCars from "../../../hooks/useGetMyLocalCars";
import MyLocalCarsCard from "../../../MyLocalCarsCard";

const LocalCars = () => {
    const { localCars, loading, error, fetchLocalCars } = useGetMyLocalCars();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterOption, setFilterOption] = useState({ value: "all", label: "All Statuses" });
    const [sortOption, setSortOption] = useState({ value: "newest", label: "Sort by: Newest" });
  
      // Status filter options for React Select
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "Approved", label: "Approved" },
    { value: "Pending", label: "Pending" },
  
  ];

  // Sort options for React Select
  const sortOptions = [
    { value: "newest", label: "Sort by: Newest" },
    { value: "oldest", label: "Sort by: Oldest" }
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
    fetchLocalCars();
  }, []);

    // Filter and sort the local cars data
    const filteredAndSortedCars = React.useMemo(() => {
      if (!localCars?.data?.cars) return [];
      
      // First filter by search term (title)
      let result = localCars.data.cars.filter(car => 
        car?.title?.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      
      // Then filter by status
      if (filterOption.value !== "all") {
        result = result.filter(car => 
          car.status?.toLowerCase() === filterOption.value.toLowerCase()
        );
      }
      
      // Finally sort by date
      return result.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        
        if (sortOption.value === "newest") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
    }, [localCars?.data?.cars, searchTerm, filterOption.value, sortOption.value]);
  

  return (
    <>
  
      <div className="w-[90vw] lg:w-[85vw] mx-auto mt-6 lg:mt-[1.5vw] text-black">
      <h1 className="text-[24px] md:text-[36px] lg:text-[2.3vw] font-urbanist text-left font-bold mb-4">Local Cars</h1>

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
                options={statusOptions}
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

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <ClipLoader size={50} color={"#D0021B"} loading={loading} />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
              {error}
            </p>
            <p className="text-gray-400 mt-2">
              It looks like you haven't uploaded any cars yet.
            </p>
          </div>
        ) : filteredAndSortedCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
              {searchTerm || filterOption.value !== "all" ? "No matching cars found" : "No Local Cars Available"}
            </p>
            <p className="text-gray-400 mt-2">
              {searchTerm || filterOption.value !== "all" 
                ? "Try adjusting your search or filters." 
                : "It looks like you haven't posted any local cars yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    Car Image
                  </th>
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    Title
                  </th>
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    VIN
                  </th>
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    Status
                  </th>
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    Location
                  </th>
                  <th className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
                    Posted
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedCars.map((localCar, index) => (
                  <MyLocalCarsCard
                    key={index}
                    localCar={localCar}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
   
    </>
  );
};

export default LocalCars;
