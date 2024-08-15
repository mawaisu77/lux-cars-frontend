import React, { useEffect, useState } from "react";
import SearchMainPage from "../search-page/searchMainPage";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialMake = queryParams.get("make") || "";

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    source: [],
    make: initialMake,
    model: "",
    tranmission: [],
    status: [],
    fuel: [],
    year_from: "",
    year_to: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({});

  const [filteredModels, setFilteredModels] = useState([]);
  const { carData, loading, error } = useCarMakesModels();

  useEffect(() => {
    if (selectedMake) {
      const selectedCar = carData.find((car) => car.make === selectedMake);
      setFilteredModels(selectedCar ? selectedCar.models : []);
    } else {
      setFilteredModels([]);
    }
  }, [selectedMake, carData]);

  const dropdownData = {
    source: [
      { id: 1, label: "COPART" },
      { id: 2, label: "IAAI" },
    ],
    make:  carData && carData.map((car) => ({ id: car.make, label: car.make })),
    model: filteredModels.map((model) => ({ id: model, label: model })),
    tranmission: [
      { id: "Automatic", label: "Automatic" },
      { id: "Manual", label: "Manual" },
    ],
    status: [
      { id: "Stationary", label: "Stationary" },
      { id: "Run & Drive", label: "Run & Drive" },
      { id: "Starts", label: "Starts" },
    ],
    fuel: [
      { id: "Diesel", label: "Diesel" },
      { id: "Electric", label: "Electric" },
      { id: "Flexible Fuel", label: "Flexible Fuel" },
      { id: "Gasoline", label: "Gasoline" },
      { id: "Hybrid", label: "Hybrid" },
      { id: "Other", label: "Other" },
      { id: "Unknown", label: "Unknown" },
    ],
  };

  useEffect(() => {
    if (selectedFilters.make.length > 0) {
      const selectedModels = carData
        .filter((car) => selectedFilters.make.includes(car.make))
        .flatMap((car) => car.models);
      setFilteredModels(selectedModels);
    } else {
      setFilteredModels([]);
    }
  }, [selectedFilters.make, carData]);

  const [dropdownStates, setDropdownStates] = useState({
    source: false,
    make: !!initialMake, // Open make dropdown if initial make is present
    model: !!initialMake, // Open model dropdown if initial make is present
    tranmission: false,
    status: false,
    fuelType: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdown]: !prevStates[dropdown],
    }));
  };

  const handleFilterChange = (filterCategory, filterValue) => {
    if (filterCategory === "make") {
      setSelectedMake(filterValue);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        make: filterValue,
        model: "", // Clear the model when make changes
      }));
      setSelectedModel(""); // Clear selected model
    } else if (filterCategory === "model") {
      setSelectedModel(filterValue);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        model: filterValue,
      }));
    } else if (filterCategory === "year_from" || filterCategory === "year_to") {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: filterValue,
      }));
    } else {
      setSelectedFilters((prevFilters) => {
        const currentValues = prevFilters[filterCategory];
        if (currentValues.includes(filterValue)) {
          return {
            ...prevFilters,
            [filterCategory]: currentValues.filter(
              (val) => val !== filterValue
            ),
          };
        } else {
          return {
            ...prevFilters,
            [filterCategory]: [...currentValues, filterValue],
          };
        }
      });
    }
  };

  const applyFilters = () => {
    setAppliedFilters(selectedFilters);
  };

  const resetFilters = () => {
    setSelectedFilters({
      source: [],
      make: "",
      model: "",
      tranmission: [],
      status: [],
      fuel: [],
      year_from: "",
      year_to: "",
    });
    setAppliedFilters({});
    setSelectedMake("");
    setSelectedModel("");
    setFilteredModels([]);
  };

  return (
    <div className="flex justify-center gap-[3vw] w-[80vw] mx-auto font-urbanist">
      <div className="fixed lg:relative mt-[2.604vw] bg-[#1c181840]/10 lg:bg-white z-30 lg:z-0 lg:w-[17.667vw] shadow-xl rounded-lg">
        {Object.keys(dropdownData).map((dropdownKey) => (
          <div
            key={dropdownKey}
            className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200"
          >
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
              <div className="overflow-y-scroll max-h-52">
                {dropdownData[dropdownKey].map(({ id, label }) => (
                  <div key={id} className="flex items-center mb-[0.833vw]">
                    <input
                      id={id}
                      type={
                        dropdownKey === "make" || dropdownKey === "model"
                          ? "radio"
                          : "checkbox"
                      }
                      value={id}
                      onChange={() => handleFilterChange(dropdownKey, id)}
                      className="form-checkbox"
                      checked={
                        dropdownKey === "make"
                          ? selectedFilters.make === id
                          : dropdownKey === "model"
                          ? selectedFilters.model === id
                          : selectedFilters[dropdownKey].includes(id)
                      }
                    />
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

        <div className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200">
          <div className="flex items-center justify-between cursor-pointer">
            <h1 className="text-[1.3vw] text-left font-bold mb-[0.729vw]">
              Year
            </h1>
          </div>
          <div className="flex gap-[1vw]">
            <input
              id="year_from"
              name="year_from"
              type="number"
              maxLength={4}
              min={0}
              placeholder="From"
              className="form-input w-full px-2 border rounded-md py-1.5"
              value={selectedFilters.year_from}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  handleFilterChange("year_from", value);
                }
              }}
            />
            <input
              type="number"
              min={0}
              maxLength={4}
              placeholder="To"
              className="form-input w-full border px-2 rounded-md py-1.5"
              value={selectedFilters.year_to}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,4}$/.test(value)) {
                  handleFilterChange("year_to", value);
                }
              }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center my-5 gap-x-2 lg:gap-y-4">
          <button
            onClick={applyFilters}
            className="p-2 bg-[#CA0000] hover:bg-[#b30f0f] text-white rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>
      <SearchMainPage appliedFilters={appliedFilters} />
    </div>
  );
};

export default Sidebar;
