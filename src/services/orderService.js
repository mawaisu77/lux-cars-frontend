import baseService from './baseService';

export const getUserOrders = async () => {
  try {
    const response = await baseService.get(`orders/get-user-all-orders`);
    console.log("response", response)
    return response;
  } catch (error) {
    throw error;
  }
};