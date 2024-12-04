import React from "react";
import TooltipGlobal from "./ui/tooltip/TooltipGlobal";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaArrowTrendUp } from "react-icons/fa6";

const quickBids = [100, 200, 300, 400, 500, 1000];

const QuickBids = ({ manualBid, setManualBid }) => {
  return (
    <div className="flex flex-col justify-around h-full items-center w-[55%] ">
      <div className="flex items-center justify-center gap-[0.425vw]">
        <h1 className="text-16 font-medium">Quick Bid Increase:</h1>
        <TooltipGlobal
          title="Quick Bid Increase"
          description="Quickly increase your bid by selecting an amount from the list."
          placement="top"
          hoverComponent={
            <span className="cursor-pointer text-20">
              <IoInformationCircleOutline />
            </span>
          }
        />
      </div>

      <div className="mb-2 flex flex-wrap gap-2 text-[15px] font-medium">
        {quickBids.map((amount) => (
          <div
            onClick={() => setManualBid(manualBid + amount)}
            className="w-full text-16 flex items-center gap-1 justify-center px-2 py-1 bg-[#E8F9F9] text-[#15CAB8] hover:bg-[#D1F4F4] border border-[#15CAB8] rounded-[0.625vw] cursor-pointer"
          >
            <span className="">
              <FaArrowTrendUp />
            </span>
            <span className="">${amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickBids;
