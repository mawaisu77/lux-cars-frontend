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
        <div className="flex justify-between">
          <div className="flex ">
            <input
              type="text"
              placeholder="Search here..."
              className="w-[20vw] h-[6vh] rounded-l-xl border p-2"
            />
            <div className="flex w-[3.5vw] h-[6vh] justify-center items-center bg-red-700 rounded-r-xl">
              <GoSearch size={27} color="white" className="cursor-pointer" />
            </div>
          </div>
          <div className="flex justify-center items-center  gap-3 ">
              <div className="flex justify-center items-center gap-2 w-[13vw] h-[6vh] bg-[#f8f8f8] rounded-xl">
              <LuCalendarDays />
              <p className="text-[0.9vw]">
                Dec 2023- jan 2024
              </p>
              </div>
              <div className="flex justify-center text-[0.9vw] items-center w-[4.2vw] h-[6vh] bg-[#f8f8f8] rounded-xl">
              <IoSettingsOutline />
              </div>

          </div>
        </div>
        <UsersOrder />
      </div>
    </>
  );
};

export default Order;
