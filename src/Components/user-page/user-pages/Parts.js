import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import usePartsRequest from "../../../hooks/usePartsRequest";
import { showToast } from "../../../utils/Toast";
import { useRef } from "react";

const SearchPartsForm = () => {
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
    <div className="flex justify-center items-center min-h-screen bg-white font-urbanist">
      <div className=" ">
        <h2 className="text-[36px] font-bold text-center mt-4 mb-4">
          Search Parts
        </h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="text-start bg-white rounded-lg shadow-lg w-full max-w-lg p-8 sm:p-10 md:p-16 lg:p-20 space-y-8"
        >
          <div className="">
            <label htmlFor="company" className="block text-xl mb-4 font-bold">
              Company
            </label>
            <span className="text-sm mt-2 font-bold text-[#1F1F2C]">
              Enter Company of you Car
            </span>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>
          <div className="space-y-4">
            <label className="block text-xl font-bold">Year Made</label>
            <select
              name="yearMade"
              value={formData.yearMade}
              onChange={handleInputChange}
              className="w-[50%] h-[40px] text-sm bg-[#F8F8F8] rounded-lg p-3"
            >
              {Array.from({ length: 124 }, (_, i) => currentYear - i).map(
                (year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="">
            <label htmlFor="model" className="block text-xl mb-4 font-bold">
              Model
            </label>
            <span className="text-sm mt-2 font-bold text-[#1F1F2C]">
              Enter Model of you Car
            </span>
            <input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">{errors.model}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="variant" className="block text-xl mb-4 font-bold">
              Variant
            </label>
            <span className="text-sm font-bold mt-2 text-[#1F1F2C]">
              Enter Car Variant
            </span>
            <input
              id="variant"
              name="variant"
              type="text"
              value={formData.variant}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.variant && (
              <p className="text-red-500 text-sm mt-1">{errors.variant}</p>
            )}
          </div>

          <div className="">
            <label htmlFor="location" className="block text-xl mb-4 font-bold">
              Location
            </label>
            <span className="text-sm mt-2 font-bold text-[#1F1F2C]">
              Zipcode
            </span>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <div className="">
            <label
              htmlFor="partsDetails"
              className="block text-xl mb-4 font-bold"
            >
              Part Description
            </label>
            <span className="text-sm font-bold mt-2 text-[#1F1F2C]">
              Tell us about the part you are looking for
            </span>
            <input
              id="partsDetails"
              name="partsDetails"
              type="text"
              value={formData.partsDetails}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
            {errors.partsDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.partsDetails}</p>
            )}
          </div>

          <div className="">
            <label className="block text-xl mb-4 font-bold">
              Order By Image (Up to 6 Images)
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex flex-col items-center">
              <FiUploadCloud className="w-[18.34px] h-[15px] text-[#343444] mb-4" />
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
                className="text-[#7A798A] cursor-pointer"
              >
                <span className="text-[#F33535]">Click to upload</span> or drag
                and drop
              </label>
              <p className="text-sm text-gray-500 mt-2">
                SVG, PNG, JPG or GIF max 800x400px
              </p>
            </div>
            <div className="mt-4 space-y-4">
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
            className="w-full bg-red-500 text-white rounded-lg py-4 text-xl font-medium"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPartsForm;
