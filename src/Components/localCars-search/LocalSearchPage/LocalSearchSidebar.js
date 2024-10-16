import React, { useState, useEffect, useMemo } from "react";
import LocalSearchCards from "./LocalSearchCards";
import baseService from "../../../services/baseService";
import countryList from "react-select-country-list";
import Select from "react-select";
import { RegionDropdown } from "react-country-region-selector";
import { showToast } from "../../../utils/Toast";

const LocalSearchSidebar = () => {
  const option = useMemo(() => countryList().getData(), []);

  const [showFilters, setShowFilters] = useState(true);
  const [showMake, setShowMake] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showMilage, setShowMilage] = useState(false);
  const [showTransmission, setShowTransmission] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [vehicles, setVehicles] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    make: "",
    model: "",
    yearFrom: null,
    yearTo: null,
    milageFrom: "",
    milageTo: "",
    transmission: [],
    country: "",
    region: "",
  });

  const fetchVehiclesData = async (selectedFilters) => {
    const response = await baseService.get(
      `/local-cars/get-all-approved-local-cars?make=${selectedFilters?.make}&model=${selectedFilters?.model}&yearFrom=${selectedFilters?.yearFrom}&yearTo=${selectedFilters?.yearTo}&milageFrom=${selectedFilters?.milageFrom}&milageTo=${selectedFilters?.milageTo}&transmission=${selectedFilters?.transmission}&country=${selectedFilters?.country}&region=${selectedFilters?.region}`
    );
    return response?.data?.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehiclesData();
      setVehicles(data?.cars);
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => {
      if (Array.isArray(prev[filterName])) {
        return {
          ...prev,
          [filterName]: prev[filterName].includes(value)
            ? prev[filterName].filter((item) => item !== value)
            : [...prev[filterName], value],
        };
      } else {
        return { ...prev, [filterName]: value };
      }
    });
  };

  const [milageError, setMilageError] = useState("");
  const handleApplyFilters = async () => {
    if (
      parseInt(selectedFilters.milageTo) > parseInt(selectedFilters.milageFrom)
    ) {
      setMilageError("");
      const data = await fetchVehiclesData(selectedFilters);
      setVehicles(data?.cars);
    } else {
      setMilageError("Enter Large Milage To");
      showToast("Your Milage To Is Less Than Milage From", "error");
    }
  };

  const handleResetFilters = async () => {
    const data = await fetchVehiclesData();
    setSelectedFilters({
      make: "",
      model: "",
      yearFrom: null,
      yearTo: null,
      milageFrom: "",
      milageTo: "",
      transmission: [],
      country: "",
      region: "",
    });
    setShowLocation(false);
    setShowMake(false);
    setShowMilage(false);
    setShowTransmission(true);
    setShowModel(false);
    setShowYear(false);
    setVehicles(data?.cars);
  };

  return (
    <div className="bg-gray-200 p-12 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-1/4 bg-base-100 shadow-lg rounded-lg p-4 transition-all duration-300">
          <h2 className="font-semibold text-2xl mb-4 bg-gray-200 w-full rounded p-3">
            Filters
          </h2>
          <button
            className="font-semibold text-2xl mb-4 w-full rounded p-3 text-white bg-blue-500 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowMake(!showMake)}
              >
                <h3>Make</h3>
                <span>{showMake ? "-" : "+"}</span>
              </div>
              {showMake && (
                <div className="mt-2 pb-4">
                  <input
                    type="text"
                    placeholder="Search Make"
                    className="input input-bordered w-full mb-2"
                    value={selectedFilters.make}
                    onChange={(e) => handleFilterChange("make", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowModel(!showModel)}
              >
                <h3>Model</h3>
                <span>{showModel ? "-" : "+"}</span>
              </div>
              {showModel && (
                <div className="mt-2 pb-4">
                  <input
                    type="text"
                    placeholder="Search Model"
                    className="input input-bordered w-full mb-2"
                    value={selectedFilters.model}
                    onChange={(e) =>
                      handleFilterChange("model", e.target.value)
                    }
                  />
                </div>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowYear(!showYear)}
              >
                <h3>Year</h3>
                <span>{showYear ? "-" : "+"}</span>
              </div>
              {showYear && (
                <>
                  <div className="flex flex-col mt-2 pb-4">
                    <label className="text-lg text-left py-1">Year From</label>
                    <select
                      className="input input-bordered w-full mb-2"
                      value={selectedFilters.yearFrom}
                      onChange={(e) =>
                        handleFilterChange("yearFrom", e.target.value)
                      }
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        { length: new Date().getFullYear() - 1950 + 1 },
                        (_, i) => 1950 + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mt-2 pb-4">
                    <label className="text-lg text-left py-1">Year To</label>
                    <select
                      className="input input-bordered w-full mb-2"
                      value={selectedFilters.yearTo}
                      onChange={(e) =>
                        handleFilterChange("yearTo", e.target.value)
                      }
                    >
                      <option value="">Select Year</option>
                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() -
                            (selectedFilters.yearFrom
                              ? parseInt(selectedFilters.yearFrom)
                              : 1950) +
                            1,
                        },
                        (_, i) =>
                          (selectedFilters.yearFrom
                            ? parseInt(selectedFilters.yearFrom)
                            : 1950) + i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowMilage(!showMilage)}
              >
                <h3>Milage</h3>
                <span>{showMilage ? "-" : "+"}</span>
              </div>
              {showMilage && (
                <>
                  <div className="mt-2 pb-4">
                    <input
                      type="number"
                      placeholder="Enter Milage From"
                      className="input input-bordered w-full mb-2"
                      value={selectedFilters.milageFrom}
                      onChange={(e) =>
                        handleFilterChange("milageFrom", e.target.value)
                      }
                    />
                  </div>
                  <div className="mt-2 pb-4">
                    <input
                      type="number"
                      placeholder="Enter Milage To"
                      className={`input input-bordered w-full mb-2 ${
                        milageError ? "border-red-500" : ""
                      }`}
                      value={selectedFilters.milageTo}
                      onChange={(e) =>
                        handleFilterChange("milageTo", e.target.value)
                      }
                    />
                    {milageError ? (
                      <div className="text-red-500">{milageError}</div>
                    ) : null}
                  </div>
                </>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowTransmission(!showTransmission)}
              >
                <h3>Transmission</h3>
                <span>{showTransmission ? "-" : "+"}</span>
              </div>

              {showTransmission && (
                <div className="mt-2 pb-4">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedFilters.transmission.includes(
                        "Automatic"
                      )}
                      onChange={() =>
                        handleFilterChange("transmission", "Automatic")
                      }
                    />
                    <label className="ml-2">Automatic</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedFilters.transmission.includes("Manual")}
                      onChange={() =>
                        handleFilterChange("transmission", "Manual")
                      }
                    />
                    <label className="ml-2">Manual</label>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-xl p-2 text-left"
                onClick={() => setShowLocation(!showLocation)}
              >
                <h3>Location</h3>
                <span>{showLocation ? "-" : "+"}</span>
              </div>

              {showLocation && (
                <div className="mt-2 pb-4">
                  <div className="mb-1">
                    <Select
                      className="text-left"
                      value={option.find(
                        (opt) => opt.label === selectedFilters.country
                      )}
                      onChange={(e) => handleFilterChange("country", e.label)}
                      options={option}
                      placeholder="Select country"
                    />
                  </div>
                  {selectedFilters.country && (
                    <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
                      <label className="font-medium text-xl text-left">
                        Select Region
                      </label>
                      <RegionDropdown
                        country={selectedFilters.country}
                        value={selectedFilters.region}
                        onChange={(e) => handleFilterChange("region", e)}
                        className="input input-bordered w-full mb-2"
                        placeholder="Select state"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="w-full flex justify-evenly mt-10">
              <button
                onClick={handleApplyFilters}
                className="text-white bg-red-600 w-[45%] p-2 rounded-lg"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="text-black bg-gray-200 w-[45%] p-2 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>
        <section className="w-full lg:w-3/4">
          <LocalSearchCards vehicles={vehicles} />
        </section>
      </div>
    </div>
  );
};

export default LocalSearchSidebar;
