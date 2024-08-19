import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/baseService";

const useCarMakesModels = () => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}cars/get-cars-makes-models`);
        setCarData(response?.data?.data);
      } catch (err) {
        if (err.response) {
          setError(`${err.response.data.message}`);
        } else if (err.request) {
          setError('No response from server');
        } else {
          setError(`${err.message}`);
        }      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  return { carData, loading, error };
};

export default useCarMakesModels;
