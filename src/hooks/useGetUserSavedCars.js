import { useState } from 'react';
import { getUserSavedCars } from '../services/userService'; 

const useGetSavedCars = () => {
  const [savedCars, setSavedCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSavedCars = async () => {
    setLoading(true);
    try {
      const data = await getUserSavedCars();
      setSavedCars(data);
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

  return { savedCars, loading, error, fetchSavedCars };
};

export default useGetSavedCars;
