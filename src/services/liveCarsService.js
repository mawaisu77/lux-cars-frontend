import axios from 'axios';
import baseService from './baseService';

export const getLiveCars = async () => {
    try {
      const response = await axios.get(`https://luxcars-backendservices.up.railway.app/api/v1/local-cars/get-future-auction-local-cars`);
      return response.data;
    } catch (error) {
      throw error;
    }
 };

 export const getUpcomingBids = async (id) => {
  try {
    const response = await baseService.get(`local-cars/get-all-local-cars?type=admin`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 