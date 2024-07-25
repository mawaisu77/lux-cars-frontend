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
import { toast } from "react-toastify";
import { showToast } from "../../../utils/Toast";

const UploadVehicle = () => {
  const { dealerData, dealerLoading, dealerError } = useGetCarDealer(
    `car-dealer/get-car-dealer`
  );

  const { user } = useAuthContext();
  const option = useMemo(() => countryList().getData(), []);

  const [userType, setUserType] = useState("dealer");
  const [selectedOption, setSelectedOption] = useState("Select sales range");
  const [transmission, setTransmission] = useState("transmission type");
  const [additionalFields, setAdditionalFields] = useState([]);

  // toggles
  const [carModificationStatus, setCarModificationStatus] = useState("stock");
  const [selectedOptions, setSelectedOptions] = useState({
    significantFlaws: false,
    isCarForSale: false,
    carTitledInfo: false,
    minPrice: false,
  });

  const changeHandler = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      carDetails: {
        ...prevData.carDetails,
        carLocation: selectedOption ? selectedOption.label : "",
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

  const [isOpen, setIsOpen] = useState(false);
  const [transmissionIsOpen, setTransmissionIsOpen] = useState(false);

  const options = ["1-10", "11-50", "51-100", "101-200", "201+"];

  const transmissionOptions = [
    "transmission_1",
    "transmission_2",
    "transmission_3",
    "transmission_4",
    "transmission_5",
  ];

  const titleStatusOptions = [
    { value: "status_1", label: "status_1" },
    { value: "status_2", label: "status_2" },
    { value: "status_3", label: "status_3" },
  ];

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const filesInputRef = useRef(null);
  const [imagePreviews, setImagePreviews] = useState([]);

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
      isCarForSale: [],
      carTitledAt: "",
      carTitledInfo: "",
      referral: "",
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
    console.log("formdtaa", formData);
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
      CarDetails.append(
        "significantFlaws",
        formData.carDetails.significantFlaws
      );
      CarDetails.append("carLocation", formData.carDetails.carLocation);
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

      try {
        if (!dealerData) {
          console.log("please...")
          // If dealer data is available, call both APIs
          await Promise.all([
            axios.post(
              "http://localhost:8000/api/v1/car-dealer/register-car-dealer",
              DealerDetails,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${getToken()}`
                },
              }
            ),
            axios.post(
              "http://localhost:8000/api/v1/local-cars/upload-car",
              CarDetails,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${getToken()}`
                },
              }
            ),
          ]);
        } else {
          console.log(" =============  else  ==================")
          // Call the second API
          await axios.post(
            "http://localhost:8000/api/v1/local-cars/upload-car",
            CarDetails,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
              },
            }
          );
        }
      } catch (error) {
        console.log(error)
        showToast("submission failed....")
      }

      // const response = await axios.post(
      //   "http://localhost:8000/api/v1/car-dealer/register-car-dealer",
      //   DealerDetails,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${getToken()}`,
      //     },
      //   }
      // );
      // console.log("success response", response);
    
    // Perform form submission (e.g., send data to an API)
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

  const customStyles = {
    control: (defaultStyles) => ({
      ...defaultStyles,
      padding: "2px 0px",
    }),
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
      console.log("first", dealerData);

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
    <div>
      <div className="back-image ">
        <Header className="text-white" />
        <div className="hidden   lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] font-semibold text-white">
              Upload Your Vehicle
            </div>

            <div className="text-[#8a8aa0] flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                <button className="hover:text-white  ">Home</button>
              </Link>
              /<button className="hover:text-white">Sell A car</button>/
              <button className="hover:text-white">Upload Vehicle</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" w-[1400px] mx-auto  ">
        <form
          className=" flex flex-col items-start ml-10 gap-y-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold">Your Info</h1>

          <div className="flex justify-between gap-x-4">
            <button
              type="button"
              className={`w-[350px] border rounded-lg py-2 ${
                userType === "dealer"
                  ? "bg-gray-200 text-red-600 font-bold"
                  : ""
              }`}
              onClick={() => setUserType("dealer")}
            >
              Dealer
            </button>
            <button
              type="button"
              className={`w-[350px] border rounded-lg py-2 ${
                userType === "private"
                  ? "bg-gray-200 text-red-600 font-bold"
                  : ""
              }`}
              onClick={() => setUserType("private")}
            >
              Private
            </button>
          </div>

          {userType === "dealer" && (
            <>
              <div className="grid w-full">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">
                    Are there any additional fees the buyer will have to pay?
                  </label>
                  <input
                    type="text"
                    name="buyerFeeDetails"
                    className={`${
                      formData.buyerFeeDetails
                        ? "cursor-not-allowed text-gray-500"
                        : ""
                    } border w-full py-2 px-4 rounded-lg`}
                    placeholder="Write here..."
                    disabled={dealerData?.data.buyerFeeDetails ? true : false}
                    value={formData.buyerFeeDetails}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 space-x-4 w-full">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Dealership Name</label>
                  <input
                    type="text"
                    name="dealershipName"
                    placeholder="Write here..."
                    className={`${
                      formData.dealershipName
                        ? "cursor-not-allowed text-gray-500"
                        : ""
                    } border w-full py-2 px-4 rounded-lg`}
                    disabled={dealerData?.data.dealershipName ? true : false}
                    value={formData.dealershipName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Dealership Website</label>
                  <input
                    type="text"
                    name="dealershipWebsite"
                    placeholder="Write here..."
                    className={`${
                      formData.dealershipWebsite
                        ? "cursor-not-allowed text-gray-500"
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
                  <label className="font-bold">
                    How many vehicles does your dealership retail each month?
                  </label>
                </div>
                <div className="grid grid-cols-3 space-x-4">
                  <div className="w-full ">
                    <div className="relative w-full ">
                      <button
                        disabled={
                          dealerData?.data.vehicleSalesEachMonth ? true : false
                        }
                        type="button"
                        className="border py-2 px-4 w-full text-left rounded-lg"
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
            </>
          )}
          {(userType === "private" || userType === "dealer") && (
            <div className="w-full">
              <div className="grid grid-cols-3 space-x-4">
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Full Name</label>
                  <input
                    type="text"
                    disabled
                    name="fullName"
                    placeholder="Write here..."
                    className="border py-2 px-4 text-gray-500 w-full rounded-lg cursor-not-allowed"
                    value={formData.fullName}
                  />
                </div>
                <div className="flex flex-col items-start gap-y-2">
                  <label className="font-bold">Contact Phone Number</label>
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

          {/* ===============================  IMAGE  ========================================= */}

          <div className="flex flex-col items-start gap-y-4">
            <label className="font-bold">
              Please upload a photo of your dealer license.
            </label>

            <h5 className="text-gray-500">
              *This information will be kept private and only used for
              verification. It will not be shown in the auction listing.
            </h5>
          </div>
          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              className="flex items-center justify-between w-full py-8 px-6 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {formData.dealershipLicense || imagePreview ? (
                <div className="flex justify-between w-full items-center">
                  <img
                    src={
                      formData.dealershipLicense
                        ? formData.dealershipLicense
                        : imagePreview
                    }
                    alt="Uploaded preview"
                    style={{ width: "180px", height: "auto" }}
                  />
                  <button
                    type="button"
                    disabled={formData.dealershipLicense ? true : false}
                    onClick={handleCancelImage}
                    className="border rounded-full bg-red-200 font-bold text-red-600 py-2 px-4 mt-2"
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
                  className="border rounded-full bg-gray-200 font-bold text-red-600 py-2 px-4"
                >
                  Upload file
                </button>
              )}
            </label>
          </div>

          {/* =================================== CAR Details ======================================== */}
          <div className="w-full flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-left mt-8">Car details</h1>

            {/* VIN  */}
            <div className="grid grid-cols-3 ">
              <div className="flex flex-col items-start gap-y-2 mt-6 w-full">
                <label className="font-bold">VIN</label>
                <input
                  type="text"
                  name="vin"
                  placeholder="Write here..."
                  className="border py-2 px-4 rounded-lg w-full"
                  value={formData.carDetails.vin}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>

            {/* Year, Make, Model */}
            <div className="grid grid-cols-3 space-x-4">
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">Year</label>
                <input
                  type="text"
                  name="year"
                  placeholder="Write here..."
                  className="border py-2 px-4 rounded-lg w-full"
                  value={formData.carDetails.year}
                  onChange={handleCarDetailsChange}
                />
              </div>
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">Make</label>
                <input
                  type="text"
                  name="make"
                  placeholder="Write here..."
                  className="border py-2 px-4 rounded-lg w-full"
                  value={formData.carDetails.make}
                  onChange={handleCarDetailsChange}
                />
              </div>
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">Model</label>
                <input
                  type="text"
                  name="model"
                  placeholder="Write here..."
                  className="border py-2 px-4 rounded-lg w-full"
                  value={formData.carDetails.model}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>

            {/* Transmissions, Mileage */}
            <div className="grid grid-cols-3 space-x-4">
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">Transmission</label>
                <div className="relative w-full ">
                  <button
                    type="button"
                    className="border py-2 px-4 rounded-lg w-full text-left"
                    onClick={() => setTransmissionIsOpen(!transmissionIsOpen)}
                  >
                    {transmission}
                  </button>
                  {transmissionIsOpen && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
                      {transmissionOptions.map((option) => (
                        <div
                          key={option}
                          className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                          onClick={() => handleTransmissionOptionClick(option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start gap-y-2">
                <label className="font-bold">Millage (miles)</label>
                <input
                  type="text"
                  name="mileage"
                  placeholder="Write here..."
                  className="border py-2 px-4 rounded-lg w-full"
                  value={formData.carDetails.mileage}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>

            {/* Select option Equipment */}
            <div className="grid grid-cols-1 space-x-4">
              <div className="flex flex-col items-start gap-y-2 mt-2">
                <label className="font-bold">Select option/equipment</label>
                <input
                  type="text"
                  name="description"
                  placeholder="For example: sport package, lon range battery, FSD or other important factory installed features."
                  className="border py-8 px-4 rounded-lg w-full"
                  value={formData.carDetails.description}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>
          </div>

          {/* toggle  --> Car Modification Status */}
          <div className="flex flex-col items-start w-full gap-4">
            <label className="font-bold">Has the car been modified?</label>
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
                    className="border w-full py-2 px-4 rounded-lg mt-2"
                    placeholder="Describe the modifications..."
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
            <label className="font-bold">
              Are there any significant mechanical or cosmetic flaws that we
              should know about?
            </label>
            <input
              type="checkbox"
              className={`toggle  ${
                selectedOptions.significantFlaws
                  ? "[--tglbg:red] bg-white hover:bg-white"
                  : "[--tglbg:white] bg-gray-400 hover:bg-gray-400"
              }`}
              checked={selectedOptions.significantFlaws}
              onChange={() => handleToggleChange("significantFlaws")}
            />
          </div>

          {selectedOptions.significantFlaws && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col items-start ">
                <input
                  type="text"
                  name="significantFlaws"
                  placeholder="Please give details..."
                  className="border py-6 px-4 rounded-lg w-full"
                  value={formData.carDetails.significantFlaws}
                  onChange={handleCarDetailsChange}
                  disabled={!selectedOptions.significantFlaws}
                />
              </div>
            </div>
          )}

          {/*dropdown --> Car located */}
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold">Where is the car located?</label>
              <Select
                value={option.find(
                  (opt) => opt.label === formData.carDetails.carLocation
                )}
                options={option}
                styles={customStyles}
                onChange={changeHandler}
                className="w-full"
                placeholder="Select country"
              />
            </div>
          </div>

          {/* ZIPCODE  */}
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-6 w-full">
              <label className="font-bold">Zipcode</label>
              <input
                type="text"
                name="zip"
                placeholder="Write here..."
                className="border py-2 px-4 rounded-lg w-full"
                value={formData.carDetails.zip}
                onChange={handleCarDetailsChange}
              />
            </div>
          </div>

          {/* Toggle => Car for sale  |  add more +  */}
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-start">
              <label className="flex items-center font-bold">
                Is the car for sale elsewhere?
              </label>
              <input
                type="checkbox"
                className={`toggle  ${
                  selectedOptions.isCarForSale
                    ? "[--tglbg:red] bg-white hover:bg-white"
                    : "[--tglbg:white] bg-gray-400 hover:bg-gray-400"
                }`}
                // checked={isCarForSaleElsewhere}
                // onChange={() =>
                //   setIsCarForSaleElsewhere(!isCarForSaleElsewhere)
                // }
                checked={selectedOptions.isCarForSale}
                onChange={() => handleToggleChange("isCarForSale")}
              />
            </div>
          </div>

          {selectedOptions.isCarForSale && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col items-start gap-y-2 w-full">
                <label className="text-gray-500">
                  *If we accept your car all other listings will be need to
                  taken down before it can be listed on our site.
                </label>
                {/* <input type="text" className="border py-2 px-4 w-full" /> */}
                <div className="flex flex-col items-start gap-y-2 mt-4 w-full">
                  {additionalFields.map((field, index) => (
                    <input
                      key={index}
                      type="text"
                      value={field}
                      onChange={(e) => handleAdditionalFieldChange(index, e)}
                      className="border mb-2 py-2 px-4 w-full"
                      placeholder="Link here.."
                    />
                  ))}
                  <button
                    type="button"
                    onClick={handleAddMoreFields}
                    className="font-bold text-red-600"
                  >
                    Add More +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/*=========================== TITLE INFO ===========================*/}
          <h1 className="text-3xl font-bold text-left mt-8">Title Info</h1>

          {/*dropdown --> Car titled AT -  */}
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold">Where is the car titled?</label>
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
          <div className="grid grid-cols-3 w-full  ">
            <div className="flex flex-col gap-y-4">
              <label className="text-left font-bold">
                Is the vehicle titled in your name?
              </label>
              <input
                type="checkbox"
                className={`toggle  ${
                  selectedOptions.carTitledInfo
                    ? "[--tglbg:red] bg-white hover:bg-white"
                    : "[--tglbg:white] bg-gray-400 hover:bg-gray-400"
                }`}
                checked={selectedOptions.carTitledInfo}
                onChange={() => handleToggleChange("carTitledInfo")}
              />
            </div>
          </div>
          {!selectedOptions.carTitledInfo && (
            <p className="text-gray-500">
              if the vehicle is titled or registered in the name of another
              individual, a photo of the person's ID will be requested for
              furthor verification.
            </p>
          )}

          {!selectedOptions.carTitledInfo && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col gap-y-4 items-start ">
                <label className="font-bold">
                  Whose name is on the title? What's your relationship with
                  them?
                </label>
                <input
                  type="text"
                  name="carTitledInfo"
                  placeholder="Write here..."
                  className="border py-6 px-4 rounded-lg w-full"
                  value={formData.carDetails.carTitledInfo}
                  onChange={handleCarDetailsChange}
                />
              </div>
            </div>
          )}

          {/*dropdown --> Car status */}
          <div className="grid grid-cols-3 w-full">
            <div className="flex flex-col items-start gap-y-2 mt-2 w-full">
              <label className="font-bold">Where is the title's status?</label>
              <Select
                value={titleStatusOptions.find(
                  (opt) => opt.label === formData.carDetails.titlesStatus
                )}
                options={titleStatusOptions}
                styles={customStyles}
                onChange={titlesStatusHandler}
                className="w-full"
                placeholder="Select country"
              />
            </div>
          </div>

          {/*=========================== Reserve Price ===========================*/}
          <h1 className="text-3xl font-bold text-left mt-8">Reserve Price</h1>

          {/* Toggle => Reserve price  */}
          <div className="grid grid-cols-2 w-full  ">
            <div className="flex flex-col gap-y-4">
              <label className="text-left font-bold">
                Do you want to set a minimum price required for your vehicle to
                sell?
              </label>
              <input
                type="checkbox"
                className={`toggle  ${
                  selectedOptions.minPrice
                    ? "[--tglbg:red] bg-white hover:bg-white"
                    : "[--tglbg:white] bg-gray-400 hover:bg-gray-400"
                }`}
                checked={selectedOptions.minPrice}
                onChange={() => handleToggleChange("minPrice")}
              />
            </div>
          </div>
          {selectedOptions.minPrice && (
            <div className="grid grid-cols-1 w-full">
              <div className="flex flex-col gap-y-4 items-start ">
                <label className="font-bold">
                  What reserve price would you like?
                </label>
                <CurrencyInput
                  id="input-example"
                  name="minPrice"
                  // placeholder="Price in USD"
                  prefix="$"
                  className="w-full py-2 px-4 border rounded-lg"
                  defaultValue={0}
                  decimalsLimit={2}
                  value={formData.carDetails.minPrice}
                  onValueChange={(value) => handleMinPriceChange(value)}
                />
              </div>
            </div>
          )}

          {/*================================ mul images ============================ */}
          <h1 className="text-3xl font-bold text-left mt-8">Photos</h1>

          <div className="flex flex-col items-start gap-y-4">
            <label className="font-bold">
              Please upload photos of your dealer license.
            </label>
            <h5 className="text-gray-500">
              *This information will be kept private and only used for
              verification. It will not be shown in the auction listing.
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
                  className="absolute text-xs top-0 right-0 border rounded-full bg-red-200 font-bold text-red-600 py-0.5 px-1.5 mt-2"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-files"
              className="flex items-center justify-between w-full py-8 px-6 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                className="border rounded-full bg-gray-200 font-bold text-red-600 py-2 px-4"
              >
                Upload files
              </button>
            </label>
          </div>

          {/*===========================  Referral ===========================*/}
          <h1 className="text-3xl font-bold text-left mt-8">Referral</h1>
          <div className="grid grid-cols-1 w-full">
            <div className="flex flex-col gap-y-4 items-start ">
              <label className="font-bold">
                How did you hear about us? if a user referred us, please mention
                their username.
              </label>
              <input
                type="text"
                name="referral"
                placeholder="Write here..."
                className="border py-2 px-4 rounded-lg w-full"
                value={formData.carDetails.referral}
                onChange={handleCarDetailsChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gray-300 text-red-600 font-bold rounded-3xl p-2 mt-4 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVehicle;
