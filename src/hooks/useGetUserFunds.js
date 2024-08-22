import { useState } from 'react';
import { getUserFunds } from '../services/userService'; 

const useUserBids = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFunds = async () => {
    setLoading(true);
    try {
      const data = await getUserFunds();
      setFunds(data);
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

  return { funds, loading, error, fetchFunds };
};

export default useUserBids;
