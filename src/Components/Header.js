import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/Logo/Horizontal0 1.png';
import { FaTimes, FaBars } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';
import { HiUsers } from 'react-icons/hi2';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='border-b'>
      <div className='flex justify-between items-center w-full max-w-[1000px] lg:max-w-[88vw] mx-auto h-[72px] lg:h-[9.8vh] px-4'>
        <div className='flex items-center gap-4'>
          <img className='w-[142px] lg:w-[13.58vw] h-auto' src={img1} alt='Logo' />
          <div className='hidden lg:flex'>
            <ul className='flex gap-4 font-urbanist font-bold text-[1rem] lg:text-[1.1018vw] leading-6 text-[#7a798a]'>
              <Link to="/HowWorks">
                <li>How it works</li>
              </Link>
              <li className='flex items-center'>
                Delivery Time <TiArrowSortedDown />
              </li>
              <Link to="/About">
                <li>About</li>
              </Link>
              <Link to="/Help">
                <li>Help</li>
              </Link>
              <Link to="/ContactUs">
                <li>Contact</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className='hidden lg:flex items-center gap-2 lg:gap-4 font-urbanist font-bold text-[1rem] lg:text-[1.101875vw] text-[#7a798a]'>
          <HiUsers />
          <Link to="/Login">
            <button className='focus:outline-none'>login</button>
          </Link>
          /
          <Link to="/Signup">
            <button className='focus:outline-none'>sign-up</button>
          </Link>
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
            <Link to="/HowWorks" onClick={toggleMenu}>
              <li>How it works</li>
            </Link>
            <li className='flex items-center'>
              Delivery Time <TiArrowSortedDown />
            </li>
            <Link to="/About" onClick={toggleMenu}>
              <li>About</li>
            </Link>
            <Link to="/Help" onClick={toggleMenu}>
              <li>Help</li>
            </Link>
            <Link to="/ContactUs" onClick={toggleMenu}>
              <li>Contact</li>
            </Link>
            <div className='flex flex-col items-center gap-4'>
              <Link to="/Login" onClick={toggleMenu}>
                <button className='focus:outline-none'>login</button>
              </Link>
              <Link to="/Signup" onClick={toggleMenu}>
                <button className='focus:outline-none'>sign-up</button>
              </Link>
              <button className='w-[132px] lg:w-[7.333333333333334vw]  h-[32px] lg:h-[5.23vh] bg-[#ca0000] text-white rounded-full lg:text-[0.8vw] focus:outline-none'>
                Try Demo
              </button>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
