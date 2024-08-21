import { useState } from 'react';
import { getCarReportPDF } from '../services/reportService';

const useGetCarReport = (vin) => {
  const [carReport, setCarReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarReport = async () => {
    setLoading(true);
    try {
      const response = await getCarReportPDF(vin);

      if (response && response.data && Array.isArray(response.data.data.data)) {
        const pdfData = new Uint8Array(response.data.data.data);
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setCarReport(url);
      } else {
        setError('Invalid PDF data received');
      }
    } catch (err) {
      console.log('Error fetching car report PDF', err);
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

  return { carReport, loading, error, fetchCarReport };
};

export default useGetCarReport;
