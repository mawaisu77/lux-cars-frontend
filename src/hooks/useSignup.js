import { useState } from 'react'
import { signup as signupService } from '../services/authService';

export const useSignup = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (formData) => {
     setIsLoading(true);
     setError(null);

     try {
      const response = await signupService(formData);
      // dispatch({type: 'REGISTER', payload: null});
      setIsLoading(false);
      return {success:response.success, message:response.message}
  } catch (error) {
      setIsLoading(false);
      if (error.response) {
          setError(error.response.data.message || 'An error occurred. Please try again.');
          return { success: false, message: error.response.data.message || 'An error occurred. Please try again.' };
        } else if (error.request) {
          setError('No response from the server. Please check your network connection.');
          return { success: false, message: 'No response from the server. Please check your network connection.' };
        } else {
          setError('An unexpected error occurred. Please try again.');
          return { success: false, message: 'An unexpected error occurred. Please try again.' };
        }
  }
  };

  return { signup, isLoading, error }
}