import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BidCars = () => {
  const [savedFilters, setSavedFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFilters = localStorage.getItem("savedFilters");
    if (storedFilters) {
      const parsedFilters = JSON.parse(storedFilters);
      setSavedFilters(parsedFilters);
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

  const handleSearchClick = (filterString) => {
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

  return (
    <div className="max-w-[85vw] mx-auto mt-5 p-4 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Saved Searches Copart & IAAI</h2>
    {savedFilters.length === 0 ? (
      <p className="text-gray-500">No saved searches found.</p>
    ) : (
      <ul className="space-y-2">
        {savedFilters.map((filter, index) => {
          const validFilters = extractValidFilters(filter);
          const rawTitle = validFilters.join(" | "); // For hover title
          const formattedFilters = validFilters.map((f) => formatFilterForUI(f));

          return validFilters.length ? (
            <li
              key={index}
              className="flex items-center justify-between p-2 lg:p-[0.5vw] bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition"
            >
              <span onClick={() => handleSearchClick(filter)} title={rawTitle}>
                {formattedFilters.join(" | ")}
              </span>
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
