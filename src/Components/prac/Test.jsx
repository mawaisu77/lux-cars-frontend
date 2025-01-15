import React from "react";
import Select from "react-select";

// Dummy data for the select options
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
  { value: "option5", label: "Option 5" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "0",
    boxShadow: "none",
    paddingTop: "0",
    marginTop: "0",
    height: "15px",
    minHeight: "15px",
    backgroundColor: "red",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: "none",

  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "0",
    margin: "0",
    height: "20px",
    fontSize: "12px",
    minHeight: "0px",
    backgroundColor: "red",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0",
    margin: "0",
    marginTop: "0",
    paddingTop: "0",
    height: "20px",
    fontSize: "12px",
    minHeight: "0px",
    backgroundColor: "blue",
  }),
};

const Test = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Select
        options={options}
        styles={customStyles} // Apply custom styles
      />
    </div>
  );
};

export default Test;
