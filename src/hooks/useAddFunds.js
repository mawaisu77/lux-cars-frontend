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
      console.log("custom hook of add fund reonse", response)
      setFundsData(response);
    } catch (err) {
      console.log('Error adding funds', err);
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

  return { fundsData, loading, error, handleAddFunds };
};

export default useAddFunds;
