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

      <div className='h-[38vh] w-[74vw] mt-[7vh] mx-auto bg-[#f8f8f8] rounded-2xl'>
        <div className='flex justify-between h-[30vh] w-full bg-[#0000004d] rounded-t-2xl'>
          <div className='flex mt-[4.6vh] ml-[2.2vw] w-[48vw]'>
            <img src={image1} className='w-[15vw] h-[30vh] left-[36px] top-[36px] rounded-xl' />
            <div className='text-left text-[white] font-urbanist ml-[2.2vw]'>
              <h1 className='font-bold font-urbanist text-[2.3vw] text-white'>Joshua Paul</h1>
              <p className='text-[1.3vw]'>@loremipsum</p>
              <p className='text-[0.82vw] text-[#f8f8f8]'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati
                dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
              </p>
              <button className='flex justify-center items-center gap-2 w-[12vw] h-[4.6vh] text-[#7a798a] bg-white rounded-full mt-5'>
                Bidding Power: $0/0$
                <ImFilesEmpty />
              </button>
            </div>
          </div>
          <div>
            <div className='flex gap-3 mr-[2.5vw] mt-[6.8vh]'>
              <div className='flex justify-center items-center w-[2.5vw] h-[5.1vh] bg-white rounded-lg'>
                <FaFacebook size={25} />
              </div>
              <div className='flex justify-center items-center w-[2.5vw] h-[5.1vh] bg-white rounded-lg'>
                <RiTwitterXLine size={25} />
              </div>
              <div className='flex justify-center items-center w-[2.5vw] h-[5.1vh] bg-white rounded-lg'>
                <FaGoogle />
              </div>
              <div className='flex justify-center items-center w-[2.5vw] h-[5.1vh] bg-white rounded-lg'>
                <FaLinkedinIn />
              </div>
              <button className='text-[0.82vw] text-white w-[6.06vw] h-[5.1vh] border border-white rounded-full'>
                Create Bid
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center w-[47vw] ml-[23vw] mt-[17px] text-[1.25vw] font-urbanist font-semibold mx-auto'>
          <Link to="/UserAccount/AllBIds">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/AllBIds')}`}>All Bids</p>
          </Link>
          <Link to="/UserAccount/FUNDS">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/FUNDS')}`}>FUNDS</p>
          </Link>
          <Link to="/UserAccount/Order">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/Order')}`}>ORDERS</p>
          </Link>
          <Link to="/UserAccount/Offers">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/Offers')}`}>OFFERS</p>
          </Link>
          <Link to="/UserAccount/PARTS">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/PARTS')}`}>PARTS</p>
          </Link>
          <Link to="/user/profile">
            <p className={`cursor-pointer ${getLinkStyle('/UserAccount/Profile')}`}>MY PROFILE</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
