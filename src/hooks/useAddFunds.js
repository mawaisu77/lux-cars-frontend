import { useState, useEffect } from 'react';
import { addFunds } from '../services/fundsService';
import { showToast } from '../utils/Toast';

const useAddFunds = () => {
  const [fundsData, setFundsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // Track submission success

  const handleAddFunds = async (packageType) => {
    setLoading(true);
    try {
      const response = await addFunds(packageType);
      setFundsData(response);
      setSubmissionSuccess(true); // Set success state
      showToast('Funds added successfully!', 'success'); // Show success toast
    } catch (err) {
      console.log('Error adding funds', err);
      if (err.response) {
        setError(`${err.response.data.message || 'Error: No response from server'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message || 'No response from server'}`);
      }
      showToast(error, 'error'); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error && !submissionSuccess) { 
      showToast(error, 'error'); 
    }
    setSubmissionSuccess(false); // Reset success state after handling
  }, [error]);

  return { fundsData, loading, error, handleAddFunds };
};

export default useAddFunds;