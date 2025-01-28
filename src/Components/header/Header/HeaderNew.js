import { BsChevronDown, BsSearch, BsTag } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from "../../../assets/Logo/Horizontal0 1.png";
import { FaTimes, FaBars } from "react-icons/fa";
import { IoGlobeSharp } from "react-icons/io5";

import { HiUsers } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import NotificationDropdown from "../../ui/dropdowns/NotificationDropdown";
import luxCar from "../../../assets/lux-logo/lux-logo-new.png"

const HeaderNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState("transparent");
  const [windowWidth, setWindowWidth] = useState();

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { logout } = useLogout();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutModal = () => {
    document.getElementById("my_logout_modal").showModal();
  };

  const handleLogoout = () => {
    logout();
    navigate("/");
    document.getElementById("my_logout_modal").close();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarColor("#000000bb");
      } else {
        setNavbarColor("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth < 768) {
        setNavbarColor("#333333");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-black">
      <div className="w-full sm:max-w-[90vw] max-w-[85vw] mx-auto px-4 md:px-[1.5vw]">
        <div className="flex items-center h-20 md:h-[4.5vw] gap-4 md:gap-[1.5vw]">
          <Link to="/">
            <img
              src={luxCar}
              className="w-[142px] lg:w-[11.767vw] h-auto"
              alt={`Logo`}
            />
          </Link>
          <div className="flex-1 max-w-3xl md:max-w-full ml-4 md:ml-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for vehicle by Make, Model, Lot or VIN..."
                className="w-full p-2 md:p-[0.6vw] rounded-full bg-white text-sm md:text-18"
              />
              <button className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <BsSearch className="h-5 md:h-[0.2vw] w-5 md:w-[0.2vw]" />
              </button>
            </div>
          </div>

          {user ? (
            <div className="flex items-center ">
              <button
                className={`focus:outline-none lg:text-18 text-white ${navbarColor === "transparent" ? "" : "text-white"}`}
                onClick={handleLogoutModal}
              >
                logout
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 md:gap-[1.5vw] text-sm md:text-18">
                <Link to="/login">
                  <button
                    className={` focus:outline-none text-white ${
                      isHomePage ? "text-primary-gray" : "text-white"
                    } ${navbarColor === "transparent" ? "" : "text-white"} lg:text-18 hover:text-white/80 duration-200`}
                  >
                    Log In
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    className={` focus:outline-none bg-[#ca0000] hover:bg-[#ca0000e8] px-6 md:px-[1.5vw] py-2 md:py-[0.2vw] rounded-full text-white ${navbarColor === "transparent" ? "" : "text-white"} lg:text-18  duration-200`}
                  >
                    {" "}
                    Sign Up
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderNew;
