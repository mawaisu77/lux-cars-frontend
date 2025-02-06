import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignup } from "../../../hooks/useSignup";
import { showToast } from "../../../utils/Toast";
import { ClipLoader } from "react-spinners";

const Registration = () => {
  const [isTermsChecked, setIsTermsChecked] = useState(false);

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
        showToast(message, 'success');
        // toast.success(message);
        // navigate("/");
      } else {
        // toast.error(message);
        showToast(message, 'error');

      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });


  return (
    <div className="bg-[#f8f8f8] w-[100vw]">
      <div className="mx-auto py-10   sm:py-[2.083vw] max-w-[85vw] sm:max-w-[80vw] ">
        <div className="grid lg:grid-cols-2 gap-12 items-center">    
          {/* Left Column - Features */}
          <div className=" flex flex-col gap-[1.25vw]">
          <h1 className="text-[22px] md:text-34 font-urbanist font-bold">
          Secure, Affordable, and Hassle-Free Car Buying
          </h1>
            <div className="flex gap-2 text-24 ">
              <div className="text-[20px] lg:text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left text-[22px] lg:text-24">Save 30-50% off:</h3>
                <p className="text-gray-600 text-[16px] lg:text-18 leading-relaxed text-left mt-[0.833vw]">
                Get 30-50% off retail prices through BidCaribbean’s trusted online auctions. From everyday vehicles to luxury cars, enjoy unbeatable deals without the extra costs of dealership markups.
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-[20px] lg:text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left text-[22px] lg:text-24 ">Over 300,000 Verified Vehicles:</h3>
                <p className="text-gray-600 text-[16px] lg:text-18 leading-relaxed text-left mt-[0.833vw]">   
                Choose from over 300,000 verified cars, including like-new options or cars with minor issues such as hail damage, theft recovery, or repossession. Every listing is carefully reviewed, ensuring you can bid with confidence.
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-[20px] lg:text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left text-[22px] lg:text-24">
                Hassle-Free Bidding

                </h3>
                <p className="text-gray-600 text-[16px] lg:text-18 leading-relaxed text-left mt-[0.833vw]">       
                Our platform simplifies bidding, making it easy and stress-free. Just enter your maximum bid, and we'll take care of everything, ensuring the security of your transactions at every step.       
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-[20px] lg:text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left text-[22px] lg:text-24">
                VIP Support at Every Step
                </h3>
                <p className="text-gray-600 text-[16px] lg:text-18 leading-relaxed text-left mt-[0.833vw]"> 
                           
                From registration to delivery, we’ve got you covered. Our expert assistance ensures you make informed decisions and secure the best deals—fast, safe, and seamless.

                </p>
              </div>
              
            </div>
            <h2 className="text-[22px] text-left md:text-30 font-urbanist font-bold">
            Start bidding today with BidCaribbean and drive your dream car for less! 
                </h2>
          </div>

          {/* Right Column - Registration Form */}
          <div className="">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-[22x] md:text-34 font-urbanist font-bold">
                  Register A New Account For Free
                </h2>
              </div>

              <div className="space-y-4">
              <div>
                  <input
                       type="text"
                       id="username"
                       name="username"
                       placeholder={
                        signupFormik.touched.username && signupFormik.errors.username
                          ? signupFormik.errors.username
                          : "Your Full Name*"
                      }     
                      className={`w-full px-3 py-2 text-[14px] lg:text-14 border rounded-lg ${
                        signupFormik.touched.username && signupFormik.errors.username
                          ? "border-red-600 placeholder-red-500"
                          : "border-gray-300"
                      }`}
                      onChange={signupFormik.handleChange}
                      onBlur={signupFormik.handleBlur}
                      value={signupFormik.values.username}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={
                      signupFormik.touched.email && signupFormik.errors.email
                        ? signupFormik.errors.email
                        : "Your Email Address*"
                    }
                    className={`w-full px-3 py-2 text-[14px] lg:text-14 border rounded-lg ${
                      signupFormik.touched.email && signupFormik.errors.email
                        ? "border-red-600 placeholder-red-500"
                        : "border-gray-300"
                    }`}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.email}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={
                      signupFormik.touched.password && signupFormik.errors.password
                        ? signupFormik.errors.password
                        : "Password*"
                    }
                    className={`w-full px-3 py-2 text-[14px] sm:text-14 border rounded-lg ${
                      signupFormik.touched.password && signupFormik.errors.password
                        ? "border-red-600 placeholder-red-500"
                        : "border-gray-300"
                    }`}      
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.password}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder={
                      signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword
                        ? signupFormik.errors.confirmPassword
                        : "Confirm Password*"
                    }
                    className={`w-full px-3 py-2 text-[14px] lg:text-14 border rounded-lg ${
                      signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword
                        ? "border-red-600 placeholder-red-500"
                        : "border-gray-300"
                    }`}                  
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    value={signupFormik.values.confirmPassword}
                  />
                </div>
              </div>

              <div className="flex justify-start  md:items-center gap-x-1.5 sm:gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300 mt-1 md:mt-0 w-[14px] h-[14px] lg:w-[1vw] sm:h-[1vw]"
                  onChange={(e) => setIsTermsChecked(e.target.checked)}

                />
                <label htmlFor="terms" className="text-[14px] text-left lg:text-18 text-gray-600">
                  I Agree with the
                  <Link href="/terms-and-conditions" className="text-black font-semibold hover:underline">
                    Terms & Conditions
                  </Link>
                  <span className="text-gray-600 mx-1">and</span>
                  <Link href="/privacy-policy" className="text-black font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

             <button className={`w-full bg-red-100 text-red-600 font-medium text-[16px] lg:text-20 rounded-lg py-2.5 hover:bg-red-200 transition-colors ${!isTermsChecked || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={signupFormik.handleSubmit}
              disabled={!isTermsChecked || isLoading}
              >
              {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Register Now"}
              </button>

              <p className="text-center text-[16px] lg:text-18 text-gray-500">
                Already have an account?
                <a href="/login" className="text-red-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
