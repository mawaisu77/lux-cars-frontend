import React, { useState } from "react";
import SearchMainPage from "../search-page/searchMainPage";
import { Calendar } from "primereact/calendar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [fromDate, setFromDate] = useState(null);
  const [tillDate, setTillDate] = useState(null);

  return (
    <div className="flex">
      <div
        className={`fixed lg:relative z-30 lg:z-0 lg:w-[20.667vw] shadow-lg lg:shadow-none transform lg:transform-none transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("source")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Source
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.source ? "transform rotate-180" : ""
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
          {dropdownStates.source && (
            <div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="copart" type="checkbox" value="copart" />
                <label
                  htmlFor="copart"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  COPART
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="iaai" type="checkbox" value="iaai" />
                <label
                  htmlFor="iaai"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  IAAI
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="ml-[5vw] mt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("vehicleType")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Vehicle Type
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.vehicleType ? "transform rotate-180" : ""
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
          {dropdownStates.vehicleType && (
            <div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="atv" type="checkbox" value="atv" />
                <label
                  htmlFor="atv"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  ATV
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="automobile" type="checkbox" value="automobile" />
                <label
                  htmlFor="automobile"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  AUTOMOBILE
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="boat" type="checkbox" value="boat" />
                <label
                  htmlFor="boat"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  BOAT
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="bus" type="checkbox" value="bus" />
                <label
                  htmlFor="bus"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  BUS
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="minibus" type="checkbox" value="minibus" />
                <label
                  htmlFor="minibus"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  MINIBUS
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input
                  id="industrialEquipment"
                  type="checkbox"
                  value="industrialEquipment"
                />
                <label
                  htmlFor="industrialEquipment"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  INDUSTRIAL EQUIPMENT
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="jetSki" type="checkbox" value="jetSki" />
                <label
                  htmlFor="jetSki"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  JET SKI
                </label>
              </div>
              <div className="flex items-center mb-[0.833vw]">
                <input id="superCars" type="checkbox" value="superCars" />
                <label
                  htmlFor="superCars"
                  className="ms-2 text-[0.677vw] font-medium text-gray-900 dark:text-gray-300"
                >
                  SUPER CARS
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("make")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Make
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.make ? "transform rotate-180" : ""
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
          {dropdownStates.make && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("model")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Model
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.model ? "transform rotate-180" : ""
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
          {dropdownStates.model && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("trim")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Trim
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.trim ? "transform rotate-180" : ""
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
          {dropdownStates.trim && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("year")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              year
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.year ? "transform rotate-180" : ""
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
          {dropdownStates.year && (
            <div className="card flex justify-content-center">
              <label
                htmlFor="from"
                className="text-[0.9vw] text-left font-medium text-gray-900 dark:text-gray-300"
              >
                From:
              </label>
              <Calendar
                value={fromDate}
                onChange={(e) => setFromDate(e.value)}
                id="from"
                view="year"
                dateFormat="yy"
                className="border-[2px] mb-[3vh] border-black h-[5vh] rounded"
              />
              <label
                htmlFor="till"
                className="text-[0.9vw] text-left font-medium text-gray-900 dark:text-gray-300"
              >
                Till:
              </label>
              <Calendar
                value={tillDate}
                onChange={(e) => setTillDate(e.value)}
                view="year"
                id="till"
                dateFormat="yy"
                className="border-[2px] mb-[3vh] border-black h-[5vh] rounded"
              />
            </div>
          )}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("transmission")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Tranmission
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.transmission ? "transform rotate-180" : ""
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
          {dropdownStates.transmission && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("condition")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Condition
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.condition ? "transform rotate-180" : ""
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
          {dropdownStates.condition && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("fuelType")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Fuel Type
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.fuelType ? "transform rotate-180" : ""
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
          {dropdownStates.fuelType && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("documentType")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Document Type
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.documentType ? "transform rotate-180" : ""
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
          {dropdownStates.documentType && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("damage")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Damage
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.damage ? "transform rotate-180" : ""
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
          {dropdownStates.damage && <div></div>}
        </div>
        <div className="ml-[5vw] pt-[3vw] border-b-[2px] border-grey-200">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleDropdown("distance")}
          >
            <h1 className="text-[1.042vw] text-left font-bold mb-[0.729vw]">
              Distance
            </h1>
            <svg
              className={`ml-2 w-[1vw] h-[1vw] transition-transform duration-200 ${
                dropdownStates.distance ? "transform rotate-180" : ""
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
          {dropdownStates.distance && <div></div>}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden p-4 bg-white shadow">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div>
          <SearchMainPage />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
