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

export const forgotPassword = async (email) => {
  try {
      const response = await baseService.post('auth/forgot-password', {email});
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const resetPassword = async (newPassword, confirmPassword, token) => {
  try {
    const response = await baseService.put(`auth/reset-password/${token}`, {
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};