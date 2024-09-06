import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../header/Header/Header";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import { getToken } from "../../../utils/storageUtils";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useGetCarDealer from "../../../hooks/useGetCarDealer";
import CurrencyInput from "react-currency-input-field";
import { ClipLoader } from "react-spinners";
import { showToast } from "../../../utils/Toast";
import uploadCarValidation from "../../../utils/validations/upload-car-validation";
import { API_BASE_URL } from "../../../services/baseService";
import { FaTag } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import registerDealerValidations from "../../../utils/validations/register-dealer-validations";
import { RegionDropdown } from "react-country-region-selector";

const UploadVehicle = () => {
  const { dealerData, dealerLoading, dealerError } = useGetCarDealer(
    `car-dealer/get-car-dealer`
  );
  const [mainloading, setMainLoading] = useState(false);

  const { user } = useAuthContext();

  const option = useMemo(() => countryList().getData(), []);

  const [carErrors, setCarErrors] = useState({});
  const [dealerErrors, setDealerErrors] = useState({});

  const [submitLoading, setDealerLoading] = useState(true);

  const [userType, setUserType] = useState("dealer");
  const [selectedOption, setSelectedOption] = useState("Select sales range");
  const [transmission, setTransmission] = useState("Select transmission type");
  const [additionalFields, setAdditionalFields] = useState([""]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [showAdditionalAfterVinFields, setShowAdditionalAfterVinFields] =
    useState(false);

  // toggles
  const [carModificationStatus, setCarModificationStatus] = useState("stock");
  const [selectedOptions, setSelectedOptions] = useState({
    significantFlaws: false,
    isCarForSale: false,
    carTitledInfo: false,
    minPrice: false,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [transmissionIsOpen, setTransmissionIsOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const filesInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const options = ["Less than 10", "10-50", "50-100", "More than 100"];

  const transmissionOptions = ["Automatic", "Manual"];

  const titleStatusOptions = [
    { value: "status_1", label: "status_1" },
    { value: "status_2", label: "status_2" },
    { value: "status_3", label: "status_3" },
  ];
  // const titleStatusOptions = [
  //   { value: "stationary", label: "Stationary" },
  //   { value: "run&drive", label: "Run & Drive" },
  //   { value: "starts", label: "Starts" },
  // ];

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      padding: "2px 0px",
    }),
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption ? selectedOption.label : "");
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        carLocation: selectedOption ? selectedOption.label : "",
        carState: "", // Reset state when country changes
      },
    }));
  };
  const handleStateChange = (val) => {
    setRegion(val);
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        carState: val,
      },
    }));
  };

  const titlesStatusHandler = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        titlesStatus: selectedOption ? selectedOption.label : "",
      },
    }));
  };

  const [formData, setFormData] = useState({
    buyerFeeDetails: dealerData ? dealerData?.data?.buyerFeeDetails : "",
    dealershipName: dealerData?.data?.dealershipName || "",
    dealershipWebsite: dealerData?.data?.dealershipWebsite || "",
    vehicleSalesEachMonth: dealerData?.data?.vehicleSalesEachMonth || "",
    fullName: user?.username || "",
    phoneNumber: user?.phone || "",
    carDetails: {
      vin: "",
      year: "",
      make: "",
      model: "",
      transmission: "",
      mileage: "",
      description: "",
      modification: "",
      significantFlaws: "",
      zip: "",
      isCarForSale: [""],
      carTitledAt: "",
      carTitledInfo: "",
      referral: "",
      carLocation: "",
      carState: "",
    },

    dealershipLicense: null,
    carImages: [],
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      vehicleSalesEachMonth: option,
    }));
  };
  const handleTransmissionOptionClick = (option) => {
    setTransmission(option);
    setTransmissionIsOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        transmission: option,
      },
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCarDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        [name]: value,
      },
    }));
    if (name === "vin") {
      setShowAdditionalAfterVinFields(value.trim() !== "");
    }
  };
  const handleToggleChange = (property) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [property]: !prevOptions[property],
    }));
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        [property]: !selectedOptions[property]
          ? ""
          : prevData.carDetails[property],
      },
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      dealershipLicense: file,
    }));
    setImagePreview(URL.createObjectURL(file)); // Update image preview
  };
  const handleCancelImage = () => {
    setImagePreview(null);
    fileInputRef.current.value = "";
    setFormData((prevData) => ({
      ...prevData,
      dealershipLicense: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMainLoading(true); // Start loading

    const newErrors = uploadCarValidation(formData);
    const dealerFormErrors = registerDealerValidations(formData);
    // if (Object.keys(newErrors).length <= 4) {
    //   // Proceed with form submission
    //   console.log("Form submitted successfully", formData);
    // } else {
    //   setCarErrors(newErrors);
    //   showToast("please fill all field ");
    //   console.log("Form has errors", newErrors);
    // }

    const DealerDetails = new FormData();
    DealerDetails.append("buyerFeeDetails", formData.buyerFeeDetails);
    DealerDetails.append("dealershipName", formData.dealershipName);
    DealerDetails.append("dealershipWebsite", formData.dealershipWebsite);
    DealerDetails.append(
      "vehicleSalesEachMonth",
      formData.vehicleSalesEachMonth
    );
    DealerDetails.append("dealershipLicense", formData.dealershipLicense);

    //============================== 2nd data ================================
    const CarDetails = new FormData();
    CarDetails.append("vin", formData.carDetails.vin);
    CarDetails.append("year", formData.carDetails.year);
    CarDetails.append("make", formData.carDetails.make);
    CarDetails.append("model", formData.carDetails.model);
    CarDetails.append("transmission", formData.carDetails.transmission);
    CarDetails.append("mileage", formData.carDetails.mileage);
    CarDetails.append("description", formData.carDetails.description);
    CarDetails.append("modification", formData.carDetails.modification);
    CarDetails.append("significantFlaws", formData.carDetails.significantFlaws);
    CarDetails.append("carLocation", formData.carDetails.carLocation);
    CarDetails.append("carState", formData.carDetails.carState);
    CarDetails.append("zip", formData.carDetails.zip);
    CarDetails.append("carTitledAt", formData.carDetails.carTitledAt);
    CarDetails.append("carTitledInfo", formData.carDetails.carTitledInfo);
    CarDetails.append("titlesStatus", formData.carDetails.titlesStatus);
    CarDetails.append("minPrice", formData.carDetails.minPrice);
    CarDetails.append("referral", formData.carDetails.referral);

    // array fields
    formData.carDetails.isCarForSale.forEach((item, index) => {
      CarDetails.append(`isCarForSale[${index}]`, item);
    });
    formData.carImages.forEach((image, index) => {
      CarDetails.append(`carImages`, image);
    });

    // =====================================================================================
    if (userType === "dealer") {
      if (!dealerData) {
        if (
          Object.keys(newErrors).length === 0 &&
          Object.keys(dealerFormErrors).length === 0
        ) {
          console.log("tesra log");

          try {
            await Promise.all([
              axios.post(
                `${API_BASE_URL}car-dealer/register-car-dealer`,
                DealerDetails,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken()}`,
                  },
                }
              ),
              axios.post(`${API_BASE_URL}local-cars/upload-car`, CarDetails, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${getToken()}`,
                },
              }),
            ]);
          } catch (error) {
            if (error.response) {
              showToast(
                `Submission failed: ${
                  error.response.data.message || "An error occurred"
                }`,
                "error"
              );
            } else if (error.request) {
              // Request was made but no response received
              showToast("Submission failed: No response from server", "error");
            } else {
              showToast(`Submission failed: ${error.message}`, "error");
            }
          }
        } else {
          setCarErrors(newErrors);
          setDealerErrors(dealerFormErrors);
          showToast("please fill all field..");
        }
      } else {
        if (Object.keys(newErrors).length === 0) {
          try {
            await axios.post(
              `${API_BASE_URL}local-cars/upload-car`,
              CarDetails,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${getToken()}`,
                },
              }
            );
          } catch (error) {
            if (error.response) {
              showToast(
                `Submission failed: ${
                  error.response.data.message || "An error occurred"
                }`,
                "error"
              );
            } else if (error.request) {
              // Request was made but no response received
              showToast("Submission failed: No response from server", "error");
            } else {
              showToast(`Submission failed: ${error.message}`, "error");
            }
          }
        } else {
          // sjjs
          setCarErrors(newErrors);
          showToast("please fill all field ");
        }
      }
    } else if (userType === "private") {
      if (Object.keys(newErrors).length === 0) {
        // ============================= End Else ======================
        try {
          await axios.post(`${API_BASE_URL}local-cars/upload-car`, CarDetails, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
          });
          showToast("Vehicle uploaded", "success");
        } catch (error) {
          if (error.response) {
            showToast(
              `Submission failed: ${
                error.response.data.message || "An error occurred"
              }`,
              "error"
            );
          } else if (error.request) {
            // Request was made but no response received
            showToast("Submission failed: No response from server", "error");
          } else {
            showToast(`Submission failed: ${error.message}`, "error");
          }
        }
      } else {
        showToast("Please fill all required fields", "error");
      }
    }
    setMainLoading(false); // Start loading
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  const handleAddMoreFields = () => {
    setAdditionalFields((prevFields) => [...prevFields, ""]);
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        isCarForSale: [...prevData.carDetails.isCarForSale, ""],
      },
    }));
  };

  const handleAdditionalFieldChange = (index, e) => {
    const newFields = [...additionalFields];
    newFields[index] = e.target.value;
    setAdditionalFields(newFields);
    const newLinks = [...formData.carDetails.isCarForSale];
    newLinks[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        isCarForSale: newLinks,
      },
    }));
  };

  const carTiltledAtHandler = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        carTitledAt: selectedOption ? selectedOption.label : "",
      },
    }));
  };
  const handleMinPriceChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        minPrice: value,
      },
    }));
  };

  const handleUploadClicks = () => {
    filesInputRef.current.click();
  };

  const handleFileChanges = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prevData) => ({
      ...prevData,
      carImages: [...prevData.carImages, ...files],
    }));
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...newFiles.map((f) => f.preview),
    ]);
  };

  const handleCancelImages = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      carImages: prevData.carImages.filter((_, i) => i !== index),
    }));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    if (dealerData && user) {
      setFormData({
        ...formData,
        buyerFeeDetails: dealerData?.data?.buyerFeeDetails || "",
        dealershipName: dealerData?.data?.dealershipName || "",
        dealershipWebsite: dealerData?.data?.dealershipWebsite || "",
        vehicleSalesEachMonth: dealerData?.data?.vehicleSalesEachMonth || "",
        fullName: user?.username || "",
        phoneNumber: user?.phone || "",
        dealershipLicense: dealerData?.data?.dealershipLicense || null,
      });
    }
  }, [dealerData, user]);

  return (
    <div className="">
      <Header className="text-white" />
      <div className="bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white">Home</button>
            </Link>
            /<button className="hover:text-white">Vehicle Detail</button>
          </div>
        </div>
      </div>

      <div className="pt-44 md:w-[1200px] mx-auto md:bg-white">
        <form
          className=" flex flex-col mx-10 items-start gap-y-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[36px] font-bold">Your Info</h1>
          <h1 className="text-[20px] font-bold mt-2">
            Deliever or private party?
          </h1>

          <div className="grid grid-cols-3 space-x-4 w-full">
            <button
              type="button"
              className={` border rounded-lg py-2 text-[#8A8AA0] flex justify-center items-center gap-x-2 ${
                userType === "dealer"
                  ? "bg-[#EEECFF] text-[#CA0000] font-bold"
                  : ""
              }`}
              onClick={() => setUserType("dealer")}
            >
              <FaTag />
              Dealer
            </button>
            <button
              type="button"
              className={` border bg-[#F8F8F8] text-[#8A8AA0] rounded-lg py-2 flex justify-center items-center gap-x-2 ${
                userType === "private"
                  ? "bg-[#EEECFF] text-[#CA0000] font-bold"
                  : ""
              }`}
              onClick={() => setUserType("private")}
            >
              <HiUserGroup />
              Private Party
            </button>
          </div>

          {userType === "dealer" && (
            <>
              <div className="grid w-full">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold text-[20px]">
                    Are there any additional fees the buyer will have to pay?
                  </label>
                  <input
                    type="text"
                    name="buyerFeeDetails"
                    className={`${
                      dealerErrors.buyerFeeDetails
                        ? "border-[#CA0000]  placeholder-[#CA0000] "
                        : ""
                    } border w-full py-2 px-4 rounded-lg`}
                    placeholder={`${
                      dealerErrors.buyerFeeDetails
                        ? dealerErrors.buyerFeeDetails
                        : "Write here.."
                    } `}
                    disabled={dealerData?.data.buyerFeeDetails ? true : false}
                    value={formData.buyerFeeDetails}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 md:space-x-4 w-full">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold text-[20px]">
                    Dealership Name
                  </label>
                  <input
                    type="text"
                    name="dealershipName"
                    placeholder={`${
                      dealerErrors.dealershipName
                        ? dealerErrors.dealershipName
                        : "Write here.."
                    } `}
                    className={`${
                      dealerErrors.dealershipName
                        ? "border-[#CA0000]  placeholder-[#CA0000] "
                        : ""
                    } border w-full py-2 px-4 rounded-lg`}
                    disabled={dealerData?.data.dealershipName ? true : false}
                    value={formData.dealershipName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2 mt-4 md:mt-0">
                  <label className="font-bold text-[20px]">
                    Dealership Website
                  </label>
                  <input
                    type="text"
                    name="dealershipWebsite"
                    placeholder={`${
                      dealerErrors.dealershipWebsite
                        ? dealerErrors.dealershipWebsite
                        : "Write here.."
                    } `}
                    className={`${
                      dealerErrors.dealershipWebsite
                        ? "border-[#CA0000]  placeholder-[#CA0000] "
                        : ""
                    } border w-full py-2 px-4 rounded-lg`}
                    value={formData.dealershipWebsite}
                    disabled={dealerData?.data.dealershipWebsite ? true : false}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="text-left mb-1">
                  <label className="font-bold text-[20px]">
                    How many vehicles does your dealership retail each month?
                  </label>
                </div>
                <div className="grid md:grid-cols-3 md:space-x-4">
                  <div className="w-full ">
                    <div className="relative w-full ">
                      <button
                        disabled={
                          dealerData?.data.vehicleSalesEachMonth ? true : false
                        }
                        type="button"
                        className={`${
                          dealerErrors.dealershipWebsite
                            ? "border-[#CA0000]  "
                            : ""
                        } border py-2 px-4 w-full text-left rounded-lg`}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {dealerData?.data.vehicleSalesEachMonth
                          ? dealerData?.data.vehicleSalesEachMonth
                          : selectedOption}
                      </button>
                      {isOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                          {options.map((option) => (
                            <div
                              key={option}
                              className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                              onClick={() => handleOptionClick(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* ===============================  IMAGE  ========================================= */}

              <div className="flex flex-col items-start gap-y-4">
                <label className="font-bold text-[20px]">
                  Please upload a photo of your dealer license.
                </label>

                <h5 className="text-gray-500 text-left">
                  *This information will be kept private and only used for
                  verification. It will not be shown in the auction listing.
                </h5>
              </div>
              <div className="flex items-center justify-center w-full ">
                <label
                  htmlFor="dropzone-file"
                  className="flex items-center justify-between w-full py-8 px-6 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
                >
                  {formData.dealershipLicense || imagePreview ? (
                    <div className="flex justify-between w-full items-center">
                      <img
                        src={
                          formData.dealershipLicense === null ||
                          formData.dealershipLicense === ""
                            ? formData.dealershipLicense
                            : formData.dealershipLicense
                        }
                        alt="Uploaded preview"
                        style={{ width: "80px", height: "auto" }}
                      />
                      <button
                        type="button"
                        disabled={formData.dealershipLicense ? true : false}
                        onClick={handleCancelImage}
                        className="border rounded-full bg-red-200 font-bold text-[#CA0000] py-2 px-4 mt-2"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-500">
                        PNG, JPG, JPEG or WEBP. Max 200mb.
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    name="dealershipLicense"
                    type="file"
                    disabled={formData.dealershipLicense ? true : false}
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  {!imagePreview && !formData.dealershipLicense && (
                    <button
                      type="button"
                      disabled={formData.dealershipLicense ? true : false}
                      onClick={handleUploadClick}
                      className="border rounded-full bg-[#EEECFF] font-bold text-[#CA0000] py-2 px-4"
                    >
                      Upload file
                    </button>
                  )}
                </label>
              </div>
            </>
          )}
          {(userType === "private" || userType === "dealer") && (
            <div className="w-full">
              <div className="grid md:grid-cols-3 md:space-x-4">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold text-[20px]">Full Name</label>
                  <input
                    type="text"
                    disabled
                    name="fullName"
                    placeholder="Write here..."
                    className="border py-2 px-4 text-gray-500 w-full rounded-lg cursor-not-allowed"
                    value={formData.fullName}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2 mt-4 md:mt-0">
                  <label className="font-bold text-[20px]">
                    Contact Phone Number
                  </label>
                  <PhoneInput
                    disabled
                    country={"us"}
                    countryCodeEditable={false}
                    disableDropdown={true}
                    buttonStyle={{
                      background: "white",
                      borderRight: "0px",
                    }}
                    value={formData.phoneNumber}
                    containerClass=" mx-auto border-none  outline-none  m-0 "
                    inputStyle={{
                      width: "100%",
                      paddingTop: "10px",
                      color: "gray",
                      // backgroundColor: "red",
                      height: "40px",
                    }}
                    inputClass="bg-blue-400 text-black p-2 m-0 border-none rounded outline-none focus:outline-none "
                  />
                </div>
              </div>
            </div>
          )}

          {/* =================================== CAR Details ======================================== */}
          <div className="w-full flex flex-col gap-y-4">
            <h1 className="text-[36px] font-bold text-left mt-8 ">
              Car details
            </h1>

            {/* VIN  */}
            <div className="grid md:grid-cols-3 ">
              <div className="flex flex-col items-start gap-y-2 mt-6 w-full">
                <label className="font-bold text-[20px]">VIN</label>
                <input
                  type="text"
                  name="vin"
                  placeholder={`${
                    carErrors.vin ? carErrors.vin : "Write here.."
                  } `}
                  className={`border py-2 px-4 rounded-lg w-full ${
                    carErrors.vin
                      ? "placeholder-[#CA0000]  border-[#CA0000] "
                      : ""
                  }`}
                  value={formData.carDetails.vin}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>

            {showAdditionalAfterVinFields && (
              <>
                {/* Year, Make, Model */}
                <div className="grid md:grid-cols-3 md:space-x-4">
                  <div className="flex flex-col items-start gap-y-2">
                    <label className="font-bold text-[20px]">Year</label>
                    <input
                      type="text"
                      name="year"
                      placeholder={`${
                        carErrors.year ? carErrors.year : "Write here.."
                      } `}
                      className={`border py-2 px-4 rounded-lg w-full ${
                        carErrors.year
                          ? "placeholder-[#CA0000]  border-[#CA0000] "
                          : ""
                      }`}
                      value={formData.carDetails.year}
                      onChange={handleCarDetailsChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-y-2 mt-4 md:mt-0">
                    <label className="font-bold text-[20px]">Make</label>
                    <input
                      type="text"
                      name="make"
                      placeholder={`${
                        carErrors.make ? carErrors.make : "Write here.."
                      } `}
                      className={`border py-2 px-4 rounded-lg w-full ${
                        carErrors.make
                          ? "placeholder-[#CA0000]  border-[#CA0000] "
                          : ""
                      }`}
                      value={formData.carDetails.make}
                      onChange={handleCarDetailsChange}
                    />
                  </div>
                  <div className="flex flex-col items-start mt-4 md:mt-0 gap-y-2">
                    <label className="font-bold text-[20px]">Model</label>
                    <input
                      type="text"
                      name="model"
                      placeholder={`${
                        carErrors.model ? carErrors.model : "Write here.."
                      } `}
                      className={`border py-2 px-4 rounded-lg w-full ${
                        carErrors.model
                          ? "placeholder-[#CA0000]  border-[#CA0000] "
                          : ""
                      }`}
                      value={formData.carDetails.model}
                      onChange={handleCarDetailsChange}
                    />
                  </div>
                </div>

                {/* Transmissions, Mileage */}
                <div className="grid md:grid-cols-3 md:space-x-4">
                  <div className="flex flex-col items-start gap-y-2">
                    <label className="font-bold text-[20px]">
                      Transmission
                    </label>
                    <div className="relative w-full ">
                      <button
                        type="button"
                        className={`${
                          carErrors.transmission
                            ? "placeholder-[#CA0000]  border-[#CA0000]  text-[#CA0000] "
                            : "text-black"
                        }  border py-2 px-4 rounded-lg w-full  text-left`}
                        onClick={() =>
                          setTransmissionIsOpen(!transmissionIsOpen)
                        }
                      >
                        {transmission}
                      </button>
                      {transmissionIsOpen && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                          {transmissionOptions.map((option) => (
                            <div
                              key={option}
                              className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                              onClick={() =>
                                handleTransmissionOptionClick(option)
                              }
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-4 md:mt-0 gap-y-2">
                    <label className="font-bold text-[20px]">
                      Millage (miles)
                    </label>
                    <input
                      type="text"
                      name="mileage"
                      placeholder={`${
                        carErrors.mileage ? carErrors.mileage : "Write here.."
                      } `}
                      className={`border py-2 px-4 rounded-lg w-full ${
                        carErrors.mileage
                          ? "placeholder-[#CA0000]  border-[#CA0000] "
                          : ""
                      }`}
                      value={formData.carDetails.mileage}
                      onChange={handleCarDetailsChange}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Select option Equipment */}
            <div className="grid grid-cols-1 space-x-4">
              <div className="flex flex-col items-start gap-y-2 mt-2">
                <label className="font-bold text-[20px]">
                  Select option/equipment
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder={`${
                    carErrors.description
                      ? carErrors.description
                      : "For example: sport package, lon range battery, FSD or other important factory installed features"
                  } `}
                  className={`border py-8 px-4 rounded-lg w-full ${
                    carErrors.description
                      ? "placeholder-[#CA0000]  border-[#CA0000] "
                      : ""
                  }`}
                  value={formData.carDetails.description}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>
          </div>

          {/* toggle  --> Car Modification Status */}
          <div className="flex flex-col items-start w-full gap-4">
            <label className="font-bold text-[20px]">
              Has the car been modified?
            </label>
            <div className="flex flex-col items-start gap-y-2">
              <div className="flex justify-center items-center gap-x-4">
                <input
                  type="radio"
                  id="stock"
                  name="carModificationStatus"
                  class="radio radio-error"
                  checked={carModificationStatus === "stock"}
                  onChange={() => setCarModificationStatus("stock")}
                />
                <label htmlFor="stock">Completely Stock</label>
              </div>

              <div className="flex justify-center items-center gap-x-4">
                <input
                  type="radio"
                  id="modified"
                  name="carModificationStatus"
                  class="radio radio-error"
                  value="modified"
                  checked={carModificationStatus === "modified"}
                  onChange={() => setCarModificationStatus("modified")}
                />
                <label htmlFor="modified">Modified</label>
              </div>
            </div>
            {carModificationStatus === "modified" && (
              <div className="grid grid-cols-1 w-full">
                <div className="flex flex-col items-start justify-start gap-y-2 mt-2">
                  <label htmlFor="" className="font-bold text-left">
                    List any modifications, including modifications or removal
                    of catalytic converters
                  </label>
                  <textarea
                    name="modification"
                    className={` border w-full py-2 px-4 rounded-lg mt-2`}
                    placeholder="Describe the modifications..."
                    required={
                      carModificationStatus === "modified" ? true : false
                    }
                    rows={4}
                    value={formData.carDetails.modification}
                    onChange={handleCarDetailsChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* toggle  --> significant changes */}
          <div className="flex flex-col items-start gap-y-4">
            <label className="font-bold text-[20px] text-left">
              Are there any significant mechanical or cosmetic flaws that we
              should know about?
            </label>
            <div className="flex gap-x-3">
              <input
                type="checkbox"
                className={`toggle  ${
                  selectedOptions.significantFlaws
                    ? "[--tglbg:#CA0000] bg-white hover:bg-white"
                    : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                }`}
                checked={selectedOptions.significantFlaws}
                onChange={() => handleToggleChange("significantFlaws")}
              />
              {selectedOptions.significantFlaws ? "Yes" : "No"}
            </div>
          </div>

          {selectedOptions.significantFlaws && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col items-start ">
                <input
                  type="text"
                  name="significantFlaws"
                  placeholder={`Please give details... `}
                  className={`border py-6 px-4 rounded-lg w-full ${
                    carErrors.significantFlaws
                      ? "placeholder-[#CA0000]  border-[#CA0000] "
                      : ""
                  }`}
                  required={selectedOptions.significantFlaws ? true : false}
                  value={formData.carDetails.significantFlaws}
                  onChange={handleCarDetailsChange}
                  disabled={!selectedOptions.significantFlaws}
                />
              </div>
            </div>
          )}

          {/*dropdown --> Car located */}
          <div className="grid md:grid-cols-3  md:gap-x-4 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold text-[20px] text-left">
                Where is the car located?
              </label>
              <Select
                value={option.find(
                  (opt) => opt.label === formData.carDetails.carLocation
                )}
                options={option}
                styles={customStyles}
                onChange={handleCountryChange}
                className={`w-full border ${
                  carErrors.carLocation
                    ? "placeholder-[#CA0000]  border-[#CA0000] "
                    : "text-black"
                }`}
                placeholder="Select country"
              />
            </div>
            {country && (
              <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
                <label className="font-bold text-[20px] text-left">
                  Select Region
                </label>
                <RegionDropdown
                  country={country}
                  value={region}
                  onChange={handleStateChange}
                  className={`w-full h-full border-2 border-gray-300 rounded-sm ${
                    carErrors.carState
                      ? "placeholder-[#CA0000] border-[#CA0000]"
                      : "text-black"
                  }`}
                  placeholder="Select state"
                />
              </div>
            )}
          </div>

          {/* ZIPCODE  */}
          <div className="grid md:grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-6 w-full">
              <label className="font-bold text-[20px]">Zipcode</label>
              <input
                type="text"
                name="zip"
                placeholder={`${
                  carErrors.zip ? carErrors.zip : "Write here.."
                } `}
                className={`border py-2 px-4 rounded-lg w-full ${
                  carErrors.zip
                    ? "placeholder-[#CA0000]  border-[#CA0000] "
                    : ""
                }`}
                value={formData.carDetails.zip}
                onChange={handleCarDetailsChange}
              />
            </div>
          </div>

          {/* Toggle => Car for sale  |  add more +  */}
          <div className="grid md:grid-cols-3 w-full">
            <div className="flex flex-col gap-y-4 items-start">
              <label className="flex items-center text-left font-bold text-[20px]">
                Is the car for sale elsewhere?
              </label>
              <div className="flex gap-x-3">
                <input
                  type="checkbox"
                  className={`toggle  ${
                    selectedOptions.isCarForSale
                      ? "[--tglbg:#CA0000] bg-white hover:bg-white"
                      : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                  }`}
                  // checked={isCarForSaleElsewhere}
                  // onChange={() =>
                  //   setIsCarForSaleElsewhere(!isCarForSaleElsewhere)
                  // }
                  checked={selectedOptions.isCarForSale}
                  onChange={() => handleToggleChange("isCarForSale")}
                />
                {selectedOptions.isCarForSale ? "Yes" : "No"}
              </div>
            </div>
          </div>

          {selectedOptions.isCarForSale && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col items-start gap-y-2 w-full">
                <label className="text-gray-500 text-center">
                  *If we accept your car all other listings will be need to
                  taken down before it can be listed on our site.
                </label>
                <div className="flex flex-col items-start gap-y-2 mt-4 w-full">
                  {additionalFields.map((field, index) => (
                    <input
                      key={index}
                      type="text"
                      required={selectedOptions.isCarForSale}
                      value={field}
                      onChange={(e) => handleAdditionalFieldChange(index, e)}
                      className="border mb-2 py-2 px-4 w-full"
                      placeholder="Link here.."
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddMoreFields}
                    className="font-bold text-[#CA0000] "
                  >
                    Add More +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*=========================== TITLE INFO ===========================*/}
          <h1 className="text-3xl font-bold text-left mt-8 text-[36px]">
            Title Info
          </h1>

          {/*dropdown --> Car titled AT -  */}
          <div className="grid md:grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold text-[20px]">
                Where is the car titled?
              </label>
              <Select
                value={option.find(
                  (opt) => opt.label === formData.carDetails.carTitledAt
                )}
                options={option}
                styles={customStyles}
                onChange={carTiltledAtHandler}
                className="w-full"
                placeholder="Select country"
              />
            </div>
          </div>

          {/* Toggle => Vechicle titled info  */}
          <div className="grid md:grid-cols-3 w-full  ">
            <div className="flex flex-col gap-y-4">
              <label className="text-left font-bold text-[20px]">
                Is the vehicle titled in your name?
              </label>
              <div className="flex gap-x-3">
                <input
                  type="checkbox"
                  className={`toggle  ${
                    selectedOptions.carTitledInfo
                      ? "[--tglbg:#CA0000] bg-white hover:bg-white"
                      : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                  }`}
                  checked={selectedOptions.carTitledInfo}
                  onChange={() => handleToggleChange("carTitledInfo")}
                />
                {selectedOptions.carTitledInfo ? "Yes" : "No"}
              </div>
            </div>
          </div>
          {selectedOptions.carTitledInfo && (
            <p className="text-gray-500 text-left">
              if the vehicle is titled or registered in the name of another
              individual, a photo of the person's ID will be requested for
              furthor verification.
            </p>
          )}

          {selectedOptions.carTitledInfo && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col gap-y-4 items-start ">
                <label className="font-bold text-[20px] text-left">
                  Whose name is on the title? What's your relationship with
                  them?
                </label>
                <input
                  type="text"
                  name="carTitledInfo"
                  placeholder="Write here..."
                  required
                  className="border py-6 px-4 rounded-lg w-full"
                  value={formData.carDetails.carTitledInfo}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>
          )}

          {/*dropdown --> Car status */}
          <div className="grid md:grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold text-[20px] text-left">
                Where is the title's status?
              </label>
              <Select
                value={titleStatusOptions.find(
                  (opt) => opt.label === formData.carDetails.titlesStatus
                )}
                options={titleStatusOptions}
                styles={customStyles}
                onChange={titlesStatusHandler}
                className={`w-full border ${
                  carErrors.titlesStatus
                    ? "placeholder-[#CA0000]  border-[#CA0000] "
                    : "text-black"
                }`}
                placeholder="Select status"
              />
            </div>
          </div>

          {/*=========================== Reserve Price ===========================*/}
          <h1 className="text-3xl font-bold text-left mt-8 text-[36px]">
            Reserve Price
          </h1>

          {/* Toggle => Reserve price  */}
          <div className="grid grid-cols-1 w-full  ">
            <div className="flex flex-col gap-y-4">
              <label className="text-left font-bold text-[20px]">
                Do you want to set a minimum price required for your vehicle to
                sell?
              </label>
              <div className="flex gap-x-3">
                <input
                  type="checkbox"
                  className={`toggle  ${
                    selectedOptions.minPrice
                      ? "[--tglbg:#CA0000] bg-white hover:bg-white"
                      : "[--tglbg:white] bg-[#EEECFF] hover:bg-[#EEECFF]"
                  }`}
                  checked={selectedOptions.minPrice}
                  onChange={() => handleToggleChange("minPrice")}
                />
                {selectedOptions.minPrice ? "Yes" : "No"}
              </div>
            </div>
          </div>
          {selectedOptions.minPrice && (
            <div className="grid md:grid-cols-3 w-full">
              <div className="flex flex-col gap-y-4 items-start ">
                <label className="font-bold text-[20px] text-left">
                  What reserve price would you like?
                </label>
                <CurrencyInput
                  id="input-example"
                  name="minPrice"
                  // placeholder="Price in USD"
                  prefix="$"
                  className={`border py-2 px-4 rounded-lg w-full `}
                  defaultValue={0}
                  decimalsLimit={2}
                  required={selectedOptions.minPrice ? true : false}
                  value={formData.carDetails.minPrice}
                  onValueChange={(value) => handleMinPriceChange(value)}
                />
              </div>
            </div>
          )}

          {/*================================ mul images ============================ */}
          <h1 className="text-[36px] font-bold text-left mt-8">Photos</h1>

          <div className="flex flex-col items-start gap-y-4">
            <label className="font-bold text-[20px]">
              Please upload at least 6 photos of the exterior & interior of the
              car.
            </label>
            <h5 className="text-gray-500 text-left">
              *To learn more check our photo guide.
            </h5>
          </div>
          <div className="flex items-center justify-center w-full flex-wrap gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Uploaded preview ${index + 1}`}
                  style={{ width: "auto", height: "70px" }}
                />
                <button
                  type="button"
                  onClick={() => handleCancelImages(index)}
                  className="absolute text-xs top-0 right-0 border rounded-full bg-red-200 font-bold text-[#CA0000]  py-0.5 px-1.5 mt-2"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-files"
              className="flex items-center justify-between w-full py-8 px-6 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-500">
                  PNG, JPG, JPEG or WEBP. Max 200mb.
                </p>
              </div>
              <input
                id="dropzone-files"
                name="carImages"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChanges}
                ref={filesInputRef}
              />
              <button
                type="button"
                onClick={handleUploadClicks}
                className="border rounded-full bg-[#EEECFF] font-bold text-[#CA0000]  py-2 px-4"
              >
                Upload files
              </button>
            </label>
          </div>

          {/*===========================  Referral ===========================*/}
          <h1 className="text-[36px] font-bold text-left mt-8">Referral</h1>
          <div className="grid grid-cols-1 w-full">
            <div className="flex flex-col gap-y-4 items-start ">
              <label className="font-bold text-[20px] text-left">
                How did you hear about us? if a user referred us, please mention
                their username.
              </label>
              <input
                type="text"
                name="referral"
                placeholder={`${
                  carErrors.referral ? carErrors.referral : "Write here.."
                } `}
                className={`border py-2 px-4 rounded-lg w-full ${
                  carErrors.referral
                    ? "placeholder-[#CA0000]  border-[#CA0000] "
                    : ""
                }`}
                value={formData.carDetails.referral}
                onChange={handleCarDetailsChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#EEECFF] my-4 text-[15px] text-[#CA0000]  font-bold rounded-3xl p-2 mt-4 w-full"
          >
            {mainloading ? <ClipLoader /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVehicle;
