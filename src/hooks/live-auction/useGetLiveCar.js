import { useState } from 'react';
import { getLiveCarDetail } from '../../services/liveCarsService'; 

const useGetLiveCar = () => {
  const [liveCar, setLiveCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchLiveCar = async () => {
    setLoading(true);
    try {
        const response = await getLiveCarDetail();
        setLiveCar(response.data);
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

    return { liveCar, loading, error, fetchLiveCar };
};

export default useGetLiveCar;
