import React from 'react';
import { FiUploadCloud } from "react-icons/fi";
const SearchPartsForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white font-urbanist">
      <div className=" ">
        <h2 className="text-[36px] font-bold text-center mt-4 mb-4">Search Parts</h2>
        <form className=" text-start bg-white rounded-lg shadow-lg w-full max-w-lg p-8 sm:p-10 md:p-16 lg:p-20 space-y-8">
          <div className="space-y-4">
            <label className="block text-xl font-bold">Year Made</label>
            <select className="w-[100px] h-[40px] text-sm bg-[#F8F8F8] rounded-lg p-3">
              <option value="2017">2017</option>
            </select>
          </div>
          <div className="">
              <label htmlFor="model" className="block text-xl mb-4 font-bold">
                 Model
                </label>
                 <span className="text-sm mt-2 font-bold text-[#1F1F2C] mt-10">Search Model</span>
                  <input
                    id="model"
                    type="text"
                      className="w-full border border-gray-300 rounded-lg p-3" />
                      </div>
                      <div className="">
                      <label htmlFor="model" className="block text-xl mb-4 font-bold">
                        Variant
                        </label>
                        <span className="text-sm font-bold mt-2 text-[#1F1F2C]">Search Car Varient</span>
                          <input
                            id="model"
                            type="text"
                              className="w-full border border-gray-300 rounded-lg p-3" />
                              </div>
                              <div className="">
                      <label htmlFor="model" className="block text-xl mb-4 font-bold">
                        Location
                        </label>
                        <span className="text-sm mt-2 font-bold text-[#1F1F2C]">Zipcode</span>
                          <input
                            id="model"
                            type="text"
                              className="w-full border border-gray-300 rounded-lg p-3" />
                              </div>
                              <div className="">
                      <label htmlFor="model" className="block text-xl mb-4 font-bold">
                            Part Description
                        </label>
                        <span className="text-sm font-bold mt-2 text-[#1F1F2C]">Tell us about the part you are looking for</span>
                          <input
                            id="model"
                            type="text"
                              className="w-full border border-gray-300 rounded-lg p-3" />
                              </div>
                    <div className="">
                      <label className="block text-xl mb-4 font-bold">Order By Image</label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center">
                        <FiUploadCloud className="w-[18.34px] h-[15px] text-[#343444] mb-4" />
                        <input type="file" className="hidden text-[#7A798A]" />
                        <button className='text-[#7A798A]'>
                          <span className="text-[#F33535]">Click to upload</span> or drag and drop
                        </button>
                        <p className="text-sm text-gray-500 mt-2">SVG, PNG, JPG or GIF max 800x400px</p>
                      </div>
                    </div>
                    <button type="submit" className="w-full  bg-red-500 text-white rounded-lg py-4 text-xl font-medium">Submit</button>
                  </form>
                </div>
              </div>
            );
          };
export default SearchPartsForm;