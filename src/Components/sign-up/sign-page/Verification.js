import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";

const Verification = () => {
  return (
    <>
      <div className="Backgroundimage-Signup">
        <Header textColor="text-white" />
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">SignUp</div>
            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white">Home</button>
              </Link>
              /<button className="hover:text-white">SignUp</button>/
              <button className="hover:text-white">Verification</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[730px] lg:h-[85vh] w-full lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Documents
        </div>
        <div className="w-[30vw]   mx-auto mt-[7vh] h-[44vh] leading-8">
          <p className="text-left text-[1.16vw] font-urbanist font-semibold">Verify and Start Bidding!</p>
          <p className="text-left text-[#7a798a] text-[0.9vw]">Submit the photo of your official ID (Passport/License)</p>
          <div className="w-full h-[15.5vh] my-6  border rounded-xl">
            <div className="flex flex-col justify-center items-center w-[25vw] h-[15vh] mx-auto ">
              <div  className="flex justify-center items-center w-[2.6vw] h-[5.4vh] bg-[#f9fafb] rounded-full">
              <FiUploadCloud />
              </div>
              
              <p className="text-[#7a798a] text-[0.9vw]"><span className="text-red-600">Click to upload</span> or drag and drop</p>
              <p className="text-[#7a798a] text-[0.9vw]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
          <div className="flex justify-between">
              <button className="flex justify-center items-center text-[1vw] font-urbanist hover:bg-red-600 hover:text-white w-[14vw] h-[6vh] border rounded-lg">
                  Cancel
              </button>
              <button className="flex justify-center items-center text-[1vw] font-urbanist hover:bg-red-600 hover:text-white w-[14vw] h-[6vh] border rounded-lg">
                   Submit
              </button>

          </div>
        </div>

        <div className="text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Already have an account?{" "}
          <Link to="/Login">
            <span className="text-[#ca0000] cursor-pointer">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Verification;
