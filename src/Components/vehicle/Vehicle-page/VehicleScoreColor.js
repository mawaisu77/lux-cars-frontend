export const vehicleScoreColors = (score) => {
    if (score <= 10) return "text-white bg-red-700/80";
    if (score <= 20) return "text-white bg-orange-700/80";
    if (score <= 30) return "text-white bg-yellow-700/80";
    if (score <= 40) return "text-white bg-green-700/80";
    return "text-white bg-blue-700/80";
  };
