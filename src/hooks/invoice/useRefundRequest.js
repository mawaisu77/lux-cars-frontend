import { useState } from 'react';
import { refundRequestService } from '../../services/invoiceService';
const useRefundRequest = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refundRequest = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response  = await refundRequestService();
      setSuccess(true);
    } catch (err) {
        setSuccess(false);

      if (err.response) {
        setError(`${err.response.data.message}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, error, refundRequest };
};

export default useRefundRequest;
