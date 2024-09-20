import React, { useEffect, useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../../../hooks/useLogin';
import { ClipLoader } from 'react-spinners'; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "../../../utils/Toast";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false); 

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate()
  const { login, isLoading } = useLogin();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const {success, message, role} = await login(values.email, values.password);
      if (success) {
      //  await fetchSavedCars();
      //  const carLotIds = savedCars?.data?.map(car => car.lot_id);
      //  localStorage.setItem("savedCars", JSON.stringify(carLotIds));

        if (role === 'admin') {
          navigate("/admin/dahboard");
        } else {
        navigate("/Successfull-login")
      }
      } else {
        showToast(message,'error')
        // toast.error(message);
      }
      setSubmitting(false);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  
  return (
    <>
      <Header   className="text-white" />
     <div className="Backgroundimage-LogIN ">
      <div   className="hidden lg:block">
        <div className=" w-[15.5] flex flex-col  pt-[14.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">LogIN</div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:text-[1.1vw]">Home</button>
            </Link>
            /
            <button className="hover:text-white hover:text-[1.1vw]">LogIn</button>
          </div>
        </div>
      </div>
    </div>
      <div className=" py-[100px] lg:py-[9.3vh] w-full  lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Login To LUX CARS
        </div>
        <form
          className=" flex flex-col items-center gap-[3vh] mt-[6vh] mx-auto justify-center"
          onSubmit={loginFormik.handleSubmit}
        >
          <input
            type="email"
            id="email"
            name="email"
            className={`w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw] ${
              loginFormik.touched.email && loginFormik.errors.email ? 'border-red-600 placeholder-red-500' : 'border-gray-300'
            }`}
            placeholder={
              loginFormik.touched.email && loginFormik.errors.email
                ? loginFormik.errors.email
                : 'Your Email Address*'
            }
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.email}
          />
          <input
            type={showPassword ? "text" : "password"} 
            id="password"
            name="password"
            className={`w-[342px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw] ${
              loginFormik.touched.password && loginFormik.errors.password ? 'border-red-600 placeholder-red-500' : 'border-gray-300'
            }`}
            placeholder={
              loginFormik.touched.password && loginFormik.errors.password
                ? loginFormik.errors.password
                : 'Your Password*'
            }
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.password}
          />
          <div className="w-[342px] lg:w-[34vw]  flex justify-between">
            <div className="flex justify-between items-center gap-[0.5vw] text-[14px] lg:text-[0.8vw]">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} 
                className="form-checkbox text-[14px]  flex"
              />
              Show Password 
            </div>
           <Link to="/forgot-password">
   <div className="font-urbanist text-[14px] lg:text-[0.8vw] font-semibold">
              Forget password?
            </div>
           </Link>
  </div>
          <button className="w-[342px] lg:w-[36vw] h-[48px] lg:h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
            {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Login"}
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

export default Login;
