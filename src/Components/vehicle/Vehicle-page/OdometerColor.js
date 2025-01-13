export const getOdometerColorClass = (odometer) => {
    if (odometer < 100000) {
      return "text-green-500"; // Green for less than 100k
    } else if (odometer < 150000) {
      return "text-orange-500"; // Orange for less than 150k
    }
    return "text-red-500"; // Red for 150k and above
  };