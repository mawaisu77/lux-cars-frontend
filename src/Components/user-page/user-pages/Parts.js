import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import usePartsRequest from "../../../hooks/usePartsRequest";
import { showToast } from "../../../utils/Toast";
import { useRef } from "react";
import ReactSelect from "react-select";
import { ClipLoader } from "react-spinners";

const SearchPartsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    company: "",
    yearMade: currentYear.toString(),
    model: "",
    variant: "",
    location: "",
    partsDetails: "",
  });
  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles].slice(0, 6);
      return updatedFiles;
    });
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      setFormData((prevData) => ({
        ...prevData,
        partsImages: updatedFiles.map((file) => file.file),
      }));
      return updatedFiles;
    });
  };

  const { addPartsRequest } = usePartsRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "partsImages") {
        newErrors[key] = "This field is required";
      }
    });

    if (uploadedFiles.length === 0) {
      newErrors.partsImages = "Please upload at least one image";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      scrollToError(newErrors);
    } else {
      try {
        setIsLoading(true);

        const formDataToSend = new FormData();

        formDataToSend.append("company", formData.company);
        formDataToSend.append("yearMade", formData.yearMade);
        formDataToSend.append("model", formData.model);
        formDataToSend.append("variant", formData.variant);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("partsDetails", formData.partsDetails);

        uploadedFiles.forEach((fileObj, index) => {
          formDataToSend.append("partsImages", fileObj.file);
        });

        const res = await addPartsRequest(formDataToSend);
        if (res.data.statusCode === 201) {
          showToast("Application Submitted Successfully", "success");
          setFormData({
            company: "",
            yearMade: currentYear.toString(),
            model: "",
            variant: "",
            location: "",
            partsDetails: "",
          });
          setErrors({});
          setUploadedFiles([]);
        } else showToast("Failed To Upload Request", "error");
      } catch (error) {
        showToast("Failed To Upload Request", "error");
      }
      finally {
        setIsLoading(false);
      }
    }
  };

  const scrollToError = (errors) => {
    const firstErrorField = Object.keys(errors)[0];
    const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex justify-center w-[100vw] items-center min-h-screen bg-white font-urbanist">
      <div className="w-[90%] lg:w-[85vw] mx-auto  lg:leading-[2.5vw]" >
        <h2 className=" text-left text-[24px] md:text-[36px] lg:text-[2.3vw] lg:text-left font-bold mt-6 lg:mt-[1.5vw] mb-4 lg:mb-[1vw]">
          Search Parts
        </h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="text-start bg-white rounded-lg lg:rounded-[0.5vw] mb-10 shadow-[0px_4px_5px_6px_rgba(0,_0,_0,_0.1)]  w-[100%] p-8 lg:p-[2vw] sm:p-10 space-y-8 lg:space-y-[2vw]"
        >
          <div className="w-full lg:w-[100%]">
            <label htmlFor="company" className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">
            Your Vehicle Make
            </label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Enter Make of you Car
            </span>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full lg:w-[100%] border border-gray-300 rounded-lg lg:rounded-[0.5vw] p-3 lg:px-[0.75vw] lg:py-[1.5vh]"
            />
            {errors.company && (
              <p className="text-red-500 text-sm lg:text-[0.875vw] mt-1 lg:mt-[0.5vw]">{errors.company}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">Your Vehicle Year</label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Select Year of you Car
            </span>
            <ReactSelect
             styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                padding: '0.313vw 0.208vw',
                '&:focus-within': {
                  boxShadow: '0 0 0 1px black',
                  borderColor: 'black',
                  borderRadius: '0.5vw',
                },
              }),
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                padding: '0 0.417vw',     
              }),
              option: (baseStyles) => ({
                ...baseStyles,
                padding: '0.625vw 0.833vw',  
              }),
            }}
              name="yearMade"
              value={{ value: formData.yearMade, label: formData.yearMade }}
              onChange={(selectedOption) => {
                handleInputChange({
                  target: {
                    name: 'yearMade',
                    value: selectedOption.value
                  }
                });
              }}
              options={Array.from({ length: 124 }, (_, i) => {
                const year = currentYear - i;
                return {
                  value: year.toString(),
                  label: year.toString()
                };
              })}
              className="w-full lg:text-[1vw]  "
              classNamePrefix="select"
              placeholder="Select Year"
            />
          </div>

          <div className="">
            <label htmlFor="model" className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">
            Your Vehicle Model
            </label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Enter Model of you Car
            </span>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full lg:w-[100%] border border-gray-300 rounded-lg lg:rounded-[0.5vw] p-3 lg:p-[0.75vw]"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">{errors.model}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="variant" className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">
              Variant
            </label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Enter Car Variant
            </span>
            <input
              id="variant"
              name="variant"
              type="text"
              value={formData.variant}
              onChange={handleInputChange}
              className="w-full lg:w-[100%] border border-gray-300 rounded-lg lg:rounded-[0.5vw] p-3 lg:p-[0.75vw]"
            />
            {errors.variant && (
              <p className="text-red-500 text-sm mt-1">{errors.variant}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="location" className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">
              Location
            </label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Zipcode
            </span>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full lg:w-[100%] border border-gray-300 rounded-lg lg:rounded-[0.5vw] p-3 lg:p-[0.75vw]"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div className="">
            <label
              htmlFor="partsDetails"
              className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold"
            >
              Part Description
            </label>
            <span className="text-sm lg:text-[0.875vw] mt-2 lg:mt-[0.5vw] font-medium text-[#1F1F2C]">
              Tell us about the part you are looking for
            </span>
            <input
              id="partsDetails"
              name="partsDetails"
              type="text"
              value={formData.partsDetails}
              onChange={handleInputChange}
              className="w-full lg:w-[100%] border border-gray-300 rounded-lg lg:rounded-[0.5vw] p-3 lg:p-[0.75vw]"
            />
            {errors.partsDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.partsDetails}</p>
            )}
          </div>

          <div className="">
            <label className="block text-xl lg:text-[1vw] mb-4  lg:mb-[1vw] font-bold">
              Order By Image (Up to 6 Images)
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center">
              <FiUploadCloud className="w-[18.34px] lg:w-[1vw] lg:h-[0.875vw] h-[15px] text-[#343444] mb-4" />
              <input
                type="file"
                onChange={handleImageUpload}
                className="hidden"
                id="partsImageUpload"
                accept="image/*"
                multiple
              />
              <label
                htmlFor="partsImageUpload"
                className="text-[#7A798A] cursor-pointer text-sm lg:text-[0.875vw]"
              >
                <span className="text-[#F33535] text-sm lg:text-[0.875vw]">Click to upload</span> or drag
                and drop
              </label>
              <p className="text-sm lg:text-[0.875vw] text-gray-500 mt-2 lg:mt-[0.5vw]">
                SVG, PNG, JPG or GIF max 800x400px
              </p>
            </div>
            <div className="mt-4 lg:mt-[1vw] space-y-4 lg:space-y-[1vw]">
              {uploadedFiles.map(({ name, size, preview }, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={preview}
                    alt={name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-sm text-gray-500 ml-2">({size})</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {errors.partsImages && (
              <p className="text-red-500 text-sm mt-1">{errors.partsImages}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full lg:w-[100%] bg-red-500 text-white rounded-lg lg:rounded-[0.5vw] py-2 lg:py-[1vw] text-xl lg:text-[1.25vw] font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : (
              "Submit"
              )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPartsForm;
