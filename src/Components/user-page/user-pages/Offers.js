import React, { useEffect, useState } from "react";

import User from "../../cards/User";
import useGetAllOffers from "../../../hooks/useGetAllOffers"; // Adjust the path to your hook file
import { ClipLoader } from "react-spinners"; // Optional spinner library
import OfferCards from "../../cards/OfferCards";
import useUpdateOffer from "../../../hooks/useUpdateOffer";

const Offers = () => {
  const { offers, loading, error, fetchOffers } = useGetAllOffers();
  const {
    respondToOffer,
    isLoading: isUpdating,
    setIsLoading,
    setError,
    setUpdateOfferResponse,
    error: updateError,
    success: updateSuccess,
    setSuccess,
    updateOfferResponse
  } = useUpdateOffer();

    const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    fetchOffers();
    setNeedsRefresh(false);
  }, []);

  useEffect(() => {
    if (needsRefresh) {
      console.log("needsRefresh", needsRefresh);
      fetchOffers();
      setNeedsRefresh(false); 
    }
  }, [needsRefresh, fetchOffers]);


  return (
    <>
      <div className="w-full lg:w-[74vw]  mx-auto  mt-[50px] text-black">
        {offers && offers?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <p className="text-2xl font-bold text-gray-500">
              No Offers Available
            </p>
            <p className="text-gray-400 mt-2">
              It looks like you haven't received any offers yet.
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
                    Location
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Posted
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Offer Price
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-2 font-medium text-gray-700 text-nowrap">
                    Edit
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
                    Error: {error}
                  </td>
                </tr>
              ) : (
                offers?.data?.map((offer, index) => (
                  <OfferCards
                    key={index}
                    offer={offer}
                    onUpdate={respondToOffer}
                    loading={isUpdating}
                    setIsLoading={setIsLoading}
                    setUpdateOfferResponse={setUpdateOfferResponse}
                    setError={setError}
                    error={updateError}
                    success={updateSuccess}
                    updateOfferResponse={updateOfferResponse}
                    setSuccess={setSuccess}
                    triggerRefresh={() => setNeedsRefresh(true)}
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

export default Offers;
