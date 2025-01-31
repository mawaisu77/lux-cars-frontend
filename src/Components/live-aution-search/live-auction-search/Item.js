import React from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Item = ({ car, isToday=false }) => {
  return (
    <>
      {/* Mobile View - Card Layout */}
      <div className="md:hidden bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="p-4 space-y-4">
          {/* Image Section */}
          <div className="w-full h-48 bg-gray-200 rounded-md overflow-hidden">
            <img
              src={car.carImages[0]}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Car Info Section */}
          <div className="space-y-2 ">
            <Link to={`/live-auction/${car.id}`}>
              <h3 className="text-xl text-left font-semibold hover:text-blue-600 hover:underline">
                {car.year} {car.make} {car.model}
              </h3>
            </Link>
            <p className="text-sm text-gray-500">VIN: {car.vin}</p>
          </div>

          {/* Vehicle Details */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Odometer:</span>
              <span className="text-sm font-medium">{car.mileage} mi</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Estimated Value:</span>
              <span className="text-sm font-medium">{car?.minPrice ? `$${car.minPrice}` : "N/A"}</span>
            </div>
          </div>

          {/* Condition */}
          <div className="space-y-1 text-left">
            <h4 className="text-sm font-semibold">Condition Notes:</h4>
            <p className="text-sm text-gray-600">{car.significantFlaws}</p>
          </div>

          {/* Location and Status */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">{car.location || "N/A"}</p>
            <p className="text-sm text-green-600 font-semibold">Live Now</p>
          </div>

          {/* Bid Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Bid:</span>
              <span className="text-lg font-semibold">{car.currentBid ? `$${car.currentBid}` : "N/A"}</span>
            </div>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors">
              Join Auction
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden md:grid grid-cols-6 gap-4 md:gap-[1.625vw] items-center py-4 md:py-[0.625vw] rounded-md shadow-custom  transition-all duration-300 px-2 md:px-[1.625vw] bg-white">
        {/* Image */}
        <div className="w-24 h-16 md:w-[8.625vw] md:h-[4.625vw] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={car.carImages[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <Link to={`/live-auction/${car.id}`}>
            <h3 className="font-semibold text-18 text-left text-[#1F1F2C] hover:text-blue-600 hover:underline">
              {car.year} {car.make} {car.model}
            </h3>
          </Link>
          <p className="text-sm md:text-16 text-nowrap text-left text-[#7A798A]"> <strong className="text-[#7A798A]">VIN:</strong> {car.vin}</p>
        </div>

        {/* Vehicle Info */}
        <div>
          <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Odometer:</strong> {car.mileage} mi</p>
          <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Minimum Price: </strong>{car.minPrice ? `$${car.minPrice}` : "N/A"}</p>
        </div>

        {/* Condition */}
        <div>
        <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Status Code:</strong> {car.titlesStatus || "N/A"} </p>
        <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Transmission:</strong> {car.transmission || "N/A"} </p>
        </div>

       {/* Location */}
       <div>
        <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Car Titled At:</strong> {car.carTitledAt || "N/A"} </p>
        <p className="text-sm md:text-16 text-left text-[#7A798A]"> <strong className="text-[#7A798A]">Car Location:</strong> {car.carLocation || "N/A"} </p>
        </div>

        {/* Bids */}
        <div className="text-left">
          {/* add current bid heading */}
          <p className="text-sm md:text-16 text-left text-[#7A798A]">Current Bid: <span className="text-red-600 text-18 font-semibold">${car.currentBid}</span></p>
          
         { isToday && <Link to={`/live-auction-portal`}> 
          <button className="bg-green-600 text-white px-4 py-2 md:py-[0.3vw] md:px-[1vw] rounded-md text-sm md:text-16 font-semibold mt-2 md:mt-[0.625vw] hover:bg-green-700 transition-colors">
            Join Auction
            </button>
          </Link>}
        </div>
      </div>
    </>
  );
};

export default Item;
