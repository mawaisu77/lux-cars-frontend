import React from 'react';

const CountryDropdown = ({ countries, selectedCountry, setSelectedCountry }) => {
  return (
    <select
      value={selectedCountry}
      onChange={(e) => setSelectedCountry(e.target.value)}
      className="w-[343px] lg:w-[35vw] h-[48px] lg:h-[5.23vh] rounded-lg pl-2 border text-[14px] lg:text-[0.8vw]"
    >
      <option value="" disabled>Your Country*</option>
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
