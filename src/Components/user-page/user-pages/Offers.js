import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import UsersOffers from '../../cards/UsersOffers';
 

const Offers = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const options = ['Won Bids', 'Lost Bids', 'Saved'];

  return (
    <>
      <div className='w-full lg:w-[74vw]    mx-auto  mt-[50px] text-black'>
        {/* <div className='flex flex-col lg:flex-row    lg:justify-between'>
          <div className='flex justify-center items-center'>
            <input
              type="text"
              placeholder="Search here..."
              className=" w-[283px] md:w-[580px]   lg:w-[15vw] h-[46px] lg:h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex  w-[60px] lg:w-[3.5vw] h-[46px] lg:h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div>

          <div className="mx-auto lg:mx-0 relative inline-block mt-[20px] lg:mt-0 text-left">
      <button
        onClick={toggleDropdown}
        className="w-[100px] lg:w-[6.2vw] h-[46px] lg:h-[6vh] text-[15px] lg:text-[0.8vw] flex items-center justify-center border bg-white"
      >
        Sort By
        <RiArrowDropDownLine className="cursor-pointer" />
      </button>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-[100px] lg:w-[6.2vw] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full h-[46px] lg:h-[6vh] flex items-center justify-center text-[15px] lg:text-[0.8vw] text-gray-700 hover:bg-red-700 hover:text-white"
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
          
        </div> */}
        <UsersOffers/>
      </div>
    </>
  );
};

export default Offers;
