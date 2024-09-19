import React, { useEffect, useState } from "react";
import Select from "react-select";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";
import { atvData, suvData, heavyMachineryData} from "../../../utils/carCategoriesData";
import { CopartBuyerFeeCalculator } from "./copart-bid-calculations/BuyerFeeCalculations";
import { copartEnvironmentalFee, copartGateFee, copartTitlePickupFee} from "./copart-bid-calculations/CopartFinalAuctionProps";
import { CopartVirtualBidFeeCalculator } from "./copart-bid-calculations/VirtualFeeCalculations";
import { IAAIBuyerFeeCalculator } from "./iaai-bid-calculations/IaaiBuyerFee";
import { IAAIInternetBidFeeCalculator } from "./iaai-bid-calculations/InternetAndProxyFee";
import { iaaiEnvironmentalFee, iaaiServiceFee } from "./iaai-bid-calculations/IAAIFinalAuctionProps";

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
    const carYear = data?.year || currentYear; // Assuming the car year is passed in `data`
    return currentYear - carYear > 10;
  };

const calculateFinalBid = (bid, baseSite) => {
  let total = 0;
console.log("base site ===",baseSite)
  if (baseSite === 'copart') {
    // Copart fee calculations
    const copartBuyerFee = CopartBuyerFeeCalculator(bid);
    const copartVirtualFee = CopartVirtualBidFeeCalculator(bid);
    total = 
      parseFloat(bid) + 
      copartBuyerFee + 
      copartVirtualFee + 
      copartGateFee + 
      copartTitlePickupFee + 
      copartEnvironmentalFee;
      // console.log( "Buyer, vir, date, pickup, envir", copartBuyerFee ,
      //   copartVirtualFee ,
      //   copartGateFee , 
      //   copartTitlePickupFee , 
      //   copartEnvironmentalFee)
      console.log("copart")

  } 

  else if (baseSite === 'iaai') {
    
    const iaaiBuyerFee = IAAIBuyerFeeCalculator(bid); 
    const iaaiInternetFee = IAAIInternetBidFeeCalculator(bid); 
    
    total = 
      parseFloat(bid) + 
      iaaiBuyerFee + 
      iaaiInternetFee + 
      iaaiServiceFee + 
      iaaiEnvironmentalFee;
      console.log("iaai")
      // console.log("bid, iaaiBuyerFee, iaaiInternetFee, iaaiServiceFee, iaaiEnvironmentalFee",bid, iaaiBuyerFee, iaaiInternetFee, iaaiServiceFee, iaaiEnvironmentalFee)
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

  const calculateVATBase = () => {
    const bid = (parseFloat(finalBid) || 0)
    const customsDuty = calculateCustomsDuty();
    const boatShipping =  1550
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
    const ServiceFee = calculateServiceFee()
    const VAT = calculateVATBase();
    const InspectionCost = calculateInspectionCost()
    return  ServiceFee + InspectionCost +  parseFloat(finalBid) || 0 ;
  };

  // Function to calculate auction fee (5% of final bid + service fee)
const calculateAuctionFee = () => {
  const auctionFee = finalBid * 0.05;
  return auctionFee;
};

// Function to calculate bank transfer fee (5% of final bid + auction fee)
const calculateBankTransferFee = () => {
  const auctionFee = calculateAuctionFee();
  return auctionFee; // This is 5% of the (final bid + service fee)
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
      const updatedFinalBid = calculateFinalBid(bidAmount, 'copart');
      setFinalBid(updatedFinalBid); // Store the calculated final bid in state
    }, [bidAmount, data?.base_site]);

    useEffect(() => {
      if (isOlderThanTenYears()) {
        setShowApprovalMessage(true); // Show the message if the car is older than 10 years
      } else {
        setShowApprovalMessage(false); // Hide the message if the car is 10 years or newer
      }
    }, [data]);
  

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
            Select Transportation Fee
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
            {/* Transportation Rate */}
            <div className="flex justify-between">
          <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
              Your Final Bid:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="Auction fee included">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
            ${calculateFinalBid(bidAmount, 'copart')}
            </span>
          </div>

         

          <div className="flex justify-between">
            <span className=" text-md lg:text-[0.875vw] text-gray-700">
              Processing Fee: 1%
            </span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateProcessingFee().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className=" text-md lg:text-[0.875vw] text-gray-700">
              Bank Transfer Fee: 5%
            </span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateBankTransferFee().toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-md lg:text-[0.875vw] text-gray-700">
              Customs Duty:
              {selectedFuelType.value === "Gasoline" ? "65%" : "10%"}
            </span>
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
                <TooltipInfo content="Approval is needed from the Ministry for cars older than 10 years.">
                  <BsInfoCircle
                    size={15}
                    className={`${showApprovalMessage ? "text-red-600 animate-pulse" : ""} hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
            ${calculateLevyFee().toFixed(2)}
            </span>
          </div>




          {/* Inspection Cost */}
          <div className="flex justify-between">
            <span className="text-md lg:text-[0.875vw] text-gray-700">
              Inspection Cost
            </span>
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
                <TooltipInfo content="here comes the important notes for customer">
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

          {/* Transportation Rate */}
          <div className="flex justify-between">
          <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Transportation Rate:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="Not completely implemented yet">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${selectedTransportation?.rate || 0}
            </span>
          </div>

          {/*Boat Shipping Rate */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                Boat Shipping Rate:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="Not decided yet">
                  <BsInfoCircle
                    size={15}
                    className="hover:text-blue-800 duration-200"
                  />
                </TooltipInfo>
              </div>
            </div>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${"500"} (static)
            </span>
          </div>

          {/* VAT Base */}
          <div className="flex justify-between">
            <div className="flex gap-x-1.5 justify-center items-center">
              <span className="text-md lg:text-[0.875vw] text-gray-700">
                VAT Base:
              </span>
              <div className="text-md lg:text-[0.875vw] text-gray-700 flex">
                <TooltipInfo content="here comes the important notes for customer">
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

          {/* Total Due to Customs Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Due to Custom:
            </span>
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              ${calculateTotalDueToCustom().toFixed(2)}
            </span>
          </div>

          {/* Total Landed Cost Calculation */}
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Landed Cost:
            </span>
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
