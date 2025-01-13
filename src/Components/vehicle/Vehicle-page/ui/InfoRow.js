import React from 'react'

const InfoRow = ({ label, value, className }) => (
    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">{label}:</p>
      <span className={`text-black ${className}`}>{value}</span>
    </div>
  );

export default InfoRow