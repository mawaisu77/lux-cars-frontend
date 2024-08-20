import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCarDealer = (url) => {
  const [dealerData, setDealerData] = useState(null);
  const [dealerLoading, setDealerLoading] = useState(true);
  const [dealerError, setDealerError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setDealerData(response.data);
      } catch (err) {
        if (err.response) {
          setDealerError(`${err.response.data.message}`);
        } else if (err.request) {
          setDealerError('Error: No response from server');
        } else {
          setDealerError(`Error: ${err.message}`);
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
