import baseService from './baseService';

export const login = async (email, password) => {
    try {
        const response = await baseService.post('auth/login', { email, password });
        return response.data;
      } catch (error) {
        throw error;
      }
};