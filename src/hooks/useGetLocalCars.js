import { useState, useLayoutEffect } from 'react';
import baseService from '../services/baseService';

const useGetLocalCars = (url) => {
  const [carData, setCarData] = useState(null);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseService.get(url);
        setCarData(response.data);
      } catch (err) {
        if (err.response) {
          setCarError(`${err.response.data.message}`);
        } else if (err.request) {
          setCarError('Error: No response from server');
        } else {
          setCarError(`Error: ${err.message}`);
        }
      } finally {
        setCarLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { carData, carLoading, carError };
};

export default useGetLocalCars;
