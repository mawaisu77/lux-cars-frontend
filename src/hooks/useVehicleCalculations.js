// useVehicleImportCost.js
import { useState } from 'react';

const useVehicleImportCost = () => {
  const [costs, setCosts] = useState({
    customsDuty: 0,
    vatBase: 0,
    vat: 0,
    totalLandedCost: 0,
    totalDueToCustoms: 0,
  });

  const calculateCustomsDuty = (finalBidPrice, isHybrid) => {
    const dutyRate = isHybrid ? 0.10 : 0.65;
    return finalBidPrice * dutyRate;
  };

  const calculateVATBase = (finalBidPrice, customsDuty, boatShippingCost, processingFee, levyFee) => {
    return finalBidPrice + customsDuty + boatShippingCost + processingFee + levyFee;
  };

  const calculateVAT = (vatBase, vatRate = 0.10) => {
    return vatBase * vatRate;
  };

  const calculateTotalLandedCost = (finalBidPrice, transportCost, inspectionCost, boatShippingCost, customsDuty, vat, processingFee, levyFee, bankTransferFee, customsClearanceFee, serviceFee) => {
    return finalBidPrice + transportCost + inspectionCost + boatShippingCost + customsDuty + vat + processingFee + levyFee + bankTransferFee + customsClearanceFee + serviceFee;
  };

  const calculateVehicleImportCost = (finalBidPrice, isHybrid, transportCost, inspectionCost, boatShippingCost, bankTransferFeeRate, customsClearanceFee, serviceFeeRate) => {
    const customsDuty = calculateCustomsDuty(finalBidPrice, isHybrid);
    const processingFee = finalBidPrice * 0.01;
    const levyFee = 250;
    const bankTransferFee = finalBidPrice * bankTransferFeeRate;
    const serviceFee = finalBidPrice > 40000 ? (finalBidPrice * serviceFeeRate) : 1500;

    const vatBase = calculateVATBase(finalBidPrice, customsDuty, boatShippingCost, processingFee, levyFee);
    const vat = calculateVAT(vatBase);

    const totalLandedCost = calculateTotalLandedCost(finalBidPrice, transportCost, inspectionCost, boatShippingCost, customsDuty, vat, processingFee, levyFee, bankTransferFee, customsClearanceFee, serviceFee);

    const totalDueToCustoms = customsDuty + vat;

    setCosts({
      customsDuty,
      vatBase,
      vat,
      totalLandedCost,
      totalDueToCustoms,
    });
  };

  return { costs, calculateVehicleImportCost };
};

export default useVehicleImportCost;
