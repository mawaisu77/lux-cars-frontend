import baseService from "./baseService";

export const getAllOffers = async () => {
    try {
      const response = await baseService.get('local-cars-offers/get-all-offers-of-user');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateOfferStatus = async (offerId, status) => {
    try {
      const response = await baseService.put(`local-cars-offers/update-offer?offerID=${offerId}`, {
        offerStatus: status
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
