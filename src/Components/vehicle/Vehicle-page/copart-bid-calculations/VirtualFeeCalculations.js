export const CopartVirtualBidFeeCalculator = (amount, type = 'live-bid') => {
    // type can be 'pre-bid' or 'live-bid'
    if (amount <= 99.99) return { preBid: null, liveBid: null }; 
    if (amount <= 499.99) return type === 'pre-bid' ? 45.00 : 55.00;
    if (amount <= 999.99) return type === 'pre-bid' ? 60.00 : 70.00;
    if (amount <= 1499.99) return type === 'pre-bid' ? 80.00 : 90.00;
    if (amount <= 1999.99) return type === 'pre-bid' ? 90.00 : 100.00;
    if (amount <= 3999.99) return type === 'pre-bid' ? 105.00 : 115.00;
    if (amount <= 5999.99) return type === 'pre-bid' ? 115.00 : 130.00;
    if (amount <= 7999.99) return type === 'pre-bid' ? 130.00 : 150.00;
    return type === 'pre-bid' ? 150.00 : 165.00; 
  };