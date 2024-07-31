import React from 'react';
import Header from '../../header/Header/Header';
import { HiMiniArrowLongRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import image1 from '../../../assets/Vehicle/IMG (50).png';
import image2 from '../../../assets/Vehicle/IMG (51).png';
import image3 from '../../../assets/Vehicle/IMG (52).png';
import image4 from '../../../assets/Vehicle/IMG (53).png';
import logo from '../../../assets/Vehicle/Rectangle 767.png';
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsDownload } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiUsersFill } from "react-icons/pi";
import { CgFileDocument } from "react-icons/cg";
import { FaXTwitter, FaGoogle, FaLinkedinIn, FaFacebook } from "react-icons/fa6";
import { TiLockClosed } from "react-icons/ti";
import VehicleCards from '../../cards/VehicleCards';
import VehicleTab from '../../vehicle/Vehicle-page/VehicleTab'

const VehicleHero = () => {
  return (
    <>
      <div className="bg-vehicle">
        <Header textColor="text-white" />
        <div className="w-[15.5] flex flex-col mt-[5.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">Vehicle Detail</div>
          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white">Home</button>
            </Link>
            /<button className="hover:text-white">Vehicle Detail</button>
          </div>
        </div>
      </div>

      <div className='flex justify-between mx-auto w-[74vw] mt-[80px] mb-[200px]'>
        <div className='w-[36vw]'>
          <div>
            <img src={image1} className='w-[35vw] rounded-lg mb-[3vh]' />
          </div>
          <div className='flex justify-between mb-[3vh]'>
            <img src={image2} className='w-[12vw] h-[14vh] rounded-lg' />
            <img src={image3} className='w-[9.2vw] h-[14vh] rounded-lg' />
            <div className='relative'>
              <img src={image4} className='w-[12vw] h-[14vh] rounded-lg' />
              <HiMiniArrowLongRight size={30} className='absolute bg-white right-1 bottom-1 cursor-pointer rounded-lg' />
            </div>
          </div>
          <div className='flex justify-between px-2 items-center w-full border text-[#101828] text-[1.04vw] h-[4.7vh] rounded-lg'>
            <div className='flex justify-center items-center gap-1'>
              <IoDocumentTextOutline />
              <p>Get Report</p>
            </div>
            <BsDownload className='cursor-pointer' />
          </div>
        </div>

        <div className='w-[33vw]  '>
          <div>
            <div className='flex justify-between mb-[3vh]'>
              <div className='flex justify-center items-center gap-2'>
                <img src={logo} className='w-[2.9vw] h-[4vh]' />
                <p className='w-[1.69vw] h-[3.79vh] font-urbanist text-white bg-[#47a432] text-[1.1vw] rounded-full font-bold'>R</p>
                <p className='text-[1.7vw] font-urbanist font-semibold'>Chevrolet GMT-400</p>
              </div>
              <div className='flex justify-center items-center gap-1'>
                <div className='flex justify-center items-center gap-1 bg-[#f8f8f8] font-semibold rounded-xl text-[0.9vw] cursor-pointer w-[4vw] h-[4vh]'>
                  <IoEyeOutline />
                  <p>225</p>
                </div>
                <div className='flex justify-center items-center gap-1 bg-[#f8f8f8] font-semibold rounded-xl text-[0.9vw] cursor-pointer w-[4vw] h-[4vh]'>
                  <IoIosHeartEmpty />
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className='flex justify-between mb-[3vh]'>
              <div className='flex px-2 gap-2 items-center w-[16vw] h-[6.7vh] rounded-lg bg-[#f8f8f8]'>
                <div className='flex justify-center items-center rounded-lg w-[2.5vw] h-[5vh] bg-red-600'>
                  <PiUsersFill color='white' />
                </div>
                <div className='text-left'>
                  <p className='text-[0.7vw] text-[#7a798a]'>Owned by</p>
                  <p className='text-[0.9vw] font-urbanist font-semibold'>
                    Non-insurance Company
                  </p>
                </div>
              </div>
              <div className='flex px-2 gap-2 items-center w-[16vw] h-[6.7vh] rounded-lg bg-[#f8f8f8]'>
                <div className='flex justify-center items-center rounded-lg w-[2.5vw] h-[5vh] bg-red-600'>
                  <CgFileDocument color='white' />
                </div>
                <div className='text-left'>
                  <p className='text-[0.7vw] text-[#7a798a]'>Sale Document</p>
                  <p className='text-[0.9vw] font-urbanist font-semibold'>
                    Certificate of Title(ks)
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className='font-urbanist text-[0.75vw] text-[#7a798a] text-left mb-[2vh]'>
                Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae malesuada. Habitant sollicitudin faucibus cursus lectus pulvinar dolor non ultrices eget. Facilisi lobortisal morbi fringilla urna amet sed ipsum vitae malesuada.
              </p>
            </div>
           <div className='flex justify-between'>
           <div className='bg-[#f8f8f8] w-[16vw] px-2 py-2 leading-8 rounded-lg mb-[3vh]'>
              <div className='flex items-center'>
                <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Lot :</p>
                <p className='font-urbanist font-bold text-[0.97vw] ml-2'>1-51188714</p>
              </div>
              <div className='flex items-center'>
                <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>VIN :</p>
                <p className='font-urbanist font-bold text-[0.97vw] ml-2'>1GCDC14Z2KE266021</p>
              </div>
              <div className='flex items-center'>
                <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Year/Make/Model:</p>
                <p className='font-urbanist font-bold text-[0.97vw] ml-2'>1989 GMT</p>
              </div>
              <div className='flex items-center'>
                <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Estimated Final Price:</p>
                <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$450 - $700</p>
              </div>
            </div>
            <div className='flex justify-between px-2 gap-2 items-center w-[16vw] h-[6.7vh] rounded-lg bg-[#f8f8f8]'>
                <div className='flex justify-center items-center rounded-lg    '>
                 <p className='text-[#7a798a]'>Current Bid</p>
                </div>
                <div className='text-left'>
                   <p className='font-bold'>
                    $750
                   </p>
                </div>
              </div>
           </div>
          </div>
          <div className='text-left flex gap-2 items-center mb-5'>
            <p className='text-[1vw] font-urbanist font-bold'>Share :</p>
            <div className='flex gap-3'>
              <div className='w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center'>
                <FaFacebook />
              </div>
              <div className='w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center'>
                <FaXTwitter />
              </div>
              <div className='w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center'>
                <FaGoogle />
              </div>
              <div className='w-[1.5vw] h-[3.2vh] bg-[#f8f8f8] rounded-lg flex justify-center items-center'>
                <FaLinkedinIn />
              </div>
            </div>
            <p className='underline font-urbanist text-[0.8vw] ml-5 cursor-pointer'>More</p>
          </div>
          <button className='flex justify-center items-center gap-2 h-[4.8vh] text-[0.97vw] mb-[3vh] rounded-full text-red-600 font-urbanist font-bold bg-[#f8f8f8] w-full'>
            <TiLockClosed size={20} /> place Max bid
          </button>
          <VehicleTab/>
          <div className='flex justify-between'>
          <div className='bg-[#f8f8f8] w-[16vw] px-3 py-2 leading-8 rounded-lg mb-[3vh]'>
            <div className='flex items-center'>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>Penalties and Additional Fees:</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Custom Clearance Total:</p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$736</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Estimated Total Price:</p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$100</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Estimated Final Price:</p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$450 - $700</p>
            </div>
          </div>
          <div className='bg-[#f8f8f8] w-[16vw] px-3 py-2 leading-8 rounded-lg mb-[3vh]'>
            <div className='flex items-center'>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>Additional Services :</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Hazardous Cargo :</p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$0</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Oversized Vehicle : </p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$250-$600</p>
            </div>
            <div className='flex items-center'>
              <p className='font-urbanist text-[#7a798a] text-[0.85vw] ml-2'>Estimated Final Price:</p>
              <p className='font-urbanist font-bold text-[0.97vw] ml-2'>$450 - $700</p>
            </div>
          </div>
          </div>
        </div>
        
      </div>
      <div>
          <p className='text-[2.3vw] font-urbanist font-bold'>
            Similar Listings
          </p>
          <VehicleCards/>
      </div>
    </>
  );
}

export default VehicleHero;
