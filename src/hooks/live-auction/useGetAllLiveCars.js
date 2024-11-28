import { useState } from 'react';
import { getLiveCars } from '../../services/liveCarsService'; 

const useGetAllLiveCars = () => {
  const [liveCars, setLiveCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchLiveCars = async () => {
    setLoading(true);
    try {
      const response = await getLiveCars();
      setLiveCars(response.data);
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

    return { liveCars, loading, error, fetchLiveCars };
};

export default useGetAllLiveCars;
