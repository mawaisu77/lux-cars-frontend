import { useState, useEffect } from 'react';
import baseService from '../services/baseService';

const useGetAllLocalCars = (url) => {
  const [localCars, setLocalCars] = useState(null);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseService.get(url);
        setLocalCars(response.data.data.cars);
      } catch (err) {
        console.log("error object",err)
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

  return { localCars, carLoading, carError };
};

export default useGetAllLocalCars;
