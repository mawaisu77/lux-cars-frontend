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
      <div className='w-full lg:w-[74vw] h-[172vh]  mx-auto mt-[50px]'>
        <div className='flex flex-col lg:flex-row  bg-slate-100 justify-between'>
          <div className='flex'>
            <input
              type="text"
              placeholder="Search here..."
              className="w-[283px]   lg:w-[15vw] h-[46px] lg:h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex w-[60px] lg:w-[3.5vw] h-[46px] lg:h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div>

          <div className="relative inline-block text-left text-[0.8vw]">
            <button
              onClick={toggleDropdown}
              className="w-[100px] lg:w-[6.2vw] h-[46px] text-[15px] lg:h-[6vh] flex items-center justify-center border bg-white"
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
