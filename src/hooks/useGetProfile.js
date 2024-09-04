import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { profile as profileService } from '../services/authService';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const profile = async () => {
        setIsLoading(true)
        setError(null)

    try {
        const response = await profileService();
        setIsLoading(false);
        setUserProfile(response.data)
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

  return { profile, isLoading, error, userProfile }
}