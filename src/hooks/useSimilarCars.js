import { useState, useEffect } from "react";
import baseService from "../services/baseService";

const useSimilarCars = (year, make, model) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("year, make, model", year, make, model)
        const response = await baseService.get(
          `cars/get-all-cars?year=${year}&make=${make}&model=${model}`
        );
        setCars(response.data);
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

    fetchData();
  }, [year, make, model]);

  return { cars, loading, error };
};

export default useSimilarCars;
