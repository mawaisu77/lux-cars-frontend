import baseService from './baseService';

export const getCarReportPDF = async (vin) => {
  try {
    const response = await baseService.get(`clearvin/get-car-report-pdf?vin=${vin}`);
    console.log("response", response)
    return response;
  } catch (error) {
    throw error;
  }
};