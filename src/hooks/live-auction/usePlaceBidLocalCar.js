import { useState } from 'react';
import { placeBidOnLocalCar } from '../../services/localCarsService';

const usePlaceBidLocalCar = () => {
  const [bidData, setBidData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placeBidSuccess, setPlaceBidSuccess] = useState(false);

  const resetBidState = () => {
    setError(null);
    setPlaceBidSuccess(false);
  };

  const handlePlaceBidLocalCar = async (localCarID, currentBid) => {
    setLoading(true);
    try {
      const response = await placeBidOnLocalCar(localCarID, currentBid);
      setBidData(response);
      setPlaceBidSuccess(true);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message || 'No response from server'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message || 'No response from server'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { bidData, loading, error, handlePlaceBidLocalCar, placeBidSuccess, resetBidState };
};

export default usePlaceBidLocalCar;
