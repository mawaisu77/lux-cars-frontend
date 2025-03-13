import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import CarCard from "../../cards/CarCard";
import LocalCarsCard from "../../cards/LocalCarsCard";
import useGetSavedCars from "../../../hooks/useGetUserSavedCars";
import useGetSavedLocalCars from "../../../hooks/useGetUserSavedLocalCars";

const SavedCars = () => {
  const [selectedOption, setSelectedOption] = useState("bidding");
  const { error, fetchSavedCars, loading, savedCars } = useGetSavedCars();
  const {
    savedLocalCars,
    localCarLoading,
    localCarError,
    fetchSavedLocalCars,
  } = useGetSavedLocalCars();

  useEffect(() => {
    if (selectedOption === "bidding") {
      fetchSavedCars();
    }
    if (selectedOption === "local") {
      fetchSavedLocalCars();
    }
  }, [selectedOption]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };


  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (localCarError) {
    return <p className="text-center text-red-500">Error: {localCarError}</p>;
  }

  return (
    <>
      <div className="w-[90vw] lg:w-[85vw] mx-auto mt-6 lg:mt-[1.5vw] text-black">

        <div className="flex justify-between items-center">
        <h1 className="text-[24px] md:text-[36px] lg:text-[2.3vw] font-urbanist text-left font-bold">
          Saved Cars
        </h1>
        <div className="flex justify-center space-x-4 lg:space-x-[1vw] ">
          <button
            className={`px-2 md:px-4 lg:px-[1vw] py-1 md:py-2 lg:py-[0.5vw] text-[13px] lg:text-[1vw] font-semibold rounded lg:rounded-[0.5vw] ${selectedOption === "bidding" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleOptionChange("bidding")}
          >
            Bidding Cars
          </button>
          <button
            className={`px-2 md:px-4 lg:px-[1vw] py-1 md:py-2 lg:py-[0.5vw] text-[13px] lg:text-[1vw] font-semibold rounded lg:rounded-[0.5vw] ${selectedOption === "local" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleOptionChange("local")}
          >
            Local Cars
          </button>
        </div>
        </div>
       
        {selectedOption === "bidding" ? (
          loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader size={50} color={"#D0021B"} loading={loading} />
            </div>
          ) : (
            <div className="w-[90vw] lg:w-[85vw]  mx-auto  mt-[50px] text-black">
              {savedCars && savedCars?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                  <p className="text-2xl font-bold text-gray-500">
                    No Saved Cars Found
                  </p>
                  <p className="text-gray-400 mt-2">
                    It looks like you haven't saved any car yet.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-x-2 font-urbanist font-semibold">
                    <h1 className="text-center text-xl md:text-2xl lg:text-[1.875vw] lg:leading-[2.25vw] ">
                      Saved Bidding Cars ({savedCars && savedCars?.data?.length}
                      )
                    </h1>
                  </div>
                  <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
                  {savedCars &&
                      savedCars?.data?.map((car) => <CarCard card={car} />)}
                  </div>
                </>
              )}
            </div>
          )
        ) : selectedOption === "local" ? (
          localCarLoading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader
                size={50}
                color={"#D0021B"}
                loading={localCarLoading}
              />
            </div>
          ) : (
            <div className="w-[90vw] lg:w-[85vw]  mx-auto  mt-[50px] lg:mt-[2.604vw] text-black">
              {savedLocalCars && savedLocalCars?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                  <p className="text-2xl font-bold text-gray-500">
                    No Saved Local Cars Found
                  </p>
                  <p className="text-gray-400 mt-2">
                    It looks like you haven't saved any Local car yet.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center gap-x-2 font-urbanist font-semibold">
                    <h1 className="text-center text-xl md:text-2xl lg:text-[1.875vw] lg:leading-[2.25vw] ">
                      Saved Local Cars (
                      {savedLocalCars && savedLocalCars?.data?.length})
                    </h1>
                  </div>
                  <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] gap-x-2 sm:gap-[2vw] md:gap-[1.5vw] lg:gap-[1.094vw] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 ">
                    {savedLocalCars &&
                      savedLocalCars?.data?.map((car) => (
                        <LocalCarsCard card={car} />
                      ))}
                  </div>
                </>
              )}
            </div>
          )
        ) : null}
      </div>
    </>
  );
};

export default SavedCars;
