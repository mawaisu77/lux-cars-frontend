import { useState } from 'react';
import { getCarsCount } from '../services/categoryService'; 

const useGetCarsCount = () => {
  const [carsCount, setCarsCount] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarsCount = async () => {
    setLoading(true);
    try {
      const data = await getCarsCount();
      setCarsCount(data);
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

  return { carsCount, loading, error, fetchCarsCount };
};

export default useGetCarsCount;
