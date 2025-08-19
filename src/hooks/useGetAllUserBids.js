import { useState } from 'react';
import { getAllBids } from '../services/userService'; 

const useUserBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBids = async () => {
    setLoading(true);
    try {
      const data = await getAllBids();
      setBids(data);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message || 'No response from server'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { bids, loading, error, fetchBids };
};

export default useUserBids;
