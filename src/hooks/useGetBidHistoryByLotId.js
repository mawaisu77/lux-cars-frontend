import { useState } from 'react';
import { getBidHistoryByLotId } from '../services/bidService'; // Adjust the path to your bid service

const useBidHistory = (lotId) => {
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBidHistory = async () => {
    setLoading(true);
    try {
      const data = await getBidHistoryByLotId(lotId);
      setBidHistory(data);
      console.log("first")
    } catch (err) {
      console.log("Error fetching bid history", err);
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

  return { bidHistory, loading, error, fetchBidHistory };
};

export default useBidHistory;
