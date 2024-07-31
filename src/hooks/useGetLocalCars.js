import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
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
        console.log(err)
        if (err.response) {
          // Server responded with a status other than 200 range
          setCarError(`${err.response.data.message}`);
        } else if (err.request) {
          // Request was made but no response
          setCarError('Error: No response from server');
        } else {
          // Something else happened while setting up the request
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
