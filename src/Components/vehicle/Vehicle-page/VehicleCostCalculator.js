import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const suvData = [
  { state: "Florida", calculatedRate: 500 },
  { state: "Georgia", calculatedRate: 660 },
  { state: "South Carolina", calculatedRate: 500 },
  // Add more SUV data here
];

const atvData = [
  { state: "Alabama", calculatedRate: 640 },
  { state: "North Carolina", calculatedRate: 700 },
  { state: "Tennessee", calculatedRate: 950 },
  // Add more ATV data here
];

const heavyMachineryData = [
  { state: "Kentucky", calculatedRate: 950 },
  { state: "Mississippi", calculatedRate: 850 },
  { state: "Louisiana", calculatedRate: 900 },
  // Add more Heavy Machinery data here
];

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [finalBid, setFinalBid] = useState("");
  const [category, setCategory] = useState("SUV");
  const [fuelType, setFuelType] = useState("Gasoline");

  const handleSelection = (item) => {
    setSelectedItem(item);
    // setIsOpen(false); // Close the dropdown after selection
  };

  const handleBidChange = (e) => {
    const bid = parseFloat(e.target.value) || "";
    setFinalBid(bid);
  };

  const calculateCustomsDuty = () => {
    const bid = parseFloat(finalBid) || 0;
    const rate = fuelType === "Hybrid" ? 0.1 : 0.65;
    return bid * rate;
  };

  const calculateProcessingFee = () => {
    const bid = parseFloat(finalBid) || 0;
    return bid * 0.01;
  };

  const calculateLevyFee = () => {
    const currentYear = new Date().getFullYear();
    const vehicleYear = selectedItem ? selectedItem.year : currentYear;
    return currentYear - vehicleYear > 10 ? 0 : 250;
  };

  const calculateBankTransferFee = () => {
    const bid = parseFloat(finalBid) || 0;
    return bid * 0.05;
  };

  const calculateVATBase = () => {
    const transportRate = selectedItem ? selectedItem.calculatedRate : 0;
    const bid = parseFloat(finalBid) * 0.1 || 0;
    const customsDuty = calculateCustomsDuty();
    const processingFee = calculateProcessingFee();
    const levyFee = calculateLevyFee();
    return bid + customsDuty + transportRate + processingFee + levyFee;
  };

  const calculateTotal = () => {
    const VAT = calculateVATBase();
    return VAT + parseFloat(finalBid) || 0;
  };

  const getCategoryData = () => {
    switch (category) {
      case "ATV":
        return atvData;
      case "Heavy Machinery":
        return heavyMachineryData;
      case "SUV":
      default:
        return suvData;
    }
  };

  return (
    <div className="relative w-full mx-auto mt-[5.4vh] font-urbanist shadow-lg rounded-[0.5vw] p-[1.5vw]">
      <h2 className="text-[1.5vw] font-semibold text-gray-800 mb-[3.2vh]">
        Bid Calculator
      </h2>
      <h2 className="text-[1.5vw] font-semibold text-gray-800 mb-[3.2vh]">
        Select Vehicle Category
      </h2>
      <div className="grid grid-cols-3 gap-x-[2.6vw]">
        <button
          onClick={() => setCategory("SUV")}
          className={`px-[1vw] py-[0.5vh] text-[1vw] rounded-[0.5vw] text-white ${
            category === "SUV" ? "bg-[#CA0000]" : "bg-gray-300"
          }`}
        >
          SUV
        </button>
        <button
          onClick={() => setCategory("ATV")}
          className={`px-[1vw] py-[0.5vh] text-[1vw] rounded-[0.5vw] text-white ${
            category === "ATV" ? "bg-[#CA0000]" : "bg-gray-300"
          }`}
        >
          ATV
        </button>
        <button
          onClick={() => setCategory("Heavy Machinery")}
          className={`px-[1vw] py-[0.5vh] text-[1vw] rounded-[0.5vw] text-white ${
            category === "Heavy Machinery" ? "bg-[#CA0000]" : "bg-gray-300"
          }`}
        >
          Heavy Machinery
        </button>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mt-4 py-[1.5vh] px-[1vw]  text-black border rounded-[0.375vw] shadow-sm focus:outline-none"
      >
        {isOpen ? (
          <div className="flex gap-x-[0.5vw] justify-center items-center">
               <h1 className="text-[1vw]">Close</h1>
               <IoIosArrowUp  className="text-[1vw]"/>
     
          </div>
        ) : (
          <div className="flex gap-x-[0.5vw] justify-center items-center">
                  <h1 className="text-[1vw]">Check Transportations Fee</h1>
                  <IoIosArrowDown  className="text-[1vw]" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="mt-[2.1vh] bg-gray-100 rounded-[0.5vw] shadow-md">
          <table className="min-w-full divide-y text-[0.9vw] divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-[1vw] py-[1vh] text-left text-gray-700">State</th>
                <th className="px-[1vw] py-[vh] text-left text-gray-700">
                  Calculated Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getCategoryData().map((item, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${
                    selectedItem === item ? "bg-blue-100" : ""
                  }`}
                  onClick={() => handleSelection(item)}
                >
                  <td className="px-[1vw] py-[1vh] text-left">{item.state}</td>
                  <td className="px-[1vw] py-[1vh] text-left">${item.calculatedRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="my-6">
        <label className="block text-[1.12vw] font-medium text-gray-700 mb-[1vh]">
          Select Fuel Type
        </label>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="block w-full px-[1vw] py-[1vh] border lg:text-[0.8vw] border-gray-300 rounded-[0.375vw] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="Gasoline" className="text-[0.8vw]">Gasoline</option>
          <option value="Hybrid" className="text-[0.8vw]">Hybrid</option>
        </select>
      </div>

      <div className="mt-[3.2vh] p-[1.5vw] bg-white rounded-[0.5vw] shadow-xl border border-gray-200">
        <h3 className="text-[1.25vw] font-semibold text-gray-900 mb-[2.1vh]">
          Fees & Calculations
        </h3>
        <div className="space-y-3 ">
          <div className="flex justify-between ">
            <span className="text-[0.875vw] text-gray-700">Processing Fee:</span>
            <span className="text-[0.875vw] font-medium text-gray-800">
              ${calculateProcessingFee().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875vw] text-gray-700">Bank Transfer Fee:</span>
            <span className="text-[0.875vw] font-medium text-gray-800">
              ${calculateBankTransferFee().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875vw] text-gray-700">Custom Duty Fee:</span>
            <span className="text-[0.875vw] font-medium text-gray-800">
              ${calculateCustomsDuty().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875vw] text-gray-700">Levy Fee:</span>
            <span className="text-[0.875vw] font-medium text-gray-800">
              ${calculateLevyFee().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[0.875vw] text-gray-700">VAT Base:</span>
            <span className="text-[0.875vw] font-medium text-gray-800">
              ${calculateVATBase().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-[1.5vh]">
            <span className="text-[1.125vw] font-semibold text-gray-900">
              Transportation Fee:
            </span>
            <span className="text-[1.125vw] font-semibold text-gray-900">
              ${selectedItem ? selectedItem.calculatedRate : 0}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-3">
            <span className="text-[1.125vw] font-semibold text-gray-900">
              Total Price:
            </span>
            <span className="text-[1.125vw] font-semibold text-gray-900">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-[0.875vw] font-medium text-gray-900 mb-[1vh]">
            Enter Your Final Bid
          </label>
          <input
            type="number"
            value={finalBid}
            onChange={handleBidChange}
            placeholder="Enter bid amount"
            className="block w-full lg:text-[0.875vw] px-[1vw] py-[1.5vh] border border-gray-300 rounded-[0.375vw] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
