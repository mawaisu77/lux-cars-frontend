import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header/Header";
import icon1 from "../../../assets/Icon (2).svg";
import icon2 from "../../../assets/Icon (3).svg";
import icon3 from "../../../assets/Icon (4).svg";
import icon4 from "../../../assets/Icon (5).svg";
import icon5 from "../../../assets/Order_history.svg";


const HowWorks = () => {
  return (
    <>
      <Header className="" />
     <div className="Backgroundimage-How relative">
      <div className="hidden lg:block">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            How It Works
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:text-[1.1vw]">Home</button>
            </Link>
            /<button className="hover:text-white hover:text-[1.1vw]">How it Works</button>
          </div>
        </div>
      </div>
    </div>

      <div className="   w-full lg:w-[91vw] mx-auto dark">
        <div className="flex flex-col mx-auto  mt-[100px] lg:mt-[8.6vh] w-[344px]  lg:w-[33vw]">
          <p className="   text-[36px] lg:text-[2vw]  font-bold font-urbanist">
            Step-by-Step Guide for Users{" "}
          </p>
          <p className="text-[16px] lg:text-[0.9vw] text-[#7a798a]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
            asperiores sit.
          </p>
        </div>

        <div className="  ">
          <div className=" w-[370px] flex md:w-[40vw] lg:w-[74vw]  mx-auto mt-[5vh] ">
            <div className=" flex flex-col-reverse  lg:flex-row lg:justify-between items-center gap-[2.5vw] w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh]  ">
              <div className="text-right w-[127px]   lg:w-[30vw] h-[193px] lg:h-[18vh] ">
                <p className="font-urbanist text-[16px]  lg:text-[1.2vw] font-bold mb-[1.5vh]">
                  Registration
                </p>
                <p className="text-[14px] lg:text-[1vw] font-urbanist text-[#7a798a]">
                  Users must register to start bidding. The registration process
                  is straightforward and requires providing official
                  identification documents for verification.
                </p>
              </div>
              <div className="flex justify-center  items-center w-[112px] lg:w-[9vw] h-[112px] lg:h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
                <img src={icon1} className="w-[47px] h-[47px]" />
              </div>
            </div>
            <div className=" flex lg:justify-between items-center gap-[2.5vw]   w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh] "></div>
          </div>

          <div className=" w-[370px] flex flex-row-reverse  md:w-[40vw] lg:w-[74vw]  mx-auto mt-[5vh] ">
            <div className=" flex flex-col  lg:flex-row lg:justify-between items-center gap-[2.5vw] w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh]  ">
              <div className="flex justify-center  items-center w-[112px] lg:w-[9vw] h-[112px] lg:h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
                <img src={icon1} className="w-[47px] h-[47px]" />
              </div>
              <div className="text-left w-[127px] lg:w-[30vw] h-[193px] lg:h-[18vh] ">
                <p className="font-urbanist text-[16px]  lg:text-[1.2vw] font-bold mb-[1.5vh]">
                  Bid Power
                </p>
                <p className="text-[14px] lg:text-[1vw] font-urbanist text-[#7a798a]">
                  Upon registration, users can set their bid power, determining
                  the maximum amount they can bid on any lot. Bid power is
                  secured with a refundable deposit, payable via various
                  methods.
                </p>
              </div>
            </div>
            <div className=" flex lg:justify-between items-center gap-[2.5vw]   w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh] "></div>
          </div>

          <div className=" w-[370px] flex md:w-[40vw] lg:w-[74vw]   mx-auto mt-[5vh] ">
            <div className=" flex flex-col-reverse  lg:flex-row lg:justify-between items-center gap-[2.5vw] w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh]  ">
              <div className="text-right w-[127px] lg:w-[30vw] h-[193px] lg:h-[18vh] ">
                <p className="font-urbanist text-[16px]  lg:text-[1.2vw] font-bold mb-[1.5vh]">
                  Vehical Search
                </p>
                <p className="text-[14px] lg:text-[1vw] font-urbanist text-[#7a798a]">
                  Users can utilize advanced filters and online search
                  functionality to find specific lots. Detailed lot information
                  is provided to assist in making informed choices.
                </p>
              </div>
              <div className="flex justify-center  items-center w-[112px] lg:w-[9vw] h-[112px] lg:h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
                <img src={icon3} className="w-[47px] h-[47px]" />
              </div>
            </div>
            <div className=" flex lg:justify-between items-center gap-[2.5vw]   w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh] "></div>
          </div>

          <div className=" w-[370px] flex flex-row-reverse  md:w-[40vw] lg:w-[74vw]  mx-auto mt-[5vh] ">
            <div className=" flex flex-col  lg:flex-row lg:justify-between items-center gap-[2.5vw] w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh]  ">
              <div className="flex justify-center  items-center w-[112px] lg:w-[9vw] h-[112px] lg:h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
                <img src={icon5} alt="hello" className="w-[47px] h-[47px]" />
              </div>
              <div className="text-left w-[127px] lg:w-[30vw] h-[193px] lg:h-[18vh] ">
                <p className="font-urbanist text-[16px]  lg:text-[1.2vw] font-bold mb-[1.5vh]">
                  Biding and buying
                </p>
                <p className="text-[14px] lg:text-[1vw] font-urbanist text-[#7a798a]">
                  Users can bid on lots online without requiring a license. Once
                  a bid is successful, users can pay the auction invoice, and
                  the platform handles the rest, including vehicle pickup and
                  delivery to the designated port.
                </p>
              </div>
            </div>
            <div className=" flex lg:justify-between items-center gap-[2.5vw]   w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh] "></div>
          </div>

          <div className=" w-[370px] flex md:w-[40vw] lg:w-[74vw]   mx-auto pb-[5vh] mt-[5vh] ">
            <div className=" flex flex-col-reverse  lg:flex-row lg:justify-between items-center gap-[2.5vw] w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh]  ">
              <div className="text-right w-[127px]  lg:w-[30vw] h-[193px] lg:h-[18vh] ">
                <p className="font-urbanist text-[16px]  lg:text-[1.2vw] font-bold mb-[1.5vh]">
                  Vehical Search
                </p>
                <p className="text-[14px] lg:text-[1vw] font-urbanist text-[#7a798a]">
                  Users can utilize advanced filters and online search
                  functionality to find specific lots. Detailed lot information
                  is provided to assist in making informed choices.
                </p>
              </div>
              <div className="flex justify-center  items-center w-[112px] lg:w-[9vw] h-[112px] lg:h-[16.5vh] hover:bg-[#df4949] hover:text-white rounded-3xl shadow-lg">
                <img src={icon5} className="w-[47px] h-[47px]" />
              </div>
            </div>
            <div className=" flex lg:justify-between items-center gap-[2.5vw]   w-[186px]  lg:w-[34vw]  h-[380px] lg:h-[20.3vh] "></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWorks;
