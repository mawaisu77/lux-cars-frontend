import React, { useState, useEffect } from 'react';

const biddingConfig = {
  maxBiddingLimit: 50000,
  biddingIncrement: 100,
  depositPercentage: 0.1,
  purchaseLimitThresholds: [
    { vehicles: 0, minBidding: 0 },
    { vehicles: 1, minBidding: 6000 },
    { vehicles: 2, minBidding: 10000 },
    { vehicles: 3, minBidding: 15000 },
    { vehicles: 4, minBidding: 20000 },
  ]
};

function calculatePurchaseLimit(biddingLimit, thresholds) {
  const sortedThresholds = [...thresholds].sort((a, b) => b.minBidding - a.minBidding);
  const threshold = sortedThresholds.find(t => biddingLimit >= t.minBidding);
  return threshold ? threshold.vehicles : 0;
}

function getMinBiddingForVehicles(vehicles, thresholds) {
  const threshold = thresholds.find(t => t.vehicles === vehicles);
  return threshold ? threshold.minBidding : 0;
}

export default function BiddingLimit() {
  const [biddingLimit, setBiddingLimit] = useState(6000);
  const [purchaseLimit, setPurchaseLimit] = useState(1);
  
  const securityDeposit = biddingLimit * biddingConfig.depositPercentage;
  const maxPurchaseLimit = Math.max(
    ...biddingConfig.purchaseLimitThresholds.map(t => t.vehicles)
  );
  
  useEffect(() => {
    const newPurchaseLimit = calculatePurchaseLimit(
      biddingLimit,
      biddingConfig.purchaseLimitThresholds
    );
    setPurchaseLimit(newPurchaseLimit);
  }, [biddingLimit]);

  const handleBiddingChange = (newBiddingLimit) => {
    setBiddingLimit(newBiddingLimit);
    const newPurchaseLimit = calculatePurchaseLimit(
      newBiddingLimit,
      biddingConfig.purchaseLimitThresholds
    );
    setPurchaseLimit(newPurchaseLimit);
  };

  const handleBiddingIncrement = () => {
    handleBiddingChange(Math.min(biddingLimit + biddingConfig.biddingIncrement, biddingConfig.maxBiddingLimit));
  };

  const handleBiddingDecrement = () => {
    handleBiddingChange(Math.max(biddingLimit - biddingConfig.biddingIncrement, 0));
  };

  const handlePurchaseIncrement = () => {
    const newPurchaseLimit = Math.min(purchaseLimit + 1, maxPurchaseLimit);
    setPurchaseLimit(newPurchaseLimit);
    const minRequired = getMinBiddingForVehicles(newPurchaseLimit, biddingConfig.purchaseLimitThresholds);
    if (biddingLimit < minRequired) {
      setBiddingLimit(minRequired);
    }
  };

  const handlePurchaseDecrement = () => {
    if (purchaseLimit > 0) {
      const newPurchaseLimit = purchaseLimit - 1;
      setPurchaseLimit(newPurchaseLimit);
    
      const newMinBidding = getMinBiddingForVehicles(newPurchaseLimit, biddingConfig.purchaseLimitThresholds);
      setBiddingLimit(newMinBidding);
    }
  };

  return (
    <div className="max-w-[74vw] mx-auto p-6 md:p-[1.25vw] font-sans">
      <h1 className="text-2xl md:text-30 font-bold mb-4 md:mb-[0.833vw]">Increase My Bidding Limit</h1>
      
      <div className="bg-yellow-100 border border-yellow-400 rounded p-4 md:p-[0.833vw] mb-6 md:mb-[1.25vw] ">
        <p className="text-sm md:text-18 leading-[1.5]">
          Your Available Bidding Limit is ${biddingLimit.toLocaleString()}
        </p>
        <p className="text-sm md:text-18 leading-[1.5]">
          To place a bid you must first set your Bidding Limit to ${biddingLimit.toLocaleString()} USD with a security deposit of ${securityDeposit.toLocaleString()} USD
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:gap-[1.25vw]">
        <div className="border border-gray-300 rounded p-6 md:p-[1.25vw]">
          <div className="mb-8 md:mb-[1.25vw]">
            <input
              type="range"
              min="0"
              max={biddingConfig.maxBiddingLimit}
              step={biddingConfig.biddingIncrement}
              value={biddingLimit}
              onChange={(e) => handleBiddingChange(Number(e.target.value))}
              className="w-full "
              style={{ accentColor: '#c60000' }}
            />
            <div className="flex justify-between mt-2 md:mt-[.5vw] text-sm md:text-18 text-gray-600">
              <span>0</span>
              <span>$10K</span>
              <span>$20K</span>
              <span>$30K</span>
              <span>$40K</span>
              <span>${(biddingConfig.maxBiddingLimit / 1000).toFixed(0)}K+</span>
            </div>
          </div>

          <div className="mb-4 md:mb-[0.833vw]">
            <div className="flex items-center gap-2 md:gap-[0.5vw] mb-2 md:mb-[0.5vw] text-sm md:text-18">
              <span className="font-medium">Bidding Limit</span>
              <span className="text-gray-600 cursor-help text-sm md:text-18" title="The maximum amount you can bid">?</span>
            </div>
            <div className="px-2 md:px-[0.5vw] flex items-center border border-gray-300 rounded">
              <button
                onClick={handleBiddingDecrement}
                className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full  border border-red-600 bg-transparent hover:bg-red-600 hover:text-white cursor-pointer text-sm md:text-18"
              >
                -
              </button>
              <div className="flex-1 p-2 md:p-[0.5vw] text-center text-lg md:text-20 font-semibold text-gray-600">
                ${biddingLimit.toLocaleString()}
              </div>
              <button
                onClick={handleBiddingIncrement}
                className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full  border border-red-600 bg-transparent hover:bg-red-600 hover:text-white cursor-pointer text-sm md:text-18"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2 md:mb-[0.5vw] text-sm md:text-18">
              <span className="font-medium">Purchase Limit</span>
              <span className="text-gray-600 cursor-help" title="The number of vehicles you can purchase">?</span>
            </div>
            <div className="px-2 md:px-[0.5vw] flex items-center border border-gray-300 rounded">
              <button
                onClick={handlePurchaseDecrement}
                className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full  border border-red-600 bg-transparent hover:bg-red-600 hover:text-white cursor-pointer text-sm md:text-18"
              >
                -
              </button>
              <div className="flex-1 p-2 md:p-[0.5vw] text-center text-lg md:text-20 font-semibold text-gray-600">
                {purchaseLimit} 🚗
              </div>
              <button
                onClick={handlePurchaseIncrement}
                className="w-6 h-6 md:w-[1.5vw] md:h-[1.5vw] flex items-center justify-center rounded-full  border border-red-600 bg-transparent hover:bg-red-600 hover:text-white cursor-pointer text-sm md:text-18"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded p-6 md:p-[1.25vw]">
          <div className="mb-4 md:mb-[0.833vw]">
            <div className="flex justify-between items-center text-sm md:text-18">
              <span>Bidding Limit:</span>
              <span className="font-semibold">${biddingLimit.toLocaleString()} USD</span>
            </div>
          </div>
          <div className="mb-4 md:mb-[0.833vw]">
            <div className="flex justify-between items-center text-sm md:text-18">
              <span>Purchase Limit:</span>
              <span className="font-semibold">{purchaseLimit} Vehicle(s)</span>
            </div>
          </div>
          <div className="mb-4 md:mb-[0.833vw]">
            <div className="flex justify-between items-center text-sm md:text-18">
              <div className="flex items-center gap-2">
                <span>Refundable Security Deposit</span>
                <span className="text-gray-600 cursor-help" title="This amount will be refunded if you don't win the auction">?</span>
              </div>
              <span className="font-semibold">${securityDeposit.toLocaleString()} USD</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4 md:pt-[1.25vw] border-t border-gray-300 text-sm md:text-18">
            <span>Total Payment Due</span>
            <span className="font-semibold">${securityDeposit.toLocaleString()} USD</span>
          </div>
          <button
            className="w-full py-1.5 md:py-[0.5vw] mt-6 md:mt-[1.25vw] bg-primary-red text-white border-none rounded text-lg md:text-20 font-semibold cursor-pointer"
          >
            Increase My Bidding Limit
          </button>
        </div>
      </div>
    </div>
  );
}