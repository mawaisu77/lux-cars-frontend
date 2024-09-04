import React from "react";
import useCarMakesModels from "../../../hooks/useCarsMakesModel";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Makes = () => {
  const navigate = useNavigate();
  const { carData, loading, error } = useCarMakesModels();

  if (error) {
    return <div className="text-red-600"> {error}</div>;
  }


  const handleMakeClick = (make) => {
    navigate(`/search-page?make=${make}`);
  };

  return (
    <div className=" w-[98.9vw]">
      <div>
        <div className="flex justify-center font-urbanist text-[36px] lg:text-[2.34vw] font-bold leading-[2.86vw] pt-[5.5vh]">
          Popular Makes
        </div>
        <hr className="h-1 bg-[#CA0000] w-20 mx-auto mt-8" />
        {/* For desktop */}
        <div className="hidden lg:flex w-[78vw] mx-auto flex-wrap gap-[0.5vw] gap-y-6 my-[4vh] justify-center">
          {carData && carData.map((item, index) => (
            <button
              key={index}
              className="font-urbanist bg-[#ebebeb] hover:bg-[#CA0000] hover:text-white duration-200 py-[1.5vh] px-[1.1vw] rounded-lg text-[15px] lg:text-[0.75vw]"
              onClick={() => handleMakeClick(item.make)}

            >
              {loading ? (
                <>
                  <ClipLoader />
                </>
              ) : (
                item.make
              )}
            </button>
          ))}
        </div>
        {/* For mobile */}
        <div className="lg:hidden w-[78vw] h-[30vh] mx-auto overflow-x-auto">
          <div
            className="grid grid-rows-3 gap-y-5 gap-x-4 lg:gap-[0.5vw]  auto-cols-max mt-6"
            style={{ gridAutoFlow: "column" }}
          >
            {carData.map((item, index) => (
              <button
                key={index}
                className="font-urbanist bg-[#ebebeb]  py-[1.5vh] px-[1.1vw] rounded-lg text-[15px] flex justify-center items-center"
                onClick={() => handleMakeClick(item.make)}

              >
                {loading ? (
                  <>
                    <ClipLoader />
                  </>
                ) : (
                  item.make
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makes;
