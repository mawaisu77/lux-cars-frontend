import React, { useState } from "react";
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
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { ClipLoader } from "react-spinners";

const Bid = () => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null); 
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const { carData, loading, error } = useCarMakesModels();

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

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (selectedMake) queryParams.append("make", selectedMake.value);
    if (selectedModel) queryParams.append("model", selectedModel.value);
    if (selectedPartner) queryParams.append("partner", selectedPartner.value);
    if (yearFrom) queryParams.append("year_from", yearFrom);
    if (yearTo) queryParams.append("year_to", yearTo);

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
      fontSize: '0.9vw',
      borderRadius: '0.74vh',
      backgroundColor: 'transparent', // Makes the control's background transparent
      border: '1px solid #ccc', // Optional: add a border for better visibility
      boxShadow: 'none', // Remove default box shadow
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: make the dropdown menu background semi-transparent
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: add a subtle shadow
    }),
    placeholder: (base) => ({
      ...base,
      color: '#8a8aa0', // Optional: change placeholder text color
    }),
    singleValue: (base) => ({
      ...base,
      color: '#333', // Optional: change the color of the selected value
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#CA0000' : 'transparent',
      color: state.isSelected ? 'white' : '#333',
      '&:hover': {
        backgroundColor: '#f5f5f5', // Optional: hover effect for dropdown options
      },
    }),
  };

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
              {/* Dropdown for Makes (Car Makes) */}
              <div className="flex flex-col justify-center items-center border-r w-[12vw] text-left">
              <p className="text-[1.17vw] font-urbanist font-semibold">Makes</p>
              {loading && !carData ? (
                <div className="flex justify-center items-center py-4">
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
                />
              )}
              {error && (
                <div className="py-4 text-center text-red-500">
                  Error: {error}
                </div>
              )}
            </div>

             {/* Dropdown for Models (Car Models) */}
             <div className="flex flex-col justify-center items-center border-r w-[12vw] text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold">Models</p>
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
             <div className="flex flex-col justify-center items-center w-[12vw] border-r text-left">
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

              <div className="flex gap-x-2 justify-between items-center  w-[12vw] text-left" >
               {/* Input for Year From */}
              <div className="flex flex-col justify-center items-center text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold  text-left"> From</p>
                <input
                  type="number"
                  value={yearFrom}
                  onChange={(e) => setYearFrom(e.target.value)}
                  placeholder="YYYY"
                  className="w-full px-3 py-1.5  border border-[#ccc] bg-transparent rounded-md"
                />
              </div>

              {/* Input for Year To */}
              <div className="flex flex-col justify-center items-center  text-left">
                <p className="text-[1.17vw] font-urbanist font-semibold text-left"> To</p>
                <input
                  type="number"
                  value={yearTo}
                  onChange={(e) => setYearTo(e.target.value)}
                  placeholder="YYYY"
                  className="w-full px-3 py-1.5 border border-[#ccc] rounded-md bg-transparent"
                />
              </div>
            </div>


              <div onClick={handleSearch} className="self-end mb-[1.5vh] flex h-[6.23vh] w-[3.5vw] justify-center items-center bg-[#ca0000] rounded-xl">
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
              has used our services such as selling, buying, or even buying
              their parts.
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
                <p className="text-left font-semibold text-[18px] font-urbanist">
                  Learn More
                </p>
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
              <span className="text-outline">Bid, Buy, Drive</span> Online Car
              Auctions with Home Delivery!
            </h2>
            <div className="w-[265px] text-[#8a8aa0] font-urbanist text-[20px] font-medium leading-[19px] text-left">
              Lorem ipsum dolor sit amet. Ea similique aliquam ut maxime
              necessitatibus est nemo error sed vero sapiente cum quae
              temporibus sed quaerat
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
              <div className="w-[108px] py-2 mx-auto flex flex-col justify-center items-center font-urbanist">
                <div className="h-[110px]">
                  <p className="text-[14px] font-urbanist font-semibold">
                    {" "}
                    VIN/lot
                  </p>
                  <p className="flex justify-between text-[13px] gap-1">
                    <input
                      type="text"
                      placeholder="Type Here..."
                      className="bg-[#ffffffcc] border-none w-[64px]  font-urbanist flex "
                    />
                  </p>
                </div>

                <div className="h-[110px] ">
                  <p className="text-[14px] font-urbanist font-semibold">
                    Car Types
                  </p>
                  <p className="flex justify-between text-[13px] gap-1">
                    All Vehicles
                    <RiArrowDropDownLine size={25} className="cursor-pointer" />
                  </p>
                </div>

                <div className="border-b pb-2">
                  <p className="text-[14px] font-urbanist font-semibold">
                    Models
                  </p>
                  <p className="flex justify-between items-center text-[13px] gap-1">
                    All Models
                    <RiArrowDropDownLine
                      size={25}
                      className="cursor-pointer  hover:bg-red-300"
                    />
                  </p>
                </div>

                <div className="border-b pb-2 h-[100px]">
                  <p className="text-[14px] font-urbanist font-semibold pt-7">
                    Partners
                  </p>
                  <p className="flex justify-between items-center text-[13px] gap-1">
                    All Partners
                    <RiArrowDropDownLine size={25} className="cursor-pointer" />
                  </p>
                </div>

                <div className="flex flex-col gap-3 pb-2">
                  <p className="text-[14px] font-urbanist font-semibold pt-7">
                    Date
                  </p>
                  <div className="flex justify-center items-center gap-2">
                    <LuCalendarSearch /> 09 - <LuCalendarSearch /> 12
                  </div>
                  <div className="flex w-[40px] h-[40px] justify-center items-center bg-red-700 rounded-xl">
                    <GoSearch
                      size={27}
                      color="white"
                      className="cursor-pointer"
                      onClick={handleSearch}
                    />
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
