import React, { useRef, useState } from "react";
import img1 from "../../../assets/Home/Ellipse 2.png";
import img2 from "../../../assets/Home/Ellipse 3.png";
import img3 from "../../../assets/Home/Ellipse 4.png";
import img4 from "../../../assets/Icons/Layer 2.png";
import img5 from "../../../assets/Icons/Shape.png";
import img6 from "../../../assets/Icons/Vector (5).png";
import img7 from "../../../assets/Icons/M logo.png";

import { GoSearch } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { ClipLoader } from "react-spinners";
import AnchorLink from "react-anchor-link-smooth-scroll";
import audioFile from "../../../assets/engine.wav"; // Import the audio file
import bgImage from "../../../assets/BG-Img/IMG.png";
import { FaRocket } from "react-icons/fa";
import {
  FaHandHoldingUsd,

} from "react-icons/fa";

const Bid = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [yearFrom, setYearFrom] = useState(null);
  const [yearTo, setYearTo] = useState(null);
  // const currentYear = new Date().getFullYear();
  const navigate = useNavigate(); // Initialize useNavigate
  const audioRef = useRef(new Audio(audioFile));

  const { carData, loading, error } = useCarMakesModels();

  const generateYearOptions = (startYear) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
      years.push({ value: year, label: year });
    }
    return years;
  };
  const yearOptions = generateYearOptions(1980);

  const handleMakeChange = (selectedOption) => {
    setSelectedMake(selectedOption);
    setSelectedModel(null); // Reset model selection when make changes
  };
  const handleModelChange = (selectedOption) => {
    setSelectedModel(selectedOption);
  };
  const handlePartnerChange = (selectedOption) => {
    setSelectedPartner(selectedOption);
  };

  const handleYearFromChange = (selectedOption) => {
    setYearFrom(selectedOption);
    // Reset yearTo if it's now invalid (less than yearFrom)
    if (selectedOption && yearTo && selectedOption.value > yearTo.value) {
      setYearTo(null); // Clear the "To" dropdown if it's invalid
    }
  };

  const handleYearToChange = (selectedOption) => {
    setYearTo(selectedOption);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (selectedMake) queryParams.append("make", selectedMake.value);
    if (selectedModel) queryParams.append("model", selectedModel.value);
    if (selectedPartner) queryParams.append("partner", selectedPartner.value);
    if (yearFrom) queryParams.append("year_from", yearFrom.value);
    if (yearTo) queryParams.append("year_to", yearTo.value);

    localStorage.setItem("apiEndpoint", process.env.REACT_APP_API_CARS_LIVE);
    navigate(`/search-page?${queryParams.toString()}`);
  };

  const carOptions = carData
    ? carData.map((item) => ({
        value: item.make,
        label: item.make,
      }))
    : [];

  // Filter models based on selected make
  const modelOptions = selectedMake
    ? carData
        .find((item) => item.make === selectedMake.value)
        .models.map((model) => ({
          value: model,
          label: model,
        }))
    : [];

  const partnerOptions = [
    { value: 1, label: "Copart" },
    { value: 2, label: "IAAI" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      fontSize: "1.25vw",
      borderRadius: "0.74v",
      "@media (max-width: 768px)": {
        fontSize: "16px",
        borderRadius: "8px",
      },
      backgroundColor: "transparent",
      border: "1px solid transparent",
      boxShadow: "none",
      zIndex: 100,
      cursor: "pointer",
      position: "relative",
      paddingRight: "10px", 
      "::after": {
        content: '""',
        position: "absolute",
        right: 0,
        top: "10%",
        height: "80%", 
        width: "1px", 
        backgroundColor: "#ccc", 
      },
      "&:hover": {
        borderColor: "transparent", 
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0px", // Adjust padding inside the select box
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }),
    placeholder: (base) => ({
      fontSize: "0.9vw",
      ...base,
      "@media (max-width: 768px)": {
        fontSize: "14px",
      },
      color: "#8a8aa0",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#333",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#CA0000" : "transparent",
      color: state.isSelected ? "white" : "#333",
      "&:hover": {
        backgroundColor: "#CA0000",
        color: "white",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0.208vw",
    "@media (max-width: 768px)": {
      padding: "4px",
    },
      svg: {
        width: "0.833vw",
        height: "0.833vw",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "0.208vw",
      "@media (max-width: 768px)": {
        padding: "4px",
      },
      svg: {
        width: "0.833vw",
        height: "0.833vw",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };
  


  // Filter "To" options based on the selected "From" year
  const filteredYearToOptions = yearFrom
    ? yearOptions.filter((option) => option.value >= yearFrom.value)
    : yearOptions;

  return (
    <>
      <div class="relative md:h-screen text-white overflow-hidden">
        <div class="absolute inset-0">
          <img
            src={bgImage}
            alt="Background_Image"
            class="object-cover w-full h-full"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div class="relative mt-24 md::mt-[40px] z-10 flex flex-col justify-center items-center h-full text-center">
          <div className="mx-auto">

          </div>
          <h1 class="md:text-56 text-[32px] font-bold font-urbanist leading-tight mb-[2vh]">
            Bid, Buy, Drive
          </h1>
          <div className="flex md:flex-row flex-col md:text-56 text-[30px] font-bold font-urbanist md:gap-x-[0.5vw]">
            <span className="animated-text"> Online Car Auctions </span>
            <span className=""> With Home Delivery!</span>
          </div>
          <p class="md:text-20 text-[20px] text-gray-300 my-[2.5vh]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmo
          </p>
          <div className="flex gap-x-2 md:gap-x-[1.25vw] font-urbanist font-semibold relative z-50 justify-center items-center">
            <div className="flex items-center md:py-[1.2vh] py-2 md:text-16 text-[16px] md:px-[1.3vw] px-4 md:gap-x-[0.5vw] gap-x-1 border border-white hover:bg-white hover:text-black duration-200 rounded-full">
              <FaRocket />
              <Link to="/upload-car">
              <button className="bg-transparent  duration-200 font-urbanist flex items-center ">
                Sell Your Car
              </button>
              </Link>
            </div>
            <div className="flex items-center text-primary-red  border-primary-red bg-white hover:bg-primary-red hover:text-white duration-200 md:py-[1.2vh] py-2 md:text-16 text-[16px] md:px-[1.3vw] px-4 md:gap-x-[0.5vw] gap-x-1 border  rounded-full">
              <FaHandHoldingUsd />
              <AnchorLink href="#startBidding">
              <button className="bg-transparent  duration-200 font-urbanist flex items-center ">
                Start Bidding
              </button>
              </AnchorLink>

            </div>
            {/* <AnchorLink href="#startBidding">
              <button className="bg-white py-[1.2vh] text-[#ca0000] font-semibold hover:bg-white border border-white duration-200 font-urbanist flex rounded-full items-center text-16 px-[1.3vw] ">
                Start Bidding
              </button>
            </AnchorLink> */}
          </div>

          <div className="md:my-[2.24vw] my-8 relative w-[80%] md:w-[70vw] text-black">
            <div className="w-[100%] grid md:grid-cols-6 md:mt-[3.5vh] md:px-[1.2vw] md:py-[2vh] py-4 px-4 items-center right-0 bg-[#ffffff] md:rounded-[1.25vw] rounded-[10px] ">
              <div className="flex flex-col justify-center px-[1vw] text-left">
                <p
                  className={`text-left md:text-18 text-[14px] font-urbanist font-semibold ${
                    error ? "hidden" : "block"
                  }`}
                >
                  Makes
                </p>
                {loading && !carData ? (
                  <div className="flex justify-center items-center  py-[1vh]">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                  }}
                  menuPortalTarget={document.body}
                    value={selectedMake}
                    onChange={handleMakeChange}
                    options={carOptions}
                    isClearable
                    placeholder="Select Makes"
                    className={`${error ? "hidden" : "block"} `}
                  />
                )}
                {error && (
                  <div className="py-[1vh] text-center text-red-500">
                    {error}
                  </div>
                )}
              </div>

              {/* Dropdown for Models (Car Models) */}
              <div className="flex flex-col justify-center   px-[1vw]   text-left">
                <p className="text-left md:text-18 text-[14px] font-urbanist font-semibold">
                  Models
                </p>
                {loading && selectedMake && !modelOptions.length ? (
                  <div className="flex justify-center items-center py-[1vh]">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                  }}
                  menuPortalTarget={document.body}
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={modelOptions}
                    isClearable
                    placeholder="Select Models"
                    isDisabled={!selectedMake}
                    className=""
                  />
                )}
                {selectedMake && !modelOptions.length && (
                  <div className="py-[1vh] text-center text-red-500">
                    No models available for this make.
                  </div>
                )}
              </div>

              {/* Dropdown for Partners */}
              <div className="flex flex-col justify-center  px-[0.5vw] text-left">
                <p className="text-left md:text-18 text-[14px] font-urbanist font-semibold">
                  Partners
                </p>
                <ReactSelect
                  styles={{
                    ...customStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                  }}
                  menuPortalTarget={document.body}
                  value={selectedPartner}
                  onChange={handlePartnerChange}
                  options={partnerOptions}
                  isClearable
                  placeholder="ChoosePartners"
                  className=""
                />
              </div>

              {/* Dropdown for Year From */}
              <div className="flex flex-col justify-center px-[0.5vw] text-left">
                <p className="text-left md:text-18 text-[14px]font-urbanist font-semibold">
                  From Year
                </p>
                <ReactSelect
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                  }}
                  menuPortalTarget={document.body}
                  value={yearFrom}
                  onChange={handleYearFromChange}
                  options={yearOptions}
                  isClearable={false}
                  placeholder="YYYY"
                  className=""
                  // className={`${error ? "hidden" : "block"} w-[100px]`}
                />
              </div>

              {/* Dropdown for Year To */}
              <div className="flex flex-col justify-center px-[0.5vw] h-full text-left">
                <p className="text-left md:text-18 text-[14px] font-urbanist font-semibold">
                  To Year
                </p>
                <ReactSelect
                  styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                  }}
                  menuPortalTarget={document.body}
                  value={yearTo}
                  onChange={handleYearToChange}
                  options={filteredYearToOptions}
                  isClearable={false}
                  placeholder="YYYY"
                  className=""
                  // className={`${error ? "hidden" : "block"} w-[100px]`}
                />
              </div>

              <div className="flex flex-col px-2">
                <p className="text-left md:text-18 text-[14px] font-urbanist font-semibold">
                  Find
                </p>
                <div
                  onClick={handleSearch}
                  className=" text-white md:gap-x-[0.25vw] gap-x-2  md:text-16 cursor-pointer group flex px-[0.25vw]  py-[1vh] justify-center items-center bg-[#ca0000] rounded-[0.5vw]"
                >
                  <p className=" sm:text-16 text-[14px] font-urbanist font-semibold">Search</p>

                  <GoSearch
                    className="cursor-pointer text-white duration-150 md:text-16 text-[14px] group-hover:scale-125"
                  />
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
