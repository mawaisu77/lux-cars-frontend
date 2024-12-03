import baseService from './baseService';

export const getLocalCarDetail = async (id) => {
    try {
      const response = await baseService.get(`local-cars/get-car?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export async function placeBidOnLocalCar( localCarID, currentBid ) {
    try {
      const bidPlace = await baseService.post(`local-cars-bids/place-bid?localCarID=${localCarID}`, {
        currentBid,
      });
      return bidPlace;
    } catch (err) {
      throw err;
    }
  }
