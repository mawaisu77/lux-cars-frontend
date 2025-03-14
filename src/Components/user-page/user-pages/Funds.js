import React, { useEffect, useState } from "react";
import FundsCard from "../../cards/FundsCard";
import { ClipLoader } from "react-spinners";
import BiddingLimit from "./funds/BiddingLimit.jsx";
import { useFunds } from "../../../context/FundsContext.js";
import { Modal } from "@mui/material";
import logo from "../../../assets/lux-logo/bidcaribbeansBlueLogo.jpg";
import useRefundRequest from "../../../hooks/invoice/useRefundRequest.js";

const Funds = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalRefund, setOpenModalRefund] = useState(false);
  const { fundsData, loading, error, fetchFunds } = useFunds(); 
  const {  success, loading:refundLoading, error:refundError, refundRequest } = useRefundRequest(); 


  useEffect(() => {
    fetchFunds();
  }, []);


  return (
    <>
      <div className="w-[90vw] lg:w-[85vw] mx-auto mt-6 lg:mt-[1.5vw]  text-black ">
        <div className="flex text-left item-center justify-between">
          <p className="text-[24px] md:text-[36px] lg:text-[2.3vw] text-left lg:text-left font-urbanist font-bold">
            My Funds
          </p>
          <div className="flex justify-end lg:justify-center gap-x-1 md:gap-x-2 lg:gap-3 relative">
          <button
              className="w-[90px] md:w-[110px] lg:w-[11vw] h-[36px] lg:h-[6vh] flex justify-center font-semibold rounded-lg items-center bg-primary-red hover:bg-primary-red/90 text-white text-[13px] lg:text-[1vw] font-urbanist"
              onClick={() => setOpenModalRefund(true)}

            >
              Refund
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="w-[90px] md:w-[110px] lg:w-[11vw] h-[36px] lg:h-[6vh] flex justify-center font-semibold rounded-lg items-center bg-primary-red hover:bg-primary-red/90 text-white text-[13px] lg:text-[1vw] font-urbanist"
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


      <Modal open={openModalRefund} onClose={() => setOpenModalRefund(false)}>
      <div
        className="bg-white p-6 lg:m-0 m-1 rounded-lg shadow-lg w-full lg:w-[800px] max-h-[90vh] overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="bg-[#008b98] rounded-lg w-full">
          <img src={logo} alt="Company Logo" className="w-[25%] h-auto mx-auto" />
        </div>

        <div className="text-center py-4">
          {!success ? (
            <>
              <h1 className="text-xl font-bold">BidCaribbean Refund Request</h1>
              <p className="text-gray-600 text-left">
                Are you sure you want to proceed with the refund request? Once submitted,
                 it will be processed by our team.
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quos quisquam fugiat ratione est? Voluptatum vero consequatur, iusto impedit, ullam itaque nemo assumenda atque maxime, beatae eligendi repellendus quia praesentium!

              </p>
            

              {refundError &&
               <p className="text-red-600 border bg-red-50 border-red-600 p-2 my-2 rounded-md">{refundError}
               </p>
               }

              <div className="flex justify-center mt-4 gap-3">
                <button
                  onClick={() => setOpenModalRefund(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>

                <button
                    onClick={() => {
                      refundRequest().then(() => {
                        fetchFunds();
                      });
                    }}
                  disabled={refundLoading}
                  className="px-4 py-2 bg-primary-red text-white rounded-lg hover:bg-primary-red/90 transition flex items-center"
                >
                  {refundLoading ? <ClipLoader size={20} color="#fff" /> : "Proceed Refund"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold text-green-600">Thank you!</h2>
              <p className="text-gray-600">Your refund request has been submitted successfully. Our team will process it soon.</p>
              <button
                onClick={() => setOpenModalRefund(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
    </>
  );
};

export default Funds;
