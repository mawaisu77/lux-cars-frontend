import React from "react";
import { Link } from "react-router-dom";
import FAQsAccordion from "./FAQsAccordion";
import ContactForm from "../../Contact/Cantact-page/ContactForm";
import HelpGettingStarted from "./HelpGettingStarted";
import HelpHeader from "./HelpHeader";
import luxImage from "../../../assets/Pattern.png";
import { PiUsersFill } from "react-icons/pi";


const Help = () => {
  return (
    <>
       <div className="back-image-Help">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Help
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Help
            </button>
          </div>
        </div>
   </div>

      <div className=" w-[342px] md:w-[74vw] mx-auto sm:py-[2vw] py-[40px]">
        <HelpHeader/>

        <div className=" mx-auto flex flex-col md:flex-row gap-8 sm:gap-[2vw] max-w-[85vw] sm:max-w-[53.917vw] ">
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
                  Bidding At BidCaribbean
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
        <div className="text-[18px] md:text-20 text-lux-black font-urbanist text-center px-6 my-10">
          BidCaribeean, a Lux First Choice Car Division, is a leading online auction platform providing trustworthy services, reliable support, and an uncomplicated buying experience, making us the first choice for the Caribbean.
          </div>

        <HelpGettingStarted/>
        <FAQsAccordion />
        <ContactForm />
      </div>
    </>
  );
};

export default Help;
