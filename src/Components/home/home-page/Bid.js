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
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { ClipLoader } from "react-spinners";
import AnchorLink from "react-anchor-link-smooth-scroll";
import audioFile from "../../../assets/engine.wav"; // Import the audio file

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
      fontSize: "0.9vw",
      borderRadius: "0.74vh",
      backgroundColor: "transparent",
      border: "1px solid #ccc",
      boxShadow: "none",
      

    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }),
    placeholder: (base) => ({
      fontSize: '0.9vw',
      ...base,
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
        backgroundColor: "#f5f5f5",
      },
    }),
  };
  const customMobStyles = {
    control: (base) => ({
      ...base,
      fontSize: "13px",
      borderRadius: "0.74vh",
      backgroundColor: "transparent",
      border: "1px solid #ccc",
      boxShadow: "none",
      

    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }),
    placeholder: (base) => ({
      fontSize: '12px',
      ...base,
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
        backgroundColor: "#f5f5f5",
      },
    }),
  };


  const playAudio = () => {
    audioRef.current.play();
  };

  // Filter "To" options based on the selected "From" year
const filteredYearToOptions = yearFrom
? yearOptions.filter((option) => option.value >= yearFrom.value)
: yearOptions;

  return (
    <>
      <div className="hidden md:block text-black pt-20">
        <div className="flex w-[74vw]  flex-row justify-between mx-auto bgImage tree">
          <div className="mx-auto w-[30vw]   mt-[7vh]">
            <h2 className="text-left font-urbanist md:text-[3.125vw] font-bold leading-tight my-[2vh]">
              <span className="animated-text">Bid, Buy, Drive</span> Online Car
              Auctions with Home Delivery!
            </h2>
            <div className="w-[19vw] text-[#8a8aa0] font-urbanist md:text-[1.041vw] font-medium lg:leading-[2.8vh] text-left mt-[0.3vh]">
              Lorem ipsum dolor sit amet. Ea similique aliquam ut maxime
              necessitatibus est nemo error sed vero sapiente cum quae
              temporibus sed quaerat
            </div>
            <AnchorLink href="#startBidding">
              <button onClick={playAudio}  className="bg-[#ca0000] hover:text-[#ca0000] hover:bg-white border border-[#ca0000] duration-200 font-urbanist flex text-white rounded-full items-center text-[1vw] px-[1.3vw]  my-[2vh]">
                Start Bidding
              </button>
            </AnchorLink>
            <div className="text-left w-[87px] flex justify-between gap-[1vw] mt-[5vh]">
              <img className="h-[2vh] w-[1vw]"   src={img4} alt="icon1" />
              <img  className="h-[2vh] w-[1vw]" src={img5} alt="icon2" />
              <img className="h-[2vh] w-[1vw]" src={img6} alt="icon3" />
              <img className="h-[2vh] w-[1vw]" src={img7} alt="icon4" />
            </div>
          </div>

          <div className="relative w-[90%]   text-black">
            <div className="absolute bg-white opacity-80 rounded-xl shadow-xl w-[9.2vw]  right-[10%] top-[10%]  ">
              <div className="flex flex-col p-2  items-center ">
                <p className="font-bold text-[26px] md:text-[32px] lg:text-[3vw]">
                  50+
                </p>
                <p className="text-[1vw] font-urbanist px-4">
                  Catergries Available
                </p>
              </div>
            </div>
            <div className="  flex flex-row justify-between text-left px-[1vw] py-1 items-center top-[75%]    bg-[#ffffffcc] rounded-xl absolute">
              {/* Dropdown for Makes (Car Makes) */}
              <div className="flex flex-col justify-center items-center border-r     text-left">
                <p
                  className={`text-[1.17vw] font-urbanist font-semibold ${
                    error ? "hidden" : "block"
                  }`}
                >
                  Makes
                </p>
                {loading && !carData ? (
                  <div className="flex justify-center items-center  py-4">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                    styles={customStyles}
                    value={selectedMake}
                    onChange={handleMakeChange} 
                    options={carOptions}
                    isClearable
                    placeholder="Select Make"
                    className={`${error ? "hidden" : "block"}`}
                  />
                )}
                {error && (
                  <div className="py-4 text-center text-red-500">{error}</div>
                )}
              </div>

              {/* Dropdown for Models (Car Models) */}
              <div className="flex flex-col justify-center items-center px-2 border-r w-[12vw] text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold">
                  Models
                </p>
                {loading && selectedMake && !modelOptions.length ? (
                  <div className="flex justify-center items-center py-4">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                    styles={customStyles}
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={modelOptions}
                    isClearable
                    placeholder="Select Model"
                    isDisabled={!selectedMake}
                  />
                )}
                {selectedMake && !modelOptions.length && (
                  <div className="py-4 text-center text-red-500">
                    No models available for this make.
                  </div>
                )}
              </div>

              {/* Dropdown for Partners */}
              <div className="flex flex-col justify-center items-center px-2 w-[12vw] border-r text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold">
                  Partners
                </p>
                <ReactSelect
                  styles={customStyles}
                  value={selectedPartner}
                  onChange={handlePartnerChange}
                  options={partnerOptions}
                  isClearable
                  placeholder="Select Partner"
                />
              </div>

              <div className="flex gap-x-2 justify-between items-center  w-[12vw] text-left">
               {/* Dropdown for Year From */}
                <div className="flex flex-col justify-center items-center border-r w-[12vw] text-left">
                  <p className="text-[1.17vw] font-urbanist font-semibold">
                   From
                  </p>
                  <ReactSelect
                  
                    styles={customStyles}
                    value={yearFrom}
                    onChange={handleYearFromChange}
                    options={yearOptions}
                    isClearable={false}
                    placeholder="YYYY"
                    className={`${error ? "hidden" : "block"}`}
                  />
                </div>

                {/* Dropdown for Year To */}
                <div className="flex flex-col justify-center items-center border-r w-[12vw] text-left">
                  <p className="text-[1.17vw] font-urbanist font-semibold">
                   To
                  </p>
                  <ReactSelect
                    styles={customStyles}
                    value={yearTo}
                    onChange={handleYearToChange}
                    options={filteredYearToOptions}  
                    isClearable={false}
                    placeholder="YYYY"
                    className={`${error ? "hidden" : "block"}`}
                  />
                </div>
              </div>
              <div
                onClick={handleSearch}
                className="    group flex px-1  py-1 w-[3.5vw] justify-center items-center bg-[#ca0000] rounded-xl"
              >
                <GoSearch
                  size={27}
                  className="cursor-pointer text-white group-hover:text-blue-500 duration-150"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-[23vw] bg-white px-[0.5vw]  py-[1vh] h-fit  rounded-lg  ">
            <div className="flex  mt-[9.46vh]">
              <img src={img1} className="w-[4vw]  " alt="icon5" />
              <img src={img2} className="w-[4vw]  " alt="icon6" />
              <img src={img3} className="w-[4vw] " alt="icon7" />
            </div>
            <div className="font-urbanist text-[1.5vw] font-semibold leading-[3.2vh] p-3 text-left  ">
              12.5K+ People
            </div>
            <div className="font-urbanist text-[1vw] font-normal   px-3 text-left  text-[#8a8aa0]">
              has used our services such as selling, buying, or even buying
              their parts.
            </div>
            <div className="flex gap-[0.2vw] flex-wrap px-3 mt-[2vh]">
              <button className="border border-[#df4949] w-[5vw]   rounded-full text-[#df4949] text-[1.04vw]">
                Bid
              </button>
              <button className="border border-[#df4949] w-[5vw]   rounded-full text-[#df4949] text-[1.04vw]">
                Buy
              </button>
              <button className="border border-[#df4949] w-[5vw]   rounded-full text-[#df4949] text-[1.04vw]">
                Sell
              </button>
              <button className="border border-[#df4949] w-[6vw]   rounded-full text-[#df4949] text-[1.04vw]">
                Consult
              </button>
              <div className="flex gap-5 items-center mt-[10px]">
                <p className="text-left font-semibold text-[1.2vw] font-urbanist">
                  Learn More
                </p>
                <FaArrowRightLong className="text-[1.2vw]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden mt-[100px]">
        <div className="flex flex-col justify-between mx-auto bgImage tree">
          <div className="w-full mx-auto">
            <h2 className="text-left px-[60px] font-urbanist text-[46px] font-bold leading-tight">
              <span className="text-outline">Bid, Buy, Drive</span> Online Car
              Auctions with Home Delivery!
            </h2>
            <div className="w-full px-[60px] text-[#8a8aa0] font-urbanist text-[20px] font-medium leading-[19px] text-left">
              Lorem ipsum dolor sit amet. Ea similique aliquam ut maxime
              necessitatibus est nemo error sed vero sapiente cum quae
              temporibus sed quaerat
            </div>
              <button className="bg-[#ca0000] mx-[60px] px-3 font-urbanist flex text-white rounded-full items-center text-[16px]   h-[5.284vh] my-[2vh]">
                Start Bidding
              </button>
        
            <div className="text-left w-[87px] flex justify-between gap-4 mx-[80px] mt-[5vh]">
              <img src={img4} alt="icon8" />
              <img src={img5} alt="icon9" />
              <img src={img6} alt="icon10" />
              <img src={img7} alt="icon11" />
            </div>
          </div>

          <div className=" relative h-[600px] -z-50">
            <div className="absolute bg-white opacity-80 rounded-xl shadow-xl right-[10%] w-[105px]  h-[95px]">
              <div className="flex flex-col p-2   items-center ">
                <p className="font-bold text-[23px]">50+</p>
                <p className="text-[12px] font-urbanist px-4">
                  Catergries Available
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-[350px]   mx-auto">
            <div className="mx-auto w-[200px]   -mt-[230px]">
              <div className="flex">
                <img src={img1} className="w-[60px] h-[60px]" alt="icon12" />
                <img src={img2} className="w-[60px] h-[60px]" alt="icon13" />
                <img src={img3} className="w-[60px] h-[60px]" alt="icon14" />
              </div>
              <div className="font-urbanist text-[20px] font-semibold leading-[24px] text-left mt-[2.5vh]">
                12.5K+ People
              </div>
              <div className="font-urbanist text-[14px] font-normal leading-[16px] text-left mt-[1.5vh] text-[#8a8aa0]">
                has used our services such as selling, buying, or even buying
                their parts.
              </div>
              <div className="flex gap-[0.5vw] flex-wrap mt-[2vh]">
                <button className="border  border-[#df4949] py-[10px] px-[26px] rounded-full text-[#df4949] text-[16px]">
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
                <p className="text-left font-semibold text-[18px] font-urbanist">
                  Learn More
                </p>
                <FaArrowRightLong />
              </div>
            </div>

            <div className="text-left w-[140px] h-[550px] border bg-[#ffffffcc] rounded-xl -mt-[380px]">
              <div className="w-[108px] py-2 mx-auto flex flex-col gap-y-4 justify-center items-center font-urbanist">
           
              {/* Dropdown for Makes (Car Makes) */}
              <div className="flex flex-col justify-center items-start border-r w-full text-left">
                <p
                  className={`text-[16px] font-urbanist font-semibold ${
                    error ? "hidden" : "block"
                  }`}
                >
                  Makes
                </p>
                {loading && !carData ? (
                  <div className="flex justify-center items-start py-4">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                    styles={customMobStyles}
                    value={selectedMake}
                    onChange={handleMakeChange} 
                    options={carOptions}
                    isClearable
                    placeholder="Select Make"
                    className={`${error ? "hidden" : "block"}`}
                  />
                )}
                {error && (
                  <div className="py-4 text-center text-red-500">{error}</div>
                )}
              </div>

             {/* Dropdown for Models (Car Models) */}
              <div className="flex flex-col justify-center items-start border-r text-left w-full">
                <p className="text-[16px] font-urbanist font-semibold">
                  Models
                </p>
                {loading && selectedMake && !modelOptions.length ? (
                  <div className="flex justify-center items-center py-4">
                    <ClipLoader size={30} />
                  </div>
                ) : (
                  <ReactSelect
                    styles={customMobStyles}
                    value={selectedModel}
                    onChange={handleModelChange}
                    options={modelOptions}
                    isClearable
                    placeholder="Select Model"
                    isDisabled={!selectedMake}
                  />
                )}
                {selectedMake && !modelOptions.length && (
                  <div className="py-4 text-center text-red-500">
                    No models available for this make.
                  </div>
                )}
              </div>

            {/* Dropdown for Partners */}
             <div className="flex flex-col w-full justify-center items-start border-r text-left">
                <p className="text-[16px] font-urbanist font-semibold">
                  Partners
                </p>
                <ReactSelect
                  styles={customMobStyles}
                  value={selectedPartner}
                  onChange={handlePartnerChange}
                  options={partnerOptions}
                  isClearable
                  placeholder="Select Partner"
                />
              </div>
               {/* Dropdown for Year From */}
                <div className="flex flex-col justify-center items-start border-r w-full text-left">
                  <p className="text-[16px] font-urbanist font-semibold">
                   From
                  </p>
                  <ReactSelect
                  
                    styles={customMobStyles}
                    value={yearFrom}
                    onChange={handleYearFromChange}
                    options={yearOptions}
                    isClearable={false}
                    placeholder="YYYY"
                    className={`${error ? "hidden" : "block"} w-full`}
                  />
                </div>

                {/* Dropdown for Year To */}
                <div className="flex flex-col justify-center items-start border-r w-full text-left">
                  <p className="text-[16px] font-urbanist font-semibold">
                   To
                  </p>
                  <ReactSelect
                    styles={customMobStyles}
                    value={yearTo}
                    onChange={handleYearToChange}
                    options={filteredYearToOptions}  
                    isClearable={false}
                    placeholder="YYYY"
                    className={`${error ? "hidden" : "block"} text-[14px] w-full`}
                  />
                </div>

                <div
                onClick={handleSearch}
                className="self-end mb-[10px] p-1  group flex w-full justify-center items-center bg-[#ca0000] rounded-xl"
              >
                <GoSearch
                  size={27}
                  className="cursor-pointer text-white group-hover:text-blue-500 duration-150"
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
