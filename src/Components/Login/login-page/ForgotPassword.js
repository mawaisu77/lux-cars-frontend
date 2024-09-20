import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../../hooks/useForgotPassword";
import { toast } from "react-toastify";
import { ClipLoader } from 'react-spinners'; 
import { showToast } from "../../../utils/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
const navigate = useNavigate()
  const { forgotPassword, isLoading, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {success, message} = await forgotPassword(email);
      if (success) {
        showToast(message, 'success')
        // toast.success(message);
        navigate('/')
      } else {
        showToast(message, 'error')
        // toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <Header className="text-white" />
      <div className="Backgroundimage-LogIN">
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col pt-[14.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Password Reset
            </div>

            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white hover:text-[1.1vw] ">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">LogIn</button>
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
            type="email"
            id="email"
            name="email"
            className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
            placeholder="Enter Your email adress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-[342px] lg:w-[36vw] h-[48px] lg:h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
          {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Submit"}
          </button>
        </form>

        <div className=" text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Don't have an account?{" "}
          <Link to="/signup">
            {" "}
            <span className="text-[#ca0000] cursor-pointer">Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
