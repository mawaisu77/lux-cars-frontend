import { useState } from 'react';
import baseService from '../services/baseService';

const usePlaceBid = () => {
  const [placebidLoading, setPlaceBidLoading] = useState(false);
  const [placeBiderror, setPlaceBidError] = useState(null);
  const [placeBidSuccess, setPlaceBidSuccess] = useState(false);

  const placeBid = async ({lot_id, currentBid}) => {
    setPlaceBidLoading(true);
    setPlaceBidError(null);
    setPlaceBidSuccess(false);
    try {
      await baseService.post(`bid-cars/place-bid`, {
        lot_id,
        currentBid,
      });
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

export default usePlaceBid;
