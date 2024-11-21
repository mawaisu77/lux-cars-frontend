import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";
import useTimer from "../../hooks/useTimer";

const User = ({ bid }) => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Memoize the targetTime to prevent unnecessary recalculations
  const targetTime = useMemo(
    () => (bid?.auction_date ? new Date(bid?.auction_date) : null),
    [bid?.auction_date]
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
        <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100">
          <img
            className="w-full h-full object-cover"
            src={bid?.carDetails?.image[0] || bid?.carDetails?.image  || ""}
            alt="Car"
          />
        </div>
      </td>
      {/*2 Title */}
      <td
        className=" text-nowrap px-4 py-2 hover:text-blue-800 hover:underline cursor-pointer"
        onClick={hanldeNavigate}
      >
        {bid?.carDetails?.title || "-"}
      </td>
      {/*3 Location */}
      <td className=" text-nowrap px-4 py-2">{bid?.carDetails?.location || "-"}</td>
      {/*4 Posted Time Ago */}
      {/* <td className=" text-nowrap px-4 py-2">
        <TimeAgo date={bid.createdAt} />
      </td> */}

      {/*7 Lot ID */}
      <td className=" text-nowrap px-4 py-2">{bid?.carDetails?.vin || "-"}</td>

      {/*4 No of bids*/}
      <td className=" text-nowrap px-4 py-2">{bid?.carDetails?.noOfBids}</td>

      {/*5 Bid Price */}
      <td className=" text-nowrap px-4 py-2 font-bold">
        <span className={bid?.isValid ? "text-green-600" : "text-red-500"}>
          ${bid?.bidPrice || "-"}
        </span>
      </td>
      {/*6 Time Left */}
      <td className=" text-nowrap px-4 py-2">
        {bid?.auction_date
          ? ValidDate
            ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
            : "Bidding Over"
          : "Future"}
      </td>

      {/*8 Current Bid */}
      <td className=" text-nowrap px-4 py-2">${bid?.carDetails?.currentBid}</td>
      {/*9 Status */}
      <td
        className={` text-nowrap px-4 py-2 font-semibold ${
          bid.isValid ? "text-green-500" : "text-red-500"
        }`}
      >
        {bid.isValid ? "Active" : "Expired"}
      </td>
    </tr>
  );
};

export default User;
