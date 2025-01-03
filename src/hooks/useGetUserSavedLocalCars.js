import { useState } from "react";
import { getUserSavedLocalCars } from "../services/userService";

const useGetUserSavedLocalCars = () => {
  const [savedLocalCars, setSavedLocalCars] = useState([]);
  const [localCarLoading, setLocalCarLoading] = useState(false);
  const [localCarError, setLocalCarError] = useState(null);

  const fetchSavedLocalCars = async () => {
    setLocalCarLoading(true);
    try {
      const data = await getUserSavedLocalCars();
      setSavedLocalCars(data);
    } catch (err) {
      if (err.response) {
        setLocalCarError(`${err.response.data.message}`);
      } else if (err.request) {
        setLocalCarError("Error: No response from server");
      } else {
        setLocalCarError(`Error: ${err.message}`);
      }
    } finally {
      setLocalCarLoading(false);
    }
  };

  return {
    savedLocalCars,
    localCarLoading,
    localCarError,
    fetchSavedLocalCars,
  };
};

export default useGetUserSavedLocalCars;
