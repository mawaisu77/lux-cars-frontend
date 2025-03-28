import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../../assets/avatar1.png";
import { ImFilesEmpty } from "react-icons/im";
import { FaFacebook, FaGoogle, FaLinkedinIn, FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { RiImageAddLine, RiTwitterXLine } from "react-icons/ri";
import Header from "../../header/Header/Header";
import axios from "axios";
import { getToken } from "../../../utils/storageUtils";
import { API_BASE_URL } from "../../../services/baseService";
import { showToast } from "../../../utils/Toast";
import { ClipLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";
import { calculateFundsPercentage } from "../../header/Header/calculateBiddingPower";
import { useFunds } from "../../../context/FundsContext";
import { BsLightningCharge } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(image1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");

  const { fundsData } = useFunds();

  console.log("fundsData", fundsData);

  const totalFunds = fundsData?.data?.totalDeposits * 10 || 0;
  const remainingFunds = fundsData?.data?.avalaibleBidAmount || 0;
  const usedBidAmount = fundsData?.data?.usedBidAmount || 0;

  const { percentageUsed, percentageRemaining } = calculateFundsPercentage(
    totalFunds,
    remainingFunds,
    usedBidAmount
  );

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("user"));
    if (userProfile && userProfile.profilePicture) {
      setProfilePicture(userProfile.profilePicture);
    }
    if (userProfile && userProfile.username) {
      setUser(userProfile.username);
    }
    if (userProfile && userProfile.email) {
      setEmail(userProfile.email);
    }
  }, []);

  const getLinkStyle = (path) => {
    return location.pathname === path ? "text-red-600" : "hover:text-red-600";
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      setIsLoading(true);
      try {
        const response = await axios.put(
          `${API_BASE_URL}user/upload-profile-picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const imageUrl = response?.data?.data?.profilePicture;
        // console.log("response.data ===> ", response.data.data.profilePicture)
        setProfilePicture(imageUrl);

        // Update local storage
        const userProfile = JSON.parse(localStorage.getItem("user")) || {};
        userProfile.profilePicture = imageUrl;
        localStorage.setItem("user", JSON.stringify(userProfile));

        showToast("Image uploaded successfully", "success");
      } catch (error) {
        showToast("Image upload failed", "error");
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <>
      <div className="hidden lg:block Account-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">Account</div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Invoices
            </button>
          </div>
        </div>
      </div>

      <div className="w-[90vw] lg:w-[85vw] h-auto mt-[100px] lg:mt-[7vh] mx-auto bg-[#f8f8f8] rounded-2xl">
        <div className=" flex p-1 sm:p-2 md:p-4 lg:p-[1vw] flex-col lg:flex-row justify-center lg:justify-between  bg-[#000000]/70 rounded-t-2xl">
          <div className="flex flex-col items-start lg:items-center  lg:flex-row lg:ml-[2.2vw]  lg:w-[80%] ">
            <div className="flex gap-x-2 sm:gap-x-4">
              <div className="relative  lg:ml-0  w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[16vw] md:h-[16vw]   lg:w-[15vw] lg:h-[14vw] xl:w-[12vw] xl:h-[12vw]">
                <img
                  alt="profile"
                  src={profilePicture}
                  className="object-cover  mx-auto  w-full h-full  rounded-xl"
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute top-2 right-[5%] cursor-pointer bg-white p-[0.5vw] rounded-[100%]"
                >
                  <RiImageAddLine className="w-[20px] h-[20px] lg:w-[1.8vw] lg:h-[1.8vw]" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />

                {isLoading && (
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-50  flex items-center justify-center text-white">
                    <ClipLoader />
                  </div>
                )}
              </div>
              <div className="space-y-2 lg:hidden">
                {/* <h1 className="font-bold  border-b  lg:hidden font-urbanist text-[18px] text-white">
                {user}
              </h1> */}
                <div className=" gap-x-1   text-white flex  justify-start items-center">
                  <FaUserCircle className="lg:w-[1.2vw] lg:h-[1.2vw]" />
                  <p className="text-[14px] md:text-[18px]  tracking-wider lg:text-[1.3vw] leading-[2.5vw]">
                    {user}
                  </p>
                </div>
                <div className=" gap-x-1  text-white flex  justify-start items-center">
                  <MdEmail className="lg:w-[1.2vw] lg:h-[1.2vw]" />
                  <p className="text-[14px] md:text-[18px] tracking-wider  leading-[2.5vw]">
                    {email}
                  </p>
                </div>
                <button
                  className={`flex  justify-between gap-x-2 items-center  focus:outline-none bg-text-white   py-1  rounded-md  bg-transparent   text-xs duration-200`}
                >
                  <BsLightningCharge className="text-white" />
                  <span className="text-white text-nowrap">
                    Remaining: ${remainingFunds} ({percentageRemaining}%)
                  </span>
                </button>
                <div className=" lg:w-[20%]  lg:hidden">
                  <div className=" flex flex-col gap-x-2 justify-start  items-start  ">
                    <Link to={"/user/account/saved-cars"} className="">
                      <button className="text-[12px]  text-white cursor-pointer flex items-center  px-[6px]  py-[2px]  rounded-lg">
                        <FaRegHeart className="mr-1" />
                        My Favourites
                      </button>
                    </Link>
                    <Link to={"/user/account/local-cars"} className="">
                      <button className="text-[12px]  text-white cursor-pointer flex items-center    px-[6px]  py-[2px]  rounded-lg">
                        <FaMapMarkerAlt className="mr-1" />
                        My Local Cars
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left text-white lg:leading-[2vw]   lg:mx-auto  lg:ml-[2.2vw]">
              <h1 className="font-bold hidden lg:block  text-[20px]  lg:text-[2.3vw]  text-white">
                {user}
              </h1>
              <div className=" gap-x-1 hidden lg:flex lg:gap-x-[0.25vw] justify-start lg:leading-[1vw] items-center">
                <MdEmail className="lg:w-[1.2vw] lg:h-[1.2vw]" />
                <p className="text-[18px] lg:text-[1.3vw] leading-[2.5vw]">
                  {email}
                </p>
              </div>
              <p className="text-[12px] md:text-[18px] l lg:text-[0.78vw]  text-[#f8f8f8] py-5 lg:py-[0.5vw]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </p>

              <button
                className={`hidden lg:flex justify-between gap-x-2 items-center  focus:outline-none bg-text-white  px-3 lg:px-[1vw] py-1 lg:py-[0.4vw] rounded-full bg-white text-primary-red text-xs lg:text-18 duration-200`}
              >
                <span className="text-primary-red text-nowrap">
                  Remaining: ${remainingFunds} ({percentageRemaining}% )
                </span>
                <BsLightningCharge className="text-primary-red" />
              </button>
            </div>
          </div>
          <div className=" lg:w-[20%] hidden lg:block">
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row  justify-start  md:ml-0 lg:justify-center py-[1.25vw]  lg:items-center">
              <div className=" flex lg:flex-col gap-[1vw] justify-start  md:justify-center sm:ml-[5%] md:ml-[10%] items-start  lg:items-center ">
                <Link to={"/user/account/saved-cars"} className="">
                  <button className="text-[14px] lg:text-[0.82vw] text-white cursor-pointer hover:bg-white hover:text-[#000000]/70 hover:border-[#000000]/70 duration-300 px-[10px] lg:px-[1.5vw] py-[5px] lg:py-[1.2vh] border border-white rounded-full">
                    My Favourites
                  </button>
                </Link>
                <Link to={"/user/account/local-cars"} className="">
                  <button className="text-[14px] lg:text-[0.82vw] text-white cursor-pointer hover:bg-white hover:text-[#000000]/70 hover:border-[#000000]/70 duration-300 px-[10px] lg:px-[1.5vw] py-[5px] lg:py-[1.2vh] border border-white rounded-full">
                    My Local Cars
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full lg:w-[80%] p-1 lg:p-[0.5vw] text-black text-[14px] lg:text-[1.25vw] font-urbanist font-semibold mx-auto overflow-x-auto no-scrollbar">
          <div className="flex justify-between items-center w-[530px] lg:w-full mx-auto">
            <Link to="/user/account/all-bids">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/all-bids"
                )}`}
              >
                All Bids
              </p>
            </Link>
            <Link to="/user/account/funds">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/funds"
                )}`}
              >
                FUNDS
              </p>
            </Link>
            <Link to="/user/account/order">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/order"
                )}`}
              >
                ORDERS
              </p>
            </Link>
            <Link to="/user/account/offers">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/offers"
                )}`}
              >
                OFFERS
              </p>
            </Link>
            <Link to="/user/account/parts">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/parts"
                )}`}
              >
                PARTS
              </p>
            </Link>
            <Link to="/user/account/profile">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/profile"
                )}`}
              >
                MY PROFILE
              </p>
            </Link>
            <Link to="/user/account/transactions">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/account/transactions"
                )}`}
              >
                TRANSACTIONS
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
