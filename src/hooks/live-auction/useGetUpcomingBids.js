import { useState } from "react";
import { getUpcomingLiveBids } from "../../services/liveCarsService";

const useGetUpcomingBids = () => {
  const [upcomingBids, setUpcomingBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUpcomingBids = async () => {
    setLoading(true);
    try {
      const response = await getUpcomingLiveBids();
      setUpcomingBids(response.data);
    } catch (err) {
      if (err.response) {
        setError(`${err.response.data.message || "An error occurred."}`);
      } else if (err.request) {
        setError("No response from server");
      } else {
        setError(`${err.message || "An error occurred."}`);
      }
    } finally {
        setLoading(false);
    }
  };

  return { upcomingBids, loading, error, fetchUpcomingBids };
};

export default useGetUpcomingBids;
