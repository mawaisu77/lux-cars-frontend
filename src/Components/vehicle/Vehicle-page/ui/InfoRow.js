import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ColorDescriptionComponent from "./ColorDescriptionComponent";
const InfoRow = ({ label, value, className, description = "" }) => (
  <div className="flex justify-between border-b border-gray-300 pb-1">
    <p className="text-gray-600 font-medium">{label}:</p>
    <div className="flex gap-x-2 items-center">
      <span className="text-gray-600">
        {description && (
          <BsInfoCircle
            data-tooltip-id={`vehicle-description-${label}`}
            className="font-extrabold text-[20px] sm:text-24 animate-pulse cursor-pointer"
          />
        )}
        <ReactTooltip
          className="text-16 z-50"
          id={`vehicle-description-${label}`}
          content={
            <ColorDescriptionComponent
              tooltipDescription={description} 
             />
            } 
        />
      </span>
      <span className={`text-black ${className}`}>{value}</span>
    </div>
  </div>
);

export default InfoRow;
