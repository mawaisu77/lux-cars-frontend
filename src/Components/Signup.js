import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Signup = () => {
  return (
    <>  <div className='Backgroundimage-LogIN'>
    <Header textColor="text-white" /> {/* Pass textColor as a prop */}
    <div className='w-[15.5] flex flex-col mt-[5.5vh]'>
      <div className='text-[2.6vw] font-semibold text-white'>
        Sign Up
      </div>
      <div className='text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist'>
        <Link to="/"> {/* Assuming '/' is your home route */}
          <button className='hover:text-white'>
            Home
          </button>
        </Link>
        /
        <button className='hover:text-white'>
          Sign Up
        </button>
      </div>
    </div>
  </div>
  <div className=' h-[85vh] w-[36.1] mx-auto'>
  <div className='mt-[8.6vh] text-[2vw] font-bold font-urbanist'>
    Register To LUX CARS
  </div>
  <form className=' flex flex-col items-center gap-[2.5vh] mt-[6vh]   mx-auto justify-center'>
  <input type="" id="email" name="email" className="w-[35vw] h-[5.23vh] rounded-lg pl-2 border text-[0.8vw]" placeholder="Your Full name*" />
  <input type="" id="email" name="email" className="w-[35vw] h-[5.23vh] rounded-lg pl-2 border  text-[0.8vw]" placeholder="Your Email Adress*" />
  <input type="" id="email" name="email" className="w-[35vw] h-[5.23vh] rounded-lg pl-2 border  text-[0.8vw]" placeholder="Your Country*" />
  <input type="" id="email" name="email" className="w-[35vw] h-[5.23vh] rounded-lg pl-2 border  text-[0.8vw]" placeholder="password*" />
  <input type="" id="email" name="email" className="w-[35vw] h-[5.23vh] rounded-lg pl-2 border  text-[0.8vw]" placeholder="Confirm password*" />
  <div className='w-[34vw] flex justify-between'>
  <div className='flex gap-[0.5vw] text-[0.8vw]'>
    <input  
    type="checkbox"
    className="form-checkbox  flex"/> Remenber me
    </div>
    <div className='font-urbanist text-[0.8vw] font-semibold'>
      Forget password?
    </div>
  </div>
  <button className="w-[36vw] h-[5.23vh] text-[#ca0000] text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
                    Login
                </button>
  </form>

<div className='text-[0.7vw] font-urbanist mt-[5vh]'>
  Don't have an account? <Link  to="/Signup"> <span className='text-[#ca0000] cursor-pointer'>Sign Up</span></Link> 
</div>
 
</div></>
  
  
  );
};

export default Signup;
