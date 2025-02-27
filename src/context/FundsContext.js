import React, { createContext, useContext, useEffect, useState } from "react";
import useGetFunds from "../hooks/useGetFunds";

// Create a context
const FundsContext = createContext();

// Provider Component
export const FundsProvider = ({ children }) => {
  const { funds, loading, error, fetchFunds } = useGetFunds();
  const [fundsData, setFundsData] = useState(funds);

  useEffect(() => {
    fetchFunds();
  }, []);

  useEffect(() => {
    setFundsData(funds);

  }, [funds]);

  return (
    <FundsContext.Provider value={{ fundsData, loading, error, fetchFunds }}>
      {children}
    </FundsContext.Provider>
  );
};

// Custom Hook to use FundsContext
export const useFunds = () => useContext(FundsContext);
