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

const categoryOptions = [
  { label: "SUV", value: "SUV" },
  { label: "ATV", value: "ATV" },
  { label: "Heavy Machinery", value: "Heavy Machinery" },
];

const fuelOptions = [
  { label: "Gasoline", value: "Gasoline" },
  { label: "Hybrid", value: "Hybrid" },
];

const Dropdown = ({ bidAmount, data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(fuelOptions[0]);
  const [finalBid, setFinalBid] = useState(0); // Store the final bid in state
  const [showApprovalMessage, setShowApprovalMessage] = useState(false); // State to show the approval message

  // const finalBid = bidAmount ? parseFloat(bidAmount).toFixed(2) : 0;
  const currentYear = new Date().getFullYear();
  // Check if the car year is older than 10 years
  const isOlderThanTenYears = () => {
    const carYear = data?.year || currentYear;
    console.log(carYear, "car year +++")
    return currentYear - carYear > 10;
  };

  const calculateFinalBid = (bid, baseSite) => {
    let total = 0;
    if (baseSite === "copart") {
      const copartBuyerFee = CopartBuyerFeeCalculator(bid);
      const copartVirtualFee = CopartVirtualBidFeeCalculator(bid);
      total =
        parseFloat(bid) +
        copartBuyerFee +
        copartVirtualFee +
        copartGateFee +
        copartTitlePickupFee +
        copartEnvironmentalFee;

    } else if (baseSite === "iaai") {
      const iaaiBuyerFee = IAAIBuyerFeeCalculator(bid);
      const iaaiInternetFee = IAAIInternetBidFeeCalculator(bid);

      total =
        parseFloat(bid) +
        iaaiBuyerFee +
        iaaiInternetFee +
        iaaiServiceFee +
        iaaiEnvironmentalFee;
    }

    return parseFloat(total).toFixed(2);
  };

  const calculateCustomsDuty = () => {
    const bid = parseFloat(finalBid) || 0;
    const rate = selectedFuelType.value === "Hybrid" ? 0.1 : 0.65;
    return bid * rate;
  };

  const calculateProcessingFee = () => (parseFloat(finalBid) || 0) * 0.01;
  const calculateLevyFee = () => 250;
  const calculateInspectionCost = () => 500;
  const calculateCustomsClearence = () => 350;

  const calculateVATBase = () => {
    const bid = parseFloat(finalBid) || 0;
    const customsDuty = calculateCustomsDuty();
    const boatShipping = 1500;
    const processingFee = calculateProcessingFee();
    const levyFee = calculateLevyFee();
    return (bid + customsDuty + boatShipping + processingFee + levyFee) * 0.1;
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
  const calculateServiceFee = () => {
    const baseFee = 1500;
    const additionalFee = finalBid > 40000 ? finalBid * 0.04 : 0;
    return baseFee + additionalFee;
  };

  const calculateTotal = () => {
    const ServiceFee = calculateServiceFee();
    const InspectionCost = calculateInspectionCost();
    const customClearance = calculateCustomsClearence();
    const bankFee = calculateBankTransferFee();
    const transportationRate = selectedTransportation?.rate || 0; 
    const boatShipping = 1500;
    return ServiceFee + InspectionCost + customClearance + bankFee + transportationRate + boatShipping +  parseFloat(finalBid) || 0;
  };

  const calculateAuctionFee = () => {
    const auctionFee = finalBid;
    return auctionFee;
  };

  const calculateBankTransferFee = () => {
    const bankFee = calculateAuctionFee() * 0.05;
    return bankFee;
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
      default:
        setTransportationOptions([]);
    }

    setSelectedTransportation(null); // Reset transportation selection
  };

  const extractState = (fullString) => {
    const foundState = suvData.find((item) => fullString.includes(item.label));
    return foundState ? foundState : null;
  };

  useEffect(() => {
    if (selectedCategory?.value === "SUV" && data.location) {
      const matchedTransportation = extractState(data.location);
      if (matchedTransportation) {
        setSelectedTransportation(matchedTransportation);
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
      setShowApprovalMessage(true); // Show the message if the car is older than 10 years
    } else {
      setShowApprovalMessage(false); // Hide the message if the car is 10 years or newer
    }
  }, [data]);

  console.log(selectedTransportation?.rate)

  return (
    <div className="relative w-full mx-auto mt-[5.4vh] font-urbanist shadow-lg rounded-[0.5vw] p-[1.5vw]">
      <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
        Calculations (testing...)
      </h2>

      <h3 className="text-lg lg:text-[1.15vw] text-left font-semibold rounded-[0.5vw] text-gray-900 mb-[1.1vh]">
        Select Vehicle Category
      </h3>

      <Select
        options={categoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Select Category"
        className="mb-[2vh] text-sm lg:text-[1vw] rounded-[0.5vw]"
      />

      {selectedCategory && (
        <>
          <h3 className="text-lg lg:text-[1.15vw] text-left py-[0.4vw] font-semibold rounded-[0.5vw] text-gray-900 mb-[1.1vh]">
            Select Transportation
          </h3>

          <Select
            options={transportationOptions}
            value={selectedTransportation}
            onChange={setSelectedTransportation}
            placeholder="Select Transportation"
            className="mb-[2vh] text-sm lg:text-[1vw] rounded-[0.5vw]"
            defaultValue={selectedTransportation} // Pre-select the transportation option
          />
        </>
      )}

      <div className="my-[3vh]">
        <h3 className="text-lg lg:text-[1.15vw] text-left font-semibold rounded-[0.5vw]  text-gray-900 mb-[1.1vh]">
          Select Fuel Type
        </h3>

        <Select
          options={fuelOptions}
          value={selectedFuelType}
          onChange={setSelectedFuelType}
          placeholder="Select Fuel Type"
          className="mb-[2vh] text-sm lg:text-[1vw] py-[0.4vw]  rounded-[0.5vw]"
        />
      </div>

      <div className="mt-[3.2vh] p-[1.5vw] bg-white rounded-[0.5vw] shadow-xl leading-[4vh] border border-gray-200">
        <h3 className="text-xl lg:text-[1.25vw] font-semibold text-gray-900 mb-[2.1vh]">
          Fees & Calculations
        </h3>
        <div className="space-y-3">
          {/* Final Rate */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Your Final Bid:
              </span>
              {data && data?.base_site === "copart" ? (
                <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                  <TooltipInfo content="You bid amount + enviornmental fee + virtual bid fee + gate fee + title pickup fee + buyer fee">
                    <BsInfoCircle
                      size={15}
                      className="hover:text-blue-800 duration-200"
                    />
                  </TooltipInfo>
                </div>
              ) : (
                <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                  <TooltipInfo content="You bid amount + buyer fee + service fee + internet fee + enviornmental fee">
                    <BsInfoCircle
                      size={15}
                      className="hover:text-blue-800 duration-200"
                    />
                  </TooltipInfo>
                </div>
              )}
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateFinalBid(bidAmount, data?.base_site)}
            </span>
          </div>

          {/* Processing Fee  */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Processing Fee: 1%
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="1% of final bid">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateProcessingFee().toFixed(2)}
            </span>
          </div>

          {/* Bank transfer Fee  */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Bank Transfer Fee: 5%
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="5% of final bid">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateBankTransferFee().toFixed(2)}
            </span>
          </div>

          {/* Customs Duty: Fee  */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Customs Duty:
                {selectedFuelType.value === "Gasoline" ? "65%" : "10%"}
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="Customs Duty 65% if gasoline / 10% if hybrid">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateCustomsDuty().toFixed(2)}
            </span>
          </div>

          {/* Levy Fee */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Levy Fee: (flat)
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content={` ${
                      showApprovalMessage ? "Approval is needed from the Ministry for cars older than 10 years." : "flat $250"} `}>
                  <BsInfoCircle
                    size={15}
                    className={`${
                      showApprovalMessage ? "text-red-600 animate-pulse" : ""
                    } hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateLevyFee().toFixed(2)}
            </span>
          </div>

        {/* Inspection cost */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Inspection Cost: (flat)
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="$500">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateInspectionCost().toFixed(2)}
            </span>
          </div>

          {/* Service Fee */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Service Fee:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="$1,500 if final price over 40000 then it will be additional 4% of final price and the 1500">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateServiceFee().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
              Customs Clearence: (flat)
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="$350 flat">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateCustomsClearence().toFixed(2)}
            </span>
          </div>

          {/* Transportation Rate */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Transportation Rate:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="transporattaion is calculated acoording to provided table">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              { selectedTransportation?.rate   ? `$${selectedTransportation?.rate || 0}` : "please select category and state"  }
            </span>
          </div>

          {/*Boat Shipping Rate */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Boat Shipping Rate:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="Static price for now">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${"1500"} (static)
            </span>
          </div>

          {/* VAT Base */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                VAT Base:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="VAT = 10% of (final bid +  levy fee + custom duty + boatship + processing fee)">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateVATBase().toFixed(2)}
            </span>
          </div>

          {/* Total Landed Cost Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
             <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Landed Cost:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="service fee + inspection fee + custom clearence + bank transfer fee + transportation + boat ship ">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Total Due to Customs Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
          <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Due to Custom:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="VAT +  levy fee + custom duty + processing fee">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            {/* <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Due to Custom:
            </span> */}
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              ${calculateTotalDueToCustom().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
