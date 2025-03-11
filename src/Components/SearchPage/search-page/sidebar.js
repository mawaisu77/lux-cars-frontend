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
import Slider from "@mui/material/Slider";
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
import {
  partnerAPIKey,
  partnerLabel,
  partnerOptions,
} from "../../../utils/filtersData/partnerOptions";
import {
  driveAPIKey,
  driveLabel,
  driveOptions,
} from "../../../utils/filtersData/driveOptions";
import {
  statusAPIKey,
  statusLabel,
  statusOptions,
} from "../../../utils/filtersData/statusOptions";
import {
  transmissionAPIKey,
  transmissionOptions,
} from "../../../utils/filtersData/transmissionOptions";
import Select from "react-select";
import { useCallback } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilterMob, setShowFiltersMob] = useState(true);
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
  const searchQuery = queryParams.get('search') || '';
  const initialMake = queryParams.get("make") || "";
  const initialModel = queryParams.get("model") || "";
  const initialFromYear = queryParams.get("year_from") || "";
  const initialToYear = queryParams.get("year_to") || "";
  const initialVehicleTyoe = queryParams.get("vehicle_type") || "";

  const initialPartner = useMemo(
    () => queryParams.getAll("site") || [],
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
  const initialFromOdometer = queryParams.get("odometer_min") || "";
  const initialToOdometer = queryParams.get("odometer_max") || "";
  // Extract auction date filters
  const auctionDateFromParam = queryParams.get("auction_date_from") || "";
  const auctionDateToParam = queryParams.get("auction_date_to") || "";

  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedMake, setSelectedMake] = useState(initialMake);
  const [selectedFilters, setSelectedFilters] = useState({
    search: searchQuery,
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
    odometer_min: initialFromOdometer || "",
    odometer_max: initialToOdometer || "",
    auction_date_from: auctionDateFromParam, // Include auction date filters
    auction_date_to: auctionDateToParam, // Include auction date filters
    document_old: initialDocumentOld,
    cyclinders: initialCyclinders,
    document: initialDocument,
    odobrand: initialOdobrand,
  });

  const [scrollPosition, setScrollPosition] = useState(0);

  const [filteredModels, setFilteredModels] = useState([]);
  const { carData } = useCarMakesModels();

  // Add these new states and functions
  const currentYear = new Date().getFullYear();
  const [yearOptions] = useState(() => {
    const years = [];
    for (let year = currentYear; year >= 1985; year--) {
      years.push({ value: year.toString(), label: year.toString() });
    }
    return years;
  });

  // Function to get filtered "to year" options based on selected "from year"
  const getToYearOptions = () => {
    const fromYear = parseInt(selectedFilters.year_from) || 1985;
    return yearOptions.filter((option) => parseInt(option.value) >= fromYear);
  };

  // Function to get filtered "from year" options based on selected "to year"
  const getFromYearOptions = () => {
    const toYear = parseInt(selectedFilters.year_to) || currentYear;
    return yearOptions.filter((option) => parseInt(option.value) <= toYear);
  };

  // Create a separate function for URL updates
  const updateURL = (newFilters) => {
    const currentScroll = window.scrollY;
    setScrollPosition(currentScroll);
    console.log("new filetsr", newFilters);

    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] && newFilters[key].length > 0) {
        if (Array.isArray(newFilters[key])) {
          newFilters[key].forEach((val) => {
            params.append(key, val);
          });
        } else {
          params.set(key, newFilters[key]);
        }
      }
    });

    // Add auction dates if they exist
    if (auctionDateFrom) params.set("auction_date_from", auctionDateFrom);
    if (auctionDateTo) params.set("auction_date_to", auctionDateTo);

    // Use replace instead of push to prevent adding to browser history
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );

    // Restore scroll position after a short delay
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScroll);
    });
  };


  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Create debounced update function using useCallback
  const debouncedUpdateOdometer = useCallback(
    debounce((newMin, newMax) => {
      setSelectedFilters(prev => ({
        ...prev,
        odometer_min: newMin.toString(),
        odometer_max: newMax.toString()
      }));
      
      updateURL({
        ...selectedFilters,
        odometer_min: newMin.toString(),
        odometer_max: newMax.toString()
      });
    }, 500), // 500ms delay
    [selectedFilters, updateURL]
  );

  // Add useEffect to handle scroll restoration
  useEffect(() => {
    if (scrollPosition > 0) {
      window.scrollTo(0, scrollPosition);
    }
  }, [location.search, scrollPosition]);

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
      searchQuery ||
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
      setSelectedFilters({
        site: initialPartner,
        search: searchQuery,
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
        odometer_min: initialFromOdometer,
        odometer_max: initialToOdometer,
        auction_date_from: auctionDateFromParam,
        auction_date_to: auctionDateToParam,
        document_old: initialDocumentOld,
        cyclinders: initialCyclinders,
        document: initialDocument,
        odobrand: initialOdobrand,
      });
    }
  }, [
    searchQuery,
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
    auctionDateFromParam,
    auctionDateToParam,
    initialDocumentOld,
    initialCyclinders,
    initialDocument,
    initialOdobrand,
  ]);

  useEffect(() => {
    // Update filters with the search query
    if (searchQuery) {
      const newFilters = {
        ...selectedFilters,
        search: searchQuery
      };
      setSelectedFilters(newFilters);
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        search: searchQuery
      }));
      updateURL(newFilters);
    }
  }, [location.search, searchQuery, setSelectedFilters]);

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
      odometer_min: "",
      odometer_max: "",  
      document_old: [],
      odobrand: [],
      initialCyclinders: [],
      initialDocument: [],
      initialOdobrand: [],
    });
    // setAppliedFilters({});
    // setAppliedFilters({});
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
    [transmissionAPIKey]: transmissionOptions,
    [driveAPIKey]: driveOptions,
    [stateAPIKey]: stateOptions,
    [primaryDamageAPIKey]: damageOptions,
    [secondaryDamageAPIKey]: damageOptions,
    [statusAPIKey]: statusOptions,
    [locationAPIKey]: locationOptions,
    [fuelAPIKey]: fuelOptions,
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

    // odobrand: !!initialOdobrand,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [dropdown]: !prevStates[dropdown],
    }));
  };

  // Modified handleFilterChange
  const handleFilterChange = (filterCategory, filterValue) => {
    let newFilters = { ...selectedFilters };

    if (filterCategory === "make") {
      newFilters = {
        ...newFilters,
        search: "",
        make: filterValue,
        model: "",
      };
      setSelectedMake(filterValue);
      setSelectedModel("");
    } else if (filterCategory === "model") {
      newFilters = {
        ...newFilters,
        search: "",
        model: filterValue,
      };
      setSelectedModel(filterValue);
    } else if (
      filterCategory === "year_from" ||
      filterCategory === "year_to" ||
      filterCategory === "odometer_min" ||
      filterCategory === "odometer_max"
    ) {
      newFilters = {
        ...newFilters,
        search: searchQuery,
        [filterCategory]: filterValue,
      };
      // setSelectedFilters(newFilters);
      // updateURL(newFilters);
      // return;
    } else if (filterCategory === "vehicle_type") {
      newFilters = {
        ...newFilters,
        search: searchQuery,
        [filterCategory]: [filterValue],
      };
    } else {
      const currentValues = newFilters[filterCategory];
      newFilters = {
        ...newFilters,
        search: searchQuery,
        [filterCategory]: currentValues.includes(filterValue)
          ? currentValues.filter((val) => val !== filterValue)
          : [...currentValues, filterValue],
      };
    }

    // Update state
    setSelectedFilters(newFilters);
    // setAppliedFilters({
    //   ...newFilters,
    //   auction_date_from: auctionDateFrom,
    //   auction_date_to: auctionDateTo,
    // });
    updateURL(newFilters);
  };

  // Modify the useEffect for resize handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // For desktop screens (lg and above)
        setShowFiltersMob(true); // Filters open by default
      }
      // Remove the automatic hiding for mobile screens
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

  // Update the useEffect that handles initial date detection
  useEffect(() => {
    if (auctionDateFromParam && auctionDateToParam) {
      const normalizeDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      };

      const fromDate = normalizeDate(auctionDateFromParam);
      const toDate = normalizeDate(auctionDateToParam);

      setAuctionDateFrom(fromDate);
      setAuctionDateTo(toDate);

      const today = new Date();
      const normalizedToday = normalizeDate(today);

         // Calculate tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const normalizedTomorrow = normalizeDate(tomorrow);

      // Get dates for comparison
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      // Check which period matches
      if (fromDate === normalizedToday && toDate === normalizedToday) {
        setSelectedOption("today");
        setCustomDatesVisible(false);
      } else if (fromDate === normalizedTomorrow && toDate === normalizedTomorrow) {
        setSelectedOption("tomorrow");
        setCustomDatesVisible(false);
      }
      
      else if (
        fromDate === normalizeDate(startOfWeek) &&
        toDate === normalizeDate(endOfWeek)
      ) {
        setSelectedOption("thisWeek");
        setCustomDatesVisible(false);
      } else if (
        fromDate === normalizeDate(startOfMonth) &&
        toDate === normalizeDate(endOfMonth)
      ) {
        setSelectedOption("thisMonth");
        setCustomDatesVisible(false);
      } else {
        setSelectedOption("custom");
        setCustomDatesVisible(true);
      }
    } else {
      setAuctionDateFrom("");
      setAuctionDateTo("");
      setSelectedOption("");
      setCustomDatesVisible(false);
    }
  }, [auctionDateFromParam, auctionDateToParam]);

  // Function to toggle filters only on smaller screens
  const handleFilters = () => {
    setShowFiltersMob(!showFilterMob);
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
    [driveAPIKey]: driveLabel,
    [statusAPIKey]: statusLabel,
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
    // Stop if clicking the same option
    if (selectedOption === option && option !== "custom") {
      return;
    }

    setSelectedOption(option);

    if (option === "custom") {
      setCustomDatesVisible(true);
      setAuctionDateFrom("");
      setAuctionDateTo("");
      return;
    }

    const now = new Date();
    let fromDate, toDate;

    // Helper function to format date consistently
    const formatDate = (date, isEndTime = false) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const time = isEndTime ? "23:59:59" : "00:00:00";

      return `${year}-${month}-${day}T${time}`;
    };

    switch (option) {
      case "today":
        fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;

        case "tomorrow":
          fromDate = new Date(now);
          fromDate.setDate(now.getDate() + 1);
          toDate = new Date(fromDate);
          break;

      case "thisWeek":
        fromDate = new Date(now);
        fromDate.setDate(now.getDate() - now.getDay());
        fromDate.setHours(0, 0, 0, 0);

        toDate = new Date(fromDate);
        toDate.setDate(fromDate.getDate() + 6);
        break;

      case "thisMonth":
        fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
        toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;

      default:
        return;
    }

    const formattedFromDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate, true);

    setAuctionDateFrom(formattedFromDate);
    setAuctionDateTo(formattedToDate);
    setCustomDatesVisible(false);

    // Update URL and filters
    const params = new URLSearchParams(location.search);
    params.set("auction_date_from", formattedFromDate);
    params.set("auction_date_to", formattedToDate);

    const newFilters = {
      ...selectedFilters,
      search: searchQuery,
      auction_date_from: formattedFromDate,
      auction_date_to: formattedToDate,
    };


    setSelectedFilters(newFilters);
    // setAppliedFilters((prev) => ({
    //   ...prev,
    //   search: searchQuery,
    //   auction_date_from: formattedFromDate,
    //   auction_date_to: formattedToDate,
    // }));

    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true }
    );
  };

  // Update handleCustomDateChange to use consistent date format
  const handleCustomDateChange = (type, value) => {
    const currentScroll = window.scrollY;

    if (!value) {
      if (type === "from") {
        setAuctionDateFrom("");
      } else {
        setAuctionDateTo("");
      }
      return;
    }

    // Add time component to the date
    const formattedDate =
      type === "from" ? `${value}T00:00:00` : `${value}T23:59:59`;

    if (type === "from") {
      setAuctionDateFrom(formattedDate);
    } else {
      setAuctionDateTo(formattedDate);
    }

    // Only update URL if both dates are set
    if (type === "from" ? auctionDateTo : auctionDateFrom) {
      const newFilters = {
        ...selectedFilters,
        auction_date_from: type === "from" ? formattedDate : auctionDateFrom,
        auction_date_to: type === "to" ? formattedDate : auctionDateTo,
      };

      // setAppliedFilters((prev) => ({
      //   ...prev,
      //   auction_date_from: type === "from" ? formattedDate : auctionDateFrom,
      //   auction_date_to: type === "to" ? formattedDate : auctionDateTo,
      // }));

      // Update URL
      const params = new URLSearchParams(location.search);
      params.set("auction_date_from", newFilters.auction_date_from);
      params.set("auction_date_to", newFilters.auction_date_to);

      navigate(
        {
          pathname: location.pathname,
          search: params.toString(),
        },
        { replace: true }
      );
    }

    // Restore scroll position
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScroll);
    });
  };

  const clearFilter = (filterKey) => {
    // Clear the filter from selectedFilters state
    setSelectedFilters((prev) => ({
      ...prev,

      [filterKey]: [],
    }));

    // Reset the applied filters for the cleared filter
    // setAppliedFilters((prev) => ({
    //   ...prev,
    //   [filterKey]: [],
    // }));

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

  const handleCloseOdometerFilter = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      odometer_min: "",
      odometer_max: "",
    }));
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


 const saveFiltersToLocalStorage = () => {
    const params = new URLSearchParams(selectedFilters).toString(); // Create query string from selectedFilters
    const savedFilters = JSON.parse(localStorage.getItem("savedFilters")) || []; // Retrieve existing saved filters

    // Check if the current query string already exists
    if (!savedFilters.includes(params)) {
      // Add the new query string to the array
      savedFilters.push(params);

      // Limit to a maximum of 10 saved filters
      if (savedFilters.length > 10) {
        savedFilters.shift(); // Remove the oldest filter if over the limit
      }

      // Save the updated array back to local storage
      localStorage.setItem("savedFilters", JSON.stringify(savedFilters));
      alert("Filters saved successfully!"); // Notify the user
    } else {
      alert("This filter is already saved!"); // Notify if the filter already exists
    }
  };

  return (
    <>
      <div className="flex mt-20 sm:mt-5 gap-2 bg-gray-100  w-[95vw] sm:w-[80vw] p-5 mx-auto font-urbanist scrollbar-red-h overflow-x-auto">
        {Object.entries(selectedFilters).some(([, values]) =>
          Array.isArray(values) ? values.length > 0 : values
        ) && (
          <div className="flex w-[80vw] gap-2">
            {Object.entries(selectedFilters).map(([key, values]) =>
              values && (Array.isArray(values) ? values.length > 0 : true) ? (
                <div
                  key={key}
                  className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-lg whitespace-nowrap"
                >
                  <span className="text-sm font-medium">
                    {key}:{" "}
                    {key === "auction_date_from" || key === "auction_date_to"
                      ? `${
                          key === "auction_date_from"
                            ? "Auction Date From:"
                            : "Auction Date To:"
                        } ${new Date(values).toLocaleDateString()}`
                      : Array.isArray(values)
                        ? values
                            .map(
                              (id) =>
                                dropdownData[key]?.find(
                                  ({ id: itemId }) => itemId === id
                                )?.label
                            )
                            .join(", ")
                        : dropdownData[key]?.find(({ id }) => id === values)
                            ?.label || values}
                  </span>

                  <IoClose
                    onClick={() => clearFilter(key)}
                    className="ml-1 text-red-500 cursor-pointer"
                  />
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      <div>
                {showFilterMob ? (
                  <button
                    className="lg:hidden px-4 py-2  mt-[2vh]  flex justify-center items-center mx-auto border transition-all rounded-lg duration-300"
                    onClick={handleFilters} 
                  >
                    Hide Filters
                    <RiArrowDropDownLine
                      size={20}
                      className="ml-1 cursor-pointer rotate-180"
                    />
                  </button>
                ) : (
                  <button
                    className="lg:hidden flex justify-center items-center mt-[2vh] px-4 py-2   border w-[150px] mx-auto rounded-lg hover:w-[160px] transition-all duration-300"
                    onClick={handleFilters} // Correctly showing the filters
                  >
                    Show Filters
                    <RiArrowDropDownLine
                      size={20}
                      className="ml-1 cursor-pointer"
                    />
                  </button>
                )}
              </div>
      <div className="mb-0 sm:mb-20 sm:pb-10 pb-0 flex lg:flex-row flex-col bg-gray-100 justify-between gap-[1vw] w-[95vw] sm:w-[80vw]  mt-5 lg:px-5 px-1 mx-auto font-urbanist rounded-[0.5vw ] ">
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
                        dropdownStates[dropdownKey]
                          ? "transform rotate-180"
                          : ""
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
                        .map(({ id, label, hex, letter }) => (
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

                            {dropdownKey === "color"  ? (
                              <div className=" self-end right-0 absolute top-0">
                                <div style={getColorStyle(hex)} className=" " />
                              </div>
                            ) : null}
                            {
                              dropdownKey === "status" ? (
                                <div className="self-end right-0 absolute top-0 ">
                                  <div style={getColorStyle(hex)} className="flex rounded-full bg-red-200 w-full h-full items-center">
                                    <span className="text-white font-bold">{letter}</span> 
                                  </div>
                                </div>
                              ) : null
                            }
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
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                      Today
                    </label>
                  </div>
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className="cursor-pointer form-checkbox"
                      checked={selectedOption === "tomorrow"}
                      onChange={() => handleAuctionDateFilter("tomorrow")}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label className="ml-[0.5vw] text-[16px] text-left lg:text-[0.8vw] font-medium">
                    Tomorrow
                    </label>
                  </div>
                  <div className="flex items-center mb-3">
                    <input
                      type="radio"
                      name="auctionDate"
                      className=" cursor-pointer form-checkbox"
                      checked={selectedOption === "thisWeek"}
                      onChange={() => handleAuctionDateFilter("thisWeek")}
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
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
                          value={
                            auctionDateFrom ? auctionDateFrom.split("T")[0] : ""
                          }
                          onChange={(e) =>
                            handleCustomDateChange("from", e.target.value)
                          }
                          className="border border-gray-300 rounded-md p-1 text-[10px] focus:border-red-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 items-center w-full gap-x-2">
                        <label className="ml-[0.5vw] text-[16px] text-left lg:text-[1vw] font-medium">
                          To:
                        </label>
                        <input
                          type="date"
                          value={
                            auctionDateTo ? auctionDateTo.split("T")[0] : ""
                          }
                          onChange={(e) =>
                            handleCustomDateChange("to", e.target.value)
                          }
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
                {(selectedFilters.year_from || selectedFilters.year_to) && (
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
                )}
              </div>
              <div className="flex gap-[0.5vw] w-full">
                <Select
                  placeholder="From"
                  styles={{
                    indicatorSeparator: (base) => ({
                      ...base,
                      display: "none",
                    }),
                    clearIndicator: (base) => ({
                      ...base,
                      display: "none",
                    }),
                
                      container: (base) => ({
                        ...base,
                        padding: "0px",
                        margin: "0px",
                        fontSize: "12px",
                        
                      }),
                  }}
                  options={getFromYearOptions()}
                  value={
                    selectedFilters.year_from
                      ? {
                          value: selectedFilters.year_from,
                          label: selectedFilters.year_from,
                        }
                      : null
                  }
                  onChange={(option) => {
                    handleFilterChange("year_from", option ? option.value : "");
                  }}
                  isClearable
                  className="text-[10px] w-1/2"
                  // classNamePrefix="select"
                />
                <Select
                  placeholder="To"
                  styles={{
                    indicatorSeparator: (base) => ({
                      ...base,
                      display: "none",
                    }),
                
                      container: (base) => ({
                        ...base,
                        padding: "0px",
                        margin: "0px",
                        fontSize: "12px",
                        
                      }),
                      clearIndicator: (base) => ({
                        ...base,
                        display: "none",
                      }),
                  }}
                  options={getToYearOptions()}
                  value={
                    selectedFilters.year_to
                      ? {
                          value: selectedFilters.year_to,
                          label: selectedFilters.year_to,
                        }
                      : null
                  }
                  onChange={(option) => {
                    handleFilterChange("year_to", option ? option.value : "");
                  }}
                  isClearable
                  className="text-[10px] w-1/2 "
                  classNamePrefix="select"
                />
              </div>
            </div>

            <div className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200">
              <div className="flex flex-col gap-[0.5vw]">
              <div className="flex items-center justify-between cursor-pointer">

                <h1 className="text-[18px] space-x-2 lg:text-[1.1vw] text-left font-bold ">
                  Odometer 
                  <span className="text-[10px] text-gray-500"> (miles)</span>
                </h1>
                {
                  (selectedFilters.odometer_min || selectedFilters.odometer_max) && (
                    <svg
                    onClick={handleCloseOdometerFilter}
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
                  )
                }
                </div>
                <Slider
                  value={[
                    parseInt(selectedFilters.odometer_min) || 0, // Ensure this is a number
                    parseInt(selectedFilters.odometer_max) || 100000, // Ensure this is a number
                  ]}
                  onChange={(e, newValue) => {
                    // Update local state immediately for smooth UI
                   
                    // Debounce the URL update and API call
                    debouncedUpdateOdometer(newValue[0], newValue[1]);
                  }}
                  min={0}
                  max={100000}
                  valueLabelDisplay="auto"
                  className="w-full"
                  valueLabelFormat={(value) => `${value}`} // Optional: format the label
                />

                {/* Input fields for odometer values */}
                <div className="flex gap-[1vw]">
                  <input
                    type="number"
                    value={selectedFilters.odometer_min || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedFilters((prev) => ({
                        ...prev,
                        odometer_min: value,
                      }));
                      // Update the slider value
                      updateURL({
                        ...selectedFilters,
                        odometer_min: value,
                        odometer_max: selectedFilters.odometer_max,
                      });
                    }}
                    className="border w-1/2 border-gray-300 rounded-md p-1 text-sm focus:border-red-500 focus:outline-none"
                    placeholder="From"
                  />
                  <input
                    type="number"
                    value={selectedFilters.odometer_max || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedFilters((prev) => ({
                        ...prev,
                        odometer_max: value,
                      }));
                      // Update the slider value
                      updateURL({
                        ...selectedFilters,
                        odometer_min: selectedFilters.odometer_min,
                        odometer_max: value,
                      });
                    }}
                    className="border w-1/2 border-gray-300 rounded-md p-1 text-sm focus:border-red-500 focus:outline-none"
                    placeholder="To"
                  />
                </div>
              </div>
            </div>
            <div className="flex text-xs flex-col lg:flex-row justify-center items-center my-5 gap-y-2 gap-x-1.5 lg:gap-y-4">
              <button
                onClick={resetFilters}
                className="px-2 py-2 bg-gray-500 w-full md:w-1/2 hover:bg-gray-600 text-white rounded-lg"
              >
                Reset Filters
              </button>
              <button
          onClick={saveFiltersToLocalStorage}
          className="px-2 py-2 bg-blue-500 w-full md:w-1/2 hover:bg-blue-600 text-white rounded-lg"
        >
          Save Filters
        </button>
            </div>
          </div>
        )}
        <div className="w-[76vw]lg:w-[60vw] xl:w-[58.5vw] 2xl:w-[58.5vw] flex justify-center h-full flex-col items-center">
          <SearchMainPage
            resetFilters={resetFilters}
            appliedFilters={selectedFilters}
            triggerFetch={selectedFilters} 
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
