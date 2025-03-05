import React from "react";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { colorDescriptions } from "./DocumentOldColorDesciption";
import ColorDescriptionComponent from "./ColorDescriptionComponent";


const VehcileSellerInfo = ({seller, documentOld, document, currentDocumentType, documentOldType }) => {
  const colorCategoryMapping = {
    "#008000": "Insurance",    
    "#FF681F": "Non-Insurance", 
    "#FF0000": "Ineligible",   
    "#0000FF": "No Information", 
  };

  const sellerTooltipDescriptions = {
    "Insurance": "The seller has been considered Trustworthy.",
    "Non-Insurance": "The seller has not been considered trustworthy by BidCaribbean, or detailed information is missing. Please exercise caution when making a purchase decision",
    "Ineligible": "The sellers indicate that the vehicle cannot be imported due to restrictions such as missing or unresolved documentation, making them unsuitable for registration or road use in the Caribbean.",
    "No Information": "indicates that the seller details are unclear or unavailable. Potential buyers should proceed with caution and conduct thorough checks or inquiries to determine the vehicle's history and title status",
  };




  const documentCategory = colorCategoryMapping[documentOldType?.color] || "No Information";
  const tooltipDescription = colorDescriptions[documentOldType?.color] || '';
  const sellerTooltipDescription = sellerTooltipDescriptions[seller ? documentCategory : (documentOldType?.color === "#008000"?"Insurance":"Non-Insurance")] || "Non-Insurance";

  // console.log("first", documentCategory, documentOldType?.color, sellerTooltipDescription)

  return (
    <div className="flex gap-[0.5vw] flex-col   lg:flex-row justify-between">

      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] rounded-[0.5vw] bg-white">

        <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-[0.5vw]  bg-[#CA0000]">
          <PiUsersFill color="white" className="lg:text-[1vw]" />
        </div>
        <div data-tooltip-id={`seller-tooltip`} className="text-left p-2 md:p-[0.3vw]">
          <p className="lg:text-[0.8vw] text-[#6a6978] font-semibold tracking-wider">Owned by <span style={{color:  documentOldType?.color }}> ( { documentCategory }) </span> </p>
          
          <p
          style={{ color: seller ? documentOldType?.color : '#FF681F', padding: documentOldType ? '0.2vw' : '0', borderRadius: documentOldType ? '0.2vw' : '0' }}
            className={`lg:text-[0.8vw] font-urbanist font-semibold`}
          >
            {seller || ""}
          </p> 
         

        </div>
      </div>
      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] rounded-[0.5vw] bg-white">
      <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-[0.5vw]  bg-[#CA0000]">
          <CgFileDocument color="white" className="lg:text-[1vw]" />
        </div>
        <div className="text-left p-[o.5vw] md:p-[0.3vw] " data-tooltip-id={`document-${documentOldType?.label}`}>
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
        <ReactTooltip
        id="seller-tooltip"
        place="top"
        content={
          <ColorDescriptionComponent
            tooltipDescription={sellerTooltipDescription} 
           />
          } 
        
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default VehcileSellerInfo;
