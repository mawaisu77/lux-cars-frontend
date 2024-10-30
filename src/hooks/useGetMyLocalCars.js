import { useState } from 'react';
import { getMyLocalCars } from '../services/userService';

const useGetMyLocalCars = () => {
  const [localCars, setLocalCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocalCars = async () => {
    setLoading(true);
    try {
      const data = await getMyLocalCars();
      setLocalCars(data);
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

  return { localCars, loading, error, fetchLocalCars };
};

export default useGetMyLocalCars;
