export const calculateFundsPercentage = (totalFunds, remainingFunds, usedFunds) => {
    if (!totalFunds) return { percentageUsed: 0, percentageRemaining: 100 };
  
    const percentageUsed = ((usedFunds / totalFunds) * 100).toFixed(2);
    const percentageRemaining = ((remainingFunds / totalFunds) * 100).toFixed(2);
  
    return { percentageUsed, percentageRemaining };
  };
  