import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPassword } from "../../../hooks/useResetPassword";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { showToast } from "../../../utils/Toast";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = await resetPassword(
        newPassword,
        confirmPassword,
        token
      );
      if (success) {
        showToast(message, 'success')
        navigate("/login");
      } else {
        showToast(message, 'error')
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
            <div className="text-[2.6vw] font-semibold text-white">LogIN</div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                <button className="hover:text-white hover:text-[1.1vw] ">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">LogIn</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-[480px] lg:h-[62vh] w-full  lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Reset New Password
        </div>
        <form className=" flex flex-col items-center gap-[3vh] mt-[6vh]   mx-auto justify-center" onSubmit={handleSubmit}>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
           type="password"
           id="confirmPassword"
           name="confirmPassword"
            className="w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
            placeholder="Confirm Your New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="w-[342px] lg:w-[36vw] h-[48px] lg:h-[5.23vh] text-[#CA0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#F3F3F6]">
          {isLoading ? <ClipLoader size={20} color={"#CA0000"} /> : "Save"}
          </button>
        </form>
        <div className=" text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Don't have an account?{" "}
          <Link to="/signup">
            {" "}
            <span className="text-[#CA0000] cursor-pointer">Sign Up</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
