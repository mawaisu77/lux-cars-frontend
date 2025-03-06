import React, { useEffect, useState } from "react";
import FundsCard from "../../cards/FundsCard";
import useGetFunds from "../../../hooks/useGetFunds";
import useAddFunds from "../../../hooks/useAddFunds";
import { ClipLoader } from "react-spinners";
import BiddingLimit from "./funds/BiddingLimit.jsx";
import { useFunds } from "../../../context/FundsContext.js";

const Funds = () => {
  const [openModal, setOpenModal] = useState(false);

  // const { funds, loading, error, fetchFunds } = useGetFunds();
  const { fundsData, loading, error, fetchFunds } = useFunds(); // Use global funds data


  useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <>
      <div className="w-[90%] md:w-[650px]  lg:w-[84vw] mx-auto mt-10 sm:mt-[50px]  text-black ">
        <div className="flex text-left flex-col lg:flex-row lg:justify-between">
          <p className="text-[28px] lg:text-[2.3vw] text-center lg:text-left font-urbanist font-bold">
            My Funds
          </p>
          <div className="flex justify-center gap-3 relative">
            <button
              onClick={() => setOpenModal(true)}
              className="w-[132px] lg:w-[11vw] h-[46px] lg:h-[6vh] flex justify-center font-semibold rounded-lg items-center bg-primary-red text-white text-[15px] lg:text-[1vw] font-urbanist"
            >
              Add Deposite
            </button>
          </div>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[30vh]">
            <ClipLoader size={50} color={"#D0021B"} loading={loading} />
            <p className="ml-3 text-[18px] lg:text-[1.2vw] font-urbanist text-gray-500">
              Loading your funds...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <>
            <FundsCard className="font-semibold" />

            <div className="flex justify-center items-center   flex-col min-h-[30vh]">
              <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <p className="text-2xl font-bold text-gray-500">{error}</p>
                <p className="text-gray-400 mt-2">Please try again later</p>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                  onClick={() => setOpenModal(true)}
                >
                  Deposit Funds
                </button>
              </div>
            </div>
          </>
        )}

        {/* Funds Data */}
        {!loading && !error && fundsData.data && (
          <FundsCard fund={fundsData.data} className="font-semibold" />
        )}
      </div>

      <BiddingLimit openModalProp={openModal} setOpenModalProp={setOpenModal} fetchFunds={fetchFunds} />
    </>
  );
};

export default Funds;
