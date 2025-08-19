import { useState } from 'react';
import { getAllLocalBids } from '../services/userService'; 

const useGetAllLocalBids = () => {
  const [localBids, setLocalBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocalBids = async () => {
    setLoading(true);
    try {
      const data = await getAllLocalBids();
      setLocalBids(data);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message || 'An error occurred.'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message || 'An error occurred.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { localBids, loading, error, fetchLocalBids };
};

export default useGetAllLocalBids;
