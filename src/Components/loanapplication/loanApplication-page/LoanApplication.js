import React, { useState, useEffect } from "react";
import Header from "../../header/index";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CurrencyInput from "react-currency-input-field";
import useLoanApplication from "../../../hooks/useAddLoanApplication";
import { showToast } from "../../../utils/Toast";

function LoanApplication() {
  const [formData, setFormData] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    yearAtAddress: "",
    monthsAtAddress: "",
    cellPhoneNumber: "",
    workPhoneNumber: "",
    monthlyPayment: "",
    residentType: "",
    vehicleInfo: "",
    employerName: "",
    employerPhone: "",
    occupation: "",
    yearsAtEmployer: "",
    monthlyIncome: "",
    bankName: "",
    accountType: "",
    financingAmount: "",
    downPayment: "",
    isTrade: false,
    isCoApplicant: false,
    bankForContact: [],
    timeforContact: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "bankForContact") {
      setFormData((prevState) => ({
        ...prevState,
        bankForContact: checked
          ? [...prevState.bankForContact, value]
          : prevState.bankForContact.filter((bank) => bank !== value),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handlePhoneInputChange = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCurrencyInputChange = (value, name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const { addLoanApplication } = useLoanApplication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Please select a title.";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.cellPhoneNumber) {
      newErrors.cellPhoneNumber = "Home phone number is required.";
    }

    if (!formData.workPhoneNumber) {
      newErrors.workPhoneNumber = "Work phone number is required.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!formData.yearAtAddress || isNaN(formData.yearAtAddress)) {
      newErrors.yearAtAddress =
        "Please enter a valid number of years at your address.";
    }

    if (!formData.monthsAtAddress || isNaN(formData.monthsAtAddress)) {
      newErrors.monthsAtAddress =
        "Please enter a valid number of months at your address.";
    }

    if (!formData.employerName.trim()) {
      newErrors.employerName = "Employer name is required.";
    }

    if (!formData.employerPhone.trim()) {
      newErrors.employerPhone = "Employer phone number is required.";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    }

    if (!formData.yearsAtEmployer || isNaN(formData.yearsAtEmployer)) {
      newErrors.yearsAtEmployer =
        "Please enter a valid number of years at your employer.";
    }

    if (!formData.monthlyIncome || isNaN(formData.monthlyIncome)) {
      newErrors.monthlyIncome = "Please enter a valid monthly income.";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "Bank name is required.";
    }

    if (!formData.accountType.trim()) {
      newErrors.accountType = "Account type is required.";
    }

    if (!formData.financingAmount || isNaN(formData.financingAmount)) {
      newErrors.financingAmount = "Please enter a valid financing amount.";
    }

    if (!formData.downPayment || isNaN(formData.downPayment)) {
      newErrors.downPayment = "Please enter a valid down payment.";
    }

    if (formData.bankForContact.length === 0) {
      newErrors.bankForContact = "Please select at least one bank for contact.";
    }

    if (!formData.timeforContact.trim()) {
      newErrors.timeforContact = "Please select a preferred time for contact.";
    }

    if (!formData.residentType.trim()) {
      newErrors.residentType = "Please select a resident type.";
    }

    if (!formData.monthlyPayment || isNaN(formData.monthlyPayment)) {
      newErrors.monthlyPayment = "Please enter a valid monthly payment.";
    }

    if (!formData.vehicleInfo.trim()) {
      newErrors.vehicleInfo = "Vehicle information is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to the first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    try {
      const res = await addLoanApplication(formData);
      if (res.data.statusCode === 201) {
        showToast("Application Submitted Successfully", "success");

        setFormData({
          title: "Mr",
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          city: "",
          yearAtAddress: "",
          monthsAtAddress: "",
          cellPhoneNumber: "",
          workPhoneNumber: "",
          monthlyPayment: "",
          residentType: "",
          vehicleInfo: "",
          employerName: "",
          employerPhone: "",
          occupation: "",
          yearsAtEmployer: "",
          monthlyIncome: "",
          bankName: "",
          accountType: "",
          financingAmount: "",
          downPayment: "",
          isTrade: false,
          isCoApplicant: false,
          bankForContact: [],
          timeforContact: "",
        });
      } else showToast("Error In Uploading Application", "error");
    } catch (error) {
      showToast("Error submitting application. Please try again.", "error");
    }
  };

  return (
    <>
      <div className="Backgroundimage-Privicy-loan-terms">
        <Header className="text-white" />
        <div className="hidden lg:block">
          <div className="w-[15.5] flex flex-col mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Loan Application
            </div>
            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
              <Link to="/">
                <button className="hover:text-white hover:text-[1.1vw]">Home</button>
              </Link>
              /<button className="hover:text-white hover:text-[1.1vw]">Loan</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90vw] md:w-[55vw] lg:w-[42.708vw] mx-auto rounded-[2.083vw] my-[7.813vh] boxShadow shadow">
        <div className="px-[14px] md:px-[3vw] lg:px-[3.8vw] py-[30px] md:py-[8.333vh] text-left">
          <div>
            <h1 className="text-center md:text-left text-[36px] md:text-[1.854vw] font-semibold text-[#1F1F2C] mb-[30px] md:mb-[5.208vh]">
              Personal Information
            </h1>
            <div>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1 className="text-[20px] md:text-[1.354vw] font-bold text-[#1F1F2C] mb-[30px] md:mb-[3.385vh]">
                    Title
                  </h1>

                  <div className="border mb-[3.12vh] bg-[#F8F8F8] h-[40px] md:h-[4.68vh] w-[70px] md:w-[4.5vw] flex items-center rounded-[0.313vw]">
                    <select
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="text-[12px] md:text-[.5vw] lg:text-[1.09vw] text-[#1F1F2C] w-[100%] mx-[10px] md:mx-[5px] outline-none font-[400] bg-transparent my-[10px]"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    {errors.title && (
                      <span className="text-red-500">{errors.title}</span>
                    )}
                  </div>

                  <div className="md:flex lg:flex md:gap-x-[1.042vw] flex-col md:flex-row items-end mb-[3.646vh]">
                    <div className="flex-1 flex flex-col">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Name*
                      </p>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      <label className="text-[#667085] font-[400] text-[14px] md:text-[1.02vw]">
                        First Name
                      </label>
                      {errors.firstName && (
                        <span className="text-red-500">{errors.firstName}</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col">
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      <label className="text-[#667085] font-[400] text-[14px] md:text-[1.02vw]">
                        Last Name
                      </label>
                      {errors.lastName && (
                        <span className="text-red-500">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.646vh]">
                    <div className="flex-1 flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Email*
                      </p>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] w-[100%] md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col w-[100%] md:w-[50%] pb-[5px]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Home Phone Number
                      </p>
                      <div className="rounded-[12px] w-[100%] md:w-[23.5vw] lg:w-[17vw]">
                        <PhoneInput
                          country={"us"}
                          value={formData.cellPhoneNumber}
                          onChange={(value) =>
                            handlePhoneInputChange(value, "cellPhoneNumber")
                          }
                          disableDropdown
                          onlyCountries={["us"]}
                          defaultCountry="US"
                          buttonStyle={{
                            background: "white",
                            borderRight: "0px",
                          }}
                          containerClass="mx-auto border-none outline-none p-0 m-0"
                          inputStyle={{ width: "100%", height: "4.68vh" }}
                          inputClass="bg-blue-400 text-black p-0 m-0 border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-grey-400"
                        />
                      </div>
                      {errors.cellPhoneNumber && (
                        <span className="text-red-500">
                          {errors.cellPhoneNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1 flex flex-col w-[100%]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Address*
                      </p>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] w-[100%] lg:w-[17vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      {errors.address && (
                        <span className="text-red-500">{errors.address}</span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1 flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Years At Address*
                      </p>
                      <input
                        name="yearAtAddress"
                        value={formData.yearAtAddress}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] w-[100%] md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      {errors.yearAtAddress && (
                        <span className="text-red-500">
                          {errors.yearAtAddress}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Months At Address*
                      </p>
                      <div className="flex justify-between items-center text-[.5vw] h-[35px] md:h-[4.68vh] md:w-[24vw] lg:w-[17vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          name="monthsAtAddress"
                          value={formData.monthsAtAddress}
                          onValueChange={(value) =>
                            handleCurrencyInputChange(value, "monthsAtAddress")
                          }
                          prefix="$"
                          className="w-[75%] text-[14px] md:text-[1vw] border-none outline-none"
                        />
                        <p className="text-[14px] md:text-[0.934vw] font-[400] text-[#8A8AA0] font-urbanist">
                          USD
                        </p>
                      </div>
                      {errors.monthsAtAddress && (
                        <span className="text-red-500">
                          {errors.monthsAtAddress}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                    <div className="flex-1 flex flex-col w-[100%] md:w-[40%]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        City*
                      </p>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] w-[100%] md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                      />
                      {errors.city && (
                        <span className="text-red-500">{errors.city}</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Work Phone Number
                      </p>
                      <div className="justify-between items-center text-[.5vw] flex h-[35px] md:h-[4.68vh] md:w-[24vw] lg:w-[17vw] border rounded-[8px] p-1">
                        <PhoneInput
                          country={"us"}
                          value={formData.workPhoneNumber}
                          onChange={(value) =>
                            handlePhoneInputChange(value, "workPhoneNumber")
                          }
                          onlyCountries={["us"]}
                          disableDropdown
                          buttonStyle={{
                            background: "white",
                            borderRight: "0px",
                          }}
                          containerClass="mx-auto border-none outline-none p-0 m-0"
                          inputStyle={{ width: "100%", height: "4.68vh" }}
                          inputClass="bg-blue-400 text-black p-0 m-0 border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {errors.workPhoneNumber && (
                        <span className="text-red-500">
                          {errors.workPhoneNumber}
                        </span>
                      )}
                    </div>
                  </div>

                  {/*HALF*/}
                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row mb-[1.25vh]">
                    <div className="flex-1 flex flex-col mb-[20px] md:mb-[1.56vh]">
                      <p className="text-[20px] md:text-[1.354vw] font-bold text-[#1F1F2C] font-urbanist mb-[20px] md:mb-[1.56vh]">
                        Residence Type
                      </p>
                      <div className="flex gap-[6px] md:gap-[0.313vw] items-center mb-[3.12vh]">
                        <input
                          type="radio"
                          name="residentType"
                          value="Own"
                          checked={formData.residentType === "Own"}
                          onChange={handleInputChange}
                          className="radio checked:bg-red-500"
                        />
                        <label
                          htmlFor="own"
                          className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                        >
                          Own
                        </label>
                      </div>

                      <div className="flex gap-[6px] md:gap-[0.313vw] items-center mb-[3.12vh]">
                        <input
                          type="radio"
                          name="residentType"
                          value="Rent"
                          checked={formData.residentType === "Rent"}
                          onChange={handleInputChange}
                          className="radio checked:bg-red-500"
                        />
                        <label
                          htmlFor="rent"
                          className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                        >
                          Rent
                        </label>
                      </div>
                      {errors.residentType && (
                        <span className="text-red-500">
                          {errors.residentType}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Monthly Paments
                      </p>

                      <div className="flex justify-between items-center md:text-[.5vw] h-[35px] md:h-[4.68vh] md:w-[24vw] lg:w-[17vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          name="monthlyPayment"
                          value={formData.monthlyPayment}
                          onValueChange={(value) =>
                            handleCurrencyInputChange(value, "monthlyPayment")
                          }
                          prefix="$"
                          className="w-[75%] text-[14px] md:text-[1vw] border-none outline-none"
                        />
                        <p className="text-[14px] md:text-[0.729vw] font-[400] text-[#8A8AA0] font-urbanist">
                          USD
                        </p>
                      </div>
                      {errors.monthlyPayment && (
                        <span className="text-red-500">
                          {errors.monthlyPayment}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[8px] md:mb-[1.25vh]">
                    <div className="flex-1/2 flex flex-col">
                      <p className="text-[14px] md:text-[1.354vw] font-bold text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                        Vehicle Information
                      </p>
                      <div className="flex gap-[6px] md:gap-[0.313vw] items-center mb-[3.12vh]">
                        <input
                          type="radio"
                          name="vehicleInfo"
                          value="New"
                          checked={formData.vehicleInfo === "New"}
                          onChange={handleInputChange}
                          className="radio checked:bg-red-500"
                        />
                        <label
                          htmlFor="new"
                          className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                        >
                          New
                        </label>
                      </div>
                      <div className="flex gap-[6px] md:gap-[0.313vw] items-center mb-[3.12vh]">
                        <input
                          type="radio"
                          name="vehicleInfo"
                          value="Pre-Owned"
                          checked={formData.vehicleInfo === "Pre-Owned"}
                          onChange={handleInputChange}
                          className="radio checked:bg-red-500"
                        />
                        <label
                          htmlFor="pre-owned"
                          className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                        >
                          Pre-Owned
                        </label>
                      </div>
                      {errors.vehicleInfo && (
                        <span className="text-red-500">
                          {errors.vehicleInfo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-[36px] md:text-[1.354vw] font-[700] text-[#1F1F2C] mb-[30px] md:mb-[5.208vh]">
                      Employment Information
                    </h1>

                    <div className="md:flex gap-x-[1.042vw] flex-col md:flex-row items-start mb-[3.12vh]">
                      <div className="flex-1 flex flex-col w-[100%] md:w-[40%]">
                        <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Employer Name*
                        </p>
                        <input
                          name="employerName"
                          value={formData.employerName}
                          onChange={handleInputChange}
                          className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] w-[100%] md:w-[24vw] lg:w-[17vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                        />
                        {errors.employerName && (
                          <span className="text-red-500">
                            {errors.employerName}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col mb-[1.25vh]">
                        <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Employer's Phone*
                        </p>
                        <div className="rounded-[12px] w-[100%] h-[30px] md:w-[23.5vw] lg:w-[17vw]">
                          <PhoneInput
                            country={"us"}
                            value={formData.employerPhone}
                            onChange={(value) =>
                              handlePhoneInputChange(value, "employerPhone")
                            }
                            onlyCountries={["us"]}
                            disableDropdown
                            buttonStyle={{
                              background: "white",
                              borderRight: "0px",
                            }}
                            containerClass="mx-auto border-none outline-none p-0 m-0"
                            inputStyle={{ width: "100%", height: "4.68vh" }}
                            inputClass="bg-blue-400 text-black p-0 m-0 border-none rounded outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        {errors.employerPhone && (
                          <span className="text-red-500">
                            {errors.employerPhone}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="md:flex lg:flex md:gap-x-[1.042vw] flex-col md:flex-row items-end mb-[3.12vh]">
                      <div className="flex-1 flex flex-col">
                        <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Occupation*
                        </p>
                        <input
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                          className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                        />
                        {errors.occupation && (
                          <span className="text-red-500">
                            {errors.occupation}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Years At Employer*
                        </p>
                        <input
                          name="yearsAtEmployer"
                          value={formData.yearsAtEmployer}
                          onChange={handleInputChange}
                          className="border border-[#EBEBEB] h-[30px] md:h-[4.68vh] md:w-[23.5vw] lg:w-[16.8vw] py-[10] px-[12px] rounded-[8px] outline-none mb-[6px]"
                        />
                        {errors.yearsAtEmployer && (
                          <span className="text-red-500">
                            {errors.yearsAtEmployer}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col mb-[1.25vh]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Gross Monthly Income (cash/tips/etc)*
                      </p>

                      <div className="flex justify-between items-center md:w-[24vw] lg:w-[16.8vw] h-[35px] text-[.5vw] md:h-[4.68vh] border rounded-[8px] p-1">
                        <CurrencyInput
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onValueChange={(value) =>
                            handleCurrencyInputChange(value, "monthlyIncome")
                          }
                          prefix="$"
                          className="w-[70%] text-[14px] md:text-[1vw] border-none outline-none"
                        />
                        <p className="text-[14px] md:text-[0.729vw] font-[400] text-[#8A8AA0] font-urbanist">
                          USD
                        </p>
                      </div>
                      {errors.monthlyIncome && (
                        <span className="text-red-500">
                          {errors.monthlyIncome}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <h1 className="text-[36px] md:text-[1.354vw] font-bold text-[#1F1F2C] mb-[30px] md:mb-[2.604vh] mt-[75px] md:mt-[3.906vh]">
                      Financial Information
                    </h1>

                    <div className="relative w-[100%] md:w-[16.8vw] xl:flex gap-x-[1.042vw] flex-col xl:flex-col items-start mb-[10px] md:mb-[1.25vh]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Name Of Bank*
                      </p>
                      <div className="mb-[10px] md:mb-[1.25vh] bg-[#F8F8F8] w-[100%] h-[30px] md:h-[4.68vh] md:w-[16.8vw] px-[10px] flex items-center rounded-[8px] md:rounded-[0.313vw]">
                        <select
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          className="text-[15px] text-[#1F1F2C] outline-none font-[400] bg-transparent rounded-[8px] w-[100%]"
                        >
                          <option value="Chase Bank">Chase Bank</option>
                          <option value="Wells Fargo Bank">
                            Wells Fargo Bank
                          </option>
                          <option value="Bank of America">
                            Bank of America
                          </option>
                          <option value="Citigroup">Citigroup</option>
                          <option value="PNC Bank">PNC Bank</option>
                        </select>
                      </div>
                      {errors.bankName && (
                        <span className="text-red-500">{errors.bankName}</span>
                      )}
                    </div>

                    <div className="w-[100%] md:w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="w-[100%] flex-1/2 flex flex-col pb-[5px]">
                        <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                          Account Type
                        </p>
                        <div className="flex flex-col gap-y-[8px]">
                          <div className="flex items-center gap-x-[8px]">
                            <input
                              type="radio"
                              id="checkingAccount"
                              name="accountType"
                              value="checkingAccount"
                              checked={
                                formData.accountType === "checkingAccount"
                              }
                              onChange={handleInputChange}
                              className="radio checked:bg-red-500"
                            />
                            <label
                              htmlFor="checkingAccount"
                              className="text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                            >
                              Checking Account
                            </label>
                          </div>
                          <div className="flex items-center gap-x-[8px]">
                            <input
                              type="radio"
                              id="savingsAccount"
                              name="accountType"
                              value="savingsAccount"
                              checked={
                                formData.accountType === "savingsAccount"
                              }
                              onChange={handleInputChange}
                              className="radio checked:bg-red-500"
                            />
                            <label
                              htmlFor="savingsAccount"
                              className="text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist"
                            >
                              Savings Account
                            </label>
                          </div>
                        </div>
                        {errors.accountType && (
                          <span className="text-red-500">
                            {errors.accountType}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col mb-[50px] md:mb-[2.604vh]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Estimated Financing Amount Needed
                      </p>

                      <div className="flex justify-between items-center md:w-[24vw] lg:w-[16.8vw] text-[.5vw] h-[35px] md:h-[4.68vh] border rounded-[8px] p-1">
                        <CurrencyInput
                          name="financingAmount"
                          value={formData.financingAmount}
                          onValueChange={(value) =>
                            handleCurrencyInputChange(value, "financingAmount")
                          }
                          prefix="$"
                          className="w-[75%] text-[14px] md:text-[1vw] border-none outline-none"
                        />
                        <p className="text-[14px] md:text-[0.729vw] font-[400] text-[#8A8AA0] font-urbanist">
                          USD
                        </p>
                      </div>
                      {errors.financingAmount && (
                        <span className="text-red-500">
                          {errors.financingAmount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col mb-[50px] md:mb-[2.604vh]">
                      <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist mb-[6px]">
                        Down Payment Amount
                      </p>

                      <div className="flex justify-between items-center text-[.5vw] h-[35px] md:h-[4.68vh] md:w-[24vw] lg:w-[16.8vw] border rounded-[8px] p-1">
                        <CurrencyInput
                          name="downPayment"
                          value={formData.downPayment}
                          onValueChange={(value) =>
                            handleCurrencyInputChange(value, "downPayment")
                          }
                          prefix="$"
                          className="w-[75%] text-[14px] md:text-[1vw] border-none outline-none"
                        />
                        <p className="text-[14px] md:text-[0.729vw] font-[400] text-[#8A8AA0] font-urbanist">
                          USD
                        </p>
                      </div>
                      {errors.downPayment && (
                        <span className="text-red-500">
                          {errors.downPayment}
                        </span>
                      )}
                    </div>

                    <div className="w-[100%] md:w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="w-[80%] flex-1/2 flex flex-col overflow-hidden pb-[5px]">
                        <div className="mb-[1.25vh] w-[100%] flex items-center rounded-[0.313vw]">
                          <div className="flex gap-x-[8px]">
                            <div>
                              <input
                                type="checkbox"
                                name="isTrade"
                                checked={formData.isTrade}
                                onChange={handleInputChange}
                                className="toggle border-white bg-white [--tglbg:red] hover:bg-white"
                              />
                            </div>
                            <div>
                              <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist">
                                Do You Have A Trade?
                              </p>
                              <p className="text-[14px] md:text-[1.02vw] font-[400] text-[#8A8AA0] font-urbanist">
                                No
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[100%] md:w-[300px] xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-start mb-[1.25vh]">
                      <div className="w-[100%] md:w-[80%] flex-1/2 flex flex-col pb-[5px]">
                        <div className="mb-[1.25vh] w-[100%] flex flex-start rounded-[0.313vw]">
                          <div className="flex gap-x-[8px]">
                            <div>
                              <input
                                type="checkbox"
                                name="isCoApplicant"
                                checked={formData.isCoApplicant}
                                onChange={handleInputChange}
                                className="toggle border-white bg-white [--tglbg:red] hover:bg-white"
                              />
                            </div>
                            <div>
                              <p className="text-[14px] md:text-[1.02vw] font-[600] text-[#1F1F2C] font-urbanist">
                                Do You Have A Co-Applicant?
                              </p>
                              <p className="text-[14px] md:text-[1.02vw] font-[400] text-[#8A8AA0] font-urbanist">
                                Yes
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                      <div className="flex-1/2 flex flex-col">
                        <p className="text-[20px] md:text-[1.354vw] font-[700] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                          Which bank do you want to contact you? (please check
                          all that apply)
                        </p>
                        {[
                          "Scotland",
                          "RBC Royal Bank",
                          "Commonwealth Bank",
                          "CIBC First Carribean Bank",
                        ].map((bank) => (
                          <div
                            key={bank}
                            className="flex gap-[6px] md:gap-[0.313vw] mb-[1.56vh] items-center"
                          >
                            <input
                              type="checkbox"
                              name="bankForContact"
                              value={bank}
                              checked={formData.bankForContact.includes(bank)}
                              onChange={handleInputChange}
                              className="checkbox checked:bg-red-500"
                            />
                            <label className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist">
                              {bank}
                            </label>
                          </div>
                        ))}
                        {errors.bankForContact && (
                          <span className="text-red-500">
                            {errors.bankForContact}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="xl:flex gap-x-[1.042vw] flex-col xl:flex-row items-end mb-[1.25vh]">
                      <div className="flex-1/2 flex flex-col">
                        <p className="text-[20px] md:text-[1.354vw] font-[700] text-[#1F1F2C] font-urbanist mb-[1.56vh]">
                          Best time to contact?
                        </p>

                        <div className="flex gap-[6px] md:gap-[0.313vw] mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            name="timeforContact"
                            value="Morning"
                            checked={formData.timeforContact === "Morning"}
                            onChange={handleInputChange}
                            className="radio checked:bg-red-500"
                          />
                          <label className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist">
                            Morning
                          </label>
                        </div>
                        <div className="flex gap-[6px] md:gap-[0.313vw] mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            name="timeforContact"
                            value="Afternoon"
                            checked={formData.timeforContact === "Afternoon"}
                            onChange={handleInputChange}
                            className="radio checked:bg-red-500"
                          />
                          <label className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist">
                            Afternoon
                          </label>
                        </div>
                        <div className="flex gap-[6px] md:gap-[0.313vw] mb-[1.56vh] items-center">
                          <input
                            type="radio"
                            name="timeforContact"
                            value="Evening"
                            checked={formData.timeforContact === "Evening"}
                            onChange={handleInputChange}
                            className="radio checked:bg-red-500"
                          />
                          <label className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist">
                            Evening
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] gap-[6px] md:gap-[0.313vw] items-center">
                          <input
                            type="radio"
                            name="timeforContact"
                            value="Anytime"
                            checked={formData.timeforContact === "Anytime"}
                            onChange={handleInputChange}
                            className="radio checked:bg-red-500"
                          />
                          <label className="ml-[2px] text-[14px] md:text-[1.02vw] font-[400] text-[#1F1F2C] font-urbanist">
                            Anytime
                          </label>
                        </div>
                        <div className="flex mb-[1.56vh] gap-[6px] md:gap-[0.313vw] items-center">
                          {errors.timeforContact && (
                            <span className="text-red-500">
                              {errors.timeforContact}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="text-[15px] md:text-[1.09vw] md:h-[6.24vh] h-[30px] w-[100%] font-[700] md:w-[49vw] lg:w-[33.6vw] text-[#CA0000] rounded-[56px] md:rounded-[4.09vw] bg-[#F3F3F6]"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoanApplication;
