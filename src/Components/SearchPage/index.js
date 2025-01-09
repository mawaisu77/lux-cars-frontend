import React from "react";
import Header from "../header/Header/Header";
import { Link } from "react-router-dom";
import Sidebar from "./search-page/sidebar";


function SearchPage() {
  return (
    <>
      <div className="back-image-search-page">
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  pt-[20vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Vehicle Finder
            </div>

             <div className='text-white flex gap-3 justify-center text-[1vw] font-urbanist'>
            <Link to="/">
              <button className='hover:text-white hover:scale-110 duration-150'>Home</button>
            </Link>
            /
              <button className="hover:text-white hover:scale-110 duration-150">
                Search
              </button>
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
