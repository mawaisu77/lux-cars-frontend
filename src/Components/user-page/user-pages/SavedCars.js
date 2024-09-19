import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners"; // Optional spinner library
import CarCard from "../../cards/CarCard";
import useGetSavedCars from "../../../hooks/useGetUserSavedCars";

const SavedCars = () => {
  const { error, fetchSavedCars, loading, savedCars } = useGetSavedCars();

  useEffect(() => {
    fetchSavedCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#D0021B"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }


  return (
    <>
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
            </h1>
           <h1 className="text-center text-3xl ">
                Saved Cars ({savedCars && savedCars?.data?.length})
            </h1>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {savedCars && savedCars?.data?.map((car) => (
                <CarCard card={car} />
                ))} 
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SavedCars;
