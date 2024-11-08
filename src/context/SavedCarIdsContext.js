// SavedCarsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import useGetSavedIds from '../hooks/useGetSavedIds';

const SavedCarsContext = createContext();

export const SavedCarsProvider = ({ children }) => {
  const { savedIds, loading, error, fetchSavedCarsIds  } = useGetSavedIds({});
    
  useEffect(() => {
    fetchSavedCarsIds();
  }, []);

  return (
    <SavedCarsContext.Provider value={{ savedIds, loading, error }}>
      {children}
    </SavedCarsContext.Provider>
  );
};

export const useSavedCars = () => {
  return useContext(SavedCarsContext);
};
