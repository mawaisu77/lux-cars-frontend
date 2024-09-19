import baseService from './baseService';

export const getCarReportPDF = async (vin) => {
  try {
    const response = await baseService.get(`clearvin/get-car-report-pdf?vin=KNDJD73386551456`);
    console.log("response", response)
    return response;
  } catch (error) {
    throw error;
  }
};