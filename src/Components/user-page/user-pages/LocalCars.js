import React, { useEffect, useState } from "react";

import { ClipLoader } from "react-spinners"; // Optional spinner library
import OfferCards from "../../cards/OfferCards";
import useGetMyLocalCars from "../../../hooks/useGetMyLocalCars";
import MyLocalCarsCard from "../../../MyLocalCarsCard";

const LocalCars = () => {
    const { localCars, loading, error, fetchLocalCars } = useGetMyLocalCars();

  useEffect(() => {
    fetchLocalCars();
  }, []);


  return (
    <>
      <div className="w-full lg:w-[74vw] mx-auto  mt-[50px] text-black">
        {localCars && localCars?.data?.cars?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
              No Local Cars Available
            </p>
            <p className="text-gray-400 mt-2">
              It looks like you haven't posted any local cars yet.
            </p>
          </div>
        ) : (
          <div className=" overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Car Image
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Title
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    VIN
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Location
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Posted
                  </th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <ClipLoader size={50} color={"#D0021B"} loading={loading} />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="8" className="text-center text-red-500 py-4">
                    {error}
                  </td>
                </tr>
              ) : (
                localCars?.data?.cars?.map((localCar, index) => (
                  <MyLocalCarsCard
                    key={index}
                    localCar={localCar}
                  />
                ))
              )}
            </tbody>
            </table>
          </div>
        )}
      </div>
   
    </>
  );
};

export default LocalCars;
