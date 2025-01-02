import { useState } from "react";
import { getSavedLocalCarsIds } from "../services/userService";

const useGetSavedLocalCarsIds = () => {
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSavedLocalCars = async () => {
    setLoading(true);
    try {
      const data = await getSavedLocalCarsIds();
      setSavedIds(data);
    } catch (err) {
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

  return { savedIds, loading, error, fetchSavedLocalCars };
};

export default useGetSavedLocalCarsIds;
