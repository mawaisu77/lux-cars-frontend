import React from "react";
import { IoMdAlert } from "react-icons/io";
import { redProtectonColor } from "../../../../utils/ProtectionColorCodes";

const ProtectionNote = ({
  currentDocumentOldType,
  salesHistoryCount,
  damageColorCode,
  damageType,
}) => {
  // Check if damage exists to show the protection note
  const shouldShowProtectionNote = () => {
    return damageColorCode === redProtectonColor;
  };

  // Get the title text based on document type
  const getTitleText = () => {
    if (currentDocumentOldType?.color === redProtectonColor) {
      return currentDocumentOldType?.label;
    }
    return "";
  };

  const getAuctionText = () => {
    return salesHistoryCount > 2 ? "History (Auction more than 2 times)" : "";
  };

  const getDamageText = () => {
    return damageColorCode === redProtectonColor ? damageType : "";
  };

  // Return null if conditions are not met
  if (!shouldShowProtectionNote()) {
    return null;
  }

  return (
    <div className="max-w-[600px] lg:max-w-full rounded-3xl lg:rounded-[1.5vw] bg-blue-50 p-6 lg:p-[1.5vw] shadow-sm">
      <div className="mb-4 lg:mb-[1vw] text-left">
        <h3 className="text-[24px] lg:text-24 font-medium">BidCaribbean Founder</h3>
      </div>

      <div className="space-y-6 lg:space-y-[1.5vw]">
        {/* Recommendation Section */}
        <div className="space-y-4 lg:space-y-[1vw]">
          <div className="flex items-center gap-2 lg:gap-[0.5vw]">
            {/* Alert Circle Icon */}
            <IoMdAlert className="text-primary-red animate-pulse" />
            <div>
              <span className="text-primary-red font-medium">
                Doesn&apos;t recommend this vehicle
              </span>{" "}
              <span>because of :</span>
            </div>
          </div>

          {/* Reasons List */}
          <ul className="ml-7 text-primary-red space-y-2 lg:space-y-[0.4vw] list-disc text-left">
            
            {
              getDamageText() && <li>{ getDamageText()}</li>
            }

            {
              getAuctionText() && <li>{ getAuctionText()}</li>
            }
            {
              getTitleText() && <li>{ getTitleText()}</li>
            }
            
          </ul>
        </div>

        {/* Requirements Section */}
        <div className="space-y-2 lg:space-y-[0.3vw]">
          <p className="font-medium text-left">
            If you choose to move ahead, please ensure that you get :
          </p>
          <ul className="ml-7 lg:ml-[1.5vw] space-y-2 lg:space-y-[0.3vw] text-left">
            <li>- Inspection before auction</li>
            <li>- Vehicle report</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProtectionNote;
