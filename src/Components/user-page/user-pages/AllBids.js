import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import User from '../../cards/User';

const AllBids = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const options = ['Won Bids', 'Lost Bids', 'Saved'];

  return (
    <>
      <div className='w-[74vw] h-[172vh] bg-slate-200 mx-auto mt-[50px]'>
        <div className='flex justify-between'>
          <div className='flex'>
            <input
              type="text"
              placeholder="Search here..."
              className="w-[21vw] h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex w-[2.8vw] h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div>

          <div className="relative inline-block text-left text-[0.8vw]">
            <button
              onClick={toggleDropdown}
              className="w-[6.2vw] h-[6vh] flex items-center justify-center border bg-white"
            >
              Sort By
              <RiArrowDropDownLine className="cursor-pointer" />
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-[6.2vw] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="w-full h-[6vh] flex items-center justify-center text-sm text-gray-700 hover:bg-red-700 hover:text-white"
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
        <User/>
      </div>
    </>
  );
};

export default AllBids;
