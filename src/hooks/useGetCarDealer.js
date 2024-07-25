import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import baseService from '../services/baseService';

const useGetCarDealer = (url) => {
  const [dealerData, setDealerData] = useState(null);
  const [dealerLoading, setDealerLoading] = useState(true);
  const [dealerError, setDealerError] = useState(null);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseService.get(url);
        setDealerData(response.data);
      } catch (err) {
        setDealerError(err);
      } finally {
        setDealerLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { dealerData, dealerLoading, dealerError };
};

export default useGetCarDealer;
