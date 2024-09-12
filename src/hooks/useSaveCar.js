import { useState } from 'react';
import { saveUserCars } from '../services/userService'; 

const useSaveCar = () => {
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveCar = async (lotId) => {
    setLoading(true);
    try {
      const response = await saveUserCars(lotId);
      setCarData(response);
    } catch (err) {
      console.log('Error saving car', err);
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

  return { carData, loading, error, handleSaveCar };
};

export default useSaveCar;
