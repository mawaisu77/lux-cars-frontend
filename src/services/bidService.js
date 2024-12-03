import baseService from './baseService';

export const getBidHistoryByLotId = async (id) => {
    try {
      const response = await baseService.get(`bids/get-all-bids-on-car/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export async function getAllLocalCarBids(id) {
    try {
      const response = await baseService.get(`local-cars-bids/get-all-bids?localCarID=${id}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
