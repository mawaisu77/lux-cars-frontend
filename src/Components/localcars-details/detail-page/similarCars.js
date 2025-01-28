import React, { useState, useEffect } from "react";
import baseService from "../../../services/baseService";
import { showToast } from "../../../utils/Toast";
import LocalCarsCard from "../../cards/LocalCarsCard";

function SimilarCars({ make, model, year }) {
  const [vehicles, setVehicles] = useState(null);


  const yearFrom = year - 2;
  const yearTo = year + 2;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseService.get(
          `/local-cars/get-all-local-cars?status=Approved&make=${make}&model=${model}&yearFrom=${yearFrom}&yearTo=${yearTo}`
        );
        console.log(response?.data?.data?.cars);
        setVehicles(response?.data?.data?.cars);
      } catch (error) {
        showToast("No Car Found", "error");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="max-w-[85vw] sm:max-w-[73.229vw] mx-auto py-10">
        <div className="flex justify-center items-center pb-4">
          <div className="flex flex-col gap-y-[6px] sm:gap-y-2">
            <div className="flex justify-center items-center font-urbanist text-[22px] sm:text-36 font-bold sm:leading-[2vw] sm:pt-[2vh]">
              Similar Listings
            </div>
            <hr className="h-[2px] mx-auto sm:h-[0.26vw] bg-primary-red w-[30px] sm:w-[4vw] " />
          </div>
        </div>
        <div className="relative mt-[2.2625vh] mx-auto gap-y-[20px] sm:gap-[1.094vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {vehicles &&
            vehicles
              .slice(0, -2)
              .map((card, index) => <LocalCarsCard key={index} card={card} />)}
        </div>
      </div>
    </div>
  );
}

export default SimilarCars;
