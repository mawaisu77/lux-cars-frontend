const registerDealerValidations = (formData) => {
    let errors = {};
    if (!formData.buyerFeeDetails) errors.buyerFeeDetails = "Buyer fee details is required";
    if (!formData.dealershipName) errors.dealershipName = "Dealership name is required";
    if (!formData.dealershipWebsite) errors.dealershipWebsite = "Dealership website is required";
    if (!formData.vehicleSalesEachMonth) errors.vehicleSalesEachMonth = "Month sale is required";
    return errors;
  };
  
  export default registerDealerValidations;
  