import React from "react";
import Header from "../header/Header/Header";
import { Link } from "react-router-dom";
import LocalSearchPage from "./LocalSearchPage";

function LocalCarsSearchPage() {
  return (
    <>
      <Header className="text-white" />
      <div className="back-image-search-page">
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  pt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Local Vehicle Finder
            </div>

            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className=" hover:text-[1.1vw] ">Home</button>
              </Link>
              /<button className=" hover:text-[1.1vw]">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LocalSearchPage />
      </div>
    </>
  );
}

export default LocalCarsSearchPage;
