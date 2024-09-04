import { useState } from "react";
import baseService from "../services/baseService";

const useGetFunds = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFunds = async () => {
    try {
      setError(null)
      setLoading(true);
      const response = await baseService.get("funds/get-funds");
      setFunds(response.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { funds, loading, error, fetchFunds };
};

export default useGetFunds;
