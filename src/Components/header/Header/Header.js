import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { BsSearch } from "react-icons/bs";
import { searchSuggestedData } from "./searchSuggestedData";
import { BiChevronDown } from "react-icons/bi";
import { Phone } from "@mui/icons-material";
import { menuData } from "./MenuData";
import AccountMenu from "./ProfileDropdown";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [activeSubMenuItem, setActiveSubMenuItem] = useState(null);

  const handleLogoutModal = () => {
    document.getElementById("my_logout_modal").showModal();
  };

  const handleLogoout = () => {
    logout();
    navigate("/");
    document.getElementById("my_logout_modal").close();
  };

  const fetchSearchResults = (query) => {
    if (query) {
      const queryParts = query.toLowerCase().split(" "); // Split the query into words

      const filteredResults = searchSuggestedData.filter((car) => {
        // Check if the make matches
        const isMakeMatch = car.make.toLowerCase().includes(query.toLowerCase());

        // Check if any models match the query
        const matchedModels = car.models.filter((model) =>
          model.toLowerCase().includes(query.toLowerCase())
        );

        // Ensure either make or model(s) are matched
        return isMakeMatch || matchedModels.length > 0;
      });

      // Construct the results
      const results = filteredResults.map((car) => {
        const matchedModels = car.models.filter((model) =>
          model.toLowerCase().includes(query.toLowerCase())
        );

        return {
          make: car.make,
          models: matchedModels.length > 0 ? matchedModels : car.models, // Show matched models or all if no specific match
        };
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Check if the search query is a 16-character alphanumeric string
      const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/; // VINs are 17 characters long, but we check for 16 here
      if (searchQuery.length === 17 && vinPattern.test(searchQuery)) {
        navigate(`/vehicle-detail/${searchQuery}`); // Navigate to vehicle detail page
      } else {
        navigate(`/search-page?search=${encodeURIComponent(searchQuery)}`); // Navigate to search page
      }
    }
  };

  const handleDropdownItemClick = (make, model) => {
    const query = `${make} ${model}`;
    setSearchQuery(query);
    navigate(`/search-page?search=${encodeURIComponent(query)}`);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsFocused(false); // Close overlay and dropdown if clicking outside
      setSearchResults([]); // Clear dropdown results
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleMouseEnter = (menu, submenu = null) => {
    setActiveMenuItem(menu);
    setActiveSubMenuItem(submenu);
  };

  const handleMouseLeave = () => {
    setActiveMenuItem(null);
    setActiveSubMenuItem(null);
  };

  const handleNavigationFilter = (key, item) => {
    console.log(`Navigating with key: ${key}, item: ${item}`);
    const queryParams = new URLSearchParams();
    queryParams.set(key, item);
    const url = `/search-page?${queryParams.toString()}`;
    console.log(`Navigating to: ${url}`);
    window.location.href = url; // Use window.location.href for navigation
  };

  return (
    <>
      {isFocused && (
        <div className="fixed top-0 inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div
        className="fixed top-0 border-b border-primary-gray z-50 w-[100vw] "
        style={{
          transition: "background-color 0.5s ease-in-out",
          zIndex: 1000,
        }}
      >
        <header className="bg-black/90">
          <div className="w-full sm:max-w-[90vw] max-w-[85vw] mx-auto px-4 md:px-[1.5vw]">
            <div className="flex items-center h-20 md:h-[5vw] gap-4 md:gap-[1.5vw]">
              <Link to="/">
                <img
                  src={
                    "https://res.cloudinary.com/dqe7trput/image/upload/v1724846628/Horizontal_-_White0_2_haq83u.svg"
                  }
                  className="w-[142px] lg:w-[11.767vw] h-auto"
                  alt={`Logo`}
                />
              </Link>
              <div className="flex-1 max-w-3xl md:max-w-full ml-4 md:ml-0">
                <div className="relative" ref={dropdownRef}>
                  <input
                    type="text"
                    placeholder="Search for vehicle by Make, Model, Lot or VIN..."
                    className="w-full p-2 md:p-[0.6vw] rounded-full bg-white text-sm md:text-18"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                  />

                  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <BsSearch className="h-5 md:h-[0.2vw] w-5 md:w-[0.2vw]" />
                  </button>
                  {searchResults.length > 0 && ( // Render dropdown if there are results
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto">
                      {searchResults.map((car) => (
                        <div
                          key={car.make}
                          className=" flex justify-between items-center w-full"
                        >
                          <div className=" text-left w-full">
                            {car.models.map((model) => (
                              <div
                                key={model}
                                className="pl-4 py-2 hover:bg-gray-200 cursor-pointer "
                                onClick={() =>
                                  handleDropdownItemClick(car.make, model)
                                }
                              >
                                {car.make} {model}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {user ? (
                <div className="flex items-center ">
                  <button
                        className={` focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-6 md:px-[1.5vw] py-2 md:py-[0.4vw] rounded-full text-white lg:text-18  duration-200`}
                        onClick={handleLogoutModal}
                  >
                    logout
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 md:gap-[1.5vw] text-sm md:text-18">
                    <Link to="/login">
                      <button
                        className={` focus:outline-none text-white  lg:text-18 hover:text-white/80 duration-200`}
                      >
                        Log In
                      </button>
                    </Link>

                    <Link to="/signup">
                      <button
                        className={` focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-6 md:px-[1.5vw] py-2 md:py-[0.4vw] rounded-full text-white lg:text-18  duration-200`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <nav className="relative flex items-center h-14  text-gray-300">
              {Object.entries(menuData).map(([menuItem, menuItemData]) => (
                <div
                  key={menuItem}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(menuItem)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={menuItemData.link}
                    className="px-4 py-2 flex items-center gap-2 hover:text-white"
                  >
                    {" "}
                    {/* Updated Link */}
                    {menuItem}
                    {menuItemData.items && (
                      <BiChevronDown className="h-4 w-4" />
                    )}
                  </Link>

                  {activeMenuItem === menuItem && menuItemData.items && (
                    <div className="absolute top-full left-0 flex bg-black/95 shadow-xl">
                      <div className="w-64 py-2 border-r border-slate-700">
                        {menuItemData.items.map((item, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-slate-800"
                            onMouseEnter={() =>
                              handleMouseEnter(menuItem, item.name)
                            }
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>

                      {activeSubMenuItem && (
                        <div className="w-[600px] h-[400px] overflow-y-auto p-6 my-3">
                          {Object.entries(
                            menuItemData.items.find(
                              (item) => item.name === activeSubMenuItem
                            ).submenu
                          ).map(([submenuTitle, submenuItems]) => (
                            <div key={submenuTitle}>
                              <h4 className="text-gray-400 my-0.5 text-left">
                                {submenuTitle}
                              </h4>
                              <div
                                className={`w-full ${activeSubMenuItem === "Makes" || activeSubMenuItem === "Models" ? "grid grid-cols-3 gap-6" : "grid grid-cols-3 gap-2"}`}
                              >
                                {activeSubMenuItem === "Models" ? (
                                  <>
                                    {submenuItems.map((item, index) => (
                                      <Link
                                        key={index}
                                        href="#"
                                        className="block py-1 text-gray-300 hover:text-white"
                                        onClick={() =>
                                          handleNavigationFilter(
                                            item.query,
                                            item.label
                                          )
                                        } // Pass the key and item
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </>
                                ) : (
                                  <>
                                    {submenuItems.map((item, index) => (
                                      <Link
                                        key={index}
                                        href="#"
                                        className="block py-1 text-gray-300 hover:text-white"
                                        onClick={() =>
                                          handleNavigationFilter(
                                            item.query,
                                            item.value
                                          )
                                        } 
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="ml-auto flex items-center gap-4">
                <AccountMenu />
                {/* <div className="flex items-center text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  +11 111 111 111
                </div> */}
              </div>
            </nav>
          </div>
        </header>
        <dialog id="my_logout_modal" className="modal">
          <div className="modal-box dark:bg-white">
            <h3 className="font-bold text-lg my-4">
              Do you want to logout your account?
            </h3>

            <div className="flex gap-x-2 justify-center  ">
              <button
                className=" text-green-600 w-[70px] py-1 border border-green-600 dark:bg-white dark:hover:bg-gray-300 duration-200"
                onClick={handleLogoout}
              >
                Confirm
              </button>
              <button
                className=" text-red-600 w-[70px] py-1 border border-red-600 dark:bg-white dark:hover:bg-gray-300 duration-200"
                onClick={() =>
                  document.getElementById("my_logout_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Header;
