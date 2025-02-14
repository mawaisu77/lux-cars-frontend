import baseService from './baseService';

export const getMyInvoices = async () => {
    try {
      const response = await baseService.get(`get-user-all-invoices`);
      return response.data;
    } catch (error) {
      throw error;
    }
 };