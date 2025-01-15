import React from "react";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";


const VehcileSellerInfo = ({seller, documentOld, document, currentDocumentType }) => {
  return (
    <div className="flex gap-2 flex-col lg:flex-row justify-between  mb-[3vh]">
      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw] items-center lg:w-[16vw] rounded-[0.5vw] bg-white">
        <div className="flex justify-center items-center rounded-lg lg:rounded-[0.5vw] p-2  bg-[#CA0000]">
          <PiUsersFill color="white" className="" />
        </div>
        <div className="text-left p-2 md:p-[0.3vw]">
          <p className="lg:text-[0.7vw] text-[#7a798a]">Owned by</p>
          <p
            className={`lg:text-[0.9vw] font-urbanist font-semibold ${seller && seller !== "Unknown" ? "text-green-600 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]" : "text-red-600 py-[0.1vw] px-[0.2vw] rounded-[0.2vw]"}`}
          >
            {seller || "Unknown"}
          </p>
        </div>
      </div>
      <div className="flex flex-1 px-[0.5vw] gap-2 lg:gap-[0.5vw]  items-center  rounded-[0.5vw] bg-white">
        <div className="flex justify-center items-center p-2 md:p-[0.5vw]  rounded-[0.5vw]  bg-[#CA0000] ">
          <CgFileDocument color="white" className="" />
        </div>
        <div className="text-left p-2 md:p-[0.3vw]">
          <p className="lg:text-[0.7vw] text-[#7a798a]">Sale Documents</p>
          <p className="lg:text-[0.7vw] font-urbanist font-semibold" style={{ color: currentDocumentType?.hex || '', padding: currentDocumentType ? '0.2vw' : '0', borderRadius: currentDocumentType ? '0.2vw' : '0' }}>
            {documentOld ? documentOld : document}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehcileSellerInfo;
