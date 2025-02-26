export const validatePaymentDetails = (paymentDetails) => {
    let errors = {};
  
    if (!paymentDetails.card_name.trim()) {
      errors.card_name = "Cardholder name is required";
    }
  
    if (!paymentDetails.card_number.replace(/\s/g, '').match(/^\d{16}$/)) {
      errors.card_number = "Card number must be 16 digits";
    }
  
    if (!paymentDetails.card_cvv.match(/^\d{3}$/)) {
      errors.card_cvv = "CVV must be 3 digits";
    }
  
    if (!paymentDetails.card_exp.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
      errors.card_exp = "Expiration date must be in MM/YY format";
    }
  
    if (
      !paymentDetails.card_amount ||
      isNaN(paymentDetails.card_amount) ||
      parseFloat(paymentDetails.card_amount) <= 0
    ) {
      errors.card_amount = "Enter a valid deposit amount";
    }

  
    if (!paymentDetails.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
    }
  
    return errors;
  };
  