import React from "react";
import { FaLink } from "react-icons/fa6";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";

const VehicleTitleInfo = ({
  currentStatus,
  title,
  baseSite,
  handleSaveClick,
  user,
  isCarSaved,
  lotID,
}) => {
  const handleCopy = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
        console.error("Failed to copy URL:", err);
      });
  };
  return (
    <>
      <div className="hidden lg:flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 bg-white rounded-[0.5vw]  my-[0.5vw] lg:my-0 p-[0.5vw] lg:mb-[2vh]">
        <div className="flex justify-center items-center gap-1">
          {currentStatus && (
            <div
              className={`w-[22px] h-[22px] lg:w-[1.5vw] lg:h-[1.5vw] flex items-center justify-center rounded-full  ${currentStatus.bgHex} `}
            >
              <span
                title={currentStatus.id}
                className={"text-white text-[12px] lg:text-[0.8vw] font-bold "}
              >
                {currentStatus.letter}
              </span>
            </div>
          )}
          <p className="lg:text-[1.3vw] text-left font-urbanist font-semibold ">
            {title}
          </p>
          <div className="flex flex-col lg:flex-row justify-between gap-[0.5vw]">
            <div className="flex justify-center items-center">
              {baseSite === "iaai" && (
                <button className="bg-[#D91E1E] hover:bg-[#D91E1E]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-[0.5vw]">
                  IAAI
                </button>
              )}
              {baseSite === "copart" && (
                <button className="bg-[#0E5DB8] hover:bg-[#0E5DB8]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-[0.5vw]">
                  Copart
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto">
          <div className="flex w-full lg:w-auto items-center justify-between lg:justify-start gap-x-1 lg:gap-x-[0.5vw]">
            <button
              onClick={() => handleSaveClick(lotID)}
              className="text-[12px] lg:text-18 font-semibold flex border items-center gap-2 lg:gap-[0.5vw] px-2 lg:px-[1vw] py-1 lg:py-[0.5vw] rounded-lg transition bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              {isCarSaved && user ? (
                <BsHeartFill className=" text-red-500" />
              ) : (
                <BsHeart className=" text-gray-500" />
              )}
            </button>

            {/* New Copy Button */}
            <button
              title="Copy URL"
              onClick={handleCopy}
              className=" text-[12px] lg:text-18 bg-blue-500 hover:bg-blue-600 text-white gap-2 lg:gap-[0.5vw] px-2 lg:px-[1vw] py-1 lg:py-[0.5vw] rounded-[0.5vw]"
            >
              <FaLink className="lg:text-[1vw]" />
            </button>
          </div>
        </div>
      </div>

      {/* ==================================Mob view ============================  */}
      <div className="lg:hidden p-1 flex flex-col justify-between items-start gap-y-2  bg-white ">
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="lg:text-[1.3vw] text-left font-urbanist font-semibold ">
            {title}
          </p>
          <div className="flex items-center gap-x-2">
            <div>
              {currentStatus && (
                <div
                title={currentStatus.id}
                  className={`px-3 py-1 text-white text-[13px] rounded-lg  ${currentStatus.bgHex} `}
                >
                   {currentStatus.id}

                </div>
              )}
            </div>

              <div className="flex justify-center items-center">
                {baseSite === "iaai" && (
                  <button className="bg-[#D91E1E] rounded-lg hover:bg-[#D91E1E]/90 text-white text-[13px] px-3  py-1 ">
                    IAAI
                  </button>
                )}
                {baseSite === "copart" && (
                  <button className="bg-[#0E5DB8] rounded-lg hover:bg-[#0E5DB8]/90 text-white text-[13px]  px-3  py-1 ">
                    Copart
                  </button>
                )}
              </div>

          </div>
        </div>
          <div
           title="Save Car"
          className="flex w-full p-2 border bg-gray-100 cursor-pointer hover:bg-gray-200 transition  items-center justify-center text-gray-800 gap-x-1 ">
            <button
              onClick={() => handleSaveClick(lotID)}
              className="text-[14px] font-semibold tracking-wide flex items-center gap-2 px-2 py-1 rounded-lg  "
            >
              {isCarSaved && user ? "SAVED":"SAVE"}

              {isCarSaved && user ? (
                <BsHeartFill className=" text-red-500" />
              ) : (
                <BsHeart className=" text-gray-500" />
              )}
            </button>

         
          </div>
          <div
            title="Copy URL"
            className="flex w-full p-2 border bg-gray-100 cursor-pointer hover:bg-gray-200 transition  items-center justify-center text-gray-800 gap-x-1 ">
            <button
             onClick={handleCopy}
             className="text-[14px] font-semibold tracking-wide flex items-center gap-2 px-2 py-1 rounded-lg  "
            >
             Copy Link
             <FaLink className=" text-gray-500" />
              
            </button>

         
          </div>
      </div>
    </>
  );
};

export default VehicleTitleInfo;
