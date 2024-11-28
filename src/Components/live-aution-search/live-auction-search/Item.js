import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Item = ({car}) => {
  return (
<div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,auto] gap-4 items-center py-4 border-b border-gray-200">
    <div className="w-24 h-16 bg-gray-200 rounded-md flex items-center justify-center">
      <img src={car.carImages[0]} alt={`${car.year} ${car.make} ${car.model}`} className="w-full h-full object-cover" />
    </div>
    <div>
      <Link to={`/live-auction/${car.id}`}>
      <h3 className="font-semibold hover:text-blue-600 hover:underline">{car.year} {car.make} {car.model}</h3>
      </Link>
      <p className="text-sm text-gray-500">Vin: {car.vin}</p>
      {/* <button className="text-sm text-red-600 font-semibold mt-1 flex items-center">
        <FaHeart className="mr-1" /> Watch
      </button> */}
    </div>
    <div>
      <p className="text-sm">Odometer: {car.mileage} mi</p>
      <p className="text-sm">Estimated Retail Value: ${car.minPrice}</p>
    </div>
    <div>
      <p className="text-sm">{car.significantFlaws}</p>
      {/* <p className="text-sm">Keys: Available</p> */}
    </div>
    <div>
      <p className="text-sm">{car.location}</p>
      <p className="text-sm text-green-600 font-semibold">Live Now</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-lg">${car.currentBid}</p>
      <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold mt-2">
        Join Auction
      </button>
    </div>
  </div>
  )
}

export default Item