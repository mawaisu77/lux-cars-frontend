import { useState } from 'react';
import { getCarHistory } from '../../services/historyService';
const useGetCarHistory = (lot_id) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getCarHistory(lot_id);
      setHistory(data);
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

  return { history, loading, error, fetchHistory };
};

export default useGetCarHistory;
