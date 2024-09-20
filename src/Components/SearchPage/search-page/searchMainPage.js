import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchCard from "../search-page/searchCard";
import baseService from "../../../services/baseService";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function SearchMainPage({
  appliedFilters,
  triggerFetch,
  resetFilters,
  setShowFiltersMob,
  showFilterMob,
  handleFilters,
}) {
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
    fetchCards(1);
  }, [triggerFetch]);

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
      console.log("appliedFilters in search main page", appliedFilters);

      Object.entries(appliedFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item) params.append(key, item);
          });
        } else if (value) {
          params.append(key, value);
        }
      });

      const queryString = params.toString().replace(/\+/g, "%20");
      const response = await baseService.get(
        `cars/get-all-cars?${queryString}`
      );

      // Append new cards to the existing cards
      setCards((prevCards) => [...prevCards, ...response.data.data.cars]);
      setTotalResults(response.data.data.totalLength);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred on the server."
        );
      } else if (error.request) {
        setError("No response from server. Please check your network.");
      } else {
        setError("Something went wrong.");
      }

      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    // Increment page number to load more cards
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="sm:w-[54vw] w-full mx-auto my-[2.604vw] font-urbanist">
        <div className="flex flex-col lg:flex-row justify-between items-center   lg:mt-[9.3vh] lg:items-start">
          <div className="flex mb-4 lg:mb-0">
            <h2 className="text-[24px] lg:text-[1.95vw] font-urbanist font-bold">
              {`${totalResults} Available Vehicles`}
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row   relative text-left text-sm lg:text-base">
            <div className="flex">
              <input
                type="text"
                placeholder="Search here..."
                className="w-[250px] lg:w-[17vw] lg:h-[4.8vh] rounded-l-lg border p-2 text-[16px] lg:text-[0.8vw]"
              />
              <div className="flex lg:h-[4.8vh] w-[44px] lg:w-[3vw] justify-center items-center bg-red-700 rounded-r-lg">
                <GoSearch size={20} color="white" className="cursor-pointer" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={toggleDropdown}
                  className="w-[100px] mt-[2vh] lg:mt-0  lg:w-[5.5vw] h-[46px] lg:h-[4.8vh] rounded-lg text-[16px] lg:text-[0.8vw] flex items-center justify-center ml-0 lg:ml-2 border bg-white"
                >
                  Sort By
                  <RiArrowDropDownLine
                    size={20}
                    className="ml-1 cursor-pointer"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="lg:origin-top-right z-10 absolute lg:right-0   w-[100px] lg:w-[5.5vw]   lg:h-[4.8vh] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {options.map((option, index) => (
                        <button
                          key={index}
                          className="flex items-center justify-center w-[100px] lg:w-[5.5vw] h-[46px] lg:h-[4.8vh] text-sm text-gray-700 hover:bg-red-700 hover:text-white"
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
              <div>
                {showFilterMob ? (
                  <button
                    className="lg:hidden px-4 py-2  mt-[2vh]  flex justify-center items-center mx-auto border transition-all rounded-lg duration-300"
                    onClick={handleFilters} // Correctly hiding the filters
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
            </div>
          </div>
        </div>

        {/* Conditionally render based on loading, error, or cards data */}
        <div className="relative">
          {cards.length > 0 && <SearchCard data={cards} />}

          {!loading && !error && cards.length === 0 && (
            <div className="flex flex-col items-center my-10">
              <div>No vehicles found.</div>
              <button
                onClick={resetFilters}
                className="p-2 bg-gray-500 w-1/4 hover:bg-gray-600 text-white rounded-lg mt-4"
              >
                Reset Filters
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center my-10">
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            </div>
          )}

          {error && (
            <div className="h-96 flex flex-col justify-center items-center gap-y-4">
              <div className="font-bold text-red-600 text-3xl">{error}</div>
              <Link to={"/"}>
                <div className="font-bold text-lg flex gap-x-2 justify-center items-center">
                  <span>
                    <FaArrowLeftLong />
                  </span>
                  <span>Go to Home</span>
                </div>
              </Link>
            </div>
          )}

          {cards.length < totalResults && !loading && !error && (
            <div
              onClick={loadMore}
              className="flex cursor-pointer justify-center mx-auto items-center w-36 lg:w-32 h-12 lg:h-12 bg-gray-200 text-sm lg:text-base text-red-600 font-semibold rounded-full mt-20 mb-20"
            >
              Load More
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchMainPage;
