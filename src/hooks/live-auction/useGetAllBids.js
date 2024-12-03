import { useState } from 'react';
import { getAllLocalCarBids } from '../../services/bidService'; 

const useGetAllBids = () => {
  const [allBids, setAllBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchAllBids = async (id) => {
    setLoading(true);
    try {
      const response = await getAllLocalCarBids(id);
      setAllBids(response.data);
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

    return { allBids, loading, error, fetchAllBids };
};

export default useGetAllBids;
