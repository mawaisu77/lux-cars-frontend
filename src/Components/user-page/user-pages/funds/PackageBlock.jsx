import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PackageBlock = ({ title, deposit, bidAmount, noOfActiveBids, onSelect }) => {
  return (
    <div
      className="border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer bg-white transform hover:scale-105 transition-transform"
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <FaCheckCircle className="text-green-500 text-xl" />
      </div>
      <p className="text-lg text-gray-600 mb-2">
        <strong>Deposit:</strong> <span className="text-gray-800">${deposit}</span>
      </p>
      <p className="text-lg text-gray-600 mb-2">
        <strong>Bid Amount:</strong> <span className="text-gray-800">${bidAmount}</span>
      </p>
      <p className="text-lg text-gray-600">
        <strong>Number of Active Bids:</strong> <span className="text-gray-800">{noOfActiveBids}</span>
      </p>
    </div>
  );
};

export default PackageBlock;
