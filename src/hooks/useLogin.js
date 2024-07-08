import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { login as loginService } from '../services/authService';

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

    try {
        const {data} = await loginService( email, password );

        console.log(data.user)
        console.log(data.token)
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        dispatch({ type: 'LOGIN', payload: data.user });
        setIsLoading(false);

    } catch (error) {
        console.log("erorororoo",error.response.data.message)
        setIsLoading(false);
        if (error.response) {
            setError(error.response.data.message || 'An error occurred. Please try again.');
          } else if (error.request) {
            setError('No response from the server. Please check your network connection.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
    }
  
  }

  return { login, isLoading, error }
}