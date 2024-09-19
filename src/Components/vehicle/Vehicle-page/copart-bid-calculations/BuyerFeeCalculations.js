export const CopartBuyerFeeCalculator = (amount) => {
    if (amount <= 49.99) return 25.00;
    if (amount <= 99.99) return 45.00;
    if (amount <= 199.99) return 80.00;
    if (amount <= 299.99) return 120.00;
    if (amount <= 349.99) return 120.00;
    if (amount <= 399.99) return 120.00;
    if (amount <= 449.99) return 160.00;
    if (amount <= 499.99) return 160.00;
    if (amount <= 549.99) return 185.00;
    if (amount <= 599.99) return 185.00;
    if (amount <= 699.99) return 210.00;
    if (amount <= 799.99) return 230.00;
    if (amount <= 899.99) return 250.00;
    if (amount <= 999.99) return 275.00;

    if (amount <= 1199.99) return 325.00;
    if (amount <= 1299.99) return 350.00;
    if (amount <= 1399.99) return 365.00;
    if (amount <= 1499.99) return 380.00;
    if (amount <= 1599.99) return 390.00;
    if (amount <= 1699.99) return 410.00;
    if (amount <= 1799.99) return 420.00;
    if (amount <= 1999.99) return 440.00;
    if (amount <= 2399.99) return 470.00;
    if (amount <= 2499.99) return 480.00;
    if (amount <= 2999.99) return 500.00;
    if (amount <= 3499.99) return 600.00;
    if (amount <= 3999.99) return 675.00;
    if (amount <= 4499.99) return 710.00;
    if (amount <= 4999.99) return 750.00;
    if (amount <= 5499.99) return 750.00;
    if (amount <= 5999.99) return 750.00;
    if (amount <= 6499.99) return 800.00;
    if (amount <= 6999.99) return 800.00;
    if (amount <= 7499.99) return 800.00;
    if (amount <= 7999.99) return 815.00;
    if (amount <= 8499.99) return 840.00;
    if (amount <= 8999.99) return 840.00;
    if (amount <= 9999.99) return 840.00;

    if (amount <= 10499.99) return 850.00;
    if (amount <= 10999.99) return 850.00;
    if (amount <= 11499.99) return 850.00;
    if (amount <= 11999.99) return 850.00;
    if (amount <= 12499.99) return 850.00;
    if (amount <= 14999.99) return 850.00;

    return  amount * 0.1225; 
  };
  