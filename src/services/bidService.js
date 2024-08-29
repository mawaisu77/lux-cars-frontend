import baseService from './baseService';

export const getBidHistoryByLotId = async (id) => {
    try {
      const response = await baseService.get(`bids/get-all-bids-on-car/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };