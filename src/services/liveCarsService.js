import axios from 'axios';
import baseService from './baseService';

export const getLiveCars = async () => {
    try {
      const response = await axios.get(`local-cars/get-future-auction-local-cars`);
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

export const getLiveCarDetail = async () => {
  try {
      const response = await baseService.get(`live-auction/join-auction`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingLiveBids = async (id) => {
  try {
    const response = await baseService.get(`live-auction/car-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

 