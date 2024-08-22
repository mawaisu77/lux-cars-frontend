import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchCard from "../search-page/searchCard";
import baseService from "../../../services/baseService";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function SearchMainPage({ appliedFilters }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); // Set default page size
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const options = ["Won Bids", "Lost Bids", "Saved"];

  useEffect(() => {
    setPage(1);
    setCards([]);
    fetchCards(1); // Fetch first page when filters change
  }, [appliedFilters]);

  useEffect(() => {
    if (page > 1) fetchCards(page);
  }, [page]);

  const fetchCards = async (page) => {
    setLoading(true); 
    setError(null); 
    try {
      const params = new URLSearchParams({
        page,
        size,
      });
    // Iterate over appliedFilters
    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Append each non-empty array item as a separate parameter
        value.forEach((item) => {
          if (item) params.append(key, item);
        });
      } else if (value) {
        // Append non-empty single values
        params.append(key, value);
      }
    });

      const queryString = params.toString().replace(/\+/g, '%20');
      console.log("<<<< ====== >>>>",queryString)
      const response = await baseService.get(`cars/get-all-cars?${queryString}`);
      
      setCards((prevCards) => [...prevCards, ...response.data.data.cars]);
      setTotalResults(response.data.data.totalLength);

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'An error occurred on the server.');
      } else if (error.request) {
        setError('No response from server. Please check your network.');
      } else {
        setError('Something went wrong.');
      }
  
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false); 
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };


  return (
    <div>
      <div className="w-[54vw] mx-auto my-[2.604vw] font-urbanist">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          <div className="flex mb-4 lg:mb-0">
            <h2 className="text-[1.95vw] font-urbanist font-bold">
              {`${totalResults} Available Vehicles`}
            </h2>
          </div>
          <div className="flex relative text-left text-sm lg:text-base">
            <input
              type="text"
              placeholder="Search here..."
              className=" lg:w-[17vw]  lg:h-[4.8vh] rounded-l-lg border p-2 text-[0.8vw]"
            />
            <div className="flex h-[4.8vh] w-[3vw] justify-center items-center bg-red-700 rounded-r-lg">
              <GoSearch size={20} color="white" className="cursor-pointer" />
            </div>
            <button
              onClick={toggleDropdown}
              className=" w-[5.5vw] h-[4.8vh] rounded-lg text-[0.8vw] flex items-center justify-center ml-2 border bg-white"
            >
              Sort By
              <RiArrowDropDownLine size={20} className="ml-1 cursor-pointer" />
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right z-10 absolute right-0 mt-[5vh]  w-[5.5vw] h-[15.8vh]  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="  flex items-center justify-center w-[5.5vw] h-[4.8vh] text-sm text-gray-700 hover:bg-red-700 hover:text-white"
                      role="menuitem"
                      onClick={() => {
                        console.log(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conditionally render based on loading, error, or cards data */}
        {loading && (
          <div className="h-96 flex justify-center gap-y-4 flex-col items-center">
            <ClipLoader size={50} color={"#123abc"} loading={loading} />
          </div>
        )}

        {error && (
         <div className="h-96 flex justify-center gap-y-4 flex-col items-center ">
           <div className="font-bold text-red-600 text-3xl">
            {error}
          </div>
          <Link to={'/'}>
           <div className="font-bold text-lg flex gap-x-2 justify-center items-center">
           <span>
              <FaArrowLeftLong />
            </span>
            <span>Go to Home</span>
          </div>
          </Link>
         </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <SearchCard data={cards} />
        )}

        {!loading && !error && cards.length === 0 && (
          <div className="flex justify-center my-10">
            No vehicles found.
          </div>
        )}

        {cards.length < totalResults && !loading && !error &&(
        <div onClick={loadMore}
            className="flex cursor-pointer justify-center mx-auto items-center w-36 lg:w-32 h-12 lg:h-12 bg-gray-200 text-sm lg:text-base text-red-600 font-semibold rounded-full mt-20 mb-20">
           load more
        </div>
     
         )} 
      </div>
    </div>
  );
}

export default SearchMainPage;
