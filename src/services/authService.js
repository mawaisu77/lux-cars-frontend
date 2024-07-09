import baseService from './baseService';

export const login = async (email, password) => {
    try {
        const response = await baseService.post('auth/login', { email, password });
        return response.data;
      } catch (error) {
        throw error;
      }
};

export const signup = async (formData) => {
    try {
        const response = await baseService.post('auth/register', formData);
        return response.data;
      } catch (error) {
        throw error;
      }
};