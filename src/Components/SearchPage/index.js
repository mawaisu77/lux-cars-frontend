import React from "react";
import Header from "../header/Header/Header";
import { Link } from "react-router-dom";
import Sidebar from "./search-page/sidebar";


function SearchPage() {
  return (
    <>
    <Header className="text-white" />
      <div className="back-image-search-page">
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  pt-[12.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Vehicle Finder
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Sidebar />
      </div>
    </>
  );
}

export default SearchPage;
