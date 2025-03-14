import React, { useState } from 'react'
import { BiTrendingUp } from 'react-icons/bi'
import moment from 'moment-timezone'; 


const SalesHistory = ({history}) => {
 
    
  return (
    <div className="w-full mx-auto ">
    <div className="flex items-center  gap-2 p-[0.5vw] bg-white">
      <BiTrendingUp className="  text-gray-600 lg:w-[1vw] lg:h-[1vw]" />
      <h2 className="lg:text-[1vw] font-semibold text-gray-700">Sales History</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-[800px] md:w-full border-collapse">
        <thead className='bg-gray-50'>
          <tr className="text-left lg:text-[1vw] px-[0.5vw] border-b">
            <th className="py-3 px-4 font-medium text-gray-600">Auction</th>
            <th className="py-3 px-4 font-medium text-gray-600">Date</th>
            <th className="py-3 px-4 font-medium text-gray-600">Lot #</th>
            <th className="py-3 px-4 font-medium text-gray-600">Final bid</th>
            <th className="py-[0.75vw] px-[1vw] font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {history && history.map((sale, index) => (
            <tr key={`${sale.date}-${index}`} className="text-left border-b bg-gray-50 transition-colors">
            <td className="text-left py-1 lg:py-[1vw] px-1 lg:px-[1vw]">
                <span className={`${
                  sale.base_site === 'iaai' 
                    ? 'bg-primary-red' 
                    : sale.base_site === 'copart' 
                      ? 'bg-blue-500' 
                      : 'bg-gray-600'
                } text-white lg:px-[1vw] px-2 py-1 lg:py-[0.5vw] lg:text-[1vw] rounded-full`}>
                  {sale.base_site}
                </span>
              </td>
              <td className="text-left lg:text-[1vw] py-1 lg:py-[1vw] px-1 lg:px-[1vw] text-gray-600">
            
              {sale?.sale_date ? moment(sale.sale_date).format('YYYY-MM-DD') : 'Not specified'} 
              </td> 

              <td className="text-left lg:text-[1vw] py-[1vw] px-[0.5vw]">
                <span  className="text-blue-500 hover:underline">
                  {sale.lot_id}
                </span>
              </td>
              <td className="text-left lg:text-[1vw] py-1 lg:py-[1vw] px-1 lg:px-[1vw]">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-lg  ">
                  ${sale.purchase_price}
                </span>
              </td>
              <td className="text-left lg:text-[1vw] py-1 lg:py-[1vw] px-1 lg:px-[1vw]">
                <span className={`px-[0.75vw] py-[0.5vw] rounded-full   ${sale.sale_status === 'Sold' ? 'bg-green-100 text-green-800' : sale.sale_status === 'Not sold' ? 'bg-red-100 text-red-800' : sale.sale_status === 'ON APPROVAL' ? 'bg-yellow-100 text-yellow-800' : ''}`}>
                  {sale.sale_status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default SalesHistory