import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';




const User = ({ bid }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  const hanldeNavigate = () => {
    navigate(`/vehicle-detail/${bid?.carDetails?.lot_id}`); 
  };

  return (
    <tr className="border-t">
      {/* Car Image */}
      <td className=" text-nowrap px-4 py-2">
        <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100">
          <img
            className="w-full h-full object-cover"
            src={bid.carDetails.image || ""}
            alt="Car"
          />
        </div>
      </td>
      {/* Title */}
      <td className=" text-nowrap px-4 py-2 hover:text-blue-800 hover:underline cursor-pointer" onClick={hanldeNavigate}>{bid.carDetails.title}</td>
      {/* Posted Time Ago */}
      <td className=" text-nowrap px-4 py-2">
        <TimeAgo date={bid.createdAt} />
      </td>
      {/* Bid Price */}
      <td className=" text-nowrap px-4 py-2 font-bold">
        <span className={bid.isValid ? 'text-green-600' : 'text-red-500'}>
          ${bid.bidPrice}
        </span>
      </td>
      {/* Time Left */}
      <td className=" text-nowrap px-4 py-2">{bid.carDetails.timeLeft}</td>
      {/* Lot ID */}

      <td className=" text-nowrap px-4 py-2">        
           {bid.carDetails.lot_id}
      </td>
      {/* Location */}
      <td className=" text-nowrap px-4 py-2">{bid.carDetails.location}</td>
      {/* Current Bid */}
      <td className=" text-nowrap px-4 py-2">${bid.currentBid}</td>
      {/* Status */}
      <td className={` text-nowrap px-4 py-2 font-semibold ${bid.isValid ? 'text-green-500' : 'text-red-500'}`}>
        {bid.isValid ? 'Active' : 'Expired'}
      </td>
    </tr>
  );
};

export default User;
