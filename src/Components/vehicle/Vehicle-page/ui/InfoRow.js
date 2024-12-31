import React from 'react'

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">{label}:</p>
      <span className="text-black">{value}</span>
    </div>
  );

export default InfoRow