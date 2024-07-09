import React, { useState } from "react";
import Header from "../../header/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import CountryDropdown from "../../CountryDropdown"; // Adjust the import path accordingly
import { useSignup } from "../../../hooks/useSignup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from 'react-spinners'; // Optional spinner library

const Signup = () => {
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Australia",
    "India",
  ]; // Add more countries as needed
  const navigate = useNavigate();

  const signupValidationSchema = Yup.object().shape({
    username: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { signup, isLoading, error } = useSignup();

  const signupFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      console.log("===>", values)
      const { success, message } = await signup(values);
      if (success) {
        toast.success(message);
        // navigate("/");
      } else {
        toast.error(message);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <>
      <div className="Backgroundimage-Signup">
        <Header textColor="text-white" />
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">SignUp</div>
            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white">Home</button>
              </Link>
              /<button className="hover:text-white">SignUp</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[730px] lg:h-[85vh] w-full lg:w-[36.1] mx-auto">
        <div className="mt-[8.6vh] text-[36px] lg:text-[2vw] font-bold font-urbanist">
          Register To LUX CARS
        </div>
        <form className="flex flex-col items-center gap-[2.5vh] mt-[6vh] mx-auto justify-center" onSubmit={signupFormik.handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            className={`w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw] ${
              signupFormik.touched.username && signupFormik.errors.username
                ? "border-red-600 placeholder-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              signupFormik.touched.username && signupFormik.errors.username
                ? signupFormik.errors.username
                : "Your Full name*"
            }
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            value={signupFormik.values.username}
          />
          <input
            type="email"
            id="email"
            name="email"
            className={`w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]  ${
              signupFormik.touched.email && signupFormik.errors.email
                ? "border-red-600 placeholder-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              signupFormik.touched.email && signupFormik.errors.email
                ? signupFormik.errors.email
                : "Your Email Address*"
            }
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            value={signupFormik.values.email}
          />
          {/* <CountryDropdown countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} /> */}
          <input
            type="password"
            id="password"
            name="password"
            className={`w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw] ${
              signupFormik.touched.password && signupFormik.errors.password
                ? "border-red-600 placeholder-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              signupFormik.touched.password && signupFormik.errors.password
                ? signupFormik.errors.password
                : "Your Password*"
            }
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            value={signupFormik.values.password}
          />
         
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw] ${
              signupFormik.touched.confirmPassword &&
              signupFormik.errors.confirmPassword
                ? "border-red-600 placeholder-red-500"
                : "border-gray-300"
            }`}
            placeholder={
              signupFormik.touched.confirmPassword &&
              signupFormik.errors.confirmPassword
                ? signupFormik.errors.confirmPassword
                : "confirm Password *"
            }
            onChange={signupFormik.handleChange}
            onBlur={signupFormik.handleBlur}
            value={signupFormik.values.confirmPassword}
          />
          <div className="w-[343px] lg:w-[34vw] flex justify-between">
            <div className="flex justify-between gap-[0.5vw] text-[14px] lg:text-[0.8vw]">
              <input
                type="checkbox"
                className="form-checkbox text-[14px] flex"
              />{" "}
              Remember me
            </div>
            <div className="font-urbanist text-[14px] lg:text-[0.8vw] font-semibold">
              Forget password?
            </div>
          </div>
          <button className="w-[343px] lg:w-[36vw] h-[5.23vh] text-[#ca0000] text-[14px] lg:text-[0.9vw] rounded-full mt-[2vh] bg-[#f3f3f6]">
          {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Login"}
          </button>
        </form>
        <div className="text-[14px] lg:text-[0.7vw] font-urbanist mt-[5vh]">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-[#ca0000] cursor-pointer">Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
