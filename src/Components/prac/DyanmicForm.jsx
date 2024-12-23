import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Country, State } from "country-state-city";

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);

  const countryOptions = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      setStateOptions(
        states.map((state) => ({ label: state.name, value: state.isoCode }))
      );
    } else {
      setStateOptions([]);
    }
  }, [selectedCountry]);

  // State toggles for enabling/disabling fields
  const [toggles, setToggles] = useState({
    enableForSale: false,
    enableDiscount: false,
    enableStockCount: false,
    enableWarranty: false,
  });

  const handleToggleChange = (field) => {
    setToggles({ ...toggles, [field]: !toggles[field] });
  };

  // Configuration for form fields
  const formFields = [
    {
      type: "checkbox",
      label: "Subscribe to Newsletter",
      name: "newsletter",
      validation: {},
    },
    {
      type: "dropdown",
      label: "Select Country",
      name: "country",
      options: [
        { label: "United States", value: "US" },
        { label: "Canada", value: "CA" },
        { label: "Australia", value: "AU" },
      ],
      validation: { required: "Country is required" },
    },
    {
      type: "multiselect",
      label: "Select Skills",
      name: "skills",
      options: [
        { label: "JavaScript", value: "javascript" },
        { label: "React", value: "react" },
        { label: "Node.js", value: "node" },
      ],
      validation: { required: "At least one skill is required" },
    },
    {
      type: "radio",
      label: "Gender",
      name: "gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
      validation: { required: "Gender is required" },
    },
    {
      type: "text",
      label: "Full Name",
      name: "fullName",
      validation: { required: "Full name is required" },
    },
    {
      type: "file",
      label: "Upload Image",
      name: "image",
      validation: { required: "Image is required" },
    },
    {
      type: "multipleFile",
      label: "Upload Multiple Images",
      name: "images",
      validation: { required: "At least one image is required" },
    },
    toggles.enableForSale && {
      type: "text",
      label: "For Sale Price",
      name: "forSalePrice",
      toggleName: "enableForSale",
      validation: { required: "For Sale Price is required when enabled" },
    },
    toggles.enableDiscount && {
      type: "text",
      label: "Discount",
      name: "discount",
      toggleName: "enableDiscount",
      validation: { required: "Discount is required when enabled" },
    },
    {
      type: "dropdown",
      label: "Select Country",
      name: "country",
      options: countryOptions,
      validation: { required: "Country is required" },
    },
    {
      type: "dropdown",
      label: "Select State",
      name: "state",
      options: stateOptions,
      validation: { required: "State is required" },
      isVisible: !!selectedCountry,
    },
    toggles.enableWarranty && {
      type: "text",
      label: "Warranty Period",
      name: "warranty",
      toggleName: "enableWarranty",
      validation: { required: "Warranty Period is required when enabled" },
    },
  ].filter(Boolean);

  const onSubmit = (data) => {
    console.log(data);
    setFormData(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Toggle 1 - Top */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Enable For Sale</span>
            </label>
            <input
              type="checkbox"
              checked={toggles.enableForSale}
              onChange={() => handleToggleChange("enableForSale")}
              className="toggle toggle-primary"
            />
          </div>
          {toggles.enableForSale && (
            <input
              type="text"
              {...register("forSalePrice", {
                required: "For Sale Price is required",
              })}
              className="input input-bordered input-primary w-full"
              placeholder="For Sale Price"
            />
          )}
        </div>

        {/* Toggle 2 - Middle */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Enable Discount</span>
            </label>
            <input
              type="checkbox"
              checked={toggles.enableDiscount}
              onChange={() => handleToggleChange("enableDiscount")}
              className="toggle toggle-primary"
            />
          </div>
          {toggles.enableDiscount && (
            <input
              type="text"
              {...register("discount", { required: "Discount is required" })}
              className="input input-bordered input-primary w-full"
              placeholder="Discount"
            />
          )}
        </div>

        {/* Toggle 3 - Bottom */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Enable Stock Count
              </span>
            </label>
            <input
              type="checkbox"
              checked={toggles.enableStockCount}
              onChange={() => handleToggleChange("enableStockCount")}
              className="toggle toggle-primary"
            />
          </div>
          {toggles.enableStockCount && (
            <input
              type="number"
              {...register("stockCount", {
                required: "Stock Count is required",
              })}
              className="input input-bordered input-primary w-full"
              placeholder="Stock Count"
            />
          )}
        </div>

        {/* Hobby Checkbox Field */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Select Your Hobbies
              </span>
            </label>
            <div className="flex flex-wrap space-x-4">
              {["Reading", "Traveling", "Gaming", "Music", "Photography"].map(
                (hobby, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={hobby}
                      {...register("hobbies", {
                        required: "Please select at least one hobby",
                      })}
                      value={hobby}
                      className="checkbox checkbox-primary"
                    />
                    <label htmlFor={hobby} className="ml-2">
                      {hobby}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Additional fields without toggles */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {formFields.map((field, index) => {
            if (!field.toggleName) {
              return (
                <div key={index} className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      {field.label}
                    </span>
                  </label>

                  {field.type === "checkbox" && (
                    <input
                      type="checkbox"
                      {...register(field.name, field.validation)}
                      className="checkbox checkbox-primary"
                    />
                  )}

                  {field.type === "multiselect" && (
                    <Controller
                      name={field.name}
                      control={control}
                      rules={field.validation}
                      render={({ field: controllerField }) => (
                        <Select
                          {...controllerField}
                          isMulti
                          options={field.options}
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      )}
                    />
                  )}

                  {field.type === "radio" && (
                    <div className="flex space-x-4">
                      {field.options.map((option, i) => (
                        <label key={i} className="label cursor-pointer">
                          <span className="label-text">{option.label}</span>
                          <input
                            type="radio"
                            value={option.value}
                            {...register(field.name, field.validation)}
                            className="radio radio-primary"
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === "text" && (
                    <input
                      type="text"
                      {...register(field.name, field.validation)}
                      className="input input-bordered input-primary w-full"
                    />
                  )}

                  {field.type === "file" && (
                    <input
                      type="file"
                      {...register(field.name, field.validation)}
                      className="file-input file-input-bordered file-input-primary w-full"
                    />
                  )}

                  {field.type === "multipleFile" && (
                    <input
                      type="file"
                      {...register(field.name, field.validation)}
                      multiple
                      className="file-input file-input-bordered file-input-primary w-full"
                    />
                  )}

                  {field.type === "number" && (
                    <input
                      type="number"
                      {...register(field.name, field.validation)}
                      className="input input-bordered input-primary w-full"
                    />
                  )}

                  {field.type === "dropdown" && (
                    <Controller
                      name={field.name}
                      control={control}
                      rules={field.validation}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          options={field.options}
                          value={field.options.find(
                            (option) => option.value === value
                          )}
                          onChange={(selectedOption) => {
                            onChange(selectedOption.label);
                            if (field.name === "country") {
                              setSelectedCountry(selectedOption);
                            }
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          isDisabled={
                            field.name === "state" && !selectedCountry
                          }
                        />
                      )}
                    />
                  )}

                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              );
            }

            return null;
          })}
        </div>

        <div className="col-span-full">
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
