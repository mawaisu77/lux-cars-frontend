import { useState } from 'react';
import { addFunds } from '../services/fundsService';

const useAddFunds = () => {
  const [fundsData, setFundsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleAddFunds = async (packageType) => {
    setLoading(true);
    try {
      const response = await addFunds(packageType);
      setFundsData(response);
    } catch (err) {
      console.log('Error adding funds', err);
      if (err.response) {
        setError(`${err.response.data.message || 'Error: No response from server'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message || 'No response from server'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { fundsData, loading, error, handleAddFunds };
};

export default useAddFunds;
