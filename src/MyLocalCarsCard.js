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
        <td className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
          <div className="w-[60px] lg:w-[3.125vw] h-[60px] lg:h-[3.125vw] rounded-md lg:rounded-[0.375vw] overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={localCar?.carImages[0] || ""}
              alt="Car"
            />
          </div>
        </td>
        {/* Car Title */}
        <td
          className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap hover:text-blue-800 hover:underline cursor-pointer"
          onClick={handleNavigate}
        >
          {`${localCar?.year || "-"} ${localCar?.make || "-"} ${
            localCar?.model || "-"
          }`}
        </td>
        {/* VIN */}
        <td className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">{localCar?.vin || "-"}</td>
        <td className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">{localCar?.status || "-"}</td>
        {/* Location */}
        <td className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
          {`${localCar?.carLocation || "-"}, ${
            localCar?.carState || "-"
          }`}
        </td>
        {/* Posted Time Ago */}
        <td className="px-4 lg:px-[1vw] py-2 lg:py-[0.5vw] lg:text-[1vw] font-medium text-gray-700 text-nowrap">
          <TimeAgo date={localCar?.createdAt} />
        </td>
 

      </tr>
      
   
    </>
  );
};

export default MyLocalCarsCard;
