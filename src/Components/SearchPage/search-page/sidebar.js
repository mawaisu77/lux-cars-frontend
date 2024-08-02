import React, { useState } from "react";
import SearchMainPage from "../search-page/searchMainPage";
import { Calendar } from "primereact/calendar";

const dropdownData = {
  source: [
    { id: "copart", label: "COPART" },
    { id: "iaai", label: "IAAI" },
  ],
  vehicleType: [
    { id: "atv", label: "ATV" },
    { id: "automobile", label: "AUTOMOBILE" },
    { id: "boat", label: "BOAT" },
    { id: "bus", label: "BUS" },
    { id: "minibus", label: "MINIBUS" },
    { id: "industrialEquipment", label: "INDUSTRIAL EQUIPMENT" },
    { id: "jetSki", label: "JET SKI" },
    { id: "superCars", label: "SUPER CARS" },
  ],
  make: [],  // Add your data here
  model: [], // Add your data here
  trim: [],  // Add your data here
  year: [],  // Add your data here
  tranmission: [],  // Add your data here
  condition: [
    { id: "runAndDrive", label: "RUN AND DRIVE" },
    { id: "engineStart", label: "ENGINE START" },
    { id: "engineBurn", label: "ENGINE BURN" },
    { id: "allAirBagsIntact", label: "ALL AIR BAGS INTACT" },
  ],
  fuelType: [],  // Add your data here
  documentType: [
    { id: "original", label: "ORIGINAL" },
    { id: "duplicate", label: "DUPLICATE" },
  ],
  damage: [],  // Add your data here
  distance: [], // Add your data here
};

const Sidebar = () => {
  const [dropdownStates, setDropdownStates] = useState({
    source: false,
    vehicleType: false,
    make: false,
    model: false,
    trim: false,
    year: false,
    tranmission: false,
    condition: false,
    fuelType: false,
    documentType: false,
    damage: false,
    distance: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdown]: !prevStates[dropdown],
    }));
  };

  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  return (
    <div className="flex justify-center gap-[3vw] w-[80vw] mx-auto font-urbanist">
      <div className="fixed lg:relative mt-[2.604vw] bg-[#1c181840]/10 lg:bg-white z-30 lg:z-0 lg:w-[17.667vw] shadow-xl rounded-lg">
        {Object.keys(dropdownData).map((dropdownKey) => (
          <div key={dropdownKey} className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDropdown(dropdownKey)}
            >
              <h1 className="text-[1.3vw] text-left font-bold mb-[0.729vw]">
                {dropdownKey.charAt(0).toUpperCase() + dropdownKey.slice(1)}
              </h1>
              <svg
                className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                  dropdownStates[dropdownKey] ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            {dropdownStates[dropdownKey] && (
              <div>
                {dropdownData[dropdownKey].map(({ id, label }) => (
                  <div key={id} className="flex items-center mb-[0.833vw]">
                    <input id={id} type="checkbox" value={id} className="form-checkbox" />
                    <label
                      htmlFor={id}
                      className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <SearchMainPage />
    </div>
  );
};

export default Sidebar;

