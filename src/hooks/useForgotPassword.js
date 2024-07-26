import { useState } from 'react'
import { forgotPassword as forgotPasswordService } from '../services/authService';

export const useForgotPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const forgotPassword = async (email) => {
        setIsLoading(true)
        setError(null)
    try {
        const response = await forgotPasswordService(email);
        console.log(response)
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
  
  }

  return { forgotPassword, isLoading, error }
}