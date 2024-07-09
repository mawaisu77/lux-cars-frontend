import React, { useEffect, useState } from "react";
import Header from "../../header/index";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CurrencyInput from "react-currency-input-field";
import { RxPadding } from "react-icons/rx";
import { MdPadding } from "react-icons/md";

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

  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const getPrefix = () => {
    switch (currency) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      default:
        return "";
    }
  };
  let [changeState, changeStateFunction] = useState("");

  let options = [
    { id: 1, name: "$", code: "USD" },
    { id: 2, name: "I", code: "UK" },
    { id: 3, name: "R", code: "PK" },
  ];
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    // console.log("Helllo", e.target.value);
    // const selectedId = parseInt(e.target.value); // Convert value to integer
    // const selectedObject = options.find((option) => option.id === selectedId);
    setSelectedOption(e.target.value || {});
    // console.log(selectedOption);
  };

  useEffect(() => {
    setSelectedOption(selectedOption);
    // console.log("hanzla", selectedOption);
  }, [selectedOption]);

  return (
    <>
      <div className="Backgroundimage-LogIN ">
        <Header textColor="text-white" />
        {/* Pass textColor as a prop */}
        <div className="w-[15.5] flex flex-col mt-[5.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Loan Application
          </div>
          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              {" "}
              {/* Assuming '/' is your home route */}
              <button className="hover:text-white">Home</button>
            </Link>
            /<button className="hover:text-white">Loan</button>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-[42.708vw] mx-auto  rounded-[2.083vw] my-[4.167vh] boxShadow shadow">
        <div className="px-[4.167vw] py-[4.167vh]  text-left ">
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

                  <div className=" mb-[3.12vh] bg-[#F8F8F8] h-[4.68vh]  w-[5.12vw] flex items-center  rounded-[0.313vw]">
                    <select className="text-[15px] md:text-[1.09vw] text-[#1F1F2C]  mx-[15px] outline-none font-[400] bg-transparent my-[10px] ">
                      <option>Mr</option>
                      <option>Mr.s</option>
                    </select>
                  </div>
                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Name*
                      </p>
                      <input className=" border border-[#EBEBEB] h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      <label className="text-[#667085] font-[400] text-[0.729vw]">
                        First Name
                      </label>
                    </div>
                    <div className="flex-1 flex flex-col ">
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      <label className="text-[#667085] font-[400] text-[0.729vw]">
                        Last Name
                      </label>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Email*
                      </p>
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col   pb-[5px]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Work Phone Number
                      </p>
                      {/* <PhoneInput
                        inputStyle={{
                          width: "16vw",
                          height: "4.68vh",
                          borderRadius: "8px",
                        }}
                        isValid={(value, country) => {
                          if (value.match(/12345/)) {
                            return (
                              "Invalid value: " + value + ", " + country.name
                            );
                          } else if (value.match(/1234/)) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                      /> */}

                      <div className="phone-input-wrapper  ">
                        <PhoneInput
                          className=""
                          country={"us"}
                          // value={phone}
                          // onChange={phone => setPhone(phone)}
                          inputStyle={{
                            width: "17vw",
                            height: "4.68vh",
                            borderRadius: "8px",
                          }}
                          containerClass="phone-input-container"
                          inputClass="phone-input"
                          buttonClass="phone-input-button"
                          dropdownClass="phone-input-dropdown"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Address*
                      </p>
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col   pb-[5px]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Work Phone Number
                      </p>
                      {/* <PhoneInput
                        inputStyle={{
                          width: "16vw",
                          height: "4.68vh",
                          borderRadius: "8px",
                        }}
                        isValid={(value, country) => {
                          if (value.match(/12345/)) {
                            return (
                              "Invalid value: " + value + ", " + country.name
                            );
                          } else if (value.match(/1234/)) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                      /> */}

                      <div className="phone-input-wrapper  ">
                        <PhoneInput
                          className=""
                          country={"us"}
                          // value={phone}
                          // onChange={phone => setPhone(phone)}
                          inputStyle={{
                            width: "17vw",
                            height: "4.68vh",
                            borderRadius: "8px",
                          }}
                          containerClass="phone-input-container"
                          inputClass="phone-input"
                          buttonClass="phone-input-button"
                          dropdownClass="phone-input-dropdown"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        City*
                      </p>
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col   pb-[5px]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Work Phone Number
                      </p>
                      {/* <PhoneInput
                        inputStyle={{
                          width: "16vw",
                          height: "4.68vh",
                          borderRadius: "8px",
                        }}
                        isValid={(value, country) => {
                          if (value.match(/12345/)) {
                            return (
                              "Invalid value: " + value + ", " + country.name
                            );
                          } else if (value.match(/1234/)) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                      /> */}

                      <div className="phone-input-wrapper  ">
                        <PhoneInput
                          className=""
                          country={"us"}
                          // value={phone}
                          // onChange={phone => setPhone(phone)}
                          inputStyle={{
                            width: "17vw",
                            height: "4.68vh",
                            borderRadius: "8px",
                          }}
                          containerClass="phone-input-container"
                          inputClass="phone-input"
                          buttonClass="phone-input-button"
                          dropdownClass="phone-input-dropdown"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[3.12vh]">
                    <div className="flex-1  flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Years At Address*
                      </p>
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                    </div>
                    <div className="flex-1 flex flex-col ">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Months At Address*
                      </p>
                      <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw]   py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
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
                      <div className="flex items-center mb-[3.12vh]">
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

                      <div className=" text-[.5vw] flex h-[4.68vh] w-[16.8vw] border rounded-[8px] p-1">
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}

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
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}
                      </div>

                      {/* <div className="phone-input-wrapper">
      <PhoneInput
        country={'us'}
        // value={phone}
        // onChange={phone => setPhone(phone)}
        containerClass="phone-input-container"
        inputClass="phone-input"
        buttonClass="phone-input-button"
        dropdownClass="phone-input-dropdown"
      />
    </div> */}
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
                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="flex-1  flex flex-col ">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Employer Name*
                        </p>
                        <input className=" border border-[#EBEBEB] h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      </div>
                      <div className="flex-1 flex flex-col   pb-[5px]">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Work Phone Number
                        </p>
                        {/* <PhoneInput
                        inputStyle={{
                          width: "16vw",
                          height: "4.68vh",
                          borderRadius: "8px",
                        }}
                        isValid={(value, country) => {
                          if (value.match(/12345/)) {
                            return (
                              "Invalid value: " + value + ", " + country.name
                            );
                          } else if (value.match(/1234/)) {
                            return false;
                          } else {
                            return true;
                          }
                        }}
                      /> */}

                        <div className="phone-input-wrapper  ">
                          <PhoneInput
                            className=""
                            country={"us"}
                            // value={phone}
                            // onChange={phone => setPhone(phone)}
                            inputStyle={{
                              width: "17vw",
                              height: "4.68vh",
                              borderRadius: "8px",
                            }}
                            containerClass="phone-input-container"
                            inputClass="phone-input"
                            buttonClass="phone-input-button"
                            dropdownClass="phone-input-dropdown"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                      <div className="flex-1  flex flex-col ">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          {" "}
                          Occupation*
                        </p>
                        <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                      </div>
                      <div className="flex-1 flex flex-col ">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          {" "}
                          Years At Employer*
                        </p>
                        <input className=" border border-[#EBEBEB]  h-[4.68vh] w-[16.8vw] py-[10] px-[12px] rounded-[8px]  outline-none mb-[6px]" />
                        {/* <label className='text-[#667085] font-[400] text-[0.729vw]'>Years At Employer*</label> */}
                      </div>
                    </div>

                    <div className="xl:flex relative gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="flex-1 flex flex-col   pb-[5px]">
                        <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Work Phone Number
                        </p>

                        <div className="phone-input-wrapper  ">
                          <PhoneInput
                            className=""
                            country={"us"}
                            // value={phone}
                            // onChange={phone => setPhone(phone)}
                            inputStyle={{
                              width: "17vw",
                              height: "4.68vh",
                              borderRadius: "8px",
                            }}
                            containerClass="phone-input-container"
                            inputClass="phone-input"
                            buttonClass="phone-input-button"
                            dropdownClass="phone-input-dropdown"
                          />
                        </div>
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

                      <div className=" text-[.5vw] flex h-[4.68vh] w-[16.8vw] border rounded-[8px] p-1">
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}

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
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col mb-[1.25vh]">
                      <p className="text-[0.729vw]  font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        {" "}
                        Down Payment Amount
                      </p>

                      <div className=" text-[.5vw] flex h-[4.68vh] w-[16.8vw] border rounded-[8px] p-1">
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}

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
                        {/* {selectedCurrency && (
                          <CurrencyInput
                            prefix={selectedCurrency}
                            className=" w-[75%] text-[1vw] border-none outline-none"
                          />
                        )} */}
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
                      <button className="h-[6.24vh] w-[33.6vw] text-[#CA0000] rounded-[56px] md:rounded-[4.09vw] bg-[#F3F3F6]">
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

      {/* <div className='w-[73.281vw] h-[10vh] border mx-auto bg-red-200'></div> */}
      <div>
        {/* <h2>Select Object Example</h2> */}
        {/* <select onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options && options.map(option => (
           <> <option className='mb-[9rem]' key={option.id} value={option.name}>
           {option.name}
         </option></>
        ))}
      </select> */}

        {/* <div className='relative bg-red-400'>
    <select onChange={handleSelectChange}> */}
        {/* <option value="">Select an option</option> */}
        {/* {options && options.map(option => (
           <> <input type='text' placeholder='Enter your text' className='absolute top-0 left-0 z-1 border w-[700px] bg-pink-400'/>
           <option className='mb-[9rem] absolute z-10' key={option.id} value={option.name}>
           <div>{option.code}</div>
         </option>
         </>
        ))}
      </select>   
    </div> */}
      </div>

      {/* <div className='relative bg-red-400'>
  <div className='absolute top-10 left-0 z-10'>
    <input type='text' placeholder={changeState} value={changeState} className=' w-64 border bg-pink-400' />
  </div>
  <div className='absolute top-0 left-64 z-0'>
    <select onChange={handleSelectChange} className='border w-64 bg-pink-400'>
      {options && options.map(option => (
        <option key={option.id} value={option.name}>
          {option.code}
          {changeState=option.code}
        </option>
      ))}
    </select>
  </div>
</div> */}

      {/* <label htmlFor="currency-select">Choose a currency:</label>
                <select id="currency-select" value={currency} onChange={handleCurrencyChange}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                </select>
                <CurrencyInput
                          prefix={getPrefix()}
                          className="border"
                        /> */}
      {/* <CurrencyInput
                id="currency-input"
                name="currency-input"
                placeholder="Enter amount"
                prefix={getPrefix()}
                decimalsLimit={2}
                onValueChange={(value, name) => console.log(value, name)}
            /> */}

      {/* <div>
      <label htmlFor="currency-select">Choose a currency:</label>
      <select id="currency-select" value={selectedCurrency} onChange={handleChange}>
        <option value="" disabled>Select a currency</option>
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.symbol}>
            {currency.symbol} - {currency.name}
          </option>
        ))}

        {console.log(selectedCurrency)}
      </select>
      {selectedCurrency && (
        <div>
          Selected Currency: {selectedCurrency}

          <CurrencyInput
                          prefix={selectedCurrency}
                          className="border"
                        />
        </div>
      )}
    </div> */}
    </>
  );
}

export default LoanApplication;
