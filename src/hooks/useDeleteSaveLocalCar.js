import { useState } from "react";
import { deleteSavedLocalCar as deleteSavedLocalCarService } from "../services/userService";

const useDeleteSaveLocalCar = () => {
  const [payload, setPayload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteSavedLocalCar = async (id) => {
    setLoading(true);
    try {
      const data = await deleteSavedLocalCarService(id);
      setPayload(data);
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

  return { payload, loading, error, deleteSavedLocalCar };
};

export default useDeleteSaveLocalCar;
