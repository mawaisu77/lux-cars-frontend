import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { login as loginService } from '../services/authService';
import { saveToken, saveUser } from '../utils/storageUtils';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

    try {
        const response = await loginService( email, password );
        saveUser(response.data.user);
        saveToken(response.data.token);
        dispatch({type: 'LOGIN', payload: response.data});
        setIsLoading(false);
        return {success:response.success, message:response.message, role:response?.data?.user?.role}
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

  return { login, isLoading, error }
}