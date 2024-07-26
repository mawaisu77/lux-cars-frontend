import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import UsersOrder from "../../cards/UsersOrder";
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";

const Order = () => {
  return (
    <>
      <div className="w-[74vw]  mb-[10vh]  mx-auto mt-[50px]">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between  ">
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

          <div className="flex justify-between text-black lg:justify-center items-center  gap-5 mt-[30px] lg:mt-0 px-5 md:px-0 ">
              <div className="flex justify-center items-center gap-2 w-[206px] lg:w-[13vw] h-[46px] lg:h-[6vh] bg-[#f8f8f8] rounded-lg">
              <LuCalendarDays size={25} />
              <p className=" text-[15px] lg:text-[0.9vw]">
                Dec 2023- jan 2024
              </p>
              </div>
              <div className="flex justify-center text-[0.9vw] items-center w-[66px] lg:w-[4.2vw] h-[46px]  lg:h-[6vh] bg-[#f8f8f8] rounded-lg">
              <IoSettingsOutline size={25} />
              </div>

          </div>

          </div>
        
        
        <UsersOrder />
      </div>
    </>
  );
};

export default Order;
