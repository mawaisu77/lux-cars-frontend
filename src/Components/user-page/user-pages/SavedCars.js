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

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <ClipLoader size={50} color={"#D0021B"} loading={loading} />
  //     </div>
  //   );
  // }
  // if (localCarLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <ClipLoader size={50} color={"#D0021B"} loading={localCarLoading} />
  //     </div>
  //   );
  // }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (localCarError) {
    return <p className="text-center text-red-500">Error: {localCarError}</p>;
  }

  return (
    <>
      <div className="w-full lg:w-[74vw]  mx-auto  mt-[50px] text-black">
        <h1 className="text-[36px] lg:text-[2.3vw] font-urbanist text-left font-bold">
          Saved Cars
        </h1>
        <div className="flex justify-center space-x-4 my-6">
          <button
            className={`px-4 py-2 font-semibold rounded ${selectedOption === "bidding" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleOptionChange("bidding")}
          >
            Bidding Cars
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded ${selectedOption === "local" ? "bg-primary-red text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleOptionChange("local")}
          >
            Local Cars
          </button>
        </div>
        {selectedOption === "bidding" ? (
          loading ? (
            <div className="flex justify-center items-center min-h-screen">
              <ClipLoader size={50} color={"#D0021B"} loading={loading} />
            </div>
          ) : (
            <div className="w-full lg:w-[74vw]  mx-auto  mt-[50px] text-black">
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
                    <h1 className="text-center text-3xl ">
                      Saved Bidding Cars ({savedCars && savedCars?.data?.length}
                      )
                    </h1>
                  </div>
                  <div className="relative my-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
            <div className="w-full lg:w-[74vw]  mx-auto  mt-[50px] text-black">
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
                    <h1 className="text-center text-3xl ">
                      Saved Local Cars (
                      {savedLocalCars && savedLocalCars?.data?.length})
                    </h1>
                  </div>
                  <div className="relative my-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
