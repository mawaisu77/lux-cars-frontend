// SavedCarsContext.js
import React, { createContext, useContext, useEffect } from "react";
import useGetSavedLocalCarsIds from "../hooks/useGetSavedLocalCarsIds";

const SavedLocalCarsContext = createContext();

export const SavedLocalCarsProvider = ({ children }) => {
  const { savedIds, loading, error, fetchSavedLocalCars } =
    useGetSavedLocalCarsIds({});

  useEffect(() => {
    fetchSavedLocalCars();
  }, []);

  const refetchSavedIds = () => {
    fetchSavedLocalCars();
  };

  return (
    <SavedLocalCarsContext.Provider
      value={{ savedIds, loading, error, refetchSavedIds }}
    >
      {children}
    </SavedLocalCarsContext.Provider>
  );
};

export const useSavedLocalCars = () => {
  return useContext(SavedLocalCarsContext);
};
