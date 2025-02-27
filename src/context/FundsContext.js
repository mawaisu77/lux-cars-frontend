import React, { createContext, useContext, useEffect, useState } from "react";
import useGetFunds from "../hooks/useGetFunds";
import { useAuthContext } from "../hooks/useAuthContext";

// Create a context
const FundsContext = createContext();

// Provider Component
export const FundsProvider = ({ children }) => {
  const { funds, loading, error, fetchFunds } = useGetFunds();
  const {user} = useAuthContext();
  const [fundsData, setFundsData] = useState(funds);


  console.log("userrrrrrrrrrrrrrrr", user)

  useEffect(() => {
    if (user) {
      fetchFunds(); 
    }
  }, [user]); 

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
