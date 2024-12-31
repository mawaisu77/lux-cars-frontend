import React from "react";
import { FaLink } from "react-icons/fa";

const BuyNowSection = ({ priceNew }) => {
  return (
    <div className="flex justify-between bg-white p-2 lg:mb-[2vh]">
                      <div className="flex justify-between w-full  items-center ">
                          <div className="font-urbanist bg-yellow-500/30 px-[1vw] py-[0.2vw] rounded-[0.5vw] font-semibold flex gap-x-2">
                          <span className=" text-black">
                            Buy now price
                          </span>
                          <span className="text-green-600 font-semibold">
                            {priceNew
                              ?  `$${priceNew}`
                              : "Not Available"}
                          </span>
                        </div>
                        {/* New Copy Button */}
                        <button 
                        title="Copy URL"
                          onClick={() => document.getElementById("copy_url_modal").showModal()} 
                          className=" bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
                        >
                        <FaLink className="text-20"/>
                        </button>
                      </div>
                   </div>
  );
};

export default BuyNowSection;