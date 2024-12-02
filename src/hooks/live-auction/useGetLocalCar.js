import { useState } from 'react';
import { getLocalCarDetail } from '../../services/localCarsService'; 

const useGetLocalCar = () => {
  const [localCar, setLocalCar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchLocalCar = async (id) => {
    setLoading(true);
    try {
        const response = await getLocalCarDetail(id);
        setLocalCar(response.data);
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

    return { localCar, loading, error, fetchLocalCar };
};

export default useGetLocalCar;
