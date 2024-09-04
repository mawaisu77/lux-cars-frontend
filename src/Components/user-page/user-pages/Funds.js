import React, { useEffect, useState } from "react";
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
import useGetFunds from "../../../hooks/useGetFunds"; 
import useAddFunds from "../../../hooks/useAddFunds"; 
import { ClipLoader } from "react-spinners";
import PackageModal from "./funds/PackageModal.jsx"
import { showToast } from '../../../utils/Toast';

const Funds = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const { handleAddFunds, loading: addingFundsLoading, error: addingFundsError } = useAddFunds();
  const { funds, loading, error, fetchFunds } = useGetFunds();

  useEffect(() => {
    fetchFunds();
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectPackage = async (packageType) => {
    console.log(`Selected package: ${packageType}`);
    try {
      await handleAddFunds(packageType);
      console.log("Funds bef", funds);
      showToast("Funds added successfully", 'success')
      fetchFunds(); 
      console.log("Funds after", funds);
    } catch (error) {
      console.error("Failed to add funds", error);
    } finally {
      handleCloseModal();
    }
  };


  return (
    <>
      <div className="w-[343px] md:w-[650px] lg:w-[74vw] mx-auto mt-[50px] ">
        <div className="flex text-left flex-col lg:flex-row lg:justify-between">
          <p className="text-[36px] lg:text-[2.3vw] font-urbanist font-bold">My Funds</p>
          <div className="flex gap-3 relative">
            <button
              className="w-[160px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex gap-2 justify-center items-center text-[15px] lg:text-[0.97vw] font-urbanist bg-[#f8f8f8]"
              onClick={toggleDropdown}
            >
              All Transaction
              <RiArrowDropDownLine size={25} />
            </button>
            {showDropdown && (
              <div className="absolute top-full mt-2  bg-white shadow-lg border rounded-md text-[15px] lg:text-[0.97vw] font-urbanist z-10">
                <ul className="p-2">
                  <li className="w-[160px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer hover:bg-red-600 hover:text-white">
                    Transaction 1
                  </li>
                  <li className="w-[160px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer  hover:bg-red-600 hover:text-white">
                    Transaction 2
                  </li>
                  <li className="w-[160px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex gap-2 justify-center items-center bg-[#f8f8f8] cursor-pointer  hover:bg-red-600 hover:text-white">
                    Transaction 3
                  </li>
                </ul>
              </div>
            )}
            <button onClick={handleOpenModal} className="w-[132px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex justify-center font-semibold items-center bg-[#f8f8f8] text-[15px] lg:text-[0.97vw] font-urbanist">
              Add Deposite
            </button>
          </div>
        </div>
          {/* Loading State */}
          {loading && (
          <div className="flex justify-center items-center min-h-[30vh]">
            <ClipLoader size={50} color={"#D0021B"} loading={loading} />
            <p className="ml-3 text-[18px] lg:text-[1.2vw] font-urbanist text-gray-500">Loading your funds...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <>
         <FundsCard className="font-semibold" />

          <div className="flex justify-center items-center flex-col min-h-[30vh]">
            <p className="text-[18px] lg:text-[1.2vw] font-urbanist text-red-600">Error: {error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleOpenModal}
              >
              Deposit Funds
            </button>
          </div>
              </>
        )}

        {/* Funds Data */}
        {!loading && !error && funds.data && (
          <FundsCard fund={funds.data} className="font-semibold" />
        )}

         {/* Adding Funds Loading State */}
         {addingFundsLoading && (
          <div className="flex justify-center items-center min-h-[10vh] mt-4">
            <ClipLoader size={30} color={"#D0021B"} loading={addingFundsLoading} />
            <p className="ml-3 text-[16px] lg:text-[1vw] font-urbanist text-gray-500">Adding funds...</p>
          </div>
        )}

        {/* Adding Funds Error State */}
        {addingFundsError && (
          <div className="flex justify-center items-center flex-col min-h-[10vh] mt-4">
            <p className="text-[16px] lg:text-[1vw] font-urbanist text-red-600">Error: {addingFundsError}</p>
            <button
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg"
              onClick={handleOpenModal}
            >
              Retry Adding Funds
            </button>
          </div>
        )}``
      </div>

      <div className="flex  flex-col lg:flex-row lg:justify-between w-[343px] md:w-[650px]  lg:w-[70vw] mx-auto leading-[4vh] ">
        <div>
          <div >
            <p className="text-left text-[30px] lg:text-[2vw] font-urbanist font-bold mt-[6vh] ">Increase My Bidding</p>
            <p className="text-left font-urbanist text-[18px] lg:text-[0.9vw] text-[#667085]">
              To place a bid you must first set your Bidding Limit to $7500 USD
              with security deposit of $750 USD
            </p>
          </div>
          <img src={slider} alt="funds_img" className="w-[257px] h-auto my-5 lg:w-[30vw] mx-auto"/>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-3">
                <p className="text-[16px] lg:text-[1vw] font-urbanist"> Bidding limit</p>
                <GoQuestion />
              </div>
              <div className="flex justify-between items-center border rounded-xl px-2 w-[343px] md:w-[650px] lg:w-[22vw] h-[5vh]">
                <FiMinusCircle />
                <p> $7500 </p>
                <FiPlusCircle />
              </div>
            </div>
           <div  >
           <div className="flex items-center gap-3">
                <p className="text-[16px] lg:text-[1vw] font-urbanist"> Purchase limit</p>
                <GoQuestion />
              </div>
            <div className="flex justify-between items-center border rounded-xl w-[343px] md:w-[650px] lg:w-[22vw] h-[5vh] px-2">
            
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
        <div className="w-[343px] md:w-[650px] lg:w-[19vw]  mt-[6vh] font-urbanist leading-[5vh]">
           <div className="w-full   text-left">
           <p className="text-[18px] lg:text-[0.9vw] text-[#667085]  ">
                Bidding Limit: <span className="text-[] lg:text-[1.1vw] text-black font-semibold">$7500 USD</span>
            </p>
            <p className=" text-[18px] lg:text-[0.9vw] text-[#667085]  ">Purchase Limit: 
                <span className="text-[20px] lg:text-[1.1vw] text-black font-semibold">1 Vehicles(s)</span>
            </p>
               
           </div>
           <div className="text-left">
            <p  className="border-y text-[18px] lg:text-[1vw] text-[#667085]  flex justify-between ">
                Refund Sucrity Deposite: <span className="text-[20px] lg:text-[1.1vw] text-black font-semibold">$750 USD</span>
            </p>
            <p className="border-y text-[18px] lg:text-[1vw] text-[#667085] flex justify-between ">
                Total Payment Due: <span className="text-[20px] lg:text-[1.1vw] text-black font-semibold">$750 USD</span>
            </p>
            </div>
            <button className="w-full text-[18px] lg:text-[1vw] rounded-xl bg-red-600 text-white">
                Increase Bid Limit
            </button>
            

        </div>
       {/* 1 */}
      </div>
      {/* 2 */}
      <div>
      {/* <button onClick={handleOpenModal}>Choose Package</button> */}
      {isModalOpen && (
        <PackageModal onClose={handleCloseModal} onSelectPackage={handleSelectPackage} />
      )}
    </div>
    </>
  );
};

export default Funds;
