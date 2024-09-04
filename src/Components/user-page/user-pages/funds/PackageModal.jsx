import React from "react";
import PackageBlock from "./PackageBlock"; // Adjust the path as necessary

const bidPackages = {
  basic: {
    deposit: 750,
    bidAmount: 7500,
    noOfActiveBids: 3,
  },
  standard: {
    deposit: 1500,
    bidAmount: 50000,
    noOfActiveBids: 10,
  },
  premium: {
    deposit: 5000,
    bidAmount: 2000000,
    noOfActiveBids: 20,
  },
};

const PackageModal = ({ onClose, onSelectPackage }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box max-w-[900px]">
        <h2 className="text-2xl font-bold mb-4">Choose a Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <PackageBlock
            title="Basic Package"
            deposit={bidPackages.basic.deposit}
            bidAmount={bidPackages.basic.bidAmount}
            noOfActiveBids={bidPackages.basic.noOfActiveBids}
            onSelect={() => onSelectPackage("basic")}
          />
          <PackageBlock
            title="Standard Package"
            deposit={bidPackages.standard.deposit}
            bidAmount={bidPackages.standard.bidAmount}
            noOfActiveBids={bidPackages.standard.noOfActiveBids}
            onSelect={() => onSelectPackage("standard")}
          />
          <PackageBlock
            title="Premium Package"
            deposit={bidPackages.premium.deposit}
            bidAmount={bidPackages.premium.bidAmount}
            noOfActiveBids={bidPackages.premium.noOfActiveBids}
            onSelect={() => onSelectPackage("premium")}
          />
        </div>
        <div className="flex gap-x-2 justify-center mt-4">
          <button
            className="btn text-green-600 w-[100px]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
