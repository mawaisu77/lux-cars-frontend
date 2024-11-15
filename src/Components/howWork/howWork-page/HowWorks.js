import React from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header/Header";
import icon1 from "../../../assets/Icon (2).svg";
import icon2 from "../../../assets/Icon (3).svg";
import icon3 from "../../../assets/Icon (4).svg";
import icon4 from "../../../assets/Icon (5).svg";
import icon5 from "../../../assets/Order_history.svg";
import { PiHandTapLight } from "react-icons/pi";
import { PiSteeringWheelLight } from "react-icons/pi";
import { CiTimer } from "react-icons/ci";
import { PiPoliceCarLight } from "react-icons/pi";
import { PiHandDepositLight } from "react-icons/pi";

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
      title: "Registration",
      description:
        "Users must register to start bidding. The registration process is straightforward and requires providing official identification documents for verification.",
      icon: FaMousePointer,
    },
    {
      title: "Bid Power",
      description:
        "Upon registration, users can set their bid power, determining the maximum amount they can bid on any lot. Bid power is secured with a refundable deposit, payable via various methods.",
      icon: FaHandHoldingUsd,
    },
    {
      title: "Vehicle Search",
      description:
        "Users can utilize advanced filters and online search functionality to find specific lots. Detailed lot information is provided to assist in making informed choices.",
      icon: FaCar,
    },
    {
      title: "Bidding and Buying",
      description:
        "Place bids on desired vehicles and track your activity in real-time. Successful bidders will be guided through the purchase and delivery process.",
      icon: FaGavel,
    },
  ];
  return (
    <>
      {/* <Header className="" />*/}
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
            Step-by-Step Guide for Users
          </p>
          <p className="text-[16px] lg:text-16 text-[#7a798a] ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
            obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
            asperiores sit.
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
