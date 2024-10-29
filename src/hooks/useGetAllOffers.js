import { useState } from 'react';
import { getAllOffers } from '../services/offerService'; 
const useUserOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await getAllOffers();
      setOffers(data);
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

  return { offers, loading, error, fetchOffers };
};

export default useUserOffers;
