const uploadCarValidation = (formData) => {
    let errors = {};
  
    // Add validations for carDetails
    if (!formData.carDetails.vin) {
      errors.vin = "VIN is required";
    } else if (!Number.isInteger(Number(formData.carDetails.vin))) {
      errors.vin = "VIN must be an integer";
    }
  
    if (!formData.carDetails.year) {
      errors.year = "Year is required";
    } else if (!Number.isInteger(Number(formData.carDetails.year))) {
      errors.year = "Year must be an integer";
    }
  
    if (!formData.carDetails.zip) {
      errors.zip = "Zip code is required";
    } else if (!Number.isInteger(Number(formData.carDetails.zip))) {
      errors.zip = "Zip code must be an integer";
    }
  
    if (!formData.carDetails.make) errors.make = "Make is required";
    if (!formData.carDetails.model) errors.model = "Model is required";
    if (!formData.carDetails.transmission) errors.transmission = "Transmission is required";
    // if (!formData.carDetails.modifications) errors.modifications = "Modifications is required";
    if (!formData.carDetails.mileage) {
      errors.mileage = "Mileage is required";
    } else if (!Number.isInteger(Number(formData.carDetails.mileage))) {
      errors.mileage = "Mileage must be an integer";
    }
  
    if (!formData.carDetails.description) errors.description = "Description is required";
    // if (!formData.carDetails.modifications) errors.modifications = "Modifications are required";
    // if (!formData.carDetails.significantFlaws) errors.significantFlaws = "Significant flaws are required";
    if (!formData.carDetails.carLocation) errors.carLocation = "Car location is required";
    if (!formData.carDetails.carTitledAt) errors.carTitledAt = "Car titled at is required";
    // if (!formData.carDetails.carTitledInfo) errors.carTitledInfo = "Car titled info is required";
    if (!formData.carDetails.titlesStatus) errors.titlesStatus = "Titles status is required";
    // if (!formData.carDetails.minPrice) {
    //   errors.minPrice = "Minimum price is required";
    // } else if (isNaN(formData.carDetails.minPrice)) {
    //   errors.minPrice = "Minimum price must be a number";
    // }
    if (!formData.carDetails.referral) errors.referral = "Referral is required";
  
    return errors;
  };
  
  export default uploadCarValidation;
  