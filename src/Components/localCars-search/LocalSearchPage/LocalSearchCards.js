import React from "react";
import { useNavigate } from "react-router-dom";

function LocalSearchCards({ vehicles }) {
  const navigate = useNavigate();

  const handleBidNow = (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/local-vehicle-detail/${id}`);
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="flex flex-col">
      {vehicles && vehicles?.length > 0 ? (
        vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="flex flex-col md:flex-row bg-white shadow-md rounded-lg mb-6 p-4"
          >
            <img
              src={vehicle.carImages[0]}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full md:w-1/3 h-auto rounded-lg object-contain mb-4 md:mb-0 px-[20px]"
            />
            <div className="text-left w-full md:w-[40%] flex-grow p-2">
              <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">
                {vehicle.make} {vehicle.model}
              </h2>
              <p>
                VIN: <span className="font-medium">{vehicle.vin}</span>
              </p>
              <p>
                Year: <span className="font-medium">{vehicle.year}</span>
              </p>
              <p>
                Transmission:{" "}
                <span className="font-medium">{vehicle.transmission}</span>
              </p>
              <p>
                Mileage:{" "}
                <span className="font-medium">{vehicle.mileage} miles</span>
              </p>
              <p>
                Location:{" "}
                <span className="font-medium">
                  {vehicle.carLocation}, {vehicle.carState}, {vehicle.zip}
                </span>
              </p>
              <p>
                Current Bid:{" "}
                <span className="font-medium">{vehicle.currentBid}</span>
              </p>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0">
              <button
                onClick={() => handleBidNow(vehicle.id)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg px-6 py-3 transition duration-200"
              >
                Bid Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            No Cars Data Found
          </h2>
        </div>
      )}
    </div>
  );
}

export default LocalSearchCards;
