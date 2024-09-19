export const IAAIBuyerFeeCalculator = (amount) => {
    if (amount <= 49.99) return 25.00;
    if (amount <= 99.99) return 45.00;
    if (amount <= 199.99) return 80.00;
    if (amount <= 299.99) return 130.00;
    if (amount <= 349.99) return 150.00;
    if (amount <= 399.99) return 160.00;
    if (amount <= 449.99) return 170.00;
    if (amount <= 499.99) return 180.00;
    if (amount <= 549.99) return 200.00;
    if (amount <= 599.99) return 205.00;
    if (amount <= 699.99) return 235.00;
    if (amount <= 799.99) return 260.00;
    if (amount <= 899.99) return 280.00;
    if (amount <= 999.99) return 305.00;

    if (amount <= 1199.99) return 355.00;
    if (amount <= 1299.99) return 380.00;
    if (amount <= 1399.99) return 400.00;
    if (amount <= 1499.99) return 410.00;
    if (amount <= 1599.99) return 420.00;
    if (amount <= 1699.99) return 440.00;
    if (amount <= 1799.99) return 450.00;
    if (amount <= 1999.99) return 465.00;
    if (amount <= 2399.99) return 500.00;
    if (amount <= 2499.99) return 525.00;
    if (amount <= 2999.99) return 550.00;
    if (amount <= 3499.99) return 650.00;
    if (amount <= 3999.99) return 700.00;
    if (amount <= 4499.99) return 725.00;
    if (amount <= 4999.99) return 625.00;
    if (amount <= 5999.99) return 650.00;
    if (amount <= 6999.99) return 675.00;
    if (amount <= 7999.99) return 700.00;
    if (amount <= 9999.99) return 850.00;
    if (amount <= 14999.99) return 900.00;

    return  amount * 0.06; 
  };
  