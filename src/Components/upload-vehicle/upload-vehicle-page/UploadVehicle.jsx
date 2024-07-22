import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header/Header";
import PhoneInput from "react-phone-input-2";

const UploadVehicle = () => {
  const [userType, setUserType] = useState("dealer"); // dealer or private

  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["1-10", "11-50", "51-100", "101-200", "201+"];

  const [hasCar, setHasCar] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="back-image ">
        <Header className="text-white" />
        <div className="hidden   lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Upload Your Vehicle
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">Sell A car</button>/
              <button className="hover:text-white">Upload Vehicle</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-[1400px] mx-auto flex ">
        <div className="w-[20%] bg-blue-200">Left</div>

        <form className="w-[80%] flex flex-col items-start ml-10 gap-y-6">
          <h1 className="text-2xl font-bold">Your Info</h1>

          <div className="flex justify-between">
            <button
              type="button"
              className={`w-[350px] border ${
                userType === "dealer" ? "bg-gray-300" : ""
              }`}
              onClick={() => setUserType("dealer")}
            >
              Dealer
            </button>
            <button
              type="button"
              className={`w-[350px] border ${
                userType === "private" ? "bg-gray-300" : ""
              }`}
              onClick={() => setUserType("private")}
            >
              Private Party
            </button>
          </div>

          {userType === "dealer" && (
            <>
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">
                  Are there any additional fees the buyer will have to pay?
                </label>
                <input type="text" className="border" />
              </div>

              <div className="flex">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Dealership Name</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Dealership Website</label>
                  <input type="text" className="border" />
                </div>
              </div>

              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">
                  How many vehicles does your dealership retail each month?
                </label>
                <div className="relative w-full">
                  <button
                    type="button"
                    className="border p-2 w-full text-left"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {selectedOption}
                  </button>
                  {isOpen && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                      {options.map((option) => (
                        <div
                          key={option}
                          className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {(userType === "private" || userType === "dealer") && (
            <>
              <div className="flex">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Full Name</label>
                  <input type="text" className="border" />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Contact Phone Number</label>
                  <PhoneInput
                    country={"us"}
                    countryCodeEditable={false}
                    disableDropdown={true}
                    buttonStyle={{
                      background: "white",
                      borderRight: "0px",
                    }}
                    containerClass="  mx-auto border-none  outline-none  p-0 m-0 "
                    inputStyle={{ width: "100%", height: "4.68vh" }}
                    inputClass="bg-blue-400 text-black p-0 m-0 border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          <div class="flex items-center justify-center w-full ">
            <label
              for="dropzone-file"
              class="flex  items-center justify-between w-full py-8 px-6  border-2 border-gray-300  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center">
                <p class=" text-gray-500 ">
                  PNG, JPG, JPEG or WEBP. Max 200mb.{" "}
                </p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
              <button className="border rounded-full bg-gray-200 font-bold text-red-600 py-2 px-4">
                Upload file
              </button>
            </label>
          </div>

          <div>
            <label>
              Have Car:
              <input
                type="checkbox"
                checked={hasCar}
                onChange={() => setHasCar(!hasCar)}
              />
            </label>
          </div>
          {hasCar && (
            <div>
              <label>
                Car Details:
                <input type="text" name="carDetails" />
              </label>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadVehicle;
