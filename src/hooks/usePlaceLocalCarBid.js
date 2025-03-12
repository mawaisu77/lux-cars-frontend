import { useState } from 'react';
import { placeBidOnLocalCar } from '../services/localCarsService';

const usePlaceLocalCarBid = () => {
  const [placebidLoading, setPlaceBidLoading] = useState(false);
  const [placeBiderror, setPlaceBidError] = useState(null);
  const [placeBidSuccess, setPlaceBidSuccess] = useState(false);

  const placeBid = async ({id, currentBid}) => {
    setPlaceBidLoading(true);
    setPlaceBidError(null);
    setPlaceBidSuccess(false);
    try {
      await placeBidOnLocalCar(id, currentBid)
      setPlaceBidSuccess(true);
    } catch (err) {
        setPlaceBidError(handleError(err));
    } finally {
        setPlaceBidLoading(false);
    }
  };

  const handleError = (err) => {
    if (err.response) {
      return `${err.response.data.message}`;
    } else if (err.request) {
      return 'Error: No response from server';
    } else {
      return `Error: ${err.message}`;
    }
  };

  return { placeBid, placebidLoading, placeBiderror, placeBidSuccess };
};

export default usePlaceLocalCarBid;
