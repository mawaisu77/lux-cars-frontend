import { useState } from 'react';
import { getMyInvoices } from '../../services/invoiceService';
const useGetMyInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await getMyInvoices();
      setInvoices(data);
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

  return { invoices, loading, error, fetchInvoices };
};

export default useGetMyInvoices;
