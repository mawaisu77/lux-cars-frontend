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
        console.log("+++",err)
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

  return { bids, loading, error, fetchBids };
};

export default useUserBids;
