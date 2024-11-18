import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../services/baseService";

const  useCarMakesModels = () => {
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
          setError(`${err.response.data.message || 'An error occurred.'}`);
        } else if (err.request) {
          setError('server error');
        } else {
          setError(`${err.message || 'An error occurred.'}`);
        }      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, []);

  return { carData, loading, error };
};

export default useCarMakesModels;
