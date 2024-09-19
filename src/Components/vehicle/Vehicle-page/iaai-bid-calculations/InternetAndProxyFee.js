export const IAAIInternetBidFeeCalculator = (amount, type='live-bid') => {
    if (amount <= 99.99) return { proxyBid: 0, liveBid: 0 }; 
    if (amount <= 499.99) return type === 'proxy-bid' ? 39.00 : 49.00;
    if (amount <= 999.99) return type === 'proxy-bid' ? 49.00 : 59.00;
    if (amount <= 1499.99) return type === 'proxy-bid' ? 69.00 : 79.00;
    if (amount <= 1999.99) return type === 'proxy-bid' ? 79.00 : 89.00;
    if (amount <= 3999.99) return type === 'proxy-bid' ? 89.00 : 99.00;
    if (amount <= 5999.99) return type === 'proxy-bid' ? 99.00 : 109.00;
    if (amount <= 7999.99) return type === 'proxy-bid' ? 119.00 : 139.00;
    return type === 'proxy-bid' ? 129.00 : 149.00; 
  };