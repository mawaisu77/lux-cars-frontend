export const getOdometerColorClass = (odometer) => {
    if (odometer < 100000) {
      return "text-green-500"; // Green for less than 100k
    } else if (odometer < 150000) {
      return "text-orange-500"; // Orange for less than 150k
    }
    return "text-red-500"; // Red for 150k and above
  };

  export const odometerDescriptions = {
    "text-green-500": "Refers to vehicles with fewer than 100,000 miles on the odometer, which may be considered lower mileage and potentially in better condition than higher-mileage vehicles.",
    "text-orange-500": "Indicates that the vehicle’s airbags have been deployed (activated) due to an accident or collision. This may affect the vehicle’s safety systems and repairability.",
    "text-red-500": "Refers to vehicles that have more than 150,000 miles on the odometer, which could indicate higher wear and tear, possibly affecting the vehicle’s condition or value."
};