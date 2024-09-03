import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img1 from '../../../assets/Logo/Horizontal0 1.png';
import { FaTimes, FaBars } from 'react-icons/fa';
import { IoGlobeSharp } from "react-icons/io5";

import { TiArrowSortedDown } from 'react-icons/ti';
import { HiUsers } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import { IoCloudUploadOutline } from "react-icons/io5";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const {user} = useAuthContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const {logout} = useLogout()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutModal = () => {
    document.getElementById("my_logout_modal").showModal();
  };

  const handleLogoout = () => {
    logout()
    navigate('/')
    document.getElementById("my_logout_modal").close();
  }

  
  return (
    <div className='border-b border-[#7A798A] w-full z-50 '>
      <div className='flex justify-between items-center w-full max-w-[1000px] lg:max-w-[88vw] mx-auto h-[72px] lg:h-[9.8vh] px-4'>
        <div className='flex items-center gap-4'>
          <Link to="/">
          <img className='w-[142px] lg:w-[13.58vw] h-auto' src={img1} alt='Logo' />
          </Link>
          <div className='hidden lg:flex'>
          <ul className={`flex gap-[1.5vw] font-urbanist font-bold text-[1rem] lg:text-[1.1018vw] leading-6 ${isHomePage ? 'text-[#7A798A]' : 'text-white'}`}>              
            <Link to="/how-works">
                <li>How it works</li>
              </Link>
              <li className='flex items-center'>
               Fees
                {/* Delivery Time <TiArrowSortedDown /> */}
              </li>
              <Link to="/about">
                <li>{t('navbar.about')}</li>
              </Link>
              <Link to="/help">
                <li>{t('navbar.help')}</li>
              </Link>
              <Link to="/contact-us">
                <li>{t('navbar.contact')}</li>
              </Link>
              <Link to={'/upload-car'}>
          <li>Upload Vehicle</li>
        </Link>
            </ul>
          </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 lg:gap-4 font-urbanist font-bold text-[1rem] lg:text-[1.101875vw] text-[#7a798a]'>
        <div className="relative inline-block text-left">
       
      <div className='flex justify-center items-center gap-[1vw] items-center '>
 
        
          <IoGlobeSharp   onClick={() => setDropdownOpen(!dropdownOpen)} className={` cursor-pointer ${isHomePage ? 'text-[#7A798A]' : 'text-white'}  w-[1.3vw] h-[2.7vh]` } />
      </div>
      {dropdownOpen && (
        <div className="origin-top-right absolute z-50 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('en')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('fr')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              French
            </button>
          </div>
        </div>
      )}
    </div>
          <Link to="/user/profile" className={` ${isHomePage ? 'text-[#7A798A] block' : 'text-white'}`} ><HiUsers/></Link>
          
          {
            !user ? (
            <>
          <Link to="/login">
            <button className={` focus:outline-none ${isHomePage ? 'text-[#7A798A]' : 'text-white'}`}>login</button>
          </Link>
          <div className={`  ${isHomePage ? 'text-[#7A798A]' : 'text-white'}`}>
            /
          </div>
          <Link to="/signup">
            <button className={` focus:outline-none ${isHomePage ? 'text-[#7A798A]' : 'text-white'}`}>sign-up</button>
          </Link>
            </>) : (
              <>
            <button className={`focus:outline-none ${isHomePage ? 'text-[#7A798A]' : 'text-white'}`} onClick={handleLogoutModal}>logout</button>
              </>
            )
          }
    
          <button className='w-[7.333333333333334vw] h-[5.23vh] bg-[#ca0000] text-white rounded-full text-[0.8vw] focus:outline-none'>
            Try Demo
          </button>
        </div>
        <div className='lg:hidden flex items-center'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className='lg:hidden'>
          <ul className='flex flex-col items-center gap-4 mt-4 font-urbanist font-bold text-[1rem] text-[#7a798a]'>
            <Link to="/how-works" onClick={toggleMenu}>
              <li>How it works</li>
            </Link>
         <Link to="/fees"></Link>
            <Link to="/about" onClick={toggleMenu}>
              <li>About</li>
            </Link>
            <Link to="/help" onClick={toggleMenu}>
              <li>Help</li>
            </Link>
            <Link to="/contact-us" onClick={toggleMenu}>
              <li>Contact</li>
            </Link>
            <Link to='/upload-car' onClick={toggleMenu}>
          <li>Upload Vehicle</li>
        </Link>
            <div className='flex flex-col items-center gap-4'>
              <Link to="/login" onClick={toggleMenu}>
                <button className='focus:outline-none'>login</button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <button className='focus:outline-none'>sign-up</button>
              </Link>
              <button className='w-[132px] lg:w-[7.333333333333334vw]  h-[32px] lg:h-[5.23vh] bg-[#ca0000] text-white rounded-full lg:text-[0.8vw] focus:outline-none'>
                Try Demo
              </button>
            </div>
          </ul>
        </div>
      )}
      <dialog id="my_logout_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg my-4">Do you want to logout your account?</h3>
        
          <div className="flex gap-x-2 justify-center">
            <button
              className="btn text-green-600 w-[70px]"
              onClick={handleLogoout}
            >
              Yes
            </button>
            <button
              className="btn text-red-600 w-[70px]"
              onClick={() => document.getElementById("my_logout_modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Header;
