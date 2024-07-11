import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForgotPassword } from "../../../hooks/useForgotPassword";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners'; 

const Reset = () => {
  const [email, setEmail] = useState('');
const navigate = useNavigate()
  const { forgotPassword, isLoading, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {success, message} = await forgotPassword(email);
      if (success) {
        toast.success(message);
        navigate('/')
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
<<<<<<< HEAD
    <>
      {" "}
      <div className="Backgroundimage-LogIN">
        <Header className="text-white" />
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Password Reset
            </div>
=======
    <> <div className='Backgroundimage-LogIN'>
    <Header className="text-white"/>
    <div className='hidden  lg:block'>
  <div className='  w-[15.5] flex flex-col  mt-[5.5vh]'>
    <div className='text-[2.6vw] font-semibold text-white'>
    LogIN
    </div>
  
 
>>>>>>> origin/feat/ui-hashir

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">LogIn</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[480px] lg:h-[62vh] w-full  lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Forgot your Password?
        </div>
        <div>
          <p className="mt-[5.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
            We Can Help You
          </p>
          <p className="font-urbanist text-[#7a798a]">
            We will send a link to your email to reset your password.
          </p>
        </div>

        <form className=" flex flex-col items-center gap-[3vh] mt-[6vh]  mx-auto justify-center" onSubmit={handleSubmit}>
          <input
            type=""
            id="email"
            name="email"
            className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
            placeholder="Enter Your email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

<<<<<<< HEAD
          <button className="w-[342px] lg:w-[36vw] h-[48px] lg:h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
          {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Submit"}
          </button>
        </form>

        <div className=" text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Don't have an account?{" "}
          <Link to="/Signup">
            {" "}
            <span className="text-[#ca0000] cursor-pointer">Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  );
};
=======
</div>
<div className=' h-[480px] lg:h-[62vh] w-full  lg:w-[36.1] mx-auto'>
  <div className='mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist'>
    Reset New Password
  </div>
  <form className=' flex flex-col items-center gap-[3vh] mt-[6vh]   mx-auto justify-center'>
  <input type="" id="email" name="email" className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="New Password" />
  <input type="" id="email" name="email" className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]" placeholder="Confirm Your New Password" />
 
  <button className="w-[342px] lg:w-[36vw] h-[48px] lg:h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
                    Save
                </button>
  </form>
>>>>>>> origin/feat/ui-hashir

export default Reset;
