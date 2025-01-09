import { useState } from "react";
import { saveUserLocalCars } from "../services/userService";

const useSaveLocalCar = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveLocalCar = async (id) => {
    setLoading(true);
    try {
      const response = await saveUserLocalCars(id);
      setCarData(response);
    } catch (err) {
      console.log("Error saving car", err);
      if (err.response) {
        setError(`${err.response.data.message}`);
      } else if (err.request) {
        setError("Error: No response from server");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { carData, loading, error, handleSaveLocalCar };
};

export default useSaveLocalCar;
