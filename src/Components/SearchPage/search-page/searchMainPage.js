import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchCard from "../search-page/searchCard";

function SearchMainPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const options = ["Won Bids", "Lost Bids", "Saved"];
  return (
    <div>
      <div className="w-[54vw] mx-auto mt-[2.604vw] font-urbanist">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="flex mb-4 lg:mb-0">
            <h2 className="text-[1.95vw] font-urbanist font-bold">
              "72,243 Available Vehicles"
            </h2>
          </div>
          <div className="flex relative text-left text-sm lg:text-base">
            <input
              type="text"
              placeholder="Search here..."
              className=" lg:w-[17vw]  lg:h-[4.8vh] rounded-l-lg border p-2 text-[0.8vw]"
            />
            <div className="flex h-[4.8vh] w-[3vw] justify-center items-center bg-red-700 rounded-r-lg">
              <GoSearch size={20} color="white" className="cursor-pointer" />
            </div>
            <button
              onClick={toggleDropdown}
              className=" w-[5.5vw] h-[4.8vh] rounded-lg text-[0.8vw] flex items-center justify-center ml-2 border bg-white"
            >
              Sort By
              <RiArrowDropDownLine size={20} className="ml-1 cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right z-10 absolute right-0 mt-[5vh]  w-[5.5vw] h-[15.8vh]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="  flex items-center justify-center w-[5.5vw] h-[4.8vh] text-sm text-gray-700 hover:bg-red-700 hover:text-white"
                      role="menuitem"
                      onClick={() => {
                        console.log(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <SearchCard />
      </div>
    </div>
  );
}

export default SearchMainPage;
