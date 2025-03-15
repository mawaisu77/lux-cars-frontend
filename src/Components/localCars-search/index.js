import React from "react";
import Header from "../header/Header/Header";
import { Link } from "react-router-dom";
import LocalSearchPage from "./LocalSearchPage";

function LocalCarsSearchPage() {
  return (
    <>
     <div className="back-image-Help lg:block hidden">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Local Cars
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
            Local Cars
            </button>
          </div>
        </div>
   </div>

      <div className="lg:mt-0 mt-[90px]">
        <LocalSearchPage />
      </div>
    </>
  );
}

export default LocalCarsSearchPage;
