import { useState } from 'react';
import { deleteSavedCar as deleteSavedCarService } from '../services/userService'; 

const useDeleteSaveCar = () => {
  const [payload, setPayload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteSavedCar = async (id) => {
    setLoading(true);
    try {
      const data = await deleteSavedCarService(id);
        setPayload(data);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message}`);
      } else if (err.request) {
        setError('Error: No response from server');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

    return { payload, loading, error, deleteSavedCar };
};

export default useDeleteSaveCar;
