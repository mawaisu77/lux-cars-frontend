import React, { useState, useEffect, useMemo, useCallback } from "react";
import LocalSearchCards from "./LocalSearchCards";
import baseService from "../../../services/baseService";
import Select from "react-select";
import { RegionDropdown } from "react-country-region-selector";
import { showToast } from "../../../utils/Toast";
import Slider from "@mui/material/Slider";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import moment from 'moment-timezone';


const LocalSearchSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSaveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveSearchTitle, setSaveSearchTitle] = useState("");
  const queryParams = new URLSearchParams(location.search);

  const option = useMemo(
    () => [
      { value: "US", label: "United States" },
      { value: "BS", label: "Bahamas" },
    ],
    []
  );

  const [showFilters, setShowFilters] = useState(true);
  const [showMake, setShowMake] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showMilage, setShowMilage] = useState(false);
  const [showTransmission, setShowTransmission] = useState(true);
  const [showLocation, setShowLocation] = useState(false);
  const [vehicles, setVehicles] = useState(null);
  const [showtitlesStatus, setShowtitlesStatus] = useState(null);

  // Initialize filters from URL parameters
  const initialFilters = {
    make: queryParams.get("make") || "",
    model: queryParams.get("model") || "",
    yearFrom: queryParams.get("yearFrom") || null,
    yearTo: queryParams.get("yearTo") || null,
    milageFrom: queryParams.get("milageFrom") || "",
    milageTo: queryParams.get("milageTo") || "",
    transmission: queryParams.getAll("transmission") || [],
    titlesStatus: queryParams.getAll("titlesStatus") || [],
    carLocation: queryParams.get("carLocation") || "",
    carState: queryParams.get("carState") || "",
    buyNowPrice: queryParams.get("buyNowPrice") === "true",
    minPrice: queryParams.get("minPrice") === "true",
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

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
        selectedFilters.transmission.forEach((transmission) => {
          params.append("transmission", transmission); // Append each transmission type separately
        });
      }
      if (selectedFilters.carLocation)
        params.append("carLocation", selectedFilters.carLocation);
      if (selectedFilters.carState)
        params.append("carState", selectedFilters.carState);
      if (selectedFilters.buyNowPrice)
        params.append("buyNowPrice", selectedFilters.buyNowPrice);
      if (selectedFilters.minPrice)
        params.append("minPrice", selectedFilters.minPrice);
      if (selectedFilters.titlesStatus.length > 0) {
        selectedFilters.titlesStatus.forEach((titlesStatus) => {
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

  const updateURL = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((value) => params.append(key, value));
      } else if (
        filters[key] !== "" &&
        filters[key] !== null &&
        filters[key] !== false &&
        filters[key] !== undefined
      ) {
        // Updated condition
        params.append(key, filters[key]);
      }
    });
    navigate({ search: params.toString() });
  };

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = Array.isArray(prev[filterName])
        ? {
            ...prev,
            [filterName]: prev[filterName].includes(value)
              ? prev[filterName].filter((item) => item !== value)
              : [...prev[filterName], value],
          }
        : { ...prev, [filterName]: value };
      updateURL(updatedFilters);
      return updatedFilters;
    });
  };

  const handleCheckboxChange = (filterName) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev, [filterName]: !prev[filterName] };
      updateURL(updatedFilters);
      return updatedFilters;
    });
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
      titlesStatus: [],
      carLocation: "",
      carState: "",
      buyNowPrice: false,
      minPrice: false,
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

  console.log("=====>", selectedFilters);


  const saveFiltersToLocalStorage = () => {
    // Open the save dialog instead of immediately saving
    setSaveDialogOpen(true);
    setSaveSearchTitle(""); // Reset the title input
  };

  const handleSaveConfirm = () => {

      // Create a clean version of selectedFilters without null/undefined values
  const cleanFilters = {};
  
  // Iterate through all filters and only keep valid values
  Object.entries(selectedFilters).forEach(([key, value]) => {
    // Skip null or undefined values
    if (value === null || value === undefined) return;
    
    // For arrays, filter out null/undefined and only add if there are remaining items
    if (Array.isArray(value)) {
      const cleanArray = value.filter(item => item !== null && item !== undefined);
      if (cleanArray.length > 0) {
        cleanFilters[key] = cleanArray;
      }
    } 
    // For strings, only add if the value is not empty
    else if (typeof value === 'string') {
      if (value.trim() !== '') {
        cleanFilters[key] = value;
      }
    }
    // For other types (numbers, booleans, etc.), include them
    else {
      cleanFilters[key] = value;
    }
  });

    const params = new URLSearchParams(cleanFilters).toString();
    const savedFilters = JSON.parse(localStorage.getItem("savedFiltersLocalCars")) || [];
    
    // Get the title (use a default if empty)
    const title = saveSearchTitle.trim() || `Search ${savedFilters.length + 1}`;
    
    // Create object with title, timestamp and parameters
    const filterObject = {
      title: title,
      params: params,
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      timezone: moment.tz.guess()
    };
    
    // Check if filter already exists
    if (!savedFilters.some(filter => 
      (typeof filter === 'object' && filter.params === params) || 
      filter === params
    )) {
      savedFilters.push(filterObject);
      
      if (savedFilters.length > 10) {
        savedFilters.shift();
      }
      
      localStorage.setItem("savedFiltersLocalCars", JSON.stringify(savedFilters));
      alert("Filters saved successfully!");
    } else {
      alert("This filter is already saved!");
    }
    
    // Close the save dialog
    setSaveDialogOpen(false);
  };

  return (
    <div className="bg-gray-100 lg:p-[1vw] rounded-lg">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full bg-white lg:w-1/4 shadow-lg rounded-lg p-1 lg:p-[0.8vw] transition-all duration-300">
          <h2 className="font-semibold text-xl lg:text-24 mb-4 lg:mb-[1vw] bg-gray-100 w-full rounded p-2 lg:p-[0.7vw]">
            Filters
          </h2>
          <button
            className="font-semibold text-[13px] lg:text-[1vw] mb-4 w-full rounded p-3 text-white bg-blue-500 lg:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between items-center font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowMake(!showMake)}
              >
                <h3>Make</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showMake}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showMake}
                />
              </div>
              {showMake && (
                <div className="">
                  <input
                    type="text"
                    placeholder="Search Make"
                    className=" w-full bg-white p-2 lg:p-[0.5vw] text-[12px] lg:text-16"
                    value={selectedFilters.make}
                    onChange={(e) => handleFilterChange("make", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowModel(!showModel)}
              >
                <h3>Model</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showModel}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showModel}
                />
              </div>
              {showModel && (
                <div className="mt-2 pb-[0.5vw]">
                  <input
                    type="text"
                    placeholder="Search Model"
                    className="w-full bg-white p-2 lg:p-[0.5vw] text-[12px] lg:text-16"
                    value={selectedFilters.model}
                    onChange={(e) =>
                      handleFilterChange("model", e.target.value)
                    }
                  />
                </div>
              )}
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowYear(!showYear)}
              >
                <h3>Year</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showYear}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showYear}
                />
              </div>
              {showYear && (
                <div className="flex gap-x-2 items-center">
                  <div className="flex-1 ">
                    {/* <label className="text-lg text-left py-1">Year From</label> */}
                    <select
                      className="input input-bordered w-full mb-[0.5vw] bg-white   text-[12px] lg:text-[0.8vw]"
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
                      className="input input-bordered w-full mb-[0.5vw] bg-white   text-[12px] lg:text-[0.8vw]"
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

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowMilage(!showMilage)}
              >
                <h3>Milage</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showMilage}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showMilage}
                />
              </div>

              {showMilage && (
                <>
                  <div className="flex gap-x-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-white p-2 lg:p-[0.5vw] text-[12px] lg:text-16"
                        value={selectedFilters.milageFrom}
                        onChange={(e) =>
                          handleFilterChange("milageFrom", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="100000"
                        className="w-full bg-white p-2 lg:p-[0.5vw] text-[12px] lg:text-16"
                        value={selectedFilters.milageTo}
                        onChange={(e) =>
                          handleFilterChange("milageTo", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-2 pb-[1vw]">
                    <label className="text-[0.8vw] text-left py-1">
                      Milage Range
                    </label>
                    <Slider
                      value={[
                        selectedFilters.milageFrom || 0,
                        selectedFilters.milageTo || 100000,
                      ]}
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
                    <div className="text-red-500 text-[12px] lg:text-[0.8vw]">
                      {milageError}
                    </div>
                  ) : null}
                </>
              )}
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowTransmission(!showTransmission)}
              >
                <h3>Transmission</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showTransmission}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showTransmission}
                />
              </div>

              {showTransmission && (
                <div className="mt-2 pb-[1vw]">
                  <div className="flex items-center mb-1 text-[12px] lg:text-[0.8vw]">
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
                  <div className="flex items-center mb-1 text-[12px] lg:text-[0.8vw]">
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

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowtitlesStatus(!showtitlesStatus)}
              >
                <h3>Status Code</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showtitlesStatus}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showtitlesStatus}
                />
              </div>

              {showtitlesStatus && (
                <div className="mt-2 pb-[1vw]">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[12px] lg:text-[0.8vw]"
                      checked={selectedFilters.titlesStatus.includes(
                        "Stationary"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Stationary")
                      }
                    />
                    <label className="ml-2 text-[12px] lg:text-[0.8vw]">
                      Stationary
                    </label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[12px] lg:text-[0.8vw]"
                      checked={selectedFilters.titlesStatus.includes(
                        "Run & Drive"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Run & Drive")
                      }
                    />
                    <label className="ml-2 text-[12px] lg:text-[0.8vw]">
                      Run & Drive
                    </label>
                  </div>

                  <div className="flex items-center mb-1 text-[12px] lg:text-[0.8vw]">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[12px] lg:text-[0.8vw]"
                      checked={selectedFilters.titlesStatus.includes("Starts")}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Starts")
                      }
                    />
                    <label className="ml-2">Starts</label>
                  </div>

                  <div className="flex items-center mb-1 text-[12px] lg:text-[0.8vw]">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[12px] lg:text-[0.8vw]"
                      checked={selectedFilters.titlesStatus.includes(
                        "Can't test"
                      )}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Can't test")
                      }
                    />
                    <label className="ml-2">Can't test</label>
                  </div>

                  <div className="flex items-center mb-1 text-[12px] lg:text-[0.8vw]">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[12px] lg:text-[0.8vw]"
                      checked={selectedFilters.titlesStatus.includes("Unknown")}
                      onChange={() =>
                        handleFilterChange("titlesStatus", "Unknown")
                      }
                    />
                    <label className="ml-2">Unknown</label>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div
                className="flex justify-between font-medium cursor-pointer text-[13px] lg:text-18  text-left"
                onClick={() => setShowLocation(!showLocation)}
              >
                <h3>Location</h3>
                <MdKeyboardArrowDown
                  className="text-[16px] lg:text-22"
                  hidden={showLocation}
                />
                <MdKeyboardArrowUp
                  className="text-[16px] lg:text-22"
                  hidden={!showLocation}
                />
              </div>

              {showLocation && (
                <div className="mt-2 pb-[1vw] text-[12px] lg:text-[0.8vw]">
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
                        className="input input-bordered w-full mb-[0.5vw] bg-white text-[12px] lg:text-[0.8vw]"
                        placeholder="Select state"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div className="flex items-center text-[13px] lg:text-18 font-medium ">
                <input
                  type="checkbox"
                  className="form-checkbox text-[12px] lg:text-[0.8vw]"
                  checked={selectedFilters.buyNowPrice}
                  onChange={() => handleCheckboxChange("buyNowPrice")}
                />
                <label className="ml-2">Buy Now</label>
              </div>
            </div>

            <div className="mb-4 lg:mb-[0.5vw] border-b border-black p-1 lg:p-[0.5vw]">
              <div className="flex items-center text-[13px] lg:text-18  font-medium ">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedFilters.minPrice}
                  onChange={() => handleCheckboxChange("minPrice")}
                />
                <label className="ml-2">Reserve Price</label>
              </div>
            </div>
            <div className="w-full flex-col   gap-2 lg:gap-[0.5vw]  flex   justify-evenly mt-10 lg:mt-[2vw]">
              <button
                onClick={handleResetFilters}
                className="text-black text-[16px] lg:text-18 bg-gray-200 p-2 lg:p-[0.4vw] rounded-lg lg:rounded-[0.5vw]"
              >
                Reset Filters
              </button>

              <button
                onClick={saveFiltersToLocalStorage}
                className="p-2 lg:p-[0.4vw] text-[16px] lg:text-18 rounded-lg lg:rounded-[0.5vw] bg-gradient-to-r from-red-600 to-red-700 hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 text-white font-urbanist font-semibold hover:opacity-90 duration-300 w-full "
              >
                Save Filters
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

         {/* Save Search Dialog */}
         {isSaveDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-blue-600">Save Search</h3>
              <button 
                onClick={() => setSaveDialogOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <input
                type="text"
                placeholder="Please enter a title to save your search."
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={saveSearchTitle}
                onChange={(e) => setSaveSearchTitle(e.target.value)}
              />
            </div>
            
            <div className="p-4 border-t flex justify-center">
              <button
                onClick={handleSaveConfirm}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalSearchSidebar;
