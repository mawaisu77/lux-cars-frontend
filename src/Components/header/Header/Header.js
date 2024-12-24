import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { BsSearch } from "react-icons/bs";
import { searchSuggestedData  } from "./searchSuggestedData";


const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [isFocused, setIsFocused] = useState(false); // For input focus/overlay
  const dropdownRef = useRef(null); // Ref for detecting outside clicks

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
      const [makeQuery, ...modelQueries] = queryParts; // First part as make, rest as model queries
  
      const filteredResults = searchSuggestedData.filter(car => {
        // Check if the make matches
        const isMakeMatch = car.make.toLowerCase().includes(makeQuery);
  
        // Check if any models match the remaining query parts
        const matchedModels = car.models.filter(model => 
          modelQueries.some(modelQuery => 
            model.toLowerCase().includes(modelQuery)
          )
        );
  
        // Ensure both make and model(s) are matched
        return isMakeMatch && (matchedModels.length > 0 || modelQueries.length === 0);
      });
  
      // Construct the results
      const results = filteredResults.map(car => {
        const matchedModels = car.models.filter(model => 
          modelQueries.some(modelQuery =>
            model.toLowerCase().includes(modelQuery)
          )
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
    if (e.key === 'Enter') {
      navigate(`/search-page?search=${encodeURIComponent(searchQuery)}`); 
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
  <header className="bg-black">
      <div className="w-full sm:max-w-[90vw] max-w-[85vw] mx-auto px-4 md:px-[1.5vw]">
        <div className="flex items-center h-20 md:h-[4.5vw] gap-4 md:gap-[1.5vw]">
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
                    onFocus={() => setIsFocused(true)} // Show overlay

                    onKeyDown={handleKeyDown}/>

                  <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <BsSearch className="h-5 md:h-[0.2vw] w-5 md:w-[0.2vw]" />
                  </button>
                  {searchResults.length > 0 && ( // Render dropdown if there are results
                   <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto">
                     {searchResults.map((car) => (
                       <div key={car.make} className=" flex justify-between items-center w-full">
                         <div className=" text-left w-full">
                           {car.models.map((model) => (
                             <div key={model} className="pl-4 py-2 hover:bg-gray-200 cursor-pointer " onClick={() => handleDropdownItemClick(car.make, model)}>
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
                className={`focus:outline-none lg:text-18 text-white`}
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
                    className={` focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-6 md:px-[1.5vw] py-2 md:py-[0.2vw] rounded-full text-white lg:text-18  duration-200`}
                  >
                  
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
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
              onClick={() => document.getElementById("my_logout_modal").close()}
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
