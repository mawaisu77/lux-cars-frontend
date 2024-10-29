import { useState } from 'react';
import { updateOfferStatus } from '../services/offerService';

const useUpdateOffer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updateOfferResponse, setUpdateOfferResponse] = useState(null);
  const respondToOffer = async (offerId, status) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await updateOfferStatus(offerId, status);
      setUpdateOfferResponse(response);
      setSuccess(true);
      return response;
    } catch (err) {
        if (err.response) {
          setError(`${err.response.data.message}`);
        } else if (err.request) {
          setError('Error: No response from server');
        } else {
          setError(`Error: ${err.message}`);
        }
    } finally {
      setIsLoading(false);
    }
  };

  return { respondToOffer, isLoading, error, success, setSuccess, updateOfferResponse};
};

export default useUpdateOffer;