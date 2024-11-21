import { useState, useEffect } from 'react';
import baseService from '../services/baseService';

const useGetCarDealer = (url) => {
  const [dealerData, setDealerData] = useState(null);
  const [dealerLoading, setDealerLoading] = useState(true);
  const [dealerError, setDealerError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await baseService.get(url);
          setDealerData(response.data);
      } catch (err) {
        if (err.response) {
          setDealerError(`${err.response.data.message || 'No response from server'}`);
        } else if (err.request) {
          setDealerError('No response from server');
        } else {
          setDealerError(`${err.message}`);
        }
     } finally {
        setDealerLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { dealerData, dealerLoading, dealerError };
};

export default useGetCarDealer;
