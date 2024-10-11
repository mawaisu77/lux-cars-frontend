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
import {
  colorAPIKey,
  colorOptions,
  getColorStyle,
} from "../../../utils/filtersData/colorOptions";
import {
  locationAPIKey,
  locationOptions,
} from "../../../utils/filtersData/locationOptions";
import TooltipInfo from "../../common/TooltipInfo";
import { BsInfoCircle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

import {
  vehicleTypeAPIKey,
  vehicleTypeLabel,
  vehicleTypeOptions,
} from "../../../utils/filtersData/vehicleTypeOptions";
import {
  documentOldLabel,
  documentOldOption,
  documentOldPIKey,
} from "../../../utils/filtersData/documentOld";
import {
  cyclinderAPIKey,
  cyclinderLabel,
  cylinderOptions,
} from "../../../utils/filtersData/cyclinderOptions";
import {
  documentTypeAPIKey,
  documentTypeLabel,
  documentTypeOptions,
} from "../../../utils/filtersData/documentTypeOptions";
import {
  odoBrandAPIKey,
  odoBrandLabel,
  odoBrandOptions,
} from "../../../utils/filtersData/odoBrand";
import { partnerAPIKey, partnerLabel, partnerOptions } from "../../../utils/filtersData/partnerOptions";

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
  const [selectedOption, setSelectedOption] = useState("");

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const initialMake = queryParams.get("make") || "";
  const initialModel = queryParams.get("model") || "";
  const initialFromYear = queryParams.get("year_from") || "";
  const initialToYear = queryParams.get("year_to") || "";
  // const initialPartner = queryParams.get("partner") || "";
  const initialVehicleTyoe = queryParams.get("vehicle_type") || "";

  const initialPartner = useMemo(
    () => queryParams.getAll("partner") || [],
    [queryParams]
  );
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
  const initialDocumentOld = useMemo(
    () => queryParams.getAll("document_old") || [],
    [queryParams]
  );
  const initialCyclinders = useMemo(
    () => queryParams.getAll("cyclinders") || [],
    [queryParams]
  );
  const initialDocument = useMemo(
    () => queryParams.getAll("document") || [],
    [queryParams]
  );
  const initialOdobrand = useMemo(
    () => queryParams.getAll("odobrand") || [],
    [queryParams]
  );
  const initialFromOdometer = queryParams.get("odometer_from") || "";
  const initialToOdometer = queryParams.get("odometer_to") || "";
  // Extract auction date filters
  const auctionDateFromParam = queryParams.get("auction_date_from") || "";
  const auctionDateToParam = queryParams.get("auction_date_to") || "";

  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedMake, setSelectedMake] = useState(initialMake);
  const [selectedFilters, setSelectedFilters] = useState({
    site: initialPartner,
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
    auction_date_from: auctionDateFromParam, // Include auction date filters
    auction_date_to: auctionDateToParam, // Include auction date filters
    document_old: initialDocumentOld,
    cyclinders: initialCyclinders,
    document: initialDocument,
    odobrand: initialOdobrand,
  });

  const [appliedFilters, setAppliedFilters] = useState({
    site: initialPartner,
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
    auction_date_from: auctionDateFromParam, // Include auction date filters
    auction_date_to: auctionDateToParam, // Include auction date filters
    document_old: initialDocumentOld,
    cyclinders: initialCyclinders,
    document: initialDocument,
    odobrand: initialOdobrand,
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
      initialPartner.length > 0 ||
      initialMake ||
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
      initialToOdometer ||
      auctionDateFromParam || // Check if auction date is part of the query params
      auctionDateToParam ||
      initialDocumentOld.length > 0 ||
      initialCyclinders.length > 0 ||
      initialDocument.length > 0 ||
      initialOdobrand.length > 0
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
        auction_date_from: auctionDateFromParam, // Set auction date from
        auction_date_to: auctionDateToParam,
        document_old: initialDocumentOld,
        cyclinders: initialCyclinders,
        document: initialDocument,
        odobrand: initialOdobrand,
      });
    }
  }, [
    initialPartner,
    initialMake,
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
    auctionDateFromParam, // Add auction date dependencies
    auctionDateToParam,
    initialDocumentOld,
    initialCyclinders,
    initialDocument,
    initialOdobrand,
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
      vehicle_type: "",
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
      document_old: [],
      initialCyclinders: [],
      initialDocument: [],
      initialOdobrand: [],
    });
    setAppliedFilters({});
    setSelectedMake("");
    setSelectedModel("");
    setFilteredModels([]);
    setSelectedOption("");
    setAuctionDateFrom("");
    setAuctionDateTo("");
    // Reset query parameters in the URL
    navigate(location.pathname);
  };

  const dropdownData = {
    [partnerAPIKey]: partnerOptions,
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
    [locationAPIKey]: locationOptions,
    fuel: fuelOptions,
    [colorAPIKey]: colorOptions,
    [documentOldPIKey]: documentOldOption,
    [cyclinderAPIKey]: cylinderOptions,
    [documentTypeAPIKey]: documentTypeOptions,
    [odoBrandAPIKey]: odoBrandOptions,
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
    } else if (filterCategory === "vehicle_type") {
      // Radio behavior: Only one vehicle type can be selected
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [filterCategory]: [filterValue], // Replace with new value
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

  useEffect(() => {
    if (auctionDateFromParam && auctionDateToParam) {
        setAuctionDateFrom(auctionDateFromParam);
        setAuctionDateTo(auctionDateToParam);

        // Normalize auctionDateFrom and auctionDateTo
        const normalizedFrom = new Date(auctionDateFromParam).toISOString().split("T")[0];
        const normalizedTo = new Date(auctionDateToParam).toISOString().split("T")[0];

        const today = new Date();
        const normalizedToday = today.toISOString().split("T")[0];

        // Start and end of today
        const startOfToday = normalizedToday; 
        const endOfToday = normalizedToday;

        // Start and end of this week
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); 
        const normalizedStartOfWeek = startOfWeek.toISOString().split("T")[0]; 

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6); 
        const normalizedEndOfWeek = endOfWeek.toISOString().split("T")[0];

        // Start and end of this month
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); 
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 
        const normalizedStartOfMonth = startOfMonth.toISOString().split("T")[0];
        const normalizedEndOfMonth = endOfMonth.toISOString().split("T")[0];

        // Checking...
        console.log("Normalized From ==:", normalizedFrom);
        console.log("Normalized To:", normalizedTo);
        console.log("Normalized Start Of Today:", startOfToday);
        console.log("Normalized End Of Today:", endOfToday);
        console.log("Normalized Start Of Week:", normalizedStartOfWeek);
        console.log("Normalized End Of Week:", normalizedEndOfWeek);
        console.log("Normalized Start Of Month:", normalizedStartOfMonth);
        console.log("Normalized End Of Month:", normalizedEndOfMonth);

        // Check for "today"
        if (normalizedFrom === startOfToday && normalizedTo === endOfToday) {
            setSelectedOption("today");
            setCustomDatesVisible(false);
        } 
        // Check for "thisWeek"
        else if (normalizedFrom >= normalizedStartOfWeek && normalizedTo <= normalizedEndOfWeek) {
            setSelectedOption("thisWeek");
            setCustomDatesVisible(false);
        } 
        // Check for "thisMonth"
        else if (normalizedFrom >= normalizedStartOfMonth && normalizedTo <= normalizedEndOfMonth) {
            setSelectedOption("thisMonth");
            setCustomDatesVisible(false);
        } 
        // If dates are provided but do not match any conditions
        else {
            setSelectedOption("custom");
            setCustomDatesVisible(true);
        }
    } else {
        // If no dates are provided, set to null
        setAuctionDateFrom(null);
        setAuctionDateTo(null);
        setSelectedOption(null); // Set no option selected
        setCustomDatesVisible(true); // Show custom date input
    }
}, [auctionDateFromParam, auctionDateToParam]);

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
    [documentOldPIKey]: documentOldLabel,
    [cyclinderAPIKey]: cyclinderLabel,
    [documentTypeAPIKey]: documentTypeLabel,
    [odoBrandAPIKey]: odoBrandLabel,
    [partnerAPIKey]: partnerLabel,
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
    const now = new Date();
    let fromDate = now.toISOString(); // Initialize fromDate to current time
    let toDate;
  
    if (option === "today") {
      // Set toDate to the end of today
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      toDate = endOfDay.toISOString();
    } else if (option === "thisWeek") {
      // fromDate remains the current time
      // Set toDate to the end of the week
      const endOfWeek = new Date(now);
      endOfWeek.setDate(now.getDate() + (6 - now.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);
      toDate = endOfWeek.toISOString();
    } else if (option === "thisMonth") {
      // fromDate remains the current time
      // Set toDate to the end of the month
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      toDate = endOfMonth.toISOString();
    } else if (option === "custom") {
      setCustomDatesVisible(true);
      return;
    }
  
  // Update selected filters
  setSelectedFilters((prevFilters) => ({
    ...prevFilters,
    auction_date_from: fromDate,
    auction_date_to: toDate,
  }));

    setAuctionDateFrom(fromDate);
    setAuctionDateTo(toDate); 
    setCustomDatesVisible(false); // Hide custom date fields if not custom
    
  };

  const clearFilter = (filterKey) => {
    // Clear the filter from selectedFilters state
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));

    // Reset the applied filters for the cleared filter
    setAppliedFilters((prev) => ({
      ...prev,
      [filterKey]: [],
    }));

    // Additional condition to clear 'make' state specifically
    if (filterKey === "make") {
      setSelectedMake(""); // Reset the 'make' state if 'make' filter is cleared
    }

    // Remove the filter from URL parameters only if it exists
    const params = new URLSearchParams(location.search);
    const hasFilter = params.has(filterKey);

    if (hasFilter) {
      params.delete(filterKey);

      // Navigate only if the filter was present in the URL
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      ); // Use replace to avoid page refresh
    }
  };

  const handleCloseYearFilter = (e) => {
    e.preventDefault(); // Prevent any default action that might cause a jump

    // Clear the year filters in selectedFilters state
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      year_from: "",
      year_to: "",
    }));

    // Update URL params to remove year filters if they exist
    const params = new URLSearchParams(location.search);
    const hasYearFrom = params.has("year_from");
    const hasYearTo = params.has("year_to");

    if (hasYearFrom) params.delete("year_from");
    if (hasYearTo) params.delete("year_to");

    // Navigate only if either year_from or year_to was present
    if (hasYearFrom || hasYearTo) {
      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      ); // Use replace option to avoid refreshing
    }
  };

  const handleCloseAuctionDateDropdown = () => {
    setIsOpen(false); // Close the auction date dropdown
    setSelectedOption(""); // Clear the selected auction date option
    setAuctionDateFrom(""); // Reset auction date range
    setAuctionDateTo("");
    setCustomDatesVisible(false); // Hide custom date fields

    const params = new URLSearchParams(location.search);

    // Remove the auction date filters from the URL if they exist
    if (params.has("auction_date_from")) params.delete("auction_date_from");
    if (params.has("auction_date_to")) params.delete("auction_date_to");

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <>
    <div className="flex mt-5 gap-2 bg-gray-100  w-[80vw]  p-5 mx-auto font-urbanist scrollbar-red-h overflow-x-auto">

  {Object.entries(appliedFilters).some(([, values]) => Array.isArray(values) ? values.length > 0 : values) && (
   <div className="flex w-[80vw]  gap-2  ">
    {Object.entries(appliedFilters).map(([key, values]) => (
      values && (Array.isArray(values) ? values.length > 0 : true) ? (
        <div
          key={key}
          className="flex items-center  text-gray-700 px-2 py-1 rounded-lg whitespace-nowrap"
        >
          <span className="text-sm font-medium">
            {key === "auction_date_from" || key === "auction_date_to"
              ? `${key === "auction_date_from" ? "Auction Date From:" : "Auction Date To:"} ${new Date(values).toLocaleDateString()}`
              : Array.isArray(values)
              ? values
                  .map(
                    (id) =>
                      dropdownData[key]?.find(({ id: itemId }) => itemId === id)
                        ?.label
                  )
                  .join(", ")
              : dropdownData[key]?.find(({ id }) => id === values)?.label || values}
          </span>

          <IoClose
            onClick={() => clearFilter(key)}
            className="ml-1 text-red-500 cursor-pointer"
          />
        </div>
      ) : null
    ))}
  </div>
)}

   </div>
      <div className="flex lg:flex-row flex-col bg-gray-100 justify-between gap-[1vw] w-[80vw]  mt-5 px-5 mx-auto font-urbanist rounded-[0.5vw ] ">
        <h2 className="lg:hidden text-[42px] font-bold mt-[100px]">Fliters</h2>{" "}
        {showFilterMob && (
          <div className=" lg:relative lg:mt-[2.604vw] h-fit mx-auto px-3 bg-white lg:bg-white z-40 lg:z-0 w-[100%] lg:w-[17vw]  rounded-lg">
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
                  className="flex items-center justify-between cursor-pointer mb-[0.729vw]"
                  onClick={() => toggleDropdown(dropdownKey)}
                >
                  <h1 className="text-[18px] lg:text-[1.1vw]  text-left font-bold ">
                    {filterDisplayNames[dropdownKey] ||
                      dropdownKey.charAt(0).toUpperCase() +
                        dropdownKey.slice(1)}
                  </h1>

<div className="flex gap-x-2"> 
    {/* Close Icon for Clearing Filter */}
    {selectedFilters[dropdownKey]?.length > 0 && (
                   
            <IoClose
               onClick={() => clearFilter(dropdownKey)}
               className="bg-red-600/20 text-red-600 rounded-full"
               />
                  )}

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
                                dropdownKey === "year_to" ||
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
                                <div style={getColorStyle(hex)} className=" " />
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
                {/* Close Icon */}
                {isOpen && (
                  <svg
                    onClick={handleAuctionDateFilter}
                    className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                )}
                {/* Dropdown Arrow Icon */}
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
                <h1 className="text-[18px] lg:text-[1.1vw] text-left font-bold mb-[0.729vw]">
                  Year
                </h1>
                {/* Close Icon */}

                <svg
                  onClick={handleCloseYearFilter}
                  className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <div className="flex gap-[1vw]">
                <input
                  id="year_from"
                  name="year_from"
                  type="number"
                  maxLength={4}
                  min={0}
                  placeholder="From"
                  className="form-input w-full px-2 border rounded-md py-1.5 text-xs"
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
                  className="form-input w-full border px-2 rounded-md py-1.5 text-xs"
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
                <h1 className="text-[18px] lg:text-[1.1vw] text-left font-bold mb-[0.729vw]">
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
                  className="form-input w-full px-2 border rounded-md py-1.5 text-xs"
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
                  className="form-input w-full border px-2 rounded-md py-1.5 text-xs"
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
        <div className="w-[76vw]lg:w-[60vw] xl:w-[58.5vw] 2xl:w-[58.5vw] flex justify-center h-full flex-col items-center">
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
