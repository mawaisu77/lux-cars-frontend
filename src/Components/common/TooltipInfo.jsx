import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';

const TooltipInfo = ({ content, children }) => {
  return (
    <div className="relative inline-block">
    <div className="cursor-pointer group inline-flex">
      {children || <BsInfoCircle />}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  </div>
  );
};

export default TooltipInfo;
