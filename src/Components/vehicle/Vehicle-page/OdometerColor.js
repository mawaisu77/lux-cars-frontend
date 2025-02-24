import { greenProtectonColor, orangeProtectonColor, redProtectonColor } from "../../../utils/ProtectionColorCodes";

export const getOdometerColorClass = (odometer) => {
    if (odometer < 100000) {
      return greenProtectonColor; // Green for less than 100k
    } else if (odometer < 150000) {
      return orangeProtectonColor; // Orange for less than 150k
    }
    return redProtectonColor; // Red for 150k and above
  };

  export const odometerDescriptions = {
    [greenProtectonColor]: "Refers to vehicles with fewer than 100,000 miles on the odometer, which may be considered lower mileage and potentially in better condition than higher-mileage vehicles.",
    [orangeProtectonColor]: "Refers to vehicles with more than 100,000 miles on the odometer. Vehicles with this mileage moderate may require more maintenance or repairs compared to newer or lower-mileage vehicles.",
    [redProtectonColor]: "Refers to vehicles that have more than 150,000 miles on the odometer, which could indicate higher wear and tear, possibly affecting the vehicle’s condition or value."
};