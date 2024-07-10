import React, { useEffect, useState } from "react";
import Header from "../../header/index";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CurrencyInput from "react-currency-input-field";

function LoanApplication() {
  const SeclectContainer = {
    padding: -"20px",
    margin: "0px",
    background: "red",
  };
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const currencies = [
    { code: "USD", name: "United States Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    // Add more currencies as needed
  ];

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    setSelectedOption(selectedOption);
  }, [selectedOption]);

  return (
    <>
      <div className="Backgroundimage-LogIN">
        <Header className="text-white" />
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Loan Application
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">LogIn</button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-[90vw] md:w-[55vw] lg:w-[42.708vw] mx-auto  rounded-[2.083vw] my-[4.167vh] boxShadow shadow">
        <div className=" px-[14px] py-[12px] md:px-[3vw] md:py-[1.4vh] lg:px-[3.8vw] py-[4.167vh]  text-left ">
          <div className=" ">
            <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  ">
              Personal Information
            </h1>
            <div className="">
              <form className=" ">
                <div>
                  <h1 className="text-[1.042vw]  font-semibold text-[#1F1F2C] mb-[1.042vh]  ">
                    Title
                  </h1>

                  <div className=" mb-[3.12vh] bg-[#F8F8F8] h-[4.68vh] md:w-[8vw] lg:w-[5.12vw] flex items-center  rounded-[0.313vw]">
                    <select className="text-[15px] md:text-[1vw] lg:text-[1.09vw] text-[#1F1F2C]  mx-[5px] outline-none font-[400] bg-transparent my-[10px] ">
                      <option>Mr</option>
                      <option>Mr.s</option>
                    </select>
                  </div>
                  <div className=" md:flex lg:flex  md:gap-x-[1.042vw] flex-col md:flex-row  items-end mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Name*
                      </p>
                      <input className=" border border-[#EBEBEB] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      <label className="text-[#667085] font-[400] text-[0.729vw]">
                        First Name
                      </label>
                    </div>
                    <div className="flex-1 flex flex-col ">
                      <input className=" border border-[#EBEBEB]  md:h-[4.68vh] md:w-[23.5vw]  lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      <label className="text-[#667085] font-[400] text-[0.729vw]">
                        Last Name
                      </label>
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Email*
                      </p>
                      <input className=" border border-[#EBEBEB]  md:h-[4.68vh] w-[100vw]  md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col w-[100%]  md:w-[50%]  pb-[5px]">
                      <p className="text-[15px] md:text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Home Phone Number
                      </p>

                      <div className="bg-red-400 rounded-[12px] w-[100%]  md:w-[23.5vw] lg:w-[17vw]">
                        <PhoneInput
                          // className="phone-input-wrapper  phone-input-container"
                          country={"us"}
                          buttonStyle={{
                            background: "white",
                            borderRight: "0px",
                          }}
                          containerClass="  mx-auto border-none  outline-none  p-0 m-0 "
                          // containerStyle={{height:"20px"}}
                          inputStyle={{ width: "100%", height: "4.68vh" }}
                          inputClass="bg-blue-400 text-black p-0 m-0   border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[14px] md:text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Address*
                      </p>
                      <input className=" border border-[#EBEBEB]  md:h-[4.68vh] w-[100%]  md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col w-[100%] md:w-[50%]  pb-[5px]">
                      <p className="text-[15px] md:text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Cell Phone Number
                      </p>

                      <div className="bg-red-400 rounded-[12px] w-[100%]  md:w-[23.5vw] lg:w-[17vw]">
                        <PhoneInput
                          // className="phone-input-wrapper  phone-input-container"
                          country={"us"}
                          buttonStyle={{
                            background: "white",
                            borderRight: "0px",
                          }}
                          containerClass="  mx-auto border-none  outline-none  p-0 m-0 "
                          // containerStyle={{height:"20px"}}
                          inputStyle={{ width: "100%", height: "4.68vh" }}
                          inputClass="bg-blue-400 text-black p-0 m-0   border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Years At Address*
                      </p>
                      <input className=" border border-[#EBEBEB]  md:h-[4.68vh] w-[100vw]  md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Months At Address1*
                      </p>

                      <div className=" text-[.5vw] flex h-[4.68vh] md:w-[24vw] lg:w-[17vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          prefix={selectedCurrency}
                          className=" w-[75%] text-[1vw] border-none outline-none"
                        />

                        <select
                          containerClass={SeclectContainer}
                          buttonClass={{ background: "white" }}
                          searchStyle={{ background: "white" }}
                          className="w-[25%] text-[1vw]  border-none outline-none"
                          id="currency-select"
                          value={selectedCurrency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a currency
                          </option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.symbol}>
                              {currency.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row  mb-[1.25vh]">
                    <div className="flex-1  flex flex-col mb-[1.56vh] ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                        Residence Type
                      </p>
                      <div className="flex items-center mb-[3.12vh]">
                        {" "}
                        <input
                          type="radio"
                          value="option1"
                          name="residenceType"
                          className="w-[0.7vw] h-[1.5vh]"
                        />
                        <label className="ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist ">
                          Own
                        </label>
                      </div>
                      <div className="flex  items-center mb-[3.12vh]">
                        <input
                          type="radio"
                          value="option1"
                          name="residenceType"
                          className="w-[0.7vw] h-[1.5vh]"
                        />
                        <label className="ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist ">
                          Rent
                        </label>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Months At Address*
                      </p>

                      <div className=" text-[.5vw] flex h-[4.68vh] md:w-[24vw] lg:w-[17vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          prefix={selectedCurrency}
                          className=" w-[75%] text-[1vw] border-none outline-none"
                        />

                        <select
                          containerClass={SeclectContainer}
                          buttonClass={{ background: "white" }}
                          searchStyle={{ background: "white" }}
                          className="w-[25%] text-[1vw]  border-none outline-none"
                          id="currency-select"
                          value={selectedCurrency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a currency
                          </option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.symbol}>
                              {currency.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                    <div className="flex-1/2   flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                        Vehicle Information
                      </p>
                      <div className="flex flex-end mb-[1.56vh]">
                        {" "}
                        <input
                          type="radio"
                          value="option1"
                          name="verhicleInfo"
                          className="w-[0.7vw] h-[1.5vh]"
                        />
                        <label className="ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist ">
                          New
                        </label>
                      </div>
                      <div className="flex mb-[1.56vh]">
                        <input
                          type="radio"
                          value="option1"
                          name="verhicleInfo"
                          className="w-[0.7vw] h-[1.5vh]"
                        />
                        <label className="ml-[2px] text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist ">
                          Pre-owned
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  ">
                      Employment Information
                    </h1>

                    <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                      <div className="flex-1  flex flex-col w-[100%] md:w-[40%]">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Employer Name*
                        </p>
                        <input className=" border border-[#EBEBEB]  md:h-[4.68vh] w-[100vw]  md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      </div>
                      <div className="flex-1 flex flex-col mb-[1.25vh]">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          {" "}
                          Estimated Financing Amount Needed
                        </p>

                        <div className=" md:w-[24vw] lg:w-[16.8vw] text-[.5vw] flex h-[4.68vh] border rounded-[8px] p-1">
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[70%]  text-[1vw] border-none outline-none"
                          />
                          <select
                            className="w-[25%] text-[1vw] border-none outline-none"
                            id="currency-select"
                            value={selectedCurrency}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select a currency
                            </option>
                            {currencies.map((currency) => (
                              <option
                                key={currency.code}
                                value={currency.symbol}
                              >
                                {currency.code}
                              </option>
                            ))}

                            {console.log(selectedCurrency)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className=" md:flex lg:flex  md:gap-x-[1.042vw] flex-col md:flex-row  items-end mb-[3.12vh]">
                      <div className="flex-1  flex flex-col ">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          {" "}
                          Occupation*
                        </p>
                        <input className=" border border-[#EBEBEB] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      </div>
                      <div className="flex-1 flex flex-col ">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Years At Employer*
                        </p>
                        <input className=" border border-[#EBEBEB]  md:h-[4.68vh] md:w-[23.5vw]  lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col mb-[1.25vh]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Estimated Financing Amount Needed
                      </p>

                      <div className=" md:w-[24vw] lg:w-[16.8vw] text-[.5vw] flex h-[4.68vh] border rounded-[8px] p-1">
                        <CurrencyInput
                          prefix={selectedCurrency}
                          className=" w-[70%]  text-[1vw] border-none outline-none"
                        />
                        <select
                          className="w-[25%] text-[1vw] border-none outline-none"
                          id="currency-select"
                          value={selectedCurrency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a currency
                          </option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.symbol}>
                              {currency.code}
                            </option>
                          ))}

                          {console.log(selectedCurrency)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className=" ">
                    <h1 className="text-[1.354vw] font-semibold text-[#1F1F2C] mb-[1.875vh]  ">
                      Financial Information
                    </h1>

                    <div className="w-[16.8vw] xl:flex gap-x-[1.042vw] flex-col xl:flex-col items-start mb-[1.25vh]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Name Of Bank*{" "}
                      </p>
                      <div className="  mb-[1.25vh] bg-[#F8F8F8] h-[4.68vh] w-[16.8vw]   flex items-center rounded-[0.313vw]">
                        <select className=" text-[15px] text-[#1F1F2C] w-[16.8vw]   outline-none font-[400] bg-transparent my-[10px] w-[100%] ">
                          <option>Mr</option>
                          <option>Mr.s</option>
                        </select>
                      </div>
                    </div>

                    <div className="w-[16.8vw] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[3.12vh]">
                      <div className="w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[3.12vh]">
                        <div className="  mb-[1.25vh]   w-[100%] flex items-center  rounded-[0.313vw]">
                          <div className="flex gap-x-[8px]">
                            <div>
                              <label class="switch">
                                <input type="checkbox" />
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div>
                              <p className="text-[1.02vw]  font-[600] text-[#1F1F2C] font-urbanist">
                                Checking Account
                              </p>
                              <p className="text-[1.02vw]  font-[400] text-[#8A8AA0] font-urbanist">
                                No
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start pb-[3.12vh]">
                      <div className="w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[5px]">
                        <div className="  mb-[1.25vh]   w-[100%] flex items-center  rounded-[0.313vw]">
                          <div className="flex items-start gap-x-[8px]">
                            <div>
                              <label class="switch">
                                <input type="checkbox" checked />
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div>
                              <p className="text-[1.02vw]  font-[600] text-[#1F1F2C] font-urbanist">
                                Savings Account
                              </p>
                              <p className="text-[1.02vw]  font-[400] text-[#8A8AA0] font-urbanist">
                                Yes
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col mb-[1.25vh]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Estimated Financing Amount Needed
                      </p>

                      <div className=" md:w-[24vw] lg:w-[16.8vw] text-[.5vw] flex h-[4.68vh] border rounded-[8px] p-1">
                        <CurrencyInput
                          prefix={selectedCurrency}
                          className=" w-[70%]  text-[1vw] border-none outline-none"
                        />
                        <select
                          className="w-[25%] text-[1vw] border-none outline-none"
                          id="currency-select"
                          value={selectedCurrency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a currency
                          </option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.symbol}>
                              {currency.code}
                            </option>
                          ))}

                          {console.log(selectedCurrency)}
                        </select>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col mb-[1.25vh]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Down Payment Amount
                      </p>

                      <div className=" text-[.5vw] flex h-[4.68vh] md:w-[24vw] lg:w-[16.8vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          prefix={selectedCurrency}
                          className=" w-[75%] text-[1vw] border-none outline-none"
                        />

                        <select
                          className="w-[25%] text-[1vw] border-none outline-none"
                          id="currency-select"
                          value={selectedCurrency}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select a currency
                          </option>
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.symbol}>
                              {currency.code}
                            </option>
                          ))}

                          {console.log(selectedCurrency)}
                        </select>
                      </div>
                    </div>

                    <div className="w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="w-[80%] flex-1/2 flex flex-col overflow-hidden  pb-[5px]">
                        <div className="  mb-[1.25vh]   w-[100%] flex items-center  rounded-[0.313vw]">
                          <div className="flex gap-x-[8px]">
                            <div>
                              <label class="switch">
                                <input type="checkbox" />
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div>
                              <p className="text-[1.02vw]  font-[600] text-[#1F1F2C] font-urbanist">
                                Checking Account
                              </p>
                              <p className="text-[1.02vw]  font-[400] text-[#8A8AA0] font-urbanist">
                                No
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="w-[80%] flex-1/2 flex flex-col pb-[5px]">
                        <div className="  mb-[1.25vh]   w-[100%] flex items-center  rounded-[0.313vw]">
                          <div className="flex gap-x-[8px]">
                            <div>
                              <label class="switch">
                                <input type="checkbox" checked />
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div>
                              <p className="text-[1.02vw]  font-[600] text-[#1F1F2C]">
                                Savings Account
                              </p>
                              <p>Yes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                      <div className="flex-1/2   flex flex-col ">
                        <p className="text-[1.46vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                          Which bank do you want to contact you? (please check
                          all that apply)
                        </p>
                        <div className="flex  mb-[1.56vh] items-center">
                          {" "}
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            Scotland
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            RBC Royal Bank
                          </label>
                        </div>
                        <div className="flex  mb-[1.56vh] items-center">
                          {" "}
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            Commonwealth Bank
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            CIBC First Carribean Bank
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                      <div className="flex-1/2   flex flex-col ">
                        <p className="text-[1.46vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                          Best time to contact?
                        </p>
                        <div className="flex  mb-[1.56vh] items-center">
                          {" "}
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            Morning
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist ">
                            Afternoon
                          </label>
                        </div>
                        <div className="flex  mb-[1.56vh] items-center">
                          {" "}
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className="w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            Evening
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            value="option1"
                            name="verhicleInfo"
                            className=" w-[0.7vw] h-[1.5vh]"
                          />
                          <label className="ml-[2px] text-[1.02vw]  font-[400] text-[#1F1F2C] font-urbanist ">
                            Anytime
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="h-[6.24vh] w-[83vw] w-auto font-[700] w-auto md:w-[49vw] lg:w-[33.6vw] text-[#CA0000] rounded-[56px] md:rounded-[4.09vw] bg-[#F3F3F6]">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoanApplication;
