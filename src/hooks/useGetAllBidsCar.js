import { useState, useEffect } from 'react';
import baseService from '../services/baseService';

const useGetAllBidsCar = (url) => {
  const [carData, setCarData] = useState(null);
  const [carLoading, setCarLoading] = useState(true);
  const [carError, setCarError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseService.get(url);
        setCarData(response.data.data.cars);
      } catch (err) {
        console.log("error object",err)
        if (err.response) {
          setCarError(`${err.response.data.message || 'An error occurred.'}`);
        } else if (err.request) {
          setCarError('Error: No response from server');
        } else {
          setCarError(`${err.message || 'An error occurred.'}`);
        }
      } finally {
        setCarLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { carData, carLoading, carError };
};

export default useGetAllBidsCar;
