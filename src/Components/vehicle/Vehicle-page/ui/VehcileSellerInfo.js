import React from "react";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { colorDescriptions } from "./DocumentOldColorDesciption";
import ColorDescriptionComponent from "./ColorDescriptionComponent";


const VehcileSellerInfo = ({seller, documentOld, document, currentDocumentType, documentOldType }) => {
  const colorCategoryMapping = {
    "#008000": "Insurance Company",    
    "#FF681F": "Non-Insurance Company", 
    "#FF0000": "Ineligible",    
  };
  const documentCategory = colorCategoryMapping[documentOldType?.color] || "Unknown";

  const tooltipDescription = colorDescriptions[documentOldType?.color] || '';

  return (
    <div className="flex gap-2 flex-col lg:flex-row justify-between">
      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] rounded-[0.5vw] bg-white">
        <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-2  bg-[#CA0000]">
          <PiUsersFill color="white" className="" />
        </div>
        <div className="text-left p-2 md:p-[0.3vw]">
          <p className="lg:text-[0.8vw] text-[#6a6978] font-semibold tracking-wider">Owned by <span style={{color: documentOldType?.color || ''}}> ({documentCategory}) </span> </p>
          <p
          style={{ color: documentOldType?.color || '', padding: documentOldType ? '0.2vw' : '0', borderRadius: documentOldType ? '0.2vw' : '0' }}
            className={`lg:text-[0.8vw] font-urbanist font-semibold`}
          >
            {seller || "Unknown"}
          </p>
        </div>
      </div>
      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw]  items-center  rounded-[0.5vw] bg-white">
        <div className="flex justify-center items-center p-2 md:p-[0.5vw]  rounded-[0.5vw]  bg-[#CA0000] ">
          <CgFileDocument color="white" className="" />
        </div>
        <div className="text-left p-2 md:p-[0.3vw] " data-tooltip-id={`document-${documentOldType?.label}`}>
          <p className="lg:text-[0.8vw] text-[#6a6978] font-semibold tracking-wider">Sale Documents</p>
          <p 
            className={`lg:text-[0.8vw] font-urbanist font-semibold  text-[${documentOldType?.color}]`} style={{ color: documentOldType?.color || '', padding: documentOldType ? '0.2vw' : '0', borderRadius: documentOldType ? '0.2vw' : '0' }}>
            {documentOldType?.label}
          </p>
        </div>
      </div>
      <ReactTooltip
         id={`document-${documentOldType?.label}`}
         place="top"
         content={
        <ColorDescriptionComponent
          tooltipDescription={tooltipDescription} 
          documentOldType={documentOldType} 
         />
        } 
         style={{zIndex: 9999}}
      />
    </div>
  );
};

export default VehcileSellerInfo;
