import baseService from './baseService';

export const getCarsCount = async () => {
    try {
      const response = await baseService.get(`cars/get-cars-counts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };