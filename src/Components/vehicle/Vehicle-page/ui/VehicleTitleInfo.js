import React from "react";
import { FaLink } from "react-icons/fa6";

const VehicleTitleInfo = ({ currentStatus, title, baseSite }) => {
  return (
    <div className="flex justify-between items-center bg-white p-2 lg:mb-[2vh]">
      <div className="flex justify-center items-center gap-1">
        {currentStatus && (
          <div
            className={`w-4 h-4 lg:w-[1.5vw] lg:h-[1.5vw] rounded-full ${currentStatus.bgHex} `}
          >
            <span
              title={currentStatus.id}
              className={
                " text-white w-full h-full text-16 font-bold flex items-center justify-center"
              }
            >
              {currentStatus.letter}
            </span>
          </div>
        )}
        <p className="lg:text-[1.3vw] font-urbanist font-semibold ">{title}</p>
        <div className="flex justify-center items-center">
          {baseSite === "iaai" && (
            <button className="bg-[#D91E1E] hover:bg-[#D91E1E]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
              IAAI
            </button>
          )}
          {baseSite === "copart" && (
            <button className="bg-[#0E5DB8] hover:bg-[#0E5DB8]/90 text-white text-[10px] md:text-16 px-2 md:px-[0.5vw] py-1 md:py-[0.2vw] rounded-md">
              Copart
            </button>
          )}
        </div>
      </div>
      <div>
        {/* New Copy Button */}
        <button
          title="Copy URL"
          onClick={() => document.getElementById("copy_url_modal").showModal()}
          className=" bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          <FaLink className="lg:text-20" />
        </button>
      </div>
    </div>
  );
};

export default VehicleTitleInfo;
