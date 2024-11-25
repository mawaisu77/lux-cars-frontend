import React, { useEffect, useRef, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import SearchCard from "../search-page/searchCard";
import baseService from "../../../services/baseService";
import { ClipLoader } from "react-spinners";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";


function SearchMainPage({
  appliedFilters,
  triggerFetch,
  resetFilters,
  setShowFiltersMob,
  showFilterMob,
  handleFilters,
}) {

  const location = useLocation(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); // Set default page size
  const [totalResults, setTotalResults] = useState("-");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialFetchDone = useRef(false);

  const apiEndpoint =  localStorage.getItem("apiEndpoint") || "cars/get-all-cars/testing"



  useEffect(() => {
    setPage(1); // Reset to first page
    setCards([]); // Clear previous cards
    fetchCards(1); // Fetch for the first page only once
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

      const response = await baseService.get(`${apiEndpoint}?${queryString}`);

      setCards((prevCards) =>
        page === 1
          ? response.data.data.cars
          : [...prevCards, ...response.data.data.cars]
      );
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
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="w-full">
      <div className=" w-full mx-auto  font-urbanist flex flex-col">
        <div className="flex flex-col border-b-2  w-full lg:flex-row justify-between items-center  ">
          <div className="flex mb-4 lg:mb-0 mx-auto">
            <h2 className="text-[24px] lg:text-[1.2vw] font-urbanist font-semibold">
              {`${totalResults} Available Vehicles`}
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row   relative text-left text-sm lg:text-base">
            
            <div className="flex justify-between items-center">
       
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
            </div>
          </div>
        </div>

        </div>
        
        {/* Conditionally render based on loading, error, or cards data */}
        <div className="">
          <div className="">
            {cards.length > 0 && <SearchCard data={cards} />}
          </div>

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
    
  );
}

export default SearchMainPage;
