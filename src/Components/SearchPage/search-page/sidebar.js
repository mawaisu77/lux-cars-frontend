import React, { useEffect, useMemo, useState } from "react";
import SearchMainPage from "../search-page/searchMainPage";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { useLocation, useNavigate } from "react-router-dom";
import {
  damageOptions,
  primaryDamageAPIKey,
  primaryDamageLabel,
  secondaryDamageAPIKey,
  secondaryDamageLabel,
} from "../../../utils/filtersData/damageOptions";
import {
  fuelAPIKey,
  fuelLabel,
  fuelOptions,
} from "../../../utils/filtersData/fuelOptions";
import {
  stateAPIKey,
  stateOptions,
} from "../../../utils/filtersData/stateOptions";
import "./searchPage.css";
import { colorAPIKey, colorOptions, getColorStyle } from "../../../utils/filtersData/colorOptions";
import { locationAPIKey, locationOptions } from "../../../utils/filtersData/locationOptions";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";
import { vehicleTypeAPIKey, vehicleTypeLabel, vehicleTypeOptions } from "../../../utils/filtersData/vehicleTypeOptions";
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilterMob, setShowFiltersMob] = useState(false);
  const [searchFilterDropdowns, setSearchFilterDropdowns] = useState({});
  const [showAllFilters, setShowAllFilters] = useState({}); 
  const [auctionDateFrom, setAuctionDateFrom] = useState("");
  const [auctionDateTo, setAuctionDateTo] = useState("");
  const [customDatesVisible, setCustomDatesVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); 

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialMake = queryParams.get("make") || "";
  const initialModel = queryParams.get("model") || "";
  const initialFromYear = queryParams.get("year_from") || "";
  const initialToYear = queryParams.get("year_to") || "";
  const initialPartner = queryParams.get("partner") || "";
  const initialVehicleTyoe = queryParams.get("vehicle_type") || "";
  const initialTransmission = useMemo(
    () => queryParams.getAll("transmission") || [],
    [queryParams]
  );
  const initialStatus = useMemo(
    () => queryParams.getAll("status") || [],
    [queryParams]
  );
  const initialFuel = useMemo(
    () => queryParams.getAll("fuel") || [],
    [queryParams]
  );
  const initialDrive = useMemo(
    () => queryParams.getAll("drive") || [],
    [queryParams]
  );
  const initialDamage = useMemo(
    () => queryParams.getAll("damage_pr") || [],
    [queryParams]
  );
  const initialSecondaryDamage = useMemo(
    () => queryParams.getAll("damage_sec") || [],
    [queryParams]
  );
  const initialState = useMemo(
    () => queryParams.getAll("state") || [],
    [queryParams]
  );
  const initialLocation = useMemo(
    () => queryParams.getAll("location") || [],
    [queryParams]
  );
  const initialColor = useMemo(
    () => queryParams.getAll("color") || [],
    [queryParams]
  );
  const initialFromOdometer = queryParams.get("odometer_from") || "";
  const initialToOdometer = queryParams.get("odometer_to") || "";


  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedMake, setSelectedMake] = useState(initialMake);
  const [selectedFilters, setSelectedFilters] = useState({
    site: initialPartner || "",
    make: initialMake,
    model: initialModel,
    transmission: initialTransmission,
    status: initialStatus,
    fuel: initialFuel,
    drive: initialDrive,
    state: initialState,
    location: initialLocation,
    color: initialColor,
    damage_pr: initialDamage,
    damage_sec: initialSecondaryDamage,
    year_from: initialFromYear || "",
    year_to: initialToYear || "",
    vehicle_type: initialVehicleTyoe || "",
    odometer_from: initialFromOdometer || "",
    odometer_to: initialToOdometer || "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    site: initialPartner || "",
    make: initialMake,
    model: initialModel,
    transmission: initialTransmission,
    status: initialStatus,
    fuel: initialFuel,
    drive: initialDrive,
    state: initialState,
    location: initialLocation,
    color: initialColor,
    damage_pr: initialDamage,
    damage_sec: initialSecondaryDamage,
    year_from: initialFromYear || "",
    year_to: initialToYear || "",
    vehicle_type: initialVehicleTyoe || "" ,
    odometer_from: initialFromOdometer || "",
    odometer_to: initialToOdometer || "",
  });

  const [filteredModels, setFilteredModels] = useState([]);
  const { carData } = useCarMakesModels();

  useEffect(() => {
    if (selectedMake) {
      const selectedCar = carData.find((car) => car.make === selectedMake);
      setFilteredModels(selectedCar ? selectedCar.models : []);
    } else {
      setFilteredModels([]);
    }
  }, [selectedMake, carData]);

  // Load initial data based on query params
  useEffect(() => {
    if (
      initialMake ||
      initialPartner ||
      initialModel ||
      initialFromYear ||
      initialToYear ||
      initialVehicleTyoe ||
      initialTransmission.length > 0 ||
      initialStatus.length > 0 ||
      initialFuel.length > 0 ||
      initialDrive.length > 0 ||
      initialState.length > 0 ||
      initialLocation.length > 0 ||
      initialState.color > 0 ||
      initialDamage.length > 0 ||
      initialSecondaryDamage.length > 0 ||
      initialFromOdometer ||
      initialToOdometer
    ) {
      setAppliedFilters({
        site: initialPartner,
        make: initialMake,
        model: initialModel,
        vehicle_type: initialVehicleTyoe,
        transmission: initialTransmission,
        status: initialStatus,
        fuel: initialFuel,
        drive: initialDrive,
        state: initialState,
        location: initialLocation,
        color: initialColor,
        damage_pr: initialDamage,
        damage_sec: initialSecondaryDamage,
        year_from: initialFromYear,
        year_to: initialToYear,
        odometer_from: initialFromOdometer,
        odometer_to: initialToOdometer,
      });
    }
  }, [
    initialMake,
    initialPartner,
    initialModel,
    initialVehicleTyoe,
    initialFromYear,
    initialToYear,
    initialTransmission,
    initialStatus,
    initialFuel,
    initialDrive,
    initialLocation,
    initialState,
    initialColor,
    initialDamage,
    initialSecondaryDamage,
    initialFromOdometer,
    initialToOdometer,
  ]);

  // Apply filters and update query parameters
  const applyFilters = () => {
    setAppliedFilters({
      ...selectedFilters,
      auction_date_from: auctionDateFrom,
      auction_date_to: auctionDateTo,
    });

    const params = new URLSearchParams();

    Object.keys(selectedFilters).forEach((key) => {
      if (selectedFilters[key] && selectedFilters[key].length > 0) {
        if (Array.isArray(selectedFilters[key])) {
          selectedFilters[key].forEach((val) => {
            params.append(key, val);
          });
        } else {
          params.set(key, selectedFilters[key]);
        }
      }
    });

    // Add auction dates to the query parameters
    if (auctionDateFrom) params.set("auction_date_from", auctionDateFrom);
    if (auctionDateTo) params.set("auction_date_to", auctionDateTo);

    console.log(appliedFilters)
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      site: "",
      make: "",
      model: "",
      vehicle_type:"",
      transmission: [],
      status: [],
      fuel: [],
      drive: [],
      state: [],
      location: [],
      color: [],
      damage_pr: [],
      damage_sec: [],
      year_from: "",
      year_to: "",
      odometer_from: "",
      odometer_to: "",
    });
    setAppliedFilters({});
    setSelectedMake("");
    setSelectedModel("");
    setFilteredModels([]);
    // Reset query parameters in the URL
    navigate(location.pathname);
  };

  const dropdownData = {
    site: [
      { id: 1, label: "COPART" },
      { id: 2, label: "IAAI" },
    ],
    make: carData && carData.map((car) => ({ id: car.make, label: car.make })),
    model: filteredModels.map((model) => ({ id: model, label: model })),
    [vehicleTypeAPIKey]: vehicleTypeOptions,
    transmission: [
      { id: "Automatic", label: "Automatic" },
      { id: "Manual", label: "Manual" },
    ],
    drive: [
      { id: "Rear Wheel Drive", label: "Rear Wheel Drive" },
      { id: "Front Wheel Drive", label: "Front Wheel Drive" },
      { id: "All Wheel Drive", label: "All Wheel Drive" },
      { id: "Unknown", label: "Unknown" },
    ],
    [stateAPIKey]: stateOptions,
    damage_pr: damageOptions,
    damage_sec: damageOptions,
    status: [
      { id: "Stationary", label: "Stationary" },
      { id: "Run & Drive", label: "Run & Drive" },
      { id: "Starts", label: "Starts" },
      { id: "Can't test", label: "Can't test" },
      { id: "Unknown", label: "Unknown" },
    ],
    [locationAPIKey]:locationOptions,
    fuel: fuelOptions,
    [colorAPIKey]:colorOptions
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
    site: !!initialPartner,
    make: !!initialMake,
    model: !!initialMake,
    transmission: !!initialTransmission,
    status: !!initialStatus,
    fuelType: !!initialFuel,
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
        model: "",
      }));
      setSelectedModel(""); // Clear selected model
    } else if (filterCategory === "model") {
      setSelectedModel(filterValue);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        model: filterValue,
      }));
    } else if (
      filterCategory === "year_from" ||
      filterCategory === "year_to" ||
      filterCategory === "odometer_from" ||
      filterCategory === "odometer_to"
    ) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: filterValue,
      }));
    }
    else if (filterCategory === "vehicle_type") {
      // Radio behavior: Only one vehicle type can be selected
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: [filterValue], // Replace with new value
      }))}
     else {
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

  // resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // For desktop screens (lg and above)
        setShowFiltersMob(true); // Filters open by default
      } else {
        // For smaller screens (md and below)
        setShowFiltersMob(false); // Filters hidden by default
      }
    };

    // Set the initial state based on the current window size
    handleResize();

    // Add an event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // date filters useeffect
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const auctionDateFromParam = params.get("auction_date_from");
    const auctionDateToParam = params.get("auction_date_to");
  
    if (auctionDateFromParam && auctionDateToParam) {
      setAuctionDateFrom(auctionDateFromParam);
      setAuctionDateTo(auctionDateToParam);
  
      const today = new Date().toISOString().split('T')[0];
  
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
  
      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
  
      const auctionDateFrom = auctionDateFromParam;
      const auctionDateTo = auctionDateToParam;
  
      // Check for "Today" filter
      if (auctionDateFrom === today && auctionDateTo === today) {
        setSelectedOption("today");
        setCustomDatesVisible(false);
      }
      // Check for "This Week" filter
      else if (
        auctionDateFrom === startOfWeek.toISOString().split('T')[0] &&
        auctionDateTo === endOfWeek.toISOString().split('T')[0]
      ) {
        setSelectedOption("thisWeek");
        setCustomDatesVisible(false);
      }
      // Check for "This Month" filter
      else if (
        auctionDateFrom === startOfMonth.toISOString().split('T')[0] &&
        auctionDateTo === endOfMonth.toISOString().split('T')[0]
      ) {
        setSelectedOption("thisMonth");
        setCustomDatesVisible(false);
      }
      // If none of the predefined filters match, set it to "Custom"
      else {
        setSelectedOption("custom");
        setCustomDatesVisible(true);
      }
    }
  }, [location.search]);
  
  // Function to toggle filters only on smaller screens
  const handleFilters = () => {
    const isSmallScreen = window.innerWidth < 1024; // `lg` breakpoint in Tailwind
    if (isSmallScreen) {
      console.log("Toggling filters on small screen");
      setShowFiltersMob(!showFilterMob);
    }
  };

  const filterDisplayNames = {
    [primaryDamageAPIKey]: primaryDamageLabel,
    [secondaryDamageAPIKey]: secondaryDamageLabel,
    [fuelAPIKey]: fuelLabel,
    [vehicleTypeAPIKey]: vehicleTypeLabel,
  };

  // Function to update search terms for a specific dropdown filter
  const handleSearch = (dropdownKey, value) => {
    setSearchFilterDropdowns((prev) => ({ ...prev, [dropdownKey]: value }));
  };

  // Function to toggle "See All" for a specific dropdown
  const toggleSeeAll = (dropdownKey) => {
    setShowAllFilters((prev) => ({
      ...prev,
      [dropdownKey]: !prev[dropdownKey], // Toggle only the clicked dropdown
    }));
  };

  const handleAuctionDateFilter = (option) => {
    setSelectedOption(option);
    const today = new Date();
    let fromDate, toDate;

    if (option === "today") {
      fromDate = toDate = today.toISOString().split("T")[0];
    } else if (option === "thisWeek") {
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(today.setDate(today.getDate() + 6));
      fromDate = startOfWeek.toISOString().split("T")[0];
      toDate = endOfWeek.toISOString().split("T")[0];
    } else if (option === "thisMonth") {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      fromDate = startOfMonth.toISOString().split("T")[0];
      toDate = endOfMonth.toISOString().split("T")[0];
    } else if (option === "custom") {
      setCustomDatesVisible(true); 
      return;
    }

    setAuctionDateFrom(fromDate);
    setAuctionDateTo(toDate);
    setCustomDatesVisible(false); // Hide custom date fields if not custom
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-center gap-[3vw] w-[80vw] bg-gray-100 mt-10 px-5 mx-auto font-urbanist ">
        <h2 className="lg:hidden text-[42px] font-bold ">Fliters</h2>{" "}
        {showFilterMob && (
          <div className=" lg:relative lg:mt-[2.604vw] h-fit mx-auto px-3 bg-white lg:bg-white z-50 lg:z-0 w-[100%] lg:w-[17vw]  rounded-lg">
            <div className="border-b-black  p-1 border-b flex justify-center items-center gap-x-2">
              <h4 className="font-semibold">Filters</h4>
              <TooltipInfo content="Please choose your preferred filters, then click the 'Apply Filters' button at the bottom. If you wish to clear the filters, you can also use the 'Reset' button next to the 'Apply Filters' option.">
                  <BsInfoCircle
                    size={15}
                    className={` hover:text-blue-800 duration-200`}
                  />
                </TooltipInfo>
            </div>
            {Object.keys(dropdownData).map((dropdownKey) => (
              <div
                key={dropdownKey}
                className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200"
              >
                <div
                  className="flex items-center justify-between cursor-pointer "
                  onClick={() => toggleDropdown(dropdownKey)}
                >
                  <h1 className="text-[18px] lg:text-[1.1vw]  text-left font-bold mb-[0.729vw]">
                    {filterDisplayNames[dropdownKey] ||
                      dropdownKey.charAt(0).toUpperCase() +
                        dropdownKey.slice(1)}
                  </h1>
                  <svg
                    className={`w-[15px]  lg:w-[1vw] h-[15px] lg:h-[1vw] transition-transform duration-200 ${
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
                  <>
                    {/* Search bar */}
                    <input
                      type="text"
                      placeholder={`Search ${dropdownKey}`}
                      className="form-input flex justify-start mb-3 px-2 py-1 text-xs border border-gray-600 rounded-md w-[90%]"
                      value={searchFilterDropdowns[dropdownKey] || ""}
                      onChange={(e) =>
                        handleSearch(dropdownKey, e.target.value)
                      }
                    />
                    <div
                      className={` max-h-52 scrollbar-red ${
                        dropdownData[dropdownKey].length > 5
                          ? "overflow-y-scroll"
                          : ""
                      }`}
                    >
                      {/* Filtered list of options */}
                      {dropdownData[dropdownKey]
                        .filter(({ label }) =>
                          label
                            .toLowerCase()
                            .includes(
                              (
                                searchFilterDropdowns[dropdownKey] || ""
                              ).toLowerCase()
                            )
                        )
                        .slice(0, showAllFilters[dropdownKey] ? undefined : 5) // Show first 5 options unless "See All" is toggled
                        .map(({ id, label, hex }) => (
                          <div
                            key={id}
                            className="flex items-center w-full mb-[0.833vw] relative"
                          >
                            <input
                              id={id}
                              type={
                                dropdownKey === "make" ||
                                dropdownKey === "model" ||
                                dropdownKey === "year_from" ||
                                dropdownKey === "year_to"||
                                dropdownKey === "vehicle_type"
                                  ? "radio"
                                  : "checkbox"
                              }
                              value={id}
                              onChange={() =>
                                handleFilterChange(dropdownKey, id)
                              }
                              className="form-checkbox h-[3.5vw] w-[1.5vw] text-blue-600"
                              checked={
                                dropdownKey === "make"
                                  ? selectedMake === id
                                  : dropdownKey === "model"
                                  ? selectedModel === id
                                  : selectedFilters[dropdownKey].includes(id)
                              }
                            />
              
                            <label
                              htmlFor={id}
                              className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium"
                            >
                              {label}
                            </label>

                            {dropdownKey === "color" ? (
                              <div className=" self-end right-0 absolute top-0">
                              <div
                              style={getColorStyle(hex)} 
                              className=" " 
                            />
                              </div>
                            ) : null}

                  </div>
                        ))}
                      <div className=" w-full">
                        {!showAllFilters[dropdownKey] &&
                          dropdownData[dropdownKey].length > 5 && (
                            <button
                              onClick={() => toggleSeeAll(dropdownKey)}
                              className="text-red-600 mt-2 flex w-full text-left text-xs "
                            >
                              See All
                            </button>
                          )}
                        {showAllFilters[dropdownKey] && (
                          <button
                            onClick={() => toggleSeeAll(dropdownKey)}
                            className="text-red-600 mt-2 flex w-full text-left text-xs "
                          >
                            See Less
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}

            <div className="w-full bg-white  p-3 border-b-[2px] border-grey-200">
              {/* Dropdown Header */}
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-[18px] lg:text-[1.1vw] text-left font-bold ">
                  Auction Date
                </span>
                <svg
                  className={`w-[15px]  lg:w-[1vw] h-[15px] lg:h-[1vw] transition-transform duration-200 ${
                    isOpen ? "transform rotate-180" : ""
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

              {/* Dropdown Content */}
              {isOpen && (
                <div className="">
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className="cursor-pointer form-checkbox"
                      checked={selectedOption === "today"}
                      onChange={() => handleAuctionDateFilter("today")}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                      Today
                    </label>
                  </div>
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className=" cursor-pointer form-checkbox"
                      checked={selectedOption === "thisWeek"}
                      onChange={() => handleAuctionDateFilter("thisWeek")}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                      This Week
                    </label>
                  </div>
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className=" cursor-pointer form-checkbox"
                      checked={selectedOption === "thisMonth"}
                      onChange={() => handleAuctionDateFilter("thisMonth")}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                      This Month
                    </label>
                  </div>
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className="cursor-pointer form-checkbox"
                      checked={selectedOption === "custom"}
                      onChange={() => handleAuctionDateFilter("custom")}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                      Custom Dates
                    </label>
                  </div>

                  {/* Custom Date Fields */}
                  {customDatesVisible && (
                    <div className=" flex flex-wrap gap-y-2">
                      <div className="grid grid-cols-2 items-center w-full gap-x-2">
                        <label className="ml-[0.5vw] text-[16px] text-left lg:text-[1vw] font-medium">
                          From:
                        </label>
                        <input
                          type="date"
                          value={auctionDateFrom}
                          onChange={(e) => setAuctionDateFrom(e.target.value)}
                          className="border border-gray-300 rounded-md p-1 text-[10px] focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center w-full gap-x-2">
                        <label className="ml-[0.5vw] text-[16px] text-left lg:text-[1vw] font-medium">
                          To:
                        </label>
                        <input
                          type="date"
                          value={auctionDateTo}
                          onChange={(e) => setAuctionDateTo(e.target.value)}
                          className="border border-gray-300 rounded-md p-1 text-[10px] focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200">
              <div className="flex items-center justify-between cursor-pointer">
                <h1 className="lg:text-[1.3vw] text-left font-bold mb-[0.729vw]">
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
            <div className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200">
              <div className="flex items-center justify-between cursor-pointer">
                <h1 className="lg:text-[1.3vw] text-left font-bold mb-[0.729vw]">
                  Odometer
                </h1>
              </div>
              <div className="flex gap-[1vw]">
                <input
                  id="odometer_from"
                  name="odometer_from"
                  type="number"
                  maxLength={4}
                  min={0}
                  placeholder="From"
                  className="form-input w-full px-2 border rounded-md py-1.5"
                  value={selectedFilters.odometer_to}
                  onChange={(e) =>
                    handleFilterChange("odometer_from", e.target.value)
                  }
                />
                <input
                  id="odometer_to"
                  name="odometer_to"
                  type="number"
                  min={0}
                  placeholder="To"
                  className="form-input w-full border px-2 rounded-md py-1.5"
                  value={selectedFilters.odometer_from}
                  onChange={(e) =>
                    handleFilterChange("odometer_to", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex text-xs flex-col lg:flex-row justify-center items-center my-5 gap-x-1.5 lg:gap-y-4">
              <button
                onClick={applyFilters}
                className="px-1 py-2 bg-[#CA0000] w-1/2 hover:bg-[#b30f0f] text-white rounded-lg"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="px-2 py-2 bg-gray-500 w-1/2 hover:bg-gray-600 text-white rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
        <div className="w-[76vw]lg:w-[55vw] xl:w-[54.5vw] 2xl:w-[52.5vw] flex justify-center h-full flex-col items-center">
          <SearchMainPage
            resetFilters={resetFilters}
            appliedFilters={appliedFilters}
            triggerFetch={appliedFilters}
            setShowFiltersMob={setShowFiltersMob}
            showFilterMob={showFilterMob}
            handleFilters={handleFilters}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
