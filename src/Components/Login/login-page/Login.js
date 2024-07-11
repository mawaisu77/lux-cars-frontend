import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from '../../../hooks/useLogin';
import { ClipLoader } from 'react-spinners'; 
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";


const Login = () => {

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const navigate = useNavigate()
  const { login, isLoading, error } = useLogin();


  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const {success, message} = await login(values.email, values.password);
      if (success) {
        toast.success(message);
        navigate('/')
      } else {
        toast.error(message);
      }
      setSubmitting(false);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <div className="Backgroundimage-LogIN">
        <Header className="text-white" />
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">LogIN</div>

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
          Login To LUX CARS
        </div>
        <form
          className=" flex flex-col items-center gap-[3vh] mt-[6vh] mx-auto justify-center"
          onSubmit={loginFormik.handleSubmit}
        >
          <input
            type=""
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
            type=""
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
            <div className="flex justify-between  gap-[0.5vw] text-[14px] lg:text-[0.8vw]">
              <input
                type="checkbox"
                className="form-checkbox text-[14px]  flex"
              />{" "}
              Remenber me
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
