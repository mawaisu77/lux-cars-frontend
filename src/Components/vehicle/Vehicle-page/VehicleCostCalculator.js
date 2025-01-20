import React, { useEffect, useState } from "react";
import Select from "react-select";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";
import {
  atvData,
  suvData,
  heavyMachineryData,
} from "../../../utils/carCategoriesData";

import { CopartBuyerFeeCalculator } from "./copart-bid-calculations/BuyerFeeCalculations";
import {
  copartEnvironmentalFee,
  copartGateFee,
  copartTitlePickupFee,
} from "./copart-bid-calculations/CopartFinalAuctionProps";
import { CopartVirtualBidFeeCalculator } from "./copart-bid-calculations/VirtualFeeCalculations";
import { IAAIBuyerFeeCalculator } from "./iaai-bid-calculations/IaaiBuyerFee";
import { IAAIInternetBidFeeCalculator } from "./iaai-bid-calculations/InternetAndProxyFee";
import {
  iaaiEnvironmentalFee,
  iaaiServiceFee,
} from "./iaai-bid-calculations/IAAIFinalAuctionProps";
import { customCalculatorDropdownStyles } from "./ui/CalculatorDropdownStyle";
import { BiCalculator } from "react-icons/bi";
import { RiBankFill } from "react-icons/ri";
import { MdCalculate } from "react-icons/md";


const categoryOptions = [
  { label: "SUV", value: "SUV" },
  { label: "Sedan", value: "Sedan" },
  { label: "Trucks", value: "Trucks" },
  { label: "Heavy Machinery", value: "Heavy Machinery" },
  { label: "Boats", value: "Boats" },
  { label: "ATV", value: "ATV" },
];

const Dropdown = ({ bidAmount, data }) => {

  const [vatPercentage, setVatPercentage] = useState(10); // State for VAT percentage
  const [processingFee, setProcessingFee] = useState(0.01); // State for processing fee
  const [levyFee, setLevyFee] = useState(250); // State for levy fee
  const [selectedLocation, setSelectedLocation] = useState("Bahamas"); // State for location selection


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [includeInspection, setIncludeInspection] = useState(null); // New state for inspection selection

  const [finalBid, setFinalBid] = useState(0); // Store the final bid in state
  const [showApprovalMessage, setShowApprovalMessage] = useState(false); // State to show the approval message

  const calculateProcessingFee = () => (parseFloat(finalBid) || 0) * processingFee; // Use state for processing fee
  const calculateLevyFee = () => (selectedLocation === "Turks" ? 0 : levyFee); // Conditional levy fee

  const shippingRates = {
    Sedan: { Diesel: 1100, Gasoline: 1100, Electric: 1300, Hybrid: 1300, "Flexible Fuel": 1300, Unknown: 1300, "Other": 1300 },
    SUV: { Diesel: 1300, Gasoline: 1300, Electric: 1700, Hybrid: 1700, "Flexible Fuel": 1700, Unknown: 1700, "Other": 1700 },
    Trucks: { Diesel: 1600, Gasoline: 1600, Electric: 1700, Hybrid: 1700, "Flexible Fuel": 1700, Unknown: 1700, "Other": 1700 },
    "Heavy Machinery": { Diesel: 2500, Gasoline: 2500, Electric: 2500, Hybrid: 2500, "Flexible Fuel": 2500, Unknown: 2500, "Other": 2500 }, 
    Boats: { Diesel: 2500, Gasoline: 2500, Electric: 2500, Hybrid: 2500, "Flexible Fuel": 2500, Unknown: 2500, "Other": 2500 },
    ATV: { Diesel: 1100, Gasoline: 1100, Electric: 1100, Hybrid: 1100, "Flexible Fuel": 1100, Unknown: 1100, "Other": 1100 },
  };

  const calculateShippingCost = () => {
    const category = selectedCategory?.value;
    const fuelType = data?.fuel;
    if (category && fuelType && shippingRates[category]) {
      return shippingRates[category][fuelType] || 0;
    }
    return 0;
  };

  // const finalBid = bidAmount ? parseFloat(bidAmount).toFixed(2) : 0;
  const currentYear = new Date().getFullYear();
  // Check if the car year is older than 10 years
  const isOlderThanTenYears = () => {
    const carYear = data?.year || currentYear;
    console.log(carYear, "car year +++");
    return currentYear - carYear > 10;
  };

  const calculateFinalBid = (bid, baseSite) => {
    let total = 0;

    if (baseSite === "copart") {
      const copartBuyerFee = CopartBuyerFeeCalculator(bid);
      const copartVirtualFee = CopartVirtualBidFeeCalculator(bid);
      const copartBankFee = calculateBankTransferFee(bid);
      // console.log("parseFloat(bid) ", parseFloat(bid), "copartBuyerFee ", copartBuyerFee, "copartVirtualFee ", copartVirtualFee, "copartBankFee ", copartBankFee, "copartGateFee ", copartGateFee, "copartTitlePickupFee ", copartTitlePickupFee, "copartEnvironmentalFee ", copartEnvironmentalFee)
      total =
        parseFloat(bid) +
        copartBuyerFee +
        copartVirtualFee +
        copartGateFee +
        copartTitlePickupFee +
        copartBankFee +
        copartEnvironmentalFee;
    } else if (baseSite === "iaai") {
      const iaaiBuyerFee = IAAIBuyerFeeCalculator(bid);
      const iaaiInternetFee = IAAIInternetBidFeeCalculator(bid);
      const iaaiBankFee = calculateBankTransferFee(bid);
      total =
        parseFloat(bid) +
        iaaiBuyerFee +
        iaaiInternetFee +
        iaaiServiceFee +
        iaaiEnvironmentalFee +
        iaaiBankFee;
    }

    return parseFloat(total).toFixed(2);
  };

  const calculateCustomsDuty = () => {
    const bid = parseFloat(finalBid) || 0;
    const engineSize = data?.engine_size;
    const fuelType = data?.fuel;
    
    if (selectedLocation === "Turks") {
        // Check for Hybrid/Electric
        if (fuelType === "Hybrid" || fuelType === "Electric") {
            return bid * 0.10
        }
        // Calculate duty based on engine size and bid amount
        if (engineSize < 2) {
            return bid < 20000 ? bid * 0.2625 : bid * 0.30; // 26.25% or 30%
        } else if (engineSize < 4) {
            return bid < 30000 ? bid * 0.3375 : bid * 0.375; // 33.75% or 37.50%
        } else if (engineSize >= 4) {
            return bid < 40000 ? bid * 0.4125 : bid * 0.45; // 41.25% or 45%
        }
    } else if (selectedLocation === "Bahamas") {
        // For Bahamas, check fuel type
        if (fuelType === "Hybrid" || fuelType === "Electric") {
            return bid * 0.10; // 10% for Hybrid/Electric
        } else {
            return bid * 0.65; // 65% for Diesel
        }
    }

    return 0; // Default case if no conditions are met
};
  const calculateInspectionCost = () => (includeInspection === "Yes" ? 500 : 0);
  const calculateCustomsClearence = () => 350;

  const calculateVATBase = () => {
    const bid = parseFloat(finalBid) || 0;
    const customsDuty = calculateCustomsDuty();
    const boatShipping = calculateShippingCost();
    const processingFee = calculateProcessingFee();
    const levyFee = calculateLevyFee();
    const vatRate = selectedLocation === "Turks" ? 0.05 : 0.10;
    console.log("vatRate ", vatRate)
    const vat = (bid + customsDuty + boatShipping + processingFee + levyFee) * vatRate;
    console.log("vat ", vat)
    return vat;
  };

  // New function to calculate the total due to customs
  const calculateTotalDueToCustom = () => {
    const levyFee = calculateLevyFee();
    const processingFee = calculateProcessingFee();
    const customsDuty = calculateCustomsDuty();
    const VAT = calculateVATBase();
    return levyFee + processingFee + customsDuty + VAT;
  };

  // New function to calculate the service fee
  const calculateAdminFee = () => {
    const baseFee = 1500;
    const additionalFee = finalBid > 30000 ? finalBid * 0.04 : 0;
    return baseFee + additionalFee;
  };

  const calculateAuctionFee = (bid) => {
    const auctionFee = bid;
    return auctionFee;
  };

  const calculateBankTransferFee = (bid) => {
    const bankFee = calculateAuctionFee(bid) * 0.05;
    return bankFee;
  };

  const calculateTotal = () => {
    const AdminFee = calculateAdminFee();
    const InspectionCost = calculateInspectionCost();
    const customClearance = calculateCustomsClearence();
    const bankFee = calculateBankTransferFee(finalBid);
    const transportationRate = selectedTransportation?.rate || 0;
    const boatShipping = calculateShippingCost();
    return (
      AdminFee +
        InspectionCost +
        customClearance +
        bankFee +
        transportationRate +
        boatShipping +
        parseFloat(finalBid) || 0
    );
  };

  const calculateFinalPrice = () => {
    const totalCustomDues = calculateTotalDueToCustom();
    const totalLandedCost = calculateTotal();
    return totalCustomDues + totalLandedCost;
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    switch (selectedOption.value) {
      case "SUV":
        setTransportationOptions(suvData);
        break;
      case "ATV":
        setTransportationOptions(atvData);
        break;
      case "Heavy Machinery":
        setTransportationOptions(heavyMachineryData);
        break;
      case "Boats":
        setTransportationOptions(heavyMachineryData);
        break;
      case "Sedan":
        setTransportationOptions(atvData);
        break;
      case "Trucks":
        setTransportationOptions(suvData);
        break;
      default:
        setTransportationOptions([]);
    }
    setSelectedTransportation(null); // Reset transportation selection
  };

  const extractState = (location, transportationOptions) => {
    return (
      transportationOptions.find(
        (option) =>
          location.includes(option.abbreviation) ||
          location.includes(option.label)
      ) || null
    ); // Return null if no match is found
  };

  useEffect(() => {
    if (data.location && selectedCategory) {
      let categoryData = [];

      switch (selectedCategory.value) {
        case "SUV":
          categoryData = suvData;
          break;
        case "ATV":
          categoryData = atvData;
          break;
        case "Heavy Machinery":
          categoryData = heavyMachineryData;
          break;
        case "Boats":
          categoryData = heavyMachineryData;
          break;
        case "Sedan":
          categoryData = atvData;
          break;
        case "Trucks":
          categoryData = suvData;
          break;
        default:
          categoryData = [];
      }

      // Extract the matched transportation state based on the location
      const matchedTransportation = extractState(data.location, categoryData);
      if (matchedTransportation) {
        // Set the matched transportation option if found
        setSelectedTransportation(matchedTransportation);
      } else {
        // Reset the selected transportation if no match is found
        setSelectedTransportation(null);
      }
    }
  }, [selectedCategory, data.location]);

  // Update final bid when bidAmount or base_site changes data?.base_site
  useEffect(() => {
    const updatedFinalBid = calculateFinalBid(bidAmount, data?.base_site);
    setFinalBid(updatedFinalBid); // Store the calculated final bid in state
  }, [bidAmount, data?.base_site]);

  useEffect(() => {
    if (isOlderThanTenYears()) {
      setShowApprovalMessage(true);
    } else {
      setShowApprovalMessage(false);
    }
  }, [data]);

  return (
    <div className="relative space-y-2 bg-white w-full mx-auto mt-[5.4vh] font-urbanist shadow-sm rounded-[0.5vw] p-[1.5vw]">
      <div className=" p-[1.5vw] rounded-[0.5vw] shadow-sm  border border-gray-200">
        <h3 className="text-xl lg:text-[1.25vw] font-semibold text-gray-900 mb-[2.1vh] flex items-center gap-x-2">
          <BiCalculator className="w-5 h-5" />
          Final Price Calculator
        </h3>
        <div className="space-y-3 md:space-y-[1.5vw]">
          {/* 1 Final Bid */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">1</span>
              </div>
              <span className="text-md md:text-20 text-gray-700">
                Your Final Bid:
              </span>
              <div className="text-sm lg:text-[0.875vw] text-gray-700 flex">
                  <TooltipInfo content="You bid amount + Auction Fee + 5% Bank Fee">
                    <BsInfoCircle
                      size={15}
                      className="hover:text-blue-800 duration-200"
                    />
                  </TooltipInfo>
                </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateFinalBid(bidAmount, data?.base_site)}
            </span>
          </div>

          {/*2 Admin Fee */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">2</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Admin Fee:
              </span>
              <TooltipInfo content="$1,500 if final price over 30000 then it will be additional 4% of final price and the 1500">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
            </div>
            
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateAdminFee().toFixed(2)}
            </span>
          </div>

          {/*3 US Inland Transport: */}
          <div className="flex justify-between w-full border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-between w-full items-center">
              <div className="flex items-center gap-x-1.5">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">3</span>
              </div>
              <span className="text-sm md:text-20 text-left text-gray-700">
                US Inland Transport:
              </span>
              {/* <p className="text-sm md:text-20 text-gray-700">
                ${selectedTransportation?.rate || 0}
              </p> */}
              </div>
              <Select
                styles={customCalculatorDropdownStyles}
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange} 
                placeholder="Select Transportation"
                className="text-sm lg:text-[0.875vw] text-right font-medium text-gray-800"
              />
            </div>
          </div>

          {/*4 Inspection After Auction: (Optional) */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">4</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Inspection After Auction: (Optional)
              </span>
              <Select
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
                styles={customCalculatorDropdownStyles}
                value={
                  includeInspection
                    ? { label: includeInspection, value: includeInspection }
                    : null
                }
                onChange={(option) => setIncludeInspection(option.value)} // Update state on selection
                placeholder="Select"
                className="text-sm md:text-20 text-right font-medium text-gray-800"
              />
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="Inspection report to understand the repairs needed before shipping the vehicle to the Bahamas">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>

            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateInspectionCost().toFixed(2)}
            </span>
          </div>

          {/*5 Shipping fee to the Caribbeans */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">5</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Shipping fee to the Caribbeans
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="Boat shipping fee to the Caribbeans">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateShippingCost().toFixed(2)}
            </span>
          </div>


        </div>
      </div>

      <div className=" p-[1.5vw] rounded-[0.5vw] shadow-sm  border border-gray-200">
        <div className="flex justify-between items-center mb-[2.1vh]">
        <h3 className="text-xl lg:text-[1.25vw] font-semibold text-gray-900  flex items-center gap-x-2">
          <RiBankFill className="w-5 h-5" />
          Customs 
        </h3>
        <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-sm md:text-20 text-gray-700">
                Select Location:
              </span>
              <Select
                options={[
                  { label: "Bahamas", value: "Bahamas" },
                  { label: "Turks", value: "Turks" },
                ]}
                styles={customCalculatorDropdownStyles}
                value={{ label: selectedLocation, value: selectedLocation }}
                onChange={(option) => {
                  setSelectedLocation(option.value);
                  // Reset processing, levy fee if Turks is selected
                  if (option.value === "Turks") {
                    setProcessingFee(0);
                    setLevyFee(0);
                  } else {
                    setProcessingFee(0.01); // for Bahamas
                    setLevyFee(250); // for Bahamas
                  }

                }}
                placeholder="Select Location"
                className="text-sm md:text-20 text-right font-medium text-gray-800"
              />
         </div>
        </div>
        
        <div className="space-y-3 md:space-y-[1.5vw]">
          {/*6 Duty rate  */}
      
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">6</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
              Duty Rate:
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="Customs Duty 65% if gasoline / 10% if hybrid">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
            ${calculateCustomsDuty().toFixed(2)}
            </span>
          </div>

          {/*7 Processing Fee  */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">7</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Processing Fee:
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="1% of final bid">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateProcessingFee().toFixed(2)}
            </span>
          </div>
          {/*8 Environmental Levy Fee */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">8</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Environmental Levy Fee: (flat)
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo
                  content={` ${
                    showApprovalMessage
                      ? "Approval is needed from the Ministry for cars older than 10 years."
                      : "flat $250"
                  } `}
                >
                  <BsInfoCircle
                    size={15}
                    className={`${
                      showApprovalMessage ? "text-red-600 animate-pulse" : ""
                    } hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
              {showApprovalMessage && (
                <div className="">
                  <span className="text-red-600 text-[10px] px-[8px] py-[4px] bg-red-600/10 rounded-lg">
                    Approval needed
                  </span>
                </div>
              )}
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateLevyFee().toFixed(2)}
            </span>
          </div>
          {/*9 VAT  */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">9</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                VAT:
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="VAT = 10% of (final bid +  levy fee + custom duty + boatship + processing fee)">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateVATBase().toFixed(2)}
            </span>
          </div>
          
          {/*10 Customs Clearence and Delivery Fee */}
          <div className="flex justify-between border-b border-gray-300 pb-[.5vw]">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">10</span>
              </div>
              <span className="text-sm md:text-20 text-gray-700">
                Customs Clearence and Delivery Fee
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="$350 flat">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-sm md:text-20 font-medium text-gray-800">
              ${calculateCustomsClearence().toFixed(2)}
            </span>
          </div>
      
        </div>
    </div>

    <div className=" p-[1.5vw] rounded-[0.5vw] shadow-sm  border border-gray-200">
        <h3 className="text-xl lg:text-[1.25vw] font-semibold text-gray-900 mb-[2.1vh] flex items-center gap-x-2">
          <MdCalculate className="w-5 h-5" />
          Total Price 
        </h3>
        <div className="space-y-3 md:space-y-[1.5vw]">

          {/*11 Total Landed Cost Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">11</span>
              </div>
              <span className="text-sm md:text-20 text-left font-semibold text-gray-900">
                Total Landed Cost:
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="service fee + inspection fee + custom clearence + bank transfer fee + transportation + boat ship ">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
              <div className="">
                <span className="text-red-600 text-[10px] px-[8px] py-[4px] bg-red-600/10 rounded-lg">
                  Before Customs
                </span>
              </div>
            </div>
            <span className="text-sm md:text-20 font-semibold text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/*12 Total Due to Customs Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">12</span>
              </div>
              <span className="text-sm md:text-20 font-semibold text-gray-900">
                Total Due to Custom:
              </span>
              <div className="text-sm md:text-20 text-gray-700 flex">
                <TooltipInfo content="VAT +  levy fee + custom duty + processing fee">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>

            <span className="text-sm md:text-20 font-semibold text-gray-900">
              ${calculateTotalDueToCustom().toFixed(2)}
            </span>
          </div>

          {/*13 Final Price Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <div className="flex gap-x-1.5 justify-center items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                <span className="text-sm">13</span>
              </div>
              <span className="text-sm md:text-20 font-semibold text-gray-900">
                Final Price: 
              </span>

              <div className="">
                <span className="text-green-600 text-[10px] px-[8px] py-[4px] bg-green-600/10 rounded-lg">
                  After Customs
                </span>
              </div>
            </div>

            <span className="text-sm md:text-20 font-semibold text-gray-900">
              ${calculateFinalPrice().toFixed(2)}
            </span>
          </div>
        </div>
    </div>
    </div>
  );
};

export default Dropdown;
