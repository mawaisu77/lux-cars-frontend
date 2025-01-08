import React from "react";
import { Link } from "react-router-dom";


import { PiShippingContainerBold } from "react-icons/pi";
import { MdOutlineVerifiedUser } from "react-icons/md";


import { useState } from "react";
import {
  FaMousePointer,
  FaHandHoldingUsd,
  FaCar,
  FaGavel,
} from "react-icons/fa";

const HowWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Register & Verify Your Account",
      description:
        "Create your BidCaribbean account in minutes! Provide basic details and upload valid identification documents for a secure verification process. Your safety and trust are our top priorities.",
      icon: MdOutlineVerifiedUser,
    },
    {
      title: "Set Your Bid Power",
      description:
        "Gain bidding power by making a refundable deposit, which sets your maximum bidding limit. Choose from flexible payment options and confidently bid within your secured budget.",
      icon: FaHandHoldingUsd,
    },
    {
      title: "Search Verified Vehicles",
      description:
        "Use our advanced search filters to explore over 145,000 verified cars. Narrow your options by make, model, price, or damage type (e.g., minor dents, repossessions, or hail damage). Each listing includes detailed information, ensuring transparency and trust.",
      icon: FaCar,
    },
    {
      title: "Bid with Confidence",
      description:
        "Place your bids on your chosen vehicles easily. Monitor bidding activity in real-time and let our system ensure you stay on top without exceeding your set limits. With our secure platform, every transaction is fully protected.",
      icon: FaGavel,
    },
    {
      title: "Seal the Deal & Arrange Delivery",
      description:
        "Win your auction? Congratulations! Our trusted team will guide you through secure payment and arrange home delivery for your new vehicle. It’s fast, safe, and secure.",
      icon: PiShippingContainerBold,
    },
  ];
  return (
    <>
      <div className="Backgroundimage-How relative">
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col pt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              How It Works
            </div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white hover:text-[1.1vw]">
                  Home
                </button>
              </Link>
              /
              <button className="hover:text-white hover:text-[1.1vw]">
                How it Works
              </button>
            </div>
          </div>
        </div>
      </div> 

      <div className=" max-w-[85vw] sm:max-w-[73.229vw] mx-auto my-[80px] sm:my-[4.175vw] ">
        <div className="flex flex-col mx-auto max-w-lg ">
          <p className="  text-[36px] sm:text-36  font-bold font-urbanist">
          Step-by-Step Guide: How to Bid with BidCaribbean
          </p>
          <p className="text-[16px] lg:text-18 text-[#7a798a] ">
          Buying your next car through BidCaribbean is simple, secure, and hassle-free. Follow these easy 5 steps to start bidding and drive home your dream car!
          </p>
        </div>
        <div className="container mx-auto px-4 py-12">
          {/* Timeline Section */}
          <div className="relative">
            {/* Vertical Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-dashed border-gray-200"
              aria-hidden="true"
            />

            {/* Steps */}
            <div className="relative">
              {steps.map((step, index) => (
                <div key={index} className="mb-24">
                  <div className="flex items-center justify-center">
                    {/* Content */}
                    <div
                      className={`w-1/2  ${
                        index % 2 === 0 ? "sm:pr-16 pr-4 text-right" : "pl-4 sm:pl-16 text-left"
                      } ${index % 2 === 1 ? "order-2" : ""}`}
                    >
                      <div
                        className={`transition-opacity flex flex-col duration-300 ${
                          activeStep === index ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <h3 className="sm:text-24 text-[18px] font-semibold mb-4" onClick={() => setActiveStep(index)}
                        >
                          {step.title}
                        </h3>
                        <div
                          className={`flex flex-col items-start sm:flex-row sm:items-start gap-8 ${
                            index % 2 === 0 ? "sm:flex-row-reverse items-end" : "flex-row"
                          }`}
                        >
                          <div onClick={() => setActiveStep(index)} className="bg-white cursor-pointer rounded-xl sm:p-6 p-4 shadow-lg border border-gray-200 ">
                            <step.icon className="w-6 sm:w-8 h-6 sm:h-8 text-gray-600" />
                          </div>
                          <p className="text-gray-600 sm:text-18 text-[14px] ">
                            {step.description}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Stepper Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                      <button
                        onClick={() => setActiveStep(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 relative
                      ${
                        activeStep >= index
                          ? "bg-red-500 ring-4 ring-red-100 border-4 border-red-300"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                        aria-label={`Go to step ${index + 1}`}
                      />
                    </div>

                    {/* Empty space for the other side */}
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pl-16" : "pr-16"}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWorks;
