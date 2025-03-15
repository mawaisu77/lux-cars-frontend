import React, { useEffect, useState } from "react";
import { FaTrash, FaEye, FaEyeSlash, FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone';

const BidCars = () => {
  const [savedFilters, setSavedFilters] = useState([]);
  const [visibilityState, setVisibilityState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedFilters = localStorage.getItem("savedFilters");
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters);
        
        // Convert any old format filters to new format with timestamps
        const formattedFilters = parsedFilters.map(filter => {
          if (typeof filter === 'string') {
            // If it's just a string (old format), convert to object with timestamp
            return {
              params: filter,
              timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
              timezone: moment.tz.guess()
            };
          }
          return filter;
        });
        
        // Save the updated format back to localStorage
        localStorage.setItem("savedFilters", JSON.stringify(formattedFilters));
        
        setSavedFilters(formattedFilters);
        
        // Initialize visibility state for all filters (default to hidden)
        const initialVisibility = {};
        formattedFilters.forEach((_, index) => {
          initialVisibility[index] = false;
        });
        setVisibilityState(initialVisibility);
      } catch (error) {
        console.error("Error parsing saved filters:", error);
        setSavedFilters([]);
      }
    }
  }, []);

  const extractValidFilters = (filterString) => {
    return filterString
      .split("&")
      .filter((param) => param.includes("=") && param.split("=")[1] !== "")
      .flatMap((param) => {
        const [key, value] = param.split("=");
        const decodedValue = decodeURIComponent(value).replace(/\+&\+/g, "+%26+");
        return decodedValue.includes(",")
          ? decodedValue.split(",").map((v) => `${key}=${v}`)
          : [`${key}=${decodedValue}`];
      });
  };

  const handleSearchClick = (filter) => {
    const filterString = typeof filter === 'object' ? filter.params : filter;
    const validFilters = extractValidFilters(filterString).join("&");
    navigate(`/search-page?${validFilters}`);
  };

  const handleDeleteSearch = (index) => {
    const updatedFilters = savedFilters.filter((_, i) => i !== index);
    setSavedFilters(updatedFilters);
    localStorage.setItem("savedFilters", JSON.stringify(updatedFilters));
  };

  const formatFilterForUI = (filterString) => {
    return filterString
      .replace(/\+/g, " ") 
      .replace(/%27/g, "'") 
      .replace(/%26/g, "&"); 
  };

  const toggleVisibility = (index, event) => {
    event.stopPropagation(); // Prevent triggering the search click
    setVisibilityState(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="max-w-[85vw] mx-auto my-5 p-4 bg-white shadow-sm rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Saved Searches Copart & IAAI</h2>
    {savedFilters.length === 0 ? (
      <p className="text-gray-500">No saved searches found.</p>
    ) : (
      <ul className="space-y-2">
        {savedFilters.map((filter, index) => {
          // Make sure we're correctly accessing the params property
          const filterString = typeof filter === 'object' && filter.params ? filter.params : filter;
          const timestamp = typeof filter === 'object' && filter.timestamp ? filter.timestamp : null;
          
          const validFilters = extractValidFilters(filterString);
          const rawTitle = validFilters.join(" | ");
          const isVisible = visibilityState[index];

          console.log("Filter:", filter, "Timestamp:", timestamp); // Add this for debugging

          return validFilters.length ? (
            <li
              key={index}
              className="flex flex-wrap items-center gap-2 p-2 lg:p-[0.5vw] bg-gray-100 rounded hover:bg-gray-200 transition"
            >
              <div
                title={rawTitle}
                onClick={() => handleSearchClick(filter)}
                className="flex-1 flex flex-col cursor-pointer"
              >
                <div className="flex flex-wrap gap-2">
                  {isVisible ? (
                    validFilters.map((f, i) => {
                      const filterKey = f.split('=')[0]; // Get only the key part
                      const filterValue = f.split('=')[1];
                      return (
                        <button
                          key={i}
                          className="px-2.5 py-0.5 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
                        >
                          {filterKey} : {formatFilterForUI(filterValue)}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-2 py-1 font-medium">
                      Search {index + 1}
                    </div>
                  )}
                </div>
                
                {/* Always display timestamp section, with fallback text if missing */}
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  <FaClock className="mr-1" /> 
                  {timestamp ? timestamp : "Saved search (no timestamp)"}
                </div>
              </div>
              <button
                className="text-blue-500 hover:text-blue-700 p-1 lg:p-[0.25vw] lg:text-[1vw]"
                onClick={(e) => toggleVisibility(index, e)}
              >
                {isVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              <button
                className="text-red-500 hover:text-red-700 p-1 lg:p-[0.25vw] lg:text-[1vw]"
                onClick={() => handleDeleteSearch(index)}
              >
                <FaTrash />
              </button>
            </li>
          ) : null;
        })}
      </ul>
    )}
  </div>
  );
};

export default BidCars;
