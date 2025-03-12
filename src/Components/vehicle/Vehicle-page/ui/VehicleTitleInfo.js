import React from "react";
import { FaLink } from "react-icons/fa6";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";

const VehicleTitleInfo = ({ currentStatus, title, baseSite, handleSaveClick, user, isCarSaved, lotID }) => {

  const handleCopy = () => {
    const currentURL = window.location.href;
      navigator.clipboard.writeText(currentURL)
      .then(() => {
        toast.success("URL copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
        console.error('Failed to copy URL:', err);
      });
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0 bg-white rounded-[0.5vw]  my-[0.5vw] lg:my-0 p-[0.5vw] lg:mb-[2vh]">
      
      <div className="flex justify-center items-center gap-1">
        {currentStatus && (
          <div  
            className={`w-[22px] h-[22px] lg:w-[1.5vw] lg:h-[1.5vw] flex items-center justify-center rounded-full  ${currentStatus.bgHex} `}
          >
            <span
              title={currentStatus.id}
              className={
                "text-white text-[12px] lg:text-[0.8vw] font-bold "
              }
            >
              {currentStatus.letter}
            </span>
          </div>
        )}
        <p className="lg:text-[1.3vw] text-left font-urbanist font-semibold ">{title}</p>   
       <div className="flex flex-col lg:flex-row justify-between gap-[0.5vw]" >
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
  );
};

export default VehicleTitleInfo;
