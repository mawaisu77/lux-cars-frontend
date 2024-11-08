import { useState } from 'react';
import { getSavedIds } from '../services/userService'; 

const useGetSavedIds = () => {
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSavedCarsIds = async () => {
    setLoading(true);
    try {
      const data = await getSavedIds();
      setSavedIds(data);
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

  return { savedIds, loading, error, fetchSavedCarsIds };
};

export default useGetSavedIds;
