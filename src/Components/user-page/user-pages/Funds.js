import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import FundsCard from "../../cards/FundsCard";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FaCar } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import slider from '../../../assets/User-pics/Slider.png'
import { LuCalendarDays } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import FundsTable from "../../cards/FundsTable";

const Funds = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="w-[74vw] mx-auto mt-[50px]">
        <div className="flex justify-between">
          <p className="text-[2.3vw] font-urbanist font-bold">My Funds</p>
          <div className="flex gap-3 relative">
            <button
              className="w-[11vw] h-[6vh] flex gap-2 justify-center items-center text-[0.97vw] font-urbanist bg-[#f8f8f8]"
              onClick={toggleDropdown}
            >
              All Transaction
              <RiArrowDropDownLine size={25} />
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-2  bg-white shadow-lg border rounded-md text-[0.97vw] font-urbanist">
                <ul className="p-2">
                  <li className="w-[11vw] h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer hover:bg-red-600 hover:text-white">
                    Transaction 1
                  </li>
                  <li className="w-[11vw] h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer  hover:bg-red-600 hover:text-white">
                    Transaction 2
                  </li>
                  <li className="w-[11vw] h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer  hover:bg-red-600 hover:text-white">
                    Transaction 3
                  </li>
                </ul>
              </div>
            )}
            <button className="w-[11vw] h-[6vh] flex justify-center items-center bg-[#f8f8f8] text-[0.97vw] font-urbanist">
              Add Deposite
            </button>
          </div>
        </div>
        <FundsCard />
      </div>
      <div className="flex  justify-between w-[70vw] mx-auto leading-[4vh] ">
        <div>
          <div >
            <p className="text-left text-[2vw] font-urbanist font-bold mt-[6vh] ">Increase My Bidding</p>
            <p className="text-left font-urbanist text-[0.9vw] text-[#667085]">
              To place a bid you must first set your Bidding Limit to $7500 USD
              with security deposit of $750 USD
            </p>
          </div>
          <img src={slider} className="w-[30vw] mx-auto"/>

          <div className="flex gap-3">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3">
                <p className="text-[1vw] font-urbanist"> Bidding limit</p>
                <GoQuestion />
              </div>
              <div className="flex justify-between items-center border rounded-xl px-2 w-[22vw] h-[5vh]">
                <FiMinusCircle />
                <p> $7500 </p>
                <FiPlusCircle />
              </div>
            </div>
           <div  >
           <div className="flex items-center gap-3">
                <p className="text-[1vw] font-urbanist"> Purchase limit</p>
                <GoQuestion />
              </div>
            <div className="flex justify-between items-center border rounded-xl w-[22vw] h-[5vh] px-2">
            
              <FiMinusCircle />
              <div className="flex justify-between items-center">
                <p> 1 </p>
                <FaCar />
              </div>
              <FiPlusCircle />
            </div>
           </div>
          </div>
        </div>

        <div className="w-[19vw]  mt-[6vh] font-urbanist leading-[5vh]">
           <div className="w-full   text-left">
           <p className="text-[0.9vw] text-[#667085]  ">
                Bidding Limit: <span className="text-[1.1vw] text-black font-semibold">$7500 USD</span>
            </p>
            <p className="text-[0.9vw] text-[#667085]  ">Purchase Limit: 
                <span className="text-[1.1vw] text-black font-semibold">1 Vehicles(s)</span>
            </p>
               
           </div>
           <div className="text-left">
            <p  className="border-y text-[1vw] text-[#667085]  flex justify-between ">
                Refund Sucrity Deposite: <span className="text-[1.1vw] text-black font-semibold">$750 USD</span>
            </p>
            <p className="border-y text-[1vw] text-[#667085] flex justify-between ">
                Total Payment Due: <span className="text-[1.1vw] text-black font-semibold">$750 USD</span>
            </p>
            </div>
            <button className="w-full text-[1vw] rounded-xl bg-red-600 text-white">
                Increase Bid Limit
            </button>
            

        </div>
        
      </div>
      <div className="w-[74vw] mx-auto mt-[7vh]">
        <div className="flex justify-between">
            <div className=" text-[2vw] font-urbanist font-bold">
               Transaction History
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
        <FundsTable/>
        
      </div>
    </>
  );
};

export default Funds;
