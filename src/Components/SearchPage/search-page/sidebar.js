import React, { useEffect, useMemo, useState } from "react";
import SearchMainPage from "../search-page/searchMainPage";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilterMob, setShowFiltersMob] = useState(false)
  console.log(showFilterMob)
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialMake = queryParams.get("make") || "";
  const initialModel = queryParams.get("model") || "";
  const initialFromYear = queryParams.get("year_from") || "";
  const initialToYear = queryParams.get("year_to") || "";
  const initialPartner = queryParams.get("partner") || "";
  const initialTransmission = useMemo(() => queryParams.getAll("transmission") || [], [queryParams]);
  const initialStatus = useMemo(() => queryParams.getAll("status") || [], [queryParams]);
  const initialFuel = useMemo(() => queryParams.getAll("fuel") || [], [queryParams]);
  const initialDrive = useMemo(() => queryParams.getAll("drive") || [], [queryParams]);
  const initialDamage = useMemo(() => queryParams.getAll("damage_pr") || [], [queryParams]);
  const initialFromOdometer = queryParams.get("odometer_from") || "";
  const initialToOdometer = queryParams.get("odometer_to") || "";

  console.log("query params ne urlSearch params",initialStatus)
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
    damage_pr: initialDamage,
    year_from: initialFromYear || "",
    year_to: initialToYear || "",
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
    damage_pr: initialDamage,
    year_from: initialFromYear || "",
    year_to: initialToYear || "",
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
      initialTransmission.length > 0 ||
      initialStatus.length > 0 ||
      initialFuel.length > 0 ||
      initialDrive.length > 0 ||
      initialDamage.length > 0 ||
      initialFromOdometer ||
      initialToOdometer
    ) {
      setAppliedFilters({
        site: initialPartner,
        make: initialMake,
        model: initialModel,
        transmission: initialTransmission,
        status: initialStatus,
        fuel: initialFuel,
        drive: initialDrive,
        damage_pr: initialDamage,
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
    initialFromYear,
    initialToYear,
    initialTransmission,
    initialStatus,
    initialFuel,
    initialDrive,
    initialDamage,
    initialFromOdometer,
    initialToOdometer
  ]);

  // Apply filters and update query parameters
  const applyFilters = () => {
    setAppliedFilters(selectedFilters); // Apply filters when the button is clicked

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
      transmission: [],
      status: [],
      fuel: [],
      drive: [],
      damage_pr: [],
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
    damage_pr: [
      { id: "Partial Repair", label: "Partial Repair" },
      { id: "Hail", label: "Hail" },
      { id: "Stripped", label: "Stripped" },
      { id: "Theft", label: "Theft" },
    ],
    status: [
      { id: "Stationary", label: "Stationary" },
      { id: "Run & Drive", label: "Run & Drive" },
      { id: "Starts", label: "Starts" },
      { id: "Can't test", label: "Can't test" },
      { id: "Unknown", label: "Unknown" }
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
    } else if (filterCategory === "year_from" || filterCategory === "year_to" || filterCategory === "odometer_from" || filterCategory === "odometer_to") {
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

  // Function to toggle filters only on smaller screens
  const handleFilters = () => {
    const isSmallScreen = window.innerWidth < 1024; // `lg` breakpoint in Tailwind
    if (isSmallScreen) {
      console.log("Toggling filters on small screen");
      setShowFiltersMob(!showFilterMob);
    }
  };


  return (
    <>
  {/* {
  showFilterMob ? (
    <button 
      className="lg:hidden px-4 py-2 mt-[100px] flex justify-center items-center mx-auto  border   transition-all rounded-lg duration-300"
      onClick={handleFilters}
    >
      Hide Filters
      <RiArrowDropDownLine size={20} className="ml-1 cursor-pointer rotate-180" />
    </button>
  ) : (
    <button 
      className=" flex justify-center items-center px-4 py-2  mt-[100px] border w-[150px] mx-auto rounded-lg hover:w-[160px] transition-all duration-300"
      onClick={handleFilters}
    >
      Show Filters
      <RiArrowDropDownLine size={20} className="ml-1 cursor-pointer" />
    </button>
  )
} */}


    <div className="flex lg:flex-row flex-col justify-center   gap-[3vw] w-[80vw] mt-[100px]  mx-auto font-urbanist">
      <h2 className="lg:hidden text-[42px] font-bold">
        Fliters
      </h2>      {
        showFilterMob && (
          <div className=" lg:relative  lg:mt-[2.604vw] mx-auto px-3 bg-white z- lg:bg-white z-50 lg:z-0 w-[100%] lg:w-[17vw] shadow-xl rounded-lg">
          {Object.keys(dropdownData).map((dropdownKey) => (
            <div
            key={dropdownKey}
            className="py-[2vh] px-[1vw] border-b-[2px] border-grey-200"
            >
              <div
                className="flex items-center justify-between   cursor-pointer "
                onClick={() => toggleDropdown(dropdownKey)}
              >
                <h1 className="text-[18px] lg:text-[1.3vw]  text-left font-bold mb-[0.729vw]">
                  {dropdownKey.charAt(0).toUpperCase() + dropdownKey.slice(1)}
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
                <div className="overflow-y-scroll max-h-52     after:">
                  {dropdownData[dropdownKey].map(({ id, label }) => (
                    <div key={id} className="flex  items-center mb-[0.833vw]">
                      <input
                        id={id}
                        type={
                          dropdownKey === "make" ||
                          dropdownKey === "model" ||
                          dropdownKey === "year_from" ||
                          dropdownKey === "year_to"
                            ? "radio"
                            : "checkbox"
                        }
                        value={id}
                        onChange={() => handleFilterChange(dropdownKey, id)}
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
                        className="ml-[0.5vw] text-[16px] lg:text-[1vw] font-medium"
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
  
  
  
        <div className="flex  flex-col lg:flex-row justify-center items-center my-5 mx-2 gap-x-2 lg:gap-y-4">
            <button
              onClick={applyFilters}
              className="p-2 bg-[#CA0000] w-1/2 hover:bg-[#b30f0f] text-white rounded-lg"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="p-2 bg-gray-500 w-1/2 hover:bg-gray-600 text-white rounded-lg"
              >
              Reset Filters
            </button>
          </div>
        </div>
        )
      }
 
       <div className="w-[76vw] lg:w-[55vw] xl:w-[54.5vw] 2xl:w-[52.5vw] flex justify-center flex-col items-center">
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
