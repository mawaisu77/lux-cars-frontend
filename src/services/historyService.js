import axios from 'axios';
import baseService from './baseService';

export const getCarHistory = async (lot_id) => {
    try {
      const response = await baseService.get(`cars/get-car-sales-history?lot_id=${lot_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
 };