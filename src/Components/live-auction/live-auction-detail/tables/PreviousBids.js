import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetAllBids from '../../../../hooks/live-auction/useGetAllBids';

export default function PreviousBids({id, liveData, members, memberCount}) {
  const { allBids, loading, error, fetchAllBids } = useGetAllBids();

  useEffect(() => {
    fetchAllBids(id);
  }, [id, liveData]);


  return (
    <div className="p-[1vw] bg-white rounded-lg shadow-custom h-[21.615vw] mt-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-[0.625vw]">
        <h2 className="text-16 font-semibold">Previous Bids</h2>
        <button className="text-16 text-gray-500 hover:text-blue-600"> <strong>Total Bids: {allBids?.length || 0}</strong></button>
      </div>

      {/* Table Container */}
      <div className="h-[90%] no-scrollbar overflow-y-scroll ">
        <table className="w-full table-auto border-collapse border rounded-xl">
          {/* Table Header */}
          <thead className="sticky  top-0 bg-white">
            <tr>
              <th className="px-[0.729vw] py-[0.625vw] text-left text-15 font-medium text-gray-500 uppercase border-b">USERNAME</th>
              <th className="px-[0.729vw] py-[0.625vw] text-left text-15 font-medium text-gray-500 uppercase border-b">PRICE</th>
              <th className="px-[0.729vw] py-[0.625vw] text-right text-15 font-medium text-gray-500 uppercase border-b">STATUS</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
        {loading ? (
          <tr className="w-full h-full">
            <td colSpan="4" className="text-center py-[2vw]">
              <div className="flex justify-center items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-gray-500">Loading bids...</span>
              </div>
            </td>
          </tr>
        ) : error ? (
          <div className="w-full h-full flex justify-center items-center bg-yellow-400" >
            <div className="text-center py-[2vw] w-full">
              <div className="text-red-500">
                <p className="font-semibold">Error loading bids</p>
                <p className="text-14">{error.message}</p>
              </div>
            </div>
          </div>
        ) : allBids?.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center py-[2vw] text-gray-500">
              No bids available
            </td>
          </tr>
        ) : (
          allBids?.map((bid) => (
            <tr key={bid.id} className="hover:bg-gray-50 w-full">
            <td className="px-[0.729vw] py-[0.625vw] text-left text-15 text-blue-600 font-semibold border-b">{bid?.userDetails?.username}</td>
            <td className="px-[0.729vw] py-[0.625vw] text-left text-15 text-gray-700 border-b">${bid?.bid?.bidPrice || 0}</td>
            <td className="px-[0.729vw] py-[0.625vw] text-right text-15 border-b">
              <span
                className={`inline-block px-[0.729vw] py-[0.26vw] text-15 text-right rounded-lg ${
                  bid?.bid?.isValid ? ' bg-blue-100 text-blue-500 border border-blue-500' : 'bg-red-100 text-red-500 border border-red-500'
                }`}
              >
                  {bid?.bid?.isValid ? 'Active' : 'Expired'}
                </span>
              </td>
            </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}
