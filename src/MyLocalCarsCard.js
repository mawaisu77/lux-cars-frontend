import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeAgo from "react-timeago";

const MyLocalCarsCard = ({
  localCar,
}) => {

  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate(`/local-vehicle-detail/${localCar?.id || "-"}`);
  };

  return (
    <>
      <tr className="border-t">
        {/* Car Image */}
        <td className="text-nowrap px-4 py-2">
          <div className="w-[60px] h-[60px] rounded-md overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={localCar?.carImages[0] || ""}
              alt="Car"
            />
          </div>
        </td>
        {/* Car Title */}
        <td
          className="text-nowrap px-4 py-2 hover:text-blue-800 hover:underline cursor-pointer"
          onClick={handleNavigate}
        >
          {`${localCar?.year || "-"} ${localCar?.make || "-"} ${
            localCar?.model || "-"
          }`}
        </td>
        {/* VIN */}
        <td className="text-nowrap px-4 py-2">{localCar?.vin || "-"}</td>
        {/* Location */}
        <td className="text-nowrap px-4 py-2">
          {`${localCar?.carLocation || "-"}, ${
            localCar?.carState || "-"
          }`}
        </td>
        {/* Posted Time Ago */}
        <td className="text-nowrap px-4 py-2">
          <TimeAgo date={localCar?.createdAt} />
        </td>
 

      </tr>
      
   
    </>
  );
};

export default MyLocalCarsCard;
