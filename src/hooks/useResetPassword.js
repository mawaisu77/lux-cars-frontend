import { useState } from 'react'
import { resetPassword as resetPasswordService } from '../services/authService';

export const useResetPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const resetPassword = async (newPassword, confirmPassword, token) => {
        setIsLoading(true)
        setError(null)
    try {
        const response = await resetPasswordService(newPassword, confirmPassword, token);
        console.log("reset password response",response)
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

  return { resetPassword, isLoading, error }
}