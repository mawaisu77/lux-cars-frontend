import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import image1 from "../../../assets/avatar1.png";
import { ImFilesEmpty } from "react-icons/im";
import { FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { RiImageAddLine, RiTwitterXLine } from "react-icons/ri";
import Header from "../../header/Header/Header";
import axios from "axios";
import { getToken } from "../../../utils/storageUtils";
import { API_BASE_URL } from "../../../services/baseService";
import { showToast } from "../../../utils/Toast";
import { ClipLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState(image1);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState("");

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
     <Header className="text-white" />
      <div className="Account-image">
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col py-20">
            <div className="text-[2.6vw] font-semibold text-white">Account</div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white hover:text-[1.1vw]">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">User Account</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[343px] md:w-[650px] lg:w-[74vw] h-auto mt-[7vh] mx-auto lg:h-[38vh] bg-[#f8f8f8] rounded-2xl">
        <div className=" flex flex-col lg:flex-row justify-center lg:justify-between lg:h-[30vh]    bg-[#000000]/70 rounded-t-2xl">
          <div className="flex flex-col font-urbanist lg:flex-row mt-[4.6vh]   lg:ml-[2.2vw]     w-full lg:w-[48vw]">
            <div className="relative">
              <img
                src={profilePicture}
                className="object-cover w-[274px] md:w-[400px] mx-auto lg:w-[15vw] h-[274px] md:h-[400px] lg:h-[30vh] left-[36px] top-[36px] rounded-xl"
              />
              <label
                htmlFor="imageUpload"
                className="absolute top-2 right-2 cursor-pointer bg-white p-2 rounded-full"
              >
                <RiImageAddLine size={25} />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              {isLoading && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center text-white">
                  <ClipLoader />
                </div>
              )}
            </div>{" "}
            <div className="text-left text-[white]  w-[274px] lg:w-[35vw]   mx-auto font-urbanist lg:ml-[2.2vw]">
              <h1 className="font-bold font-urbanist text-[36px]  lg:text-[2.3vw] leading- text-white">
                {user}
              </h1>
              <div className="flex gap-x-1 justify-start items-center">
                <MdEmail size={23} />
                <p className="text-[18px] lg:text-[1.3vw] leading-10">
                  {email}
                </p>
              </div>
              <p className="text-[12px] lg:text-[0.78vw] text-[#f8f8f8] py-5 lg:py-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laborum obcaecati dignissimos quae quo ad iste ipsum officiis
                deleniti asperiores sit.
              </p>
              <button className="flex justify-center items-center gap-2 w-[160px] lg:w-[10vw] h-[36px] lg:h-[3.6vh] text-[12px] lg:text-[0.7vw] text-[#7a798a] bg-white rounded-full lg:mt-[1vh]">
                Bidding Power: $0/0$
                <ImFilesEmpty />
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-center py-5  lg:w-[20vw] ml-9 lg:ml-0  mx-auto lg:items-center">
              {/* <div className='flex flex-row gap-3 lg:mr-[2.5vw] lg:mt-[6vh]'>
              <div className='flex justify-center items-center w-[40px] lg:w-[2.5vw] h-[40px] lg:h-[5.1vh] bg-white rounded-lg'>
                <FaFacebook size={25} />
              </div>
              <div className='flex justify-center items-center w-[40px] lg:w-[2.5vw] h-[40px] lg:h-[5.1vh] bg-white rounded-lg'>
                <RiTwitterXLine size={25} />
              </div>
              <div className='flex justify-center items-center w-[40px] lg:w-[2.5vw] h-[40px] lg:h-[5.1vh] bg-white rounded-lg'>
                <FaGoogle />
              </div>
              <div className='flex justify-center items-center w-[40px] lg:w-[2.5vw] h-[40px] lg:h-[5.1vh] bg-white rounded-lg'>
                <FaLinkedinIn />
              </div>
             
            </div> */}
              <div className="   mx-auto   ">
                {/* <button className="text-[14px] lg:text-[0.82vw] text-white w-[100px] lg:w-[6.3vw] h-[40px]  lg:h-[5.1vh] lg:mt-[2vh] lg:mr-[1.7vw] border border-white rounded-full">
                  Create Bid
                </button> */}
                <Link to={'/user/account/saved-cars'} className="">
                  <button className="text-[14px] lg:text-[0.82vw] text-white cursor-pointer hover:bg-white hover:text-[#000000]/70 hover:border-[#000000]/70 duration-300 w-[100px] lg:w-[6.3vw] h-[40px] lg:h-[5.1vh] lg:mt-[2vh] lg:mr-[1.7vw] border border-white rounded-full">
                    My Favourites 
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full lg:w-[47vw] ml-[10px] lg:ml-[23vw] mt-[5px] lg:mt-[17px] text-black text-[20px] lg:text-[1.25vw] font-urbanist font-semibold mx-auto overflow-x-auto no-scrollbar">
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
            <Link to="/user/profile">
              <p
                className={`cursor-pointer whitespace-nowrap ${getLinkStyle(
                  "/user/profile"
                )}`}
              >
                MY PROFILE
              </p>
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
