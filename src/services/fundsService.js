import baseService from './baseService';

export const addFunds = async (packageType) => {
  try {
    console.log("service funds")
    const response = await baseService.post('funds/add-funds', {
      ...packageType,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};