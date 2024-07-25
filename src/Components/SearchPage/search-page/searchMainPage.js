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
      <div className="w-[74vw] mx-auto mt-[2.604vw]">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="flex mb-4 lg:mb-0">
            <h2 className="text-lg lg:text-2xl font-bold">
              "72,243 Available Vehicles"
            </h2>
          </div>
          <div className="flex relative text-left text-sm lg:text-base">
            <input
              type="text"
              placeholder="Search here..."
              className="w-52 lg:w-80 h-10 lg:h-12 rounded-l-xl border p-2"
            />
            <div className="flex w-10 lg:w-12 h-10 lg:h-12 justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={20} color="white" className="cursor-pointer" />
            </div>
            <button
              onClick={toggleDropdown}
              className="w-24 lg:w-28 h-10 lg:h-12 flex items-center justify-center ml-2 border bg-white"
            >
              Sort By
              <RiArrowDropDownLine size={20} className="ml-1 cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right z-10 absolute right-0 mt-2 w-24 lg:w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full h-10 lg:h-12 flex items-center justify-center text-sm text-gray-700 hover:bg-red-700 hover:text-white"
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
