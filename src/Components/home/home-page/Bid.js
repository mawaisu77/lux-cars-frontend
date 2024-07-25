import React from "react";
import bgImage from "../../../assets/BG-Img/kk 1.png";
import img1 from "../../../assets/Home/Ellipse 2.png";
import img2 from "../../../assets/Home/Ellipse 3.png";
import img3 from "../../../assets/Home/Ellipse 4.png";
import img4 from "../../../assets/Icons/Layer 2.png";
import img5 from "../../../assets/Icons/Shape.png";
import img6 from "../../../assets/Icons/Vector (5).png";
import img7 from "../../../assets/Icons/M logo.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuCalendarSearch } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";

const Bid = () => {
  return (
    <>
      <div className="hidden sm:block text-black">
        <div className="flex w-[74vw]  flex-row justify-between mx-auto bgImage tree">
          <div className="mx-auto w-[30vw] h-[73vh] mt-[7vh]">
            <h2 className="text-left font-urbanist lg:text-[3.125vw] font-bold leading-tight my-[2vh]">
              <span className="text-outline">Bid, Buy, Drive</span> Online Car
              Auctions with Home Delivery!
            </h2>
            <div className="w-[19vw] text-[#8a8aa0] font-urbanist text-[1.041vw] font-medium leading-[2.8vh] text-left mt-[0.3vh]">
              Lorem ipsum dolor sit amet. Ea similique aliquam ut maxime
              necessitatibus est nemo error sed vero sapiente cum quae
              temporibus sed quaerat
            </div>
            <button className="bg-[#ca0000] font-urbanist flex text-white rounded-full items-center lg:text-[1vw] lg:px-[1.3vw] h-[5.284vh] my-[2vh]">
              Start Bidding
            </button>
            <div className="text-left w-[87px] flex justify-between gap-4 mt-[5vh]">
              <img src={img4} alt="icon1" />
              <img src={img5} alt="icon2" />
              <img src={img6} alt="icon3" />
              <img src={img7} alt="icon4" />
            </div>
          </div>
          

          <div className="relative w-[90%] h-[75vh] text-black">
            <div className="absolute bg-white opacity-80 rounded-xl shadow-xl w-[9.2vw] right-[5vw] top-[7vh] h-[20vh]">
                     <div className="flex flex-col p-2  items-center ">
                         <p className="font-bold text-[26px] md:text-[32px] lg:text-[48px]">
                             50+
                         </p>
                         <p className="text-[14px] font-urbanist px-4">
                           Catergries Available
                         </p>
                     </div>
            </div>
            <div className=" flex flex-row justify-between text-left px-[1vw] items-center bottom-[5vh] w-[56vw] h-[12vh] bg-[#ffffffcc] rounded-xl absolute">
              <div className="flex">
                 
              <div className="flex flex-col justify-center items-center border-r w-[8vw] text-left">
                  <p className="text-[1.17vw] font-urbanist font-semibold">
                     VIN/lot
                  </p>
                  <div className="flex justify-center items-center text-[0.9vw] font-urbanist text-left text-[#8a8aa0]">
                  <input
      type="text"
      placeholder="Type Here..."
      className="bg-[#ffffffcc] border-none w-[8vw] font-urbanist flex"
    />
                  
                  </div>
                </div>


                <div className="flex flex-col justify-center items-center border-r w-[8vw] text-left">
                  <p className="text-[1.17vw] font-urbanist font-semibold">
                    Car types
                  </p>
                  <div className="flex justify-center items-center text-[0.9vw] font-urbanist text-left text-[#8a8aa0]">
                    <p>All Vehicles</p>
                    <RiArrowDropDownLine className="cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center border-r w-[8vw] text-left">
                <p className="text-[1.17vw]  font-urbanist font-semibold">Models</p>
                <div className="flex justify-center items-center text-[0.9vw] font-urbanist text-[#8a8aa0]">
                  <p>All Models</p>
                  <RiArrowDropDownLine className="cursor-pointer" />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center border-r w-[8vw] text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold">Partners</p>
                <div className="flex justify-center items-center text-[0.9vw] font-urbanist text-[#8a8aa0]">
                  <p>Carport</p>
                  <RiArrowDropDownLine className="cursor-pointer" />
                </div>
              </div>

              <div>
                <p className="text-[1.17vw] font-urbanist font-semibold">Dates</p>
                <div className="flex justify-center items-center text-[0.9vw] font-urbanist text-[#8a8aa0]">
                  <div className="flex justify-center items-center gap-[0.5vw]">
                    <LuCalendarSearch /> 09/01/2024 - <LuCalendarSearch /> 12/01/2024
                  </div>
                </div>
              </div>
              <div className="flex h-[6.23vh] w-[3.5vw] justify-center items-center bg-red-700 rounded-xl">
                <GoSearch size={27} color="white" className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="w-[23vw] h-[380px] rounded-lg bg-white">
            <div className="flex px-3 mt-[9.46vh]">
              <img src={img1} className="w-[4vw] h-[8.13vh]" alt="icon5" />
              <img src={img2} className="w-[4vw] h-[8.13vh]" alt="icon6" />
              <img src={img3} className="w-[4vw] h-[8.13vh]" alt="icon7" />
            </div>
            <div className="font-urbanist text-[1.5vw] font-semibold leading-[3.2vh] px-3 text-left mt-[2.5vh]">
              12.5K+ People
            </div>
            <div className="font-urbanist text-[1vw] font-normal leading-[3.1vh] px-3 text-left mt-[1.5vh] text-[#8a8aa0]">
              has used our services such as selling, buying, or even buying their parts.
            </div>
            <div className="flex gap-[0.2vw] flex-wrap px-3 mt-[2vh]">
              <button className="border border-[#df4949] w-[5vw] h-[4.28vh] rounded-full text-[#df4949] text-[1.04vw]">
                Bid
              </button>
              <button className="border border-[#df4949] w-[5vw] h-[4.28vh] rounded-full text-[#df4949] text-[1.04vw]">
                Buy
              </button>
              <button className="border border-[#df4949] w-[5vw] h-[4.28vh] rounded-full text-[#df4949] text-[1.04vw]">
                Sell
              </button>
              <button className="border border-[#df4949] w-[6vw] h-[4.28vh] rounded-full text-[#df4949] text-[1.04vw]">
                Consult
              </button>
              <div className="flex gap-5 items-center mt-[10px]">
                <p className="text-left font-semibold text-[18px] font-urbanist">Learn More</p>
                <FaArrowRightLong />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block sm:hidden">
        <div className="flex flex-col justify-between mx-auto bgImage tree">
          <div className="w-[343px] mx-auto">
            <h2 className="text-left font-urbanist text-[46px] font-bold leading-tight">
              <span className="text-outline">Bid, Buy, Drive</span> Online Car Auctions with Home Delivery!
            </h2>
            <div className="w-[265px] text-[#8a8aa0] font-urbanist text-[20px] font-medium leading-[19px] text-left">
              Lorem ipsum dolor sit amet. Ea similique aliquam ut maxime necessitatibus est nemo error sed vero sapiente cum quae temporibus sed quaerat
            </div>
            <button className="bg-[#ca0000] font-urbanist flex text-white rounded-full items-center text-[16px] px-3 h-[5.284vh] my-[2vh]">
              Start Bidding
            </button>
            <div className="text-left w-[87px] flex justify-between gap-4 mt-[5vh]">
              <img src={img4} alt="icon8" />
              <img src={img5} alt="icon9" />
              <img src={img6} alt="icon10" />
              <img src={img7} alt="icon11" />
            </div>
          </div>
          

          <div className=" relative h-[600px]">
          <div className="absolute bg-white opacity-80 rounded-xl shadow-xl right-[10%] w-[105px]  h-[95px]">
                     <div className="flex flex-col p-2  items-center ">
                         <p className="font-bold text-[23px]">
                             50+
                         </p>
                         <p className="text-[12px] font-urbanist px-4">
                           Catergries Available
                         </p>
                     </div>
            </div>
          </div>

          <div className="flex w-[350px] h-[200px] mx-auto">
            <div className="mx-auto w-[200px] h-[312px] -mt-[230px]">
              <div className="flex">
                <img src={img1} className="w-[60px] h-[60px]" alt="icon12" />
                <img src={img2} className="w-[60px] h-[60px]" alt="icon13" />
                <img src={img3} className="w-[60px] h-[60px]" alt="icon14" />
              </div>
              <div className="font-urbanist text-[20px] font-semibold leading-[24px] text-left mt-[2.5vh]">
                12.5K+ People
              </div>
              <div className="font-urbanist text-[14px] font-normal leading-[16px] text-left mt-[1.5vh] text-[#8a8aa0]">
                has used our services such as selling, buying, or even buying their parts.
              </div>
              <div className="flex gap-[0.5vw] flex-wrap mt-[2vh]">
                <button className="border border-[#df4949] py-[10px] px-[26px] rounded-full text-[#df4949] text-[16px]">
                  Bid
                </button>
                <button className="border border-[#df4949] py-[10px] px-[26px] rounded-full text-[#df4949] text-[16px]">
                  Buy
                </button>
                <button className="border border-[#df4949] py-[10px] px-[26px] rounded-full text-[#df4949] text-[16px]">
                  Sell
                </button>
                <button className="border border-[#df4949] py-[10px] px-[26px] rounded-full text-[#df4949] text-[16px]">
                  Consult
                </button>
              </div>
              <div className="flex gap-5 items-center mt-[10px]">
                <p className="text-left font-semibold text-[18px] font-urbanist">Learn More</p>
                <FaArrowRightLong />
              </div>
            </div>

            <div className="text-left w-[140px] h-[550px] border bg-[#ffffffcc] rounded-xl -mt-[380px]">
              <div className="w-[108px] py-2 mx-auto flex flex-col justify-center items-center font-urbanist">

              <div className="h-[110px]">
                  <p className="text-[14px] font-urbanist font-semibold">  VIN/lot</p>
                  <p className="flex justify-between text-[13px] gap-1">
                  
                  <input
      type="text"
      placeholder="Type Here..."
      className="bg-[#ffffffcc] border-none w-[64px]  font-urbanist flex "
    />
                  </p>
                </div>


                <div className="h-[110px]">
                  <p className="text-[14px] font-urbanist font-semibold">Car Types</p>
                  <p className="flex justify-between text-[13px] gap-1">
                    All Vehicles
                    <RiArrowDropDownLine size={25} className="cursor-pointer" />
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-[14px] font-urbanist font-semibold">Models</p>
                  <p className="flex justify-between items-center text-[13px] gap-1">
                    All Models
                    <RiArrowDropDownLine size={25} className="cursor-pointer  hover:bg-red-300" />
                  </p>
                </div>

                <div className="border-b pb-2 h-[100px]">
                  <p className="text-[14px] font-urbanist font-semibold pt-7">Partners</p>
                  <p className="flex justify-between items-center text-[13px] gap-1">
                    All Partners
                    <RiArrowDropDownLine size={25} className="cursor-pointer" />
                  </p>
                </div>

                <div className="flex flex-col gap-3 pb-2">
                  <p className="text-[14px] font-urbanist font-semibold pt-7">Date</p>
                  <div className="flex justify-center items-center gap-2">
                    <LuCalendarSearch /> 09 - <LuCalendarSearch /> 12
                  </div>
                  <div className="flex w-[40px] h-[40px] justify-center items-center bg-red-700 rounded-xl">
                    <GoSearch size={27} color="white" className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bid;

