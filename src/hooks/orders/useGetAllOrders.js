import { useState } from 'react';
import { getUserOrders } from '../../services/orderService';

const useGetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getUserOrders();
      setOrders(data);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message || 'No response from server'}`);
      } else if (err.request) {
        setError('No response from server');
      } else {
        setError(`${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, fetchOrders };
};

export default useGetAllOrders;
