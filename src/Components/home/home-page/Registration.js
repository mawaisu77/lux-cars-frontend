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
    <div className="bg-[#f8f8f8]">
      <div className="mx-auto sm:py-12 py-[2.083vw] max-w-[73.438vw] ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className=" flex flex-col gap-[1.25vw]">
            <div className="flex gap-2 text-24 ">
              <div className="text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left ">Affordable Prices</h3>
                <p className="text-gray-600 text-18 leading-relaxed text-left mt-[0.833vw]">
                  One of the main benefits of buying cars at auctions is the
                  potential for BIG savings. Cars at auctions can be purchased
                  for as little as 30-50% of their retail value. This makes it a
                  very profitable option compared to buying from a dealership,
                  where prices are often much higher
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left ">Wide Selection</h3>
                <p className="text-gray-600 text-18 leading-relaxed text-left mt-[0.833vw]">
                  We have more than 145,808 vehicles available, including cars
                  with minor damage or no damage at all. If you want to find
                  cars with minimal damage, look for those with descriptions
                  such as hail, theft recovery, vandalism, repossession,
                  rejected repair, minor dents and scratches, or replaced VIN.
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left ">
                  Easy bidding process
                </h3>
                <p className="text-gray-600 text-18 leading-relaxed text-left mt-[0.833vw]">
                  Our easy to use platform makes the bidding process
                  straightforward. Simply place your max bid during preliminary
                  bidding, and we’ll take care of the rest. We’ll only raise
                  your bid by one increment to keep you on top.
                </p>
              </div>
            </div>

            <div className="flex gap-2 text-24 ">
              <div className="text-24 pt-1">
                <IoIosCheckmarkCircleOutline />
              </div>
              <div className="">
                <h3 className="font-semibold text-left ">
                  Comprehensive Support
                </h3>
                <p className="text-gray-600 text-18 leading-relaxed text-left ">
                  From registration to final delivery, we offer comprehensive
                  support throughout the entire auction process. Our VIP car
                  bidding assistance ensures you have all the help you need to
                  make informed decisions and secure the best deals.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">
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
                      className={`w-full px-2.5 py-1.5 text-14 border rounded-lg ${
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
                    className={`w-full px-2.5 py-1.5 text-14 border rounded-lg ${
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
                    className={`w-full px-2.5 py-1.5 text-14 border rounded-lg ${
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
                    className={`w-full px-2.5 py-1.5 text-14 border rounded-lg ${
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

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300"
                  onChange={(e) => setIsTermsChecked(e.target.checked)}

                />
                <label htmlFor="terms" className="text-16 text-gray-600">
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

              <button className={`w-full bg-red-50 text-red-600 text-20 rounded-lg py-2.5 hover:bg-red-100 transition-colors ${!isTermsChecked || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={signupFormik.handleSubmit}
              disabled={!isTermsChecked || isLoading}
              >
              {isLoading ? <ClipLoader size={20} color={"#ca0000"} /> : "Register Now"}
              </button>

              <p className="text-center text-16 text-gray-500">
                Already have an account?{" "}
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
