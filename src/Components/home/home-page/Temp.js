"use client";

import { Search } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import Select from "react-select";

const makeOptions = [
  { value: "all", label: "All makes" },
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
];

const modelOptions = [
  { value: "all", label: "All models" },
  { value: "camry", label: "Camry" },
  { value: "civic", label: "Civic" },
];

const generationOptions = [
  { value: "all", label: "All generations" },
  { value: "2020-present", label: "2020-Present" },
  { value: "2015-2019", label: "2015-2019" },
];

export default function VehicleSearch() {
  const [activeTab, setActiveTab] = useState("regular");
  const [isCopart, setIsCopart] = useState(true);
  const [isIAAI, setIsIAAI] = useState(true);
  const regularSearchRef = useRef(null);
  const vinSearchRef = useRef(null);

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "40px",
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#cbd5e1",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 50,
    }),
  };

  return (
    <div
      className="mx-auto p-2 bg-white/80 rounded-lg shadow-md my-10"
      style={{ width: "800px", maxWidth: "90%" }}
    >
      <div className="mb-2 ">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium transition-colors duration-300 ${
              activeTab === "regular"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("regular")}
          >
            Regular Search
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors duration-300 ${
              activeTab === "vin"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("vin")}
          >
            VIN Search
          </button>
        </div>
      </div>

      <div
        className="mt-4 flex flex-col justify-center items-center space-y-4"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                styles={customSelectStyles}
                options={makeOptions}
                placeholder="All makes"
                className="w-full"
              />
              <Select
                styles={customSelectStyles}
                options={modelOptions}
                placeholder="All models"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex justify-center items-center gap-x-2">
                <Select
                  styles={customSelectStyles}
                  placeholder="From"
                  className="w-full"
                />
                <Select
                  styles={customSelectStyles}
                  placeholder="To"
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isCopart}
                      onChange={() => setIsCopart(!isCopart)}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out ${
                        isCopart ? "bg-blue-500" : ""
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          isCopart ? "translate-x-6" : "translate-x-1"
                        } translate-y-0.5`}
                      />
                    </div>
                  </div>
                  <span className="text-gray-700">Copart</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isIAAI}
                      onChange={() => setIsIAAI(!isIAAI)}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out ${
                        isIAAI ? "bg-blue-500" : ""
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                          isIAAI ? "translate-x-6" : "translate-x-1"
                        } translate-y-0.5`}
                      />
                    </div>
                  </div>
                  <span className="text-gray-700">IAAI</span>
                </label>
              </div>

              <div className="flex justify-center ">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
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
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by VIN or lot number"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
