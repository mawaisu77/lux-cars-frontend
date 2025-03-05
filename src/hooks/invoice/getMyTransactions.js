import { useState } from 'react';
import { getMyTransactions } from '../../services/invoiceService';

const useGetMyTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getMyTransactions();
      setTransactions(data);
    } catch (err) {
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

  return { transactions, loading, error, fetchTransactions };
};

export default useGetMyTransactions;
