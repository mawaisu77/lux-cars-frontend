import React, { useRef, useState } from "react";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import AnchorLink from "react-anchor-link-smooth-scroll";
import bgImage from "../../../assets/BG-Img/IMG.png";
import { FaRocket } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import { Search } from "@mui/icons-material";

const Bid = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [activeTab2, setActiveTab2] = useState("quick");
  const [isCopart, setIsCopart] = useState(true);
  const [isIAAI, setIsIAAI] = useState(true);
  const regularSearchRef = useRef(null);
  const vinSearchRef = useRef(null);
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [yearFrom, setYearFrom] = useState(null);
  const [yearTo, setYearTo] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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
    if (yearFrom) queryParams.append("year_from", yearFrom.value);
    if (yearTo) queryParams.append("year_to", yearTo.value);
    if (isCopart) queryParams.append("site", "1");
    if (isIAAI) queryParams.append("site", "2");

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

  // Filter "To" options based on the selected "From" year
  const filteredYearToOptions = yearFrom
    ? yearOptions.filter((option) => option.value >= yearFrom.value)
    : yearOptions;

    const handleVinSearch = () => {
      // Logic for VIN search
      const vinInput = document.querySelector(
        'input[placeholder="Search by VIN or lot number"]'
      ).value;
  
      if (vinInput) {
        // Navigate to the vehicle detail page with VIN as a parameter
        navigate(`/vehicle-detail/${vinInput}`);
      }
    };


     const heroCategories = [
      {category: "Automobiles",id:'Automobile' },
      {category: "Motor Cycles",id:'Motorcycle' },
      {category: "ATVs",id:'ATV' },
      {category: "Buses",id:'Bus' },
      {category: "Truck",id:'Truck' },
      {category: "Boat",id:'Boat' },
    ];
    

  return (
    <>
      <div class="relative lg:h-full text-white overflow-hidden">
        <div class="absolute inset-0">
          <img
            src={bgImage}
            alt="Background_Image"
            class="object-cover w-full h-full"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div class="relative mt-24 lg:mt-[13vw] z-10 flex flex-col justify-center items-center h-full text-center">
      
          <div className="flex lg:flex-row flex-col lg:text-38 mt-[20px] text-[22px] font-bold font-urbanist lg:gap-x-[0.5vw]">
            {/* <span className="animated-text"> Online Car Auctions </span> */}
            <span className="">Safe Online Car Auctions with Convenient Home Delivery</span>
          </div>
          <h1 class="lg:text-38 text-[22px] font-bold font-urbanist leading-tight mb-[2vh]">
            Bid, Buy, Drive
          </h1>

          <div className="flex  gap-x-2 lg:gap-x-[1.25vw] font-urbanist font-semibold relative z-50 justify-center items-center">
          <div className="flex items-center text-primary-red  border-primary-red bg-white hover:bg-primary-red hover:text-white duration-200 lg:py-[1.2vh] py-1 lg:text-16 text-[12px] lg:px-[1.3vw] px-4 lg:gap-x-[0.5vw] gap-x-1 border  rounded-full">
              <FaHandHoldingUsd />
              <AnchorLink href="#startBidding">
                <button className="bg-transparent  duration-200 font-urbanist flex items-center ">
                  Start Bidding
                </button>
              </AnchorLink>
            </div>
            <div className="flex items-center lg:py-[1.2vh] py-1 lg:text-16 text-[12px] lg:px-[1.3vw] px-4 lg:gap-x-[0.5vw] gap-x-1 border border-white hover:bg-white hover:text-black duration-200 rounded-full">
              <FaRocket />
              <Link to="/upload-local-car">
                <button className="bg-transparent  duration-200 font-urbanist flex items-center ">
                  Sell Your Car
                </button>
              </Link>
            </div>
          </div>

          <div className="mx-auto p-2 lg:p-[1vw] bg-white rounded-lg shadow-lg my-10 w-[800px] max-w-[90%] lg:max-w-[70vw] lg:w-[50vw]">      
         
       <div className="  overflow-x-scroll lg:overflow-hidden pb-2" >
       <div className="rounded-lg grid w-[650px] lg:w-auto grid-cols-6 gap-x-2 font-semibold text-primary-red mt-4 lg:mt-[1vw] ">
         
         {heroCategories.map((item,index)=>(
             <>
               <span onClick={()=>{
                 localStorage.setItem("apiEndpoint", process.env.REACT_APP_API_CARS_LIVE);
                 navigate(`/search-page?vehicle_type=${item.id.toLowerCase().replace(/\s+/g, "_")}`
                 );
               }}
                className=" p-1.5 lg:p-[0.5vw] border rounded-full border-primary-red cursor-pointer text-xs lg:text-16 text-center hover:bg-gray-100 duration-300 hover:shadow-lg">{item.category}</span>
             </>
          ))}
          </div>
       </div>
          

            <div className="my-2 lg:my-[0.8vw]">
              <div className="flex lg:flex-row flex-col gap-2">
                <button
                  className={`px-4 font-bold py-2 lg:py-[.5vw] lg:px-[1vw] text-[12px] lg:text-18 transition-colors duration-300 ${
                    activeTab === "regular"
                      ? "text-primary-red border-b-2 lg:border-b-[0.1vw] border-primary-red rounded-lg shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("regular")}
                >
                  Regular Search
                </button>
                <button
                  className={`px-4 py-2 lg:py-[.5vw] lg:px-[1vw] text-[12px] lg:text-18 font-bold transition-colors duration-300 ${
                    activeTab === "vin"
                      ? "text-primary-red border-b-2 rounded-lg border-primary-red shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("vin")}
                >
                  {`VIN / Lot No. Search`}
                </button>
              </div>
            </div>

            <div
              className="mt-4 lg:mt-[1vw] flex flex-col justify-center items-center space-y-4"
              style={{ minHeight: "120px" }}
            >
              <div className="relative w-full">
                <div
                  ref={regularSearchRef}
                  className={`w-full transition-all duration-300 ease-in-out ${
                    activeTab === "regular"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible absolute top-0 left-0"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {loading && !carData ? (
                      <div className="flex justify-center items-center  py-[1vh]">
                        <ClipLoader size={30} />
                      </div>
                    ) : (
                      <Select
                        styles={{
                          // ...customStyles,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                        }}
                        menuPortalTarget={document.body}
                        value={selectedMake}
                        onChange={handleMakeChange}
                        options={carOptions}
                        isClearable
                        placeholder="Select Makes"
                        className={`${error ? "hidden" : "block"} lg:text-18 text-[12px] w-full`}
                      />
                    )}
                    {loading && selectedMake && !modelOptions.length ? (
                      <div className="flex justify-center items-center py-[1vh]">
                        <ClipLoader size={30} />
                      </div>
                    ) : (
                      <Select
                        styles={{
                          // ...customStyles,
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                        }}
                        menuPortalTarget={document.body}
                        value={selectedModel}
                        onChange={handleModelChange}
                        options={modelOptions}
                        isClearable
                        placeholder="Select Models"
                        isDisabled={!selectedMake}
                        className="lg:text-18 text-[12px] w-full"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-x-[1vw] gap-x-[1vw] mb-4 lg:mb-[1vw]">
                    <div className="flex justify-start items-center gap-x-2">
                      <Select
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                        }}
                        menuPortalTarget={document.body}
                        value={yearFrom}
                        onChange={handleYearFromChange}
                        options={yearOptions}
                        isClearable={false}
                        placeholder="YYYY"
                        className="lg:text-18 text-[12px] w-full"
                        // className={`${error ? "hidden" : "block"} w-[100px]`}
                      />
                      <Select
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // High z-index to ensure visibility
                        }}
                        menuPortalTarget={document.body}
                        value={yearTo}
                        onChange={handleYearToChange}
                        options={filteredYearToOptions}
                        isClearable={false}
                        placeholder="YYYY"
                        className="lg:text-18 text-[12px] w-full"
                        // className={`${error ? "hidden" : "block"} w-[100px]`}
                      />
                    </div>

                    <div className="flex items-center justify-center space-x-6 lg:space-x-[1vw]">
                      <label className="flex items-center space-x-2 lg:text-18 text-[12px] cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className={`toggle  ${
                              isCopart
                                ? "[--tglbg:#0E5DB8] bg-white hover:bg-white"
                                : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                            }`}
                            checked={isCopart}
                            onChange={() => setIsCopart(!isCopart)}
                          />
                        </div>
                        <span className="text-gray-700">Copart</span>
                      </label>
                      <label className="flex items-center space-x-2 lg:text-18 text-[12px] cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className={`toggle  ${
                              isIAAI
                                ? "[--tglbg:#CA0000] bg-white hover:bg-white"
                                : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                            }`}
                            checked={isIAAI}
                            onChange={() => setIsIAAI(!isIAAI)}
                          />
                        </div>
                        <span className="text-gray-700">IAAI</span>
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <button
                        onClick={handleSearch}
                        className="bg-primary-red text-white px-4 py-1 lg:py-[.5vw] lg:px-[1vw] text-[12px] lg:text-18 rounded-full hover:bg-primary-red transition-colors"
                      >
                        Search vehicles
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  ref={vinSearchRef}
                  className={`w-full transition-all duration-300 ease-in-out ${
                    activeTab === "vin"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible absolute top-0 left-0"
                  }`}
                >
                  <div className="relative max-w-lg mx-auto">
                    <input
                      type="text"
                      placeholder="Search by VIN or lot number"
                      className="w-full text-black pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                  <div className="flex justify-center items-center mt-4">
                      <button
                        onClick={handleVinSearch}
                        className="bg-primary-red text-white px-6 py-2 lg:py-[.5vw] lg:px-[1vw] text-[12px] lg:text-18 rounded-full hover:bg-primary-red transition-colors"
                      >
                        Search vehicle
                      </button>
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
