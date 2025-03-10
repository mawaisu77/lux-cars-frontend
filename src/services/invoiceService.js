import baseService from './baseService';

export const getMyInvoices = async () => {
    try {
      const response = await baseService.get(`get-user-all-invoices`);
      return response.data;
    } catch (error) {
      throw error;
    }
 };

 export const getMyTransactions = async () => {
  try {
    const response = await baseService.get(`payments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refundRequestService = async () => {
  try {
    const response = await baseService.put(`funds/refund-funds`);
    return response.data;
  } catch (error) {
    throw error;
  }
};