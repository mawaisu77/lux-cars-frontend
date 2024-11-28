import React, { useEffect } from 'react';
import { FaSearch, FaHeart, FaChevronDown, FaSync } from 'react-icons/fa';
import Item from './Item';
import { cars } from './data';
import { Link } from 'react-router-dom';
import useGetAllLiveCars from '../../../hooks/live-auction/useGetAllLiveCars';

const List = () => {

 const { liveCars, loading, error, fetchLiveCars } = useGetAllLiveCars();
 useEffect(() => {
     fetchLiveCars();
 }, []);

 console.log("liveCars", liveCars);

  return (
    <>
      <div className="Backgroundimage-Privicy-loan-terms">
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col pt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Live Auction Search
            </div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white hover:text-[1.1vw]">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">Live Auction Search</button>
            </div>
          </div>
        </div>
      </div>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
        <button
              onClick={fetchLiveCars}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-50"
            >
              <FaSync className={`${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {/* <span className="text-sm text-gray-600">Date: 2/29 - 3/6/2024</span>
            <button className="flex items-center text-sm text-gray-600">
              Filters <FaChevronDown className="ml-1" />
            </button> */}
        </div>
      </div>

      <div className="bg-gray-100 grid grid-cols-[auto,1fr,1fr,1fr,1fr,auto] gap-4 py-2 px-4 font-semibold text-sm uppercase">
        <div>Image</div>
        <div>Lot Info</div>
        <div>Vehicle Info</div>
        <div>Condition</div>
        <div>Sale Info</div>
        <div>Bids</div>
      </div>

      {error ? (
        <div className="text-center py-8">
          <p className="text-red-500">Error loading cars. Please try again later.</p>
        </div>
      ) : loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : liveCars && liveCars?.cars?.length > 0 ? (
        liveCars?.cars?.map((car, index) => (
          <div className='my-2' key={index}>
            <Item car={car} />
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No cars available at this time.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default List;

