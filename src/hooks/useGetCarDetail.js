import { useState, useCallback } from 'react';
import baseService from '../services/baseService';

const useGetCarDetail = (url) => {
  const [carDetailData, setCarDetailData] = useState(null);
  const [carDetailLoading, setCarDetailLoading] = useState(true);
  const [carDetailError, setCarDetailError] = useState(null);

  const fetchCarDetail = useCallback(async () => {
    setCarDetailLoading(true);
    try {
      const response = await baseService.get(url);
      setCarDetailData(response.data);
    } catch (err) {
      if (err.response) {
        setCarDetailError(`${err.response.data.message}`);
      } else if (err.request) {
        setCarDetailError('Error: No response from server');
      } else {
        setCarDetailError(`Error: ${err.message}`);
      }
    } finally {
      setCarDetailLoading(false);
    }
  }, [url]);

  return { carDetailData, carDetailLoading, carDetailError, fetchCarDetail };
};

export default useGetCarDetail;
