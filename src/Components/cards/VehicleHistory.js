import React from "react";
import { ClipLoader } from "react-spinners";
import useVehicleHistory from "../../hooks/useVehicleHistory";
import HistoryCard from "./historyCard";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsInfoCircle } from "react-icons/bs";

const VehicleHistory = React.memo(({ carData }) => {
  const { cars, loading, error } = useVehicleHistory(
    carData.year,
    carData.make,
    carData.model
  );
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div
          className="max-w-[85vw] bg-white sm:max-w-[73.229vw] mx-auto"
          id="startBidding"
        >
          <div className="flex justify-center items-center ">
            <div className="flex flex-col gap-y-[6px] sm:gap-y-2">
              <div className="flex justify-center items-center font-urbanist  font-bold sm:leading-[2vw] sm:pt-[2vh] gap-x-[5px] sm:gap-x-[0.5vw]">
                <span className="text-[22px] sm:text-36">
                  Vehicle Comps
                </span>
                   
              <BsInfoCircle
                data-tooltip-id="vehicle-comp-info"
                className="font-extrabold text-[20px] sm:text-24 animate-pulse cursor-pointer"
              />
                <ReactTooltip
                className="text-16 z-50"
                id="vehicle-comp-info"
                content="Information required..."
              />
              </div>
              <hr className="h-[2px] mx-auto sm:h-[0.26vw] bg-primary-red w-[30px] sm:w-[4vw] " />
            </div>
          </div>
          <div className="relative my-[2vw] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {cars?.data &&
              cars?.data.map((card, index) => (
                <HistoryCard key={index} card={card} />
              ))}
          </div>
        </div>
      )}
    </>
  );
});

export default VehicleHistory;
