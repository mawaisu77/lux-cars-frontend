import React, { useMemo } from "react";
import {  useNavigate } from "react-router-dom";
import useTimer from "../../hooks/useTimer";
import moment from "moment-timezone";


const User = ({ bid }) => {

  const navigate = useNavigate(); // Initialize navigate hook

  // Memoize the targetTime to prevent unnecessary recalculations
  const targetTime = useMemo(
    () => (bid?.carDetails?.auction_date ? new Date(bid?.carDetails?.auction_date) : null),
    [bid?.carDetails?.auction_date]
  );
  const { days, hours, minutes, seconds } = useTimer(targetTime);

  // Determine if the auction date is in the future or null
  const ValidDate =
    targetTime && (days > 0 || hours > 0 || minutes > 0 || seconds > 0);

  const hanldeNavigate = () => {
    navigate(`/vehicle-detail/${bid?.carDetails?.lot_id || "-"}`);
  };

  return (
    <tr className="border-t">
      {/*1 Car Image */}
      <td className=" text-nowrap px-4 py-2">
        <div className="w-[60px] lg:w-[3.125vw] h-[60px] lg:h-[3.125vw] rounded-md overflow-hidden bg-gray-100">
          <img
            className="w-full h-full object-cover"
            src={Array.isArray(bid?.carDetails?.image) ? bid?.carDetails?.image[0] : bid?.carDetails?.image || ""}
            alt="Car"
          />
        </div>
      </td>
      {/*2 Title */}
      <td
        className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] hover:text-blue-800 hover:underline cursor-pointer"
        onClick={hanldeNavigate}
      >
        {bid?.carDetails?.title || "-"}
      </td>
      {/*3 Location */}
    
      {/*7 Lot ID */}
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">{bid?.carDetails?.vin || "-"}</td>

      {/*4 No of bids*/}
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">{bid?.carDetails?.noOfBids}</td>

      {/*5 Bid Price */}
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-bold">
        <span className={bid?.isValid ? "text-green-600" : "text-red-500"}>
          ${bid?.bidPrice || "-"}
        </span>
      </td>
      {/*6 Time Left */}
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">
        {bid?.carDetails?.auction_date
          ? ValidDate
            ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
            : "Bidding Over"
          : "Future Auction"}
      </td>

      {/*8 Current Bid */}
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">${bid?.carDetails?.currentBid}</td>
      <td className=" text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw]">
      {moment(bid?.createdAt).format( "MMM DD, YYYY HH:mm" )}
        </td>
      {/*9 Status */}
      <td
        className={` text-nowrap px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-semibold ${
          bid.isValid ? "text-green-500" : "text-red-500"
        }`}
      >
        {bid.isValid ? "Active" : "Expired"}
      </td>
    </tr>
  );
};

export default User;
