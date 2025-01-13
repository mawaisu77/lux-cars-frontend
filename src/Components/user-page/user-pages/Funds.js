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
import BiddingLimit from "./funds/BiddingLimit.jsx";

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
       
            <button onClick={handleOpenModal} className="w-[132px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex justify-center font-semibold rounded-lg items-center bg-primary-red text-white text-[15px] lg:text-[1vw] font-urbanist">
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
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
            {error}
            </p>
            <p className="text-gray-400 mt-2">
              Please try again later
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={handleOpenModal}
              >
              Deposit Funds
            </button>
          </div>
        
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
        )}
      </div>


    {/* <BiddingLimit /> */}


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
