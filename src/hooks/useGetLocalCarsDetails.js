import { useState, useCallback } from 'react';
import baseService from '../services/baseService';

const useGetLocalCarDetail = (url) => {
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
        setCarDetailError(`${err.response.data.message || 'No response from server'}`);
      } else if (err.request) {
        setCarDetailError('No response from server');
      } else {
        setCarDetailError(`${err.message}`);
      }
    } finally {
      setCarDetailLoading(false);
    }
  }, [url]);

  return { carDetailData, carDetailLoading, carDetailError, fetchCarDetail };
};

export default useGetLocalCarDetail;
