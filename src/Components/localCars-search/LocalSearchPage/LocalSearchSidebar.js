import React, { useState, useEffect, useMemo, useCallback } from "react";
import LocalSearchCards from "./LocalSearchCards";
import baseService from "../../../services/baseService";
import countryList from "react-select-country-list";
import Select from "react-select";
import { RegionDropdown } from "react-country-region-selector";
import { showToast } from "../../../utils/Toast";
import Slider from "@mui/material/Slider";

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
  const [showtitlesStatus, setShowtitlesStatus] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    make: "",
    model: "",
    yearFrom: null,
    yearTo: null,
    milageFrom: "",
    milageTo: "",
    transmission: [],
    titlesStatus:[],
    carLocation: "",
    carState: "",
    buyNowPrice: false, 
    minPrice: false,  
  });

  const [pageNo, setPageNo] = useState(1);
  const [totalCars, setTotalCars] = useState(0);

  const fetchVehiclesData = async (selectedFilters) => {
    const params = new URLSearchParams();

    if (selectedFilters) {
      if (selectedFilters.make) params.append("make", selectedFilters.make);
      if (selectedFilters.model) params.append("model", selectedFilters.model);
      if (selectedFilters.yearFrom)
        params.append("yearFrom", selectedFilters.yearFrom);
      if (selectedFilters.yearTo)
        params.append("yearTo", selectedFilters.yearTo);
      if (selectedFilters.milageFrom)
        params.append("milageFrom", selectedFilters.milageFrom);
      if (selectedFilters.milageTo)
        params.append("milageTo", selectedFilters.milageTo);
      if (selectedFilters.transmission.length > 0) {
        selectedFilters.transmission.forEach(transmission => {
          params.append("transmission", transmission); // Append each transmission type separately
        });
      }
      if (selectedFilters.carLocation)
        params.append("carLocation", selectedFilters.carLocation);
      if (selectedFilters.carState)
        params.append("carState", selectedFilters.carState);
      if (selectedFilters.buyNowPrice) params.append("buyNowPrice", selectedFilters.buyNowPrice);
      if (selectedFilters.minPrice) params.append("minPrice", selectedFilters.minPrice);
      if (selectedFilters.titlesStatus.length > 0) {
        selectedFilters.titlesStatus.forEach(titlesStatus => {
          params.append("titlesStatus", titlesStatus);
        });
      }
    }
    try {
      const response = await baseService.get(
        `/local-cars/get-all-local-cars?page=${pageNo}&status=Approved&${params.toString()}`
      );
      return response?.data?.data;
    } catch (error) {
      showToast("No Car Found", "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVehiclesData(selectedFilters);
      setVehicles(data?.cars);
      setTotalCars(data?.totalLength);
    };
    fetchData();
  }, [pageNo]);

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

  const handleCheckboxChange = (filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const [milageError, setMilageError] = useState("");

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedHandleApplyFilters = useCallback(
    debounce(async (filters) => {
      if (
        filters.milageFrom &&
        filters.milageTo &&
        parseInt(filters.milageTo) <= parseInt(filters.milageFrom)
      ) {
        setMilageError("Enter a larger Mileage To value");
        showToast("Mileage To must be greater than Mileage From", "error");
        return;
      } else {
        setMilageError("");
      }
  
      setPageNo(1); // Reset page before fetching
  
      const data = await fetchVehiclesData(filters);
      setVehicles(data?.cars);
      setTotalCars(data?.totalLength);
    }, 500),
    []
  );
  
  useEffect(() => {
    debouncedHandleApplyFilters(selectedFilters);
  }, [selectedFilters]);

  const handleResetFilters = async () => {
    const data = await fetchVehiclesData();
    setVehicles(data?.cars);
    setTotalCars(data?.totalLength);
    setSelectedFilters({
      make: "",
      model: "",
      yearFrom: null,
      yearTo: null,
      milageFrom: "",
      milageTo: "",
      transmission: [],
      titlesStatus:[],
      carLocation: "",
      carState: "",
      buyNowPrice: false,
      minPrice: false
    });
    setShowLocation(false);
    setShowMake(false);
    setShowMilage(false);
    setShowTransmission(true);
    setShowModel(false);
    setShowYear(false);
    setShowtitlesStatus(false);
    setVehicles(data?.cars);
    setPageNo(1);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full bg-white lg:w-1/4 shadow-lg rounded-lg p-[1vw] transition-all duration-300">
          <h2 className="font-semibold text-2xl mb-4 bg-gray-100 w-full rounded p-3">
            Filters
          </h2>
          <button
            className="font-semibold text-[13px] lg:text-[1vw] mb-4 w-full rounded p-3 text-white bg-blue-500 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowMake(!showMake)}
              >
                <h3>Make</h3>
                <span>{showMake ? "-" : "+"}</span>
              </div>
              {showMake && (
                <div className="mt-2 pb-[1vw]">
                  <input
                    type="text"
                    placeholder="Search Make"
                    className="input input-bordered w-full mb-[0.5vw] bg-white   text-[13px] lg:text-[1vw]"
                    value={selectedFilters.make}
                    onChange={(e) => handleFilterChange("make", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowModel(!showModel)}
              >
                <h3>Model</h3>
                <span>{showModel ? "-" : "+"}</span>
              </div>
              {showModel && (
                <div className="mt-2 pb-[0.5vw]">
                  <input
                    type="text"
                    placeholder="Search Model"
                    className="input input-bordered w-full mb-[0.5vw] bg-white"
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
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowYear(!showYear)}
              >
                <h3>Year</h3>
                <span>{showYear ? "-" : "+"}</span>
              </div>
              {showYear && (
                <div className="flex gap-x-2 items-center">
                  <div className="flex-1 ">
                    {/* <label className="text-lg text-left py-1">Year From</label> */}
                    <select
                      className="input input-bordered w-full mb-[0.5vw] bg-white"
                      value={selectedFilters.yearFrom}
                      onChange={(e) =>
                        handleFilterChange("yearFrom", e.target.value)
                      }
                    >
                      <option value="">From Year</option>
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
                  <div className="flex-1">
                    {/* <label className="text-lg text-left py-1">Year To</label> */}
                    <select
                      className="input input-bordered w-full mb-[0.5vw] bg-white"
                      value={selectedFilters.yearTo}
                      onChange={(e) =>
                        handleFilterChange("yearTo", e.target.value)
                      }
                    >
                      <option value="">To Year</option>
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
                </div>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowMilage(!showMilage)}
              >
                <h3>Milage</h3>
                <span>{showMilage ? "-" : "+"}</span>
              </div>

              {showMilage && (
                <>
                <div className="flex gap-x-2">    
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="0"
                      className="input input-bordered w-full mb-[0.5vw] bg-white"
                      value={selectedFilters.milageFrom}
                      onChange={(e) => handleFilterChange("milageFrom", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="100000"
                      className="input input-bordered w-full mb-[0.5vw] bg-white"
                      value={selectedFilters.milageTo}
                      onChange={(e) => handleFilterChange("milageTo", e.target.value)}
                    />
                  </div>
                </div>


                  <div className="mt-2 pb-[1vw]">
                    <label className="text-lg text-left py-1">Milage Range</label>
                    <Slider
                      value={[selectedFilters.milageFrom || 0, selectedFilters.milageTo || 100000]}
                      onChange={(e, newValue) => {
                        handleFilterChange("milageFrom", newValue[0]);
                        handleFilterChange("milageTo", newValue[1]);
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={100000} // Adjust max value as needed
                    />
                  </div>
                  {milageError ? (
                    <div className="text-red-500">{milageError}</div>
                  ) : null}
                </>
              )}
            </div>

            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowTransmission(!showTransmission)}
              >
                <h3>Transmission</h3>
                <span>{showTransmission ? "-" : "+"}</span>
              </div>

              {showTransmission && (
                <div className="mt-2 pb-[1vw]">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
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
                      className="form-checkbox"
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
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowtitlesStatus(!showtitlesStatus)}
              >
                <h3>Status Code</h3>
                <span>{showtitlesStatus ? "-" : "+"}</span>
              </div>

              {showtitlesStatus && (
                <div className="mt-2 pb-[1vw]">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.titlesStatus.includes(
                        "Stationary"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Stationary")
                      }
                    />
                    <label className="ml-2">Stationary</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.titlesStatus.includes(
                        "Run & Drive"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Run & Drive")
                      }
                    />
                    <label className="ml-2">Run & Drive</label>
                  </div>

                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.titlesStatus.includes(
                        "Starts"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Starts")
                      }
                    />
                    <label className="ml-2">Starts</label>
                  </div>

                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.titlesStatus.includes(
                        "Can't test"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Can't test")
                      }
                    />
                    <label className="ml-2">Can't test</label>
                  </div>

                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={selectedFilters.titlesStatus.includes(
                        "Unknown"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Unknown")
                      }
                    />
                    <label className="ml-2">Unknown</label>
                  </div>
                  
                </div>
              )}
            </div>



            <div className="mb-4 border-b border-black">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-[1vw] p-2 text-left"
                onClick={() => setShowLocation(!showLocation)}
              >
                <h3>Location</h3>
                <span>{showLocation ? "-" : "+"}</span>
              </div>

              {showLocation && (
                <div className="mt-2 pb-[1vw]">
                  <div className="mb-1">
                    <Select
                      className="text-left"
                      value={option.find(
                        (opt) => opt.label === selectedFilters.carLocation
                      )}
                      onChange={(e) =>
                        handleFilterChange("carLocation", e.label)
                      }
                      options={option}
                      placeholder="Select Car Location"
                    />
                  </div>
                  {selectedFilters.carLocation && (
                    <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
                      <label className="font-medium text-xl text-left">
                        Select Car's State
                      </label>
                      <RegionDropdown
                        country={selectedFilters.carLocation}
                        value={selectedFilters.carState}
                        onChange={(e) => handleFilterChange("carState", e)}
                        className="input input-bordered w-full mb-[0.5vw] bg-white"
                        placeholder="Select state"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="mb-4 border-b border-black">
            <div className="flex items-center text-[13px] lg:text-[1vw] font-medium p-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedFilters.buyNowPrice}
                onChange={() => handleCheckboxChange("buyNowPrice")}
              />
              <label className="ml-2">Buy Now</label>
            </div>
          </div>

          <div className="mb-4 border-b border-black">
          <div className="flex items-center text-[13px] lg:text-[1vw] font-medium p-2">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedFilters.minPrice}
                onChange={() => handleCheckboxChange("minPrice")}
              />
              <label className="ml-2">Reserve Price</label>
            </div>
          </div>
            <div className="w-full flex justify-evenly mt-10">
              <button
                onClick={handleResetFilters}
                className="text-black bg-gray-200 w-[45%] p-[0.4rem] rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>
        <section className="w-full lg:w-3/4">
          <LocalSearchCards
            vehicles={vehicles}
            pageNo={pageNo}
            totalCars={totalCars}
            setPageNo={setPageNo}
          />
        </section>
      </div>
    </div>
  );
};

export default LocalSearchSidebar;