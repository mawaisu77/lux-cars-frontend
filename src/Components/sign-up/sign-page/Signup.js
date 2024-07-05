import React, { useState } from 'react';
import Header from '../../header/Header/Header';
import { Link } from 'react-router-dom';
import CountryDropdown from '../../CountryDropdown'; // Adjust the import path accordingly

const Signup = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const countries = ["USA", "Canada", "UK", "Germany", "France", "Australia", "India"]; // Add more countries as needed

  return (
    <>
      <div className='Backgroundimage-Signup'>
        <Header textColor="text-white" />
        <div className='hidden lg:block'>
          <div className='w-[15.5] flex flex-col mt-[5.5vh]'>
            <div className='text-[2.6vw] font-semibold text-white'>
              SignUp
            </div>
            <div className='text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist'>
              <Link to="/">
                <button className='hover:text-white'>Home</button>
              </Link>
              /
              <button className='hover:text-white'>SignUp</button>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[730px] lg:h-[85vh] w-full lg:w-[36.1] mx-auto'>
        <div className='mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist'>
          Register To LUX CARS
        </div>
        <form className='flex flex-col items-center gap-[2.5vh] mt-[6vh] mx-auto justify-center'>
          <input type="text" id="full-name" name="full-name" className="w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="Your Full name*" />
          <input type="email" id="email" name="email" className="w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="Your Email Address*" />
          <CountryDropdown countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
          <input type="password" id="password" name="password" className="w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="Password*" />
          <input type="password" id="confirm-password" name="confirm-password" className="w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="Confirm Password*" />
          <div className='w-[343px] lg:w-[34vw] flex justify-between'>
            <div className='flex justify-between gap-[0.5vw] text-[14px] lg:text-[0.8vw]'>
              <input type="checkbox" className="form-checkbox text-[14px] flex" /> Remember me
            </div>
            <div className='font-urbanist text-[14px] lg:text-[0.8vw] font-semibold'>
              Forget password?
            </div>
          </div>
          <button className="w-[343px] lg:w-[36vw] h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
            SignUp
          </button>
        </form>
        <div className='text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]'>
          Don't have an account? <Link to="/Signup"><span className='text-[#ca0000] cursor-pointer'>Sign Up</span></Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
