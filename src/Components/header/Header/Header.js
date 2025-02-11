import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { BsSearch } from "react-icons/bs";
import { searchSuggestedData } from "./searchSuggestedData";
import { BiChevronDown } from "react-icons/bi";
import { menuData } from "./MenuData";
import AccountMenu from "./ProfileDropdown";
import { IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiLogOut } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import BidCaribbeanLogo from "../../../assets/lux-logo/bidcaribbean-logo.png";
import LuxCarsLogo from "../../../assets/lux-logo/lux-logo-new.png";
import sideBarLogo from "../../../assets/lux-logo/bidcaribbeansBlueLogo (1).jpg"

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:1024px)");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
        const isMakeMatch = car.make
          .toLowerCase()
          .includes(query.toLowerCase());

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
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <div className="w-[200px] bg-[#008b98]">
        <img className="w-[150px] mx-auto" src={sideBarLogo} alt="sidebar_logo"/>
        </div>
        <div className="w-[200px] p-4">
          {/* Accordion for "Search & Bid" */}
          <Accordion sx={{ boxShadow: "none", padding: 0, margin: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ padding: "0", minHeight: "0", height: "auto" }} // Remove padding and set height to auto
            >
              {" "}
              <span className="block py-2 text-gray-800">Search & Bid</span>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {menuData["Search & Bid"].items.map((item) => (
                <Accordion key={item.key}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <span className="block py-1 text-gray-600">
                      {item.name}
                    </span>
                  </AccordionSummary>
                  <AccordionDetails>
                    {Object.entries(item.submenu).map(
                      ([submenuTitle, submenuItems]) => (
                        <div key={submenuTitle}>
                          <h5 className="text-gray-400 my-0.5">
                            {submenuTitle}
                          </h5>
                          {submenuItems.map((submenuItem, index) => (
                            <Link
                              key={index}
                              to="#"
                              className="block py-1 text-gray-600 pl-4 hover:text-blue-500"
                              onClick={() =>
                                handleNavigationFilter(
                                  item.key,
                                  submenuItem.value
                                )
                              } // Adjust as needed
                            >
                              {submenuItem.label}
                            </Link>
                          ))}
                        </div>
                      )
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
          

          {/* Simple Links for Other Menu Items */}
          {Object.entries(menuData).map(([menuItem, menuItelgata]) => {
            if (menuItem !== "Search & Bid") {
              return (
                <Link
                  key={menuItem}
                  to={menuItelgata.link}
                  className="block py-4 text-gray-800"
                >
                  {menuItem}
                </Link>
              );
            }
            return null; // Skip "Search & Bid" since it's already handled
          })}

          <div className="  flex flex-col   justify-end  ">
            <Link to="/contact-us" className="py-4 text-gray-800  ">
              {"Contact"}
            </Link>
            <Link to="/help" className="py-4 text-gray-800  ">
              {"Help"}
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-x-4">
              <div className="flex items-center">
                <button
                  className={`flex justify-between gap-x-2 items-center w-full focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-3 lg:px-[1vw] py-1 lg:py-[0.4vw] rounded-full text-white text-xs lg:text-18 duration-200`}
                  onClick={handleLogoutModal}
                >
                  <span className="text-white text-nowrap">0%/0$</span>{" "}
                  {/* Text on the left */}
                  <BsLightningCharge className="text-white" />{" "}
                  {/* Icon on the right */}
                </button>
              </div>
              <button
                className={`flex justify-between gap-x-2 items-center w-full focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-3 lg:px-[1vw] py-1 lg:py-[0.4vw] rounded-full text-white text-xs lg:text-18 duration-200`}
                onClick={handleLogoutModal}
              >
                <span className="text-white text-nowrap">Log out</span>{" "}
                {/* Text on the left */}
                <FiLogOut className="text-white" /> {/* Icon on the right */}
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col w-[100%] items-center gap-4 lg:gap-[1.5vw] text-sm lg:text-18">
                <Link to="/login">
                  <button
                    className={`w-[170px] text-nowrap font-semibold focus:outline-none bg-white hover:bg-[#ca0000e8] px-3 lg:px-[1.5vw] py-1 lg:py-[0.4vw] rounded-full text-gray-800  lg:text-18  duration-200 border border-solid border-black`}
                  >
                    Log In
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    className={`w-[170px] text-nowrap font-semibold focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-3 lg:px-[1.5vw] py-1 lg:py-[0.4vw] rounded-full text-white  lg:text-18  duration-200`}
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Drawer>

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
          <div className="hidden lg:block w-[100vw] mx-auto  ">
            <div className="flex max-w-[85vw] mx-auto w-full items-center justify-between h-12 lg:h-[5vw] gap-2 lg:gap-[1.5vw]">
              {/* <div className=" w-full flex justify-between items-center gap-x-4"> */}
              <div className="flex items-center justify-start">
                <Link to="/" className="">
                  <img
                    src={BidCaribbeanLogo}
                    className="w-[80px] sm:w-[17vw] h-auto"
                    alt={`Logo`}
                  />
                </Link>
                <Link to="/" className="">
                  <img
                    src={LuxCarsLogo}
                    className="w-[80px] sm:w-[8vw] h-auto"
                    alt={`Logo`}
                  />
                </Link>
              </div>
              <div className="w-[35%] ml-2 lg:ml-0">
                <div className="relative w-90%" ref={dropdownRef}>
                  <input
                    type="text"
                    placeholder={`${isMobile ? "Search here..." : "Search for vehicle by Make, Model, Lot or VIN..."}`}
                    className="w-full p-1 lg:py-[0.6vw] lg:px-[1.5vw] rounded-full bg-gray-100/95 text-xs lg:text-18"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                  />

                  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <BsSearch className="h-2 lg:h-[1vw] w-2 lg:w-[1vw]" />
                  </button>
                  
                  {searchResults.length > 0 && ( // Render dropdown if there are results
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {searchResults.map((car) => (
                        <div
                          key={car.make}
                          className=" flex justify-between items-center w-full"
                        >
                          <div className=" text-left w-full">
                            {car.models.map((model) => (
                              <div
                                key={model}
                                className="pl-4 py-2 lg:py-[0.4vw] text-sm lg:text-18 hover:bg-gray-200 cursor-pointer "
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
              
              {/* </div> */}
              {user ? (
                  <div className="flex items-center gap-x-4">
                       <div className="flex items-center">
                  <button
                    className={`flex justify-between gap-x-2 items-center w-full focus:outline-none bg-[#CA0000] hover:bg-[#ca0000e8] px-3 lg:px-[1vw] py-1 lg:py-[0.4vw] rounded-full text-white text-xs lg:text-18 duration-200`}
                    onClick={handleLogoutModal}
                  >
                    <span className="text-white text-nowrap">0%/0$</span> {/* Text on the left */}
                    <BsLightningCharge className="text-white" /> {/* Icon on the right */}
                  </button>
                 </div>
                  <button
                    className={`flex justify-between gap-x-2 items-center w-full focus:outline-none bg-[#CA0000] hover:bg-[#ca0000e8] px-3 lg:px-[1vw] py-1 lg:py-[0.4vw] rounded-full text-white text-xs lg:text-18 duration-200`}
                    onClick={handleLogoutModal}
                  >
                    <span className="text-white text-nowrap">Log out</span> {/* Text on the left */}
                    <FiLogOut className="text-white" /> {/* Icon on the right */}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex  items-center gap-4 lg:gap-[1.5vw] text-sm lg:text-18">
                    <Link to="/login">
                      <button
                        className={`text-nowrap focus:outline-none text-white text-xs lg:text-18 hover:text-white/80 duration-200`}
                      >
                        Log In
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button
                        className={`text-nowrap focus:outline-none bg-[#CA0000] hover:bg-[#ca0000e8] px-3 lg:px-[1.5vw] py-1 lg:py-[0.5vw] rounded-full text-white text-16 lg:text-18  duration-200`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </>
              )}

              <div className=" flex items-center ">
                <AccountMenu user={user} />
              </div>
            </div>

            <nav className="bg-gray-950/50">
              <div className="max-w-[85vw] mx-auto w-full relative flex items-center justify-between  lg:h-[3.2vw] text-gray-300">
                {/* Hide links on mobile view */}

                <div className="flex items-center">
                  {!isMobile &&
                    Object.entries(menuData).map(([menuItem, menuItelgata]) => (
                      <div
                        key={menuItem}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(menuItem)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          to={menuItelgata.link}
                          className="px-4 py-2 lg:px-[1.5vw] lg:py-[0.4vw] text-sm lg:text-18 flex items-center gap-2 hover:text-white"
                        >
                          {menuItem}
                          {menuItelgata.items && (
                            <BiChevronDown className="h-4 w-4 lg:h-[1vw] lg:w-[1vw]" />
                          )}
                        </Link>

                        {activeMenuItem === menuItem && menuItelgata.items && (
                          <div className="absolute top-full left-0 flex bg-black/95 shadow-xl">
                            <div className="w-64 py-2 border-r border-slate-700">
                              {menuItelgata.items.map((item, index) => (
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
                                  menuItelgata.items.find(
                                    (item) => item.name === activeSubMenuItem
                                  ).submenu
                                ).map(([submenuTitle, submenuItems]) => (
                                  <div key={submenuTitle}>
                                    {/* <h4 className="text-gray-400 my-0.5 text-left">
                                {submenuTitle}
                              </h4> */}
                                    <div
                                      className={`w-full ${activeSubMenuItem === "Makes" || activeSubMenuItem === "Models" ? "grid grid-cols-3 gap-6" : "grid grid-cols-3 gap-2"}`}
                                    >
                                      {activeSubMenuItem === "Models" ? (
                                        <>
                                          {submenuItems.map((item, index) => (
                                            <Link
                                              key={index}
                                              href="#"
                                              className="block py-1 text-left text-gray-300 hover:text-white"
                                              onClick={() =>
                                                handleNavigationFilter(
                                                  item.query,
                                                  item.value
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
                                              className="block py-1 text-left text-gray-300 hover:text-white"
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
                </div>

                {/* Button to open sidebar on mobile */}
                {isMobile && (
                  <IconButton
                    onClick={toggleSidebar}
                    className="text-white z-50"
                  >
                    <MenuIcon className="text-white" color="inherit" />
                  </IconButton>
                )}
                <div className="w-[20%] flex gap-x-6 justify-end items-center">
              <Link to="/contact-us" className="text-sm lg:text-18 hover:text-white">
                {"Contact"}
                </Link>
                <Link to="/help" className="text-sm lg:text-18 hover:text-white">
                  {"Help"}
                </Link>
              </div>
              </div>
             
            </nav>
          </div>
          <div className="block lg:hidden w-[100vw] mx-auto  ">
            <div className="flex  max-w-[85vw] mx-auto w-full items-start justify-between h-12 lg:h-[5vw] gap-2 lg:gap-[1.5vw]">
              {/* <div className=" w-full flex justify-between items-center gap-x-4"> */}
              <div className="flex items-center justify-start">
                <Link to="/" className="">
                  <img
                    src={BidCaribbeanLogo}
                    className="w-[200px]   h-auto"
                    alt={`Logo`}
                  />
                </Link>
                <Link to="/" className="">
                  <img
                    src={LuxCarsLogo}
                    className="w-[80px]   h-auto"
                    alt={`Logo`}
                  />
                </Link>
              </div>

              {/* </div> */}

              <div className=" flex items-center ">
                <AccountMenu user={user} />
              </div>
            </div>
            <div className="w-[85vw] mx-auto flex justify-between items-center     ">
              <div className="relative w-[50%] md:w-[70%]" ref={dropdownRef}>
                <input
                  type="text"
                  placeholder={`${isMobile ? "Search here..." : "Search for vehicle by Make, Model, Lot or VIN..."}`}
                  className="w-[100%] mx-auto p-1 lg:py-[0.6vw] lg:px-[1.5vw] rounded-full bg-gray-100/95 text-xs lg:text-18"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onKeyDown={handleKeyDown}
                />

                <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <BsSearch className="h-2 lg:h-[1vw] w-2 lg:w-[1vw]" />
                </button>
                {searchResults.length > 0 && ( // Render dropdown if there are results
                  <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto">
                    {searchResults.map((car) => (
                      <div
                        key={car.make}
                        className=" flex justify-between items-center w-full"
                      >
                        <div className=" text-left w-full">
                          {car.models.map((model) => (
                            <div
                              key={model}
                              className="pl-4 py-2 lg:py-[0.4vw] text-sm lg:text-18 hover:bg-gray-200 cursor-pointer "
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
              <div className=" relative flex items-center justify-between  lg:h-[3.2vw] text-gray-300">
                {/* Hide links on mobile view */}

                <div className="flex items-center">
                  {!isMobile &&
                    Object.entries(menuData).map(([menuItem, menuItelgata]) => (
                      <div
                        key={menuItem}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(menuItem)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          to={menuItelgata.link}
                          className="px-4 py-2 lg:px-[1.5vw] lg:py-[0.4vw] text-sm lg:text-18 flex items-center gap-2 hover:text-white"
                        >
                          {menuItem}
                          {menuItelgata.items && (
                            <BiChevronDown className="h-4 w-4 lg:h-[1vw] lg:w-[1vw]" />
                          )}
                        </Link>

                        {activeMenuItem === menuItem && menuItelgata.items && (
                          <div className="absolute top-full left-0 flex bg-black/95 shadow-xl">
                            <div className="w-64 py-2 border-r border-slate-700">
                              {menuItelgata.items.map((item, index) => (
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
                                  menuItelgata.items.find(
                                    (item) => item.name === activeSubMenuItem
                                  ).submenu
                                ).map(([submenuTitle, submenuItems]) => (
                                  <div key={submenuTitle}>
                                    {/* <h4 className="text-gray-400 my-0.5 text-left">
                                {submenuTitle}
                              </h4> */}
                                    <div
                                      className={`w-full ${activeSubMenuItem === "Makes" || activeSubMenuItem === "Models" ? "grid grid-cols-3 gap-6" : "grid grid-cols-3 gap-2"}`}
                                    >
                                      {activeSubMenuItem === "Models" ? (
                                        <>
                                          {submenuItems.map((item, index) => (
                                            <Link
                                              key={index}
                                              href="#"
                                              className="block py-1 text-left text-gray-300 hover:text-white"
                                              onClick={() =>
                                                handleNavigationFilter(
                                                  item.query,
                                                  item.value
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
                                              className="block py-1 text-left text-gray-300 hover:text-white"
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
                </div>

                {/* Button to open sidebar on mobile */}
                {isMobile && (
                  <IconButton
                    onClick={toggleSidebar}
                    className="text-white z-50"
                  >
                    <MenuIcon className="text-white" color="inherit" />
                  </IconButton>
                )}
              </div>
            </div>

            <nav className="bg-gray-950/50"></nav>
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
