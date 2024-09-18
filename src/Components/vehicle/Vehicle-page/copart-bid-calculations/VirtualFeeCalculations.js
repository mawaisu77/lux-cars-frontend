export const CopartVirtualBidFeeCalculator = (amount, type = 'live-bid') => {
    // type can be 'pre-bid' or 'live-bid'
    if (amount <= 99.99) return { preBid: null, liveBid: null }; 
    if (amount <= 499.99) return type === 'pre-bid' ? 29.00 : 49.00;
    if (amount <= 999.99) return type === 'pre-bid' ? 39.00 : 59.00;
    if (amount <= 1499.99) return type === 'pre-bid' ? 59.00 : 79.00;
    if (amount <= 1999.99) return type === 'pre-bid' ? 69.00 : 89.00;
    if (amount <= 3999.99) return type === 'pre-bid' ? 79.00 : 99.00;
    if (amount <= 5999.99) return type === 'pre-bid' ? 89.00 : 109.00;
    if (amount <= 7999.99) return type === 'pre-bid' ? 99.00 : 139.00;
    return type === 'pre-bid' ? 119.00 : 149.00; 
  };