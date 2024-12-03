import baseService from './baseService';

export const getLiveCars = async () => {
    try {
      const response = await baseService.get(`local-cars/get-all-local-cars?type=live`);
      return response.data;
    } catch (error) {
      throw error;
    }
 };

 