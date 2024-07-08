import { useState } from 'react'
import { useAuthContext } from './useAuthContext.js'
import ApiService from '../services/ApiService';

export const useSignup = () => {

  const apiService = new ApiService(process.env.REACT_APP_API_BASE_URL);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.register(formData);
      setIsLoading(false);
      dispatch({ type: 'Register', payload: response.payload });
      return response.message
    } catch (err) {
      setIsLoading(false);
      setError(err);
      throw err; 

    }
  };

  return { signup, isLoading, error }
}