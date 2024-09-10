import React, { useState } from "react";
import Select from "react-select";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";
import { atvData, suvData, heavyMachineryData} from "../../../utils/carCategoriesData";

const categoryOptions = [
  { label: "SUV", value: "SUV" },
  { label: "ATV", value: "ATV" },
  { label: "Heavy Machinery", value: "Heavy Machinery" },
];

const fuelOptions = [
  { label: "Gasoline", value: "Gasoline" },
  { label: "Hybrid", value: "Hybrid" },
];

const Dropdown = ({ bidAmount }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(fuelOptions[0]);

  const finalBid = bidAmount ? parseFloat(bidAmount).toFixed(2) : 0;

  const calculateCustomsDuty = () => {
    const bid = parseFloat(finalBid) || 0;
    const rate = selectedFuelType.value === "Hybrid" ? 0.1 : 0.65;
    return bid * rate;
  };

  const calculateProcessingFee = () => (parseFloat(finalBid) || 0) * 0.01;
  const calculateLevyFee = () => 250;
  const calculateInspectionCost = () => 500;

  const calculateVATBase = () => {
    const bid = (parseFloat(finalBid) || 0) * 0.1;
    const customsDuty = calculateCustomsDuty();
    const transportationRate = selectedTransportation?.rate || 0;
    const processingFee = calculateProcessingFee();
    const levyFee = calculateLevyFee();
    return bid + customsDuty + transportationRate + processingFee + levyFee;
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
    return VAT + ServiceFee + InspectionCost +  parseFloat(finalBid) || 0 ;
  };

  // Function to calculate auction fee (5% of final bid + service fee)
const calculateAuctionFee = () => {
  const bidAmount = parseFloat(finalBid) || 0;
  const serviceFee = calculateServiceFee(); 
  const auctionFee = (bidAmount + serviceFee) * 0.05;
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

  return (
    <div className="relative w-full mx-auto mt-[5.4vh] font-urbanist shadow-lg rounded-[0.5vw] p-[1.5vw]">
                             <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
        Calculations
      </h2>

      <h3 className="text-lg lg:text-[1.15vw] text-left font-semibold rounded-[0.5vw] text-gray-900 mb-[1.1vh]">
        Select Vehicle Category
      </h3>

      <Select
        options={categoryOptions}
        value={selectedCategory}
        onChange={handleCategoryChange}
        placeholder="Select Category"
        className="mb-[2vh]  text-md lg:text-[1vw] rounded-[0.5vw]"
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
            className="mb-[2vh]  text-md lg:text-lg lg:text-[1vw]  rounded-[0.5vw]"
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
          className="mb-[2vh]  text-md lg:text-[1vw] py-[0.4vw]  rounded-[0.5vw]"
        />
      </div>

      <div className="mt-[3.2vh] p-[1.5vw] bg-white rounded-[0.5vw] shadow-xl leading-[4vh] border border-gray-200">
        <h3 className="text-xl lg:text-[1.25vw] font-semibold text-gray-900 mb-[2.1vh]">
          Fees & Calculations
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-md lg:text-[0.875vw] text-gray-700">
              Your Final Bid:
            </span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${finalBid}
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
            <span className="text-md lg:text-[0.875vw] text-gray-700">
              Levy Fee: (flat)
            </span>
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
              ${"100"}
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
