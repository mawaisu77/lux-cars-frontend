import baseService from './baseService';

export const getProfile = async () => {
    try {
      const response = await baseService.get('user/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateProfile = async (profileData) => {
    try {
      const response = await baseService.put('user/edit-profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };