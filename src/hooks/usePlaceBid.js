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
      await baseService.post(`bid-cars/create-bid-car`, {
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
      // Server responded with a status other than 200 range
      return `${err.response.data.message}`;
    } else if (err.request) {
      // Request was made but no response
      return 'Error: No response from server';
    } else {
      // Something else happened while setting up the request
      return `Error: ${err.message}`;
    }
  };

  return { placeBid, placebidLoading, placeBiderror, placeBidSuccess };
};

export default usePlaceBid;
