import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import image1 from '../../../assets/User-pics/Joshua.png';
import { ImFilesEmpty } from "react-icons/im";
import { FaFacebook, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Header from '../../header/Header/Header';

const Navbar = () => {
  const location = useLocation();

  const getLinkStyle = (path) => {
    return location.pathname === path ? 'text-red-600' : 'hover:text-red-600';
  };

  return (
    <>
      <div className='Account-image'>
        <Header className="text-white"/>
        <div className='hidden lg:block'>
          <div className='w-[15.5] flex flex-col mt-[5.5vh]'>
            <div className='text-[2.6vw] font-semibold text-white'>Account</div>
            <div className='text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist'>
              <Link to="/">
                <button className='hover:text-white'>Home</button>
              </Link>
              /
              <button className='hover:text-white'>User Account</button>
            </div>
          </div>
        </div>
      </div>

      <div className='  w-[343px] md:w-[650px] lg:w-[74vw] h-auto mt-[7vh] mx-auto lg:h-[38vh] bg-[#f8f8f8] rounded-2xl'>
        <div className='flex flex-col lg:flex-row justify-center lg:justify-between lg:h-[30vh]    bg-[#000000]/70 rounded-t-2xl'>
          <div className='flex flex-col font-urbanist lg:flex-row mt-[4.6vh]   lg:ml-[2.2vw]     w-full lg:w-[48vw]'>
            <img src={image1} className='w-[274px] md:w-[400px] mx-auto lg:w-[15vw] h-[274px] md:h-[400px] lg:h-[30vh] left-[36px] top-[36px] rounded-xl' />
            <div className='text-left text-[white]  w-[274px] lg:w-[35vw]   mx-auto font-urbanist lg:ml-[2.2vw]'>
              <h1 className='font-bold font-urbanist text-[36px]  lg:text-[2.3vw] leading- text-white'>Joshua Paul</h1>
              <p className='text-[18px] lg:text-[1.3vw] leading-10'>@loremipsum</p>
              <p className='text-[12px] lg:text-[0.78vw] text-[#f8f8f8] py-5 lg:py-0'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati
                dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
              </p>
              <button className='flex justify-center items-center gap-2 w-[160px] lg:w-[10vw] h-[36px] lg:h-[3.6vh] text-[12px] lg:text-[0.7vw] text-[#7a798a] bg-white rounded-full lg:mt-[1vh]'>
                Bidding Power: $0/0$
                <ImFilesEmpty />
              </button>
            </div>
          </div>
          <div>
           <div className='flex flex-col gap-6 lg:gap-0 lg:flex-row justify-center py-5  lg:w-[20vw] ml-9 lg:ml-0  mx-auto lg:items-center'>
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
            <div className='   mx-auto   '>
            <button className='text-[14px] lg:text-[0.82vw] text-white w-[100px] lg:w-[6.3vw] h-[40px]  lg:h-[5.1vh] lg:mt-[2vh] lg:mr-[1.7vw] border border-white rounded-full'>
                Create Bid
              </button>
            </div>
            </div>        
           </div>
        </div>
        <div className='relative w-full lg:w-[47vw] ml-[10px] lg:ml-[23vw] mt-[5px] lg:mt-[17px] text-black text-[20px] lg:text-[1.25vw] font-urbanist font-semibold mx-auto overflow-x-auto no-scrollbar'>
      <div className='flex justify-between items-center w-[530px] lg:w-full mx-auto'>
        <Link to="/user/account/all-bids">
          <p className={`cursor-pointer whitespace-nowrap ${getLinkStyle('/user/account/all-bids')}`}>All Bids</p>
        </Link>
        <Link to="/user/account/funds">
          <p className={`cursor-pointer whitespace-nowrap ${getLinkStyle('/user/account/funds')}`}>FUNDS</p>
        </Link>
        <Link to="/user/account/order">
          <p className={`cursor-pointer whitespace-nowrap ${getLinkStyle('/user/account/order')}`}>ORDERS</p>
        </Link>
        <Link to="/user/account/offers">
          <p className={`cursor-pointer whitespace-nowrap ${getLinkStyle('/user/account/offers')}`}>OFFERS</p>
        </Link>
        <Link to="/user/profile">
          <p className={`cursor-pointer whitespace-nowrap ${getLinkStyle('/user/profile')}`}>MY PROFILE</p>
        </Link>
      </div>
    </div>
      </div>
    </>
  );
}

export default Navbar;
