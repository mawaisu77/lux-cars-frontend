import React, { useState } from "react";
import Select from "react-select";

const categoryOptions = [
  { label: "SUV", value: "SUV" },
  { label: "ATV", value: "ATV" },
  { label: "Heavy Machinery", value: "Heavy Machinery" },
];

const suvData = [
  { label: "Florida", value: "Florida", rate: 500 },
  { label: "Georgia", value: "Georgia", rate: 660 },
  { label: "South Carolina", value: "South Carolina", rate: 500 },
];

const atvData = [
  { label: "Alabama", value: "Alabama", rate: 640 },
  { label: "North Carolina", value: "North Carolina", rate: 700 },
  { label: "Tennessee", value: "Tennessee", rate: 950 },
];

const heavyMachineryData = [
  { label: "Kentucky", value: "Kentucky", rate: 950 },
  { label: "Mississippi", value: "Mississippi", rate: 850 },
  { label: "Louisiana", value: "Louisiana", rate: 900 },
];

const fuelOptions = [
  { label: "Gasoline", value: "Gasoline" },
  { label: "Hybrid", value: "Hybrid" },
];

const Dropdown = ({ bidAmount }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [selectedTransportation, setSelectedTransportation] = useState(null);
  const [selectedFuelType, setSelectedFuelType] = useState(fuelOptions[0]); // Default to Gasoline

  const finalBid = bidAmount ? parseFloat(bidAmount).toFixed(2) : 0;


  const calculateCustomsDuty = () => {
    const bid = parseFloat(finalBid) || 0;
    const rate = selectedFuelType.value === "Hybrid" ? 0.1 : 0.65;
    return bid * rate;
  };

  const calculateProcessingFee = () => (parseFloat(finalBid) || 0) * 0.01;
  const calculateLevyFee = () => 250; 

  const calculateVATBase = () => {
    const bid = (parseFloat(finalBid) || 0) * 0.1;
    const customsDuty = calculateCustomsDuty();
    const transportationRate = selectedTransportation?.rate || 0;
    const processingFee = calculateProcessingFee();
    const levyFee = calculateLevyFee();
    return bid + customsDuty + transportationRate + processingFee + levyFee;
  };

  const calculateTotal = () => {
    const VAT = calculateVATBase();
    return VAT + parseFloat(finalBid) || 0;
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
      <h2 className="text-lg lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
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
            <span className="text-md lg:text-[0.875vw] text-gray-700">Your Final Bid:</span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${finalBid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className=" text-md lg:text-[0.875vw] text-gray-700">Processing Fee:</span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateProcessingFee().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-md lg:text-[0.875vw] text-gray-700">Customs Duty:</span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateCustomsDuty().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-md lg:text-[0.875vw] text-gray-700">VAT Base:</span>
            <span className="text-md lg:text-[0.875vw] font-medium text-gray-800">
              ${calculateVATBase().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <span className="text-lg lg:text-[1.125vw] font-semibold text-gray-900">
              Total Price:
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
