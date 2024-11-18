import { Link } from "react-router-dom";
import image from "../../../assets/fees/Image_Placeholder(1).png";
import image1 from "../../../assets/fees/Image Placeholder.png";
import image2 from "../../../assets/fees/repeat.png";
import image3 from "../../../assets/fees/Horizontal - White0 1.png";
import { useState } from "react";
import { PiUsersFill } from "react-icons/pi";
import { feesLeftCard, internetFeeList } from "../../../data/data.js";
import Card from "./Card.js";
import {
  feesRightCard,
  BuyerFeesListCardList,
  VirtualBidFeeCardList,
  IAAIdatalist,
} from "../../../data/data.js";
import Header from "../../../Components/header/index";
import BuyerFeesListCard from "./BuyerFeesListCard.js";
import VirtualBidFeeCard from "./VirtualBidFeeCard.js";
import IAAIdata from "./IaaIList.js";
import InternetFee from "./InternetFee.js";
import luxImage from "../../../assets/Pattern.png";

function Feespage() {
  const [baseSite, setBaseSite] = useState("COPART"); // Default to COPART

  const [visibleCount, setVisibleCount] = useState(5); // Show 5 items initially
  const [isExpanded, setIsExpanded] = useState(false); // Track if the list is expanded

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Load more items
    setIsExpanded(true); // Set expanded to true when loading more
  };

  const handleHide = () => {
    setVisibleCount(5); // Reset to show only 5 items
    setIsExpanded(false); // Set expanded to false
  };

  return (
    <div>
      <div className="bg-fees">
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col pt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Fees Overview
            </div>
            <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:scale-110 duration-150'>Home</button>
            </Link>
            /
              <button className="hover:text-white hover:scale-110 duration-150">
                Fees Overview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100vw] py-[80px] sm:py-[4.167vw]">
        <div className=" mx-auto flex flex-col md:flex-row gap-8 sm:gap-[2vw] max-w-[85vw] sm:max-w-[53.917vw]">
          {/* COPART/IAAI Card */}
          <div className="flex-1 relative border-2 border-blue-400 rounded-2xl p-[1.9vw]">
            <div className="h-[40px] w-[40px] sm:h-[2.917vw] sm:w-[2.917vw] bg-[#DC2626] rounded-2xl sm:rounded-[1vw] flex items-center justify-center mb-4 sm:mb-[1.5vw]">
              <PiUsersFill className="w-[30px] h-[30px] sm:w-[1.5vw] sm:h-[1.5vw] text-white" />
            </div>

            <h2 className="text-[28px] text-left sm:text-38 font-semibold sm:mb-[1.25vw]">
              Bidding At COPART / IAAI
            </h2>
            <p className="text-lux-black text-left mb-4 sm:mb-[1.5vw] sm:text-20">
              Drawbacks of bidding directly at Copart/IAAI auctions
            </p>

            <div className="space-y-3 text-[18px] sm:space-y-[0.625vw] sm:text-24 text-left">
              {[
                "Dealer / Broker License Required",
                "Annual Membership Fee At Both Sites",
                "Separate Deposits For Each Auction",
                "Shorter Vehicle Descriptions And Details",
                "Increased Risk Of Purchasing Staged Vehicles",
                "Higher Public Fees Available",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[0.521vw] text-[18px] sm:text-20"
                >
                  <span className="text-primary-red leading-none ">-</span>
                  <span className="text-lux-black ">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LUX Card */}
          <div className="flex-1 relative border-2 border-blue-400 rounded-2xl p-[1.9vw]">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${luxImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10">
            <div className="h-[40px] w-[40px] sm:h-[2.917vw] sm:w-[2.917vw] bg-[#DC2626] rounded-2xl sm:rounded-[1vw] flex items-center justify-center mb-4 sm:mb-[1.5vw]">
                <PiUsersFill className="w-[30px] h-[30px] sm:w-[1.5vw] sm:h-[1.5vw] text-white" />
              </div>

              <div className="flex items-center gap-[1vw] mb-[1.25vw]">
                <h2 className="text-[28px] text-left sm:text-38 font-semibold  ">
                  Bidding At LUX
                </h2>
                <span className=" text-white text-nowrap bg-transparent border-2 sm:border-[0.052vw] border-white px-[10px] py-[5px] sm:px-[0.521vw] sm:py-[0.26vw] rounded-[8px] sm:rounded-[0.417vw] text-[16px] sm:text-18">
                  Best Choice
                </span>
              </div>

              <p className="text-lux-black text-left mb-4 sm:mb-[1.5vw] sm:text-20">
              Advantages of bidding through Lux First Choice Cars
              </p>

              <div className="space-y-3 text-[18px] sm:space-y-[0.625vw] sm:text-24 text-left">
              {[
                  "No Dealer License Required",
                  "No Annual Membership Fee",
                  "Ability To Search Two Auctions",
                  "Availability Of Full Vehicle Descriptions And Details",
                  "Helps Buyers Avoid Purchasing Staged Cars",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-[0.521vw] text-[20px] sm:text-20"
                  >
                    <span className="text-primary-red leading-none ">✓</span>
                    <span className="text-lux-black ">{item}</span>
                  </div>
                ))}
              </div>

              <button className="mt-[10px] sm:mt-[2.292vw] w-full bg-[#DC0000] hover:bg-[#B00000] text-white text-[16px] sm:text-20 font-medium py-[8px] sm:py-[1.146vw] rounded-[8px] sm:rounded-[0.625vw] transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[85vw] sm:max-w-[73vw] mx-auto md:mt-[2.083vw] ">
        <div className="text-left flex flex-col">
          <div className="md:mt-[4vh] mt-[100px] md:mb-[4vh] mb-[30px]">
            <h2 className="text-left text-[40px] md:text-[2.083vw] font-[700] text-[#1F1F2C] font-urbanist">
              Fees:
            </h2>
            <p className="text-left text-[17px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
              Copart buyer fees are charged for all vehicles and other items
              purchased at a Copart auction, including miscellaneous salvage
              items sold as “Other Goods.” Different fees are assessed for
              individual/public buyers and business buyers with valid licenses
              on file. Fee may differ depending on the amount of the winning
              bid.
            </p>
          </div>
          <div className="text-[15px] sm:text-15 flex gap-[0.625vw]">
            <button
              className={`rounded-[6px] sm:rounded-[0.313vw] px-[10px] sm:px-[0.885vw] py-[5px] sm:py-[0.521vw] font-urbanist ${
                baseSite === "COPART"
                  ? "bg-[#CA0000] text-white"
                  : "bg-white text-[#1F1F2C]"
              }`}
              onClick={() => setBaseSite("COPART")}
            >
              COPART
            </button>

            <button
              className={`rounded-[0.313vw] px-[0.885vw] py-[0.521vw] font-urbanist ${
                baseSite === "IAAI"
                  ? "bg-[#CA0000] text-white"
                  : "bg-white text-[#1F1F2C]"
              }`}
              onClick={() => setBaseSite("IAAI")}
            >
              IAAI
            </button>
          </div>
        </div>

        {/* Conditionally render COPART or IAAI content */}
        {baseSite === "COPART" ? (
          <div className="py-[1.233vw] px-[1.042vw]">
            <div className=" w-[100%] md:w-[66.823vw] mx-auto mb-[50px]  md:mb-[1.719vh]">
              <div className="flex flex-wrap justify-between">
                <div className="text-left flex flex-wrap gap-[5px] md:gap-[0.417vw] items-center">
                  <div className="rounded-[2.396vw] bg-[#D8ECFF] w-[20px] h-[20px] lg:w-[1.802vw] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                    <img
                      alt="image2"
                      src={image2}
                      className="w-[70%] md:w-[1.5vw]"
                    />
                  </div>
                  <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                    Buyer Fees Lists
                  </h2>
                </div>
                <div className="flex flex-wrap text-18 border justify-center items-center gap-[7px]">
                  <select className=" font-urbanist">
                    <option className="">General fee</option>
                    <option>General fee</option>
                    <option>General fee</option>
                  </select>
                  <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center items-center text-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                    ...
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-[15px] md:mt-[0.833vh] mr-[1.875vw]">
                <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                  Sale Price Range
                </h2>
                <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                  Standard Vehicle Fee
                </h2>
              </div>
              <hr className="bg-[#131313] opacity-[35%] mt-[0.521vh] mb-[0.833vh]" />
              <div>
                {BuyerFeesListCardList.slice(0, visibleCount).map(
                  (data, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-grey-500 px-[0.433vw] py-[0.833vh]"
                    >
                      <BuyerFeesListCard id={index} data={data} />
                    </div>
                  )
                )}

                {/* Load More or Hide Button */}
                {visibleCount < BuyerFeesListCardList.length ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleLoadMore}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Load More
                    </button>
                  </div>
                ) : isExpanded ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleHide}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Hide
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className=" w-[100%] md:w-[66.823vw] mx-auto  mb-[50px] md:mb-[1.719vh]">
              <div className="flex flex-wrap justify-between">
                <div className="text-left flex items-center flex-wrap gap-[5px] md:gap-[0.417vw]">
                  <div className="rounded-[2.396vw] bg-[#D8ECFF] lg:w-[1.802vw] w-[20px] h-[20px] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                    <img src={image2} className="w-[70%] md:w-[1.5vw]" />
                  </div>
                  <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600]  text-[#131313] font-urbanist">
                    Virtual Bid Fee
                  </h2>
                </div>
                <div className="flex flex-wrap text-18 border justify-center items-center gap-[7px]">
                <select className=" font-urbanist">
                    <option>General fee</option>
                    <option>General fee</option>
                    <option>General fee</option>
                  </select>
                  <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center  text-center items-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                    ...
                  </div>
                </div>
              </div>
              <div className=" w-[300px]  md:w-auto overflow-x-scroll whitespace-nowrap md:overflow-hidden  ">
                <div className="flex  w-[400px] md:w-auto justify-between mt-[15px]   md:mt-[0.833vh] md:mr-[1.875vw]">
                  <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] w-[26.823vw]  text-[#131313] font-urbanist">
                    Sale Price Range
                  </h2>
                  <h2 className="text-left text-[15px] md:text-[0.938vw]  font-[500] md:font-[600] text-[#131313] font-urbanist">
                    Pre Bid Fee
                  </h2>
                  <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                    Standard Vehicle Fee
                  </h2>
                </div>
                <hr className=" opacity-[35%] w-[400px]  mt-[0.521vh] mb-[0.833vh]" />
                <div className="">
                  {VirtualBidFeeCardList.slice(0, visibleCount).map(
                    (data, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b border-grey-500 px-[0.433vw] py-[0.833vh]"
                      >
                        <VirtualBidFeeCard id={index} data={data} />
                      </div>
                    )
                  )}
                </div>

                {/* Load More or Hide Button */}
                {visibleCount < VirtualBidFeeCardList.length ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleLoadMore}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Load More
                    </button>
                  </div>
                ) : isExpanded ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleHide}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Hide
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Gate fee
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                A $95 Gate Fee is assessed to all Copart purchases. This fee
                covers administrative costs and the movement of the item from
                our storage location to the Buyer loading area.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[22px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Late Fees, Storage Fees, Mailing Fees, and Relist Fees:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw]  font-[400] text-[#7A798A] font-urbanist">
                The vehicle amount and all applicable fees must be paid within 3
                business days of purchase, including the day of sale, to avoid a
                fee of $50 per vehicle (late fee). Storage rates may vary by
                location. If the lot is not paid in full within 8 calendar days
                (including the day of sale), the vehicle will be relisted. The
                Relist Fee will be 10% of the final sale price with a minimum of
                $600. Mailing fee $50 is applicable for each won lot.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                IMPORTANT:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                Buying a lot in Wisconsin, Alabama and Michigan via Copart
                account will automatically generate additional license fees plus
                $200 to standard fees.
              </p>
            </div>
          </div>
        ) : (
          <div className="py-[1.233vw] px-[1.042vw]">
            <div className=" w-[100%] md:w-[66.823vw] mx-auto mb-[50px]  md:mb-[1.719vh]">
              <div className="flex flex-wrap justify-between">
                <div className="text-left flex flex-wrap gap-[5px] md:gap-[0.417vw] items-center">
                  <div className="rounded-[2.396vw] bg-[#D8ECFF] w-[20px] h-[20px] lg:w-[1.802vw] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                    <img
                      alt="image2"
                      src={image2}
                      className="w-[70%] md:w-[1.5vw]"
                    />
                  </div>
                  <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                    Buyer Fees Lists
                  </h2>
                </div>
                <div className="flex flex-wrap text-18 border justify-center items-center gap-[7px]">
                <select className=" font-urbanist">
                    <option className="">General fee</option>
                    <option>General fee</option>
                    <option>General fee</option>
                  </select>
                  <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center items-center text-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                    ...
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-[15px] md:mt-[0.833vh] mr-[1.875vw]">
                <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                  Sale Price
                </h2>
                <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                  Standard Vehicle Fee
                </h2>
              </div>
              <hr className="bg-[#131313] opacity-[35%] mt-[0.521vh] mb-[0.833vh]" />
              <div className="">
                <div className="">
                  {IAAIdatalist.slice(0, visibleCount).map((data, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-grey-500 px-[0.433vw] py-[0.833vh]"
                    >
                      <IAAIdata id={index} data={data} />
                    </div>
                  ))}
                </div>

                {/* Load More or Hide Button */}
                {visibleCount < IAAIdatalist.length ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleLoadMore}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Load More
                    </button>
                  </div>
                ) : isExpanded ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleHide}
                      className="text-[15px] md:text-[0.7vw] lg:text-[0.781vw] w-[130px] md:w-[8vw] md:h-[3.5vh] lg:w-[6.771vw] h-[50px] lg:h-[6vh] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] md:py-[0.5vh] lg:py-[0.833vh] md:px-[1vw] lg:px-[2.083vh] font-[700] text-[#CA0000] font-urbanist"
                    >
                      Hide
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className=" w-[100%] md:w-[66.823vw] mx-auto  mb-[50px] md:mb-[1.719vh]">
              <div className="flex flex-wrap justify-between">
                <div className="text-left flex items-center flex-wrap gap-[5px] md:gap-[0.417vw]">
                  <div className="rounded-[2.396vw] bg-[#D8ECFF] lg:w-[1.802vw] w-[20px] h-[20px] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                    <img src={image2} className="w-[70%] md:w-[1.5vw]" />
                  </div>
                  <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600]  text-[#131313] font-urbanist">
                    Virtual Bid Fee
                  </h2>
                </div>
                <div className="flex flex-wrap text-18 border justify-center items-center gap-[7px]">
                  <select className=" font-urbanist">
                    <option>General fee</option>
                    <option>General fee</option>
                    <option>General fee</option>
                  </select>
                  <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center  text-center items-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                    ...
                  </div>
                </div>
              </div>
              <div className=" w-[300px]  md:w-auto overflow-x-scroll whitespace-nowrap md:overflow-hidden  ">
                <div className="flex  w-[400px] md:w-auto justify-between mt-[15px]   md:mt-[0.833vh] md:mr-[1.875vw]">
                  <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] w-[26.823vw]  text-[#131313] font-urbanist">
                    Sale Price
                  </h2>
                  <h2 className="text-left text-[15px] md:text-[0.938vw]  font-[500] md:font-[600] text-[#131313] font-urbanist">
                    Proxy Bid Fee
                  </h2>
                  <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                    live online bid Fee
                  </h2>
                </div>
                <hr className=" opacity-[35%] w-[400px]  mt-[0.521vh] mb-[0.833vh]" />
                {internetFeeList.slice(0, visibleCount).map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-grey-500 px-[0.433vw] py-[0.833vh]"
                  >
                    <InternetFee id={index} data={data} />
                  </div>
                ))}

                {/* Load More or Hide Button */}
                {visibleCount < internetFeeList.length ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleLoadMore}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Load More
                    </button>
                  </div>
                ) : isExpanded ? (
                  <div className="flex justify-center md:block mt-[5px] md:mt-[1vw]">
                    <button
                      onClick={handleHide}
                      className="text-[15px] mb-10 sm:text-[0.781vw]  font-[700] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] py-[5px] px-[15px] sm:py-[0.833vh]  sm:px-[2.083vh] text-[#CA0000] font-urbanist"
                    >
                      Hide
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Service Fee:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                $95 per unit for vehicle handling, including vehicle pull out
                and loading.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Environmental Fee:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                $15 per unit for handling and care in accordance with
                environmental regulations.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                In-Branch Payment:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                Buyers who pay in the Branch with cash, money order, cashiers
                check or company check will be charged a $20 In-Branch Payment
                fee.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Money Order Fee:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                Buyers who pay in the Branch using 6+ money orders will be
                charged a $20 fee per money order, in addition to the $20
                In-Branch Payment Fee. Buyers paying with 5 or fewer money
                orders will not be charged additional fees.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                Storage Fees:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                Please check with your local branch regarding the total cost of
                per-day storage fees.
              </p>
            </div>
            <div className="mt-[15px] md:mt-[1.563vh]">
              <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
                FedEx Fee:
              </h2>
              <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
                The fee to deliver one or more titles via FedEx has changed from
                $12 to $20 per delivery.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feespage;
