import React from 'react'

const InfoRow = ({ label, value, className }) => (
    <div className="flex justify-between border-b border-gray-300 pb-1">
      <p className="text-gray-600 font-medium">{label}:</p>
      <span className={`text-black ${className}`}>{value}</span>
    </div>
  );

export default InfoRow