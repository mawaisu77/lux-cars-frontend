import React, { useState } from 'react'
import { BiTrendingUp } from 'react-icons/bi'
import moment from 'moment-timezone'; 


const SalesHistory = ({history}) => {
 
    
  return (
    <div className="w-full mx-auto max-w-[85vw]">
    <div className="flex items-center gap-2 p-2 bg-white">
      <BiTrendingUp className="w-5 h-5 text-gray-600" />
      <h2 className="text-xl font-semibold text-gray-700">Sales History</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className='bg-gray-50'>
          <tr className="text-left border-b">
            <th className="py-3 px-4 font-medium text-gray-600">Auction</th>
            <th className="py-3 px-4 font-medium text-gray-600">Date</th>
            <th className="py-3 px-4 font-medium text-gray-600">Lot #</th>
            <th className="py-3 px-4 font-medium text-gray-600">Final bid</th>
            <th className="py-3 px-4 font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {history && history.map((sale, index) => (
            <tr key={`${sale.date}-${index}`} className="text-left border-b bg-gray-50 transition-colors">
              <td className="text-left py-3 px-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{sale.base_site}</span>
              </td>
              <td className="text-left py-3 px-4 text-gray-600">
            
              {sale?.sale_date ? moment(sale.sale_date).format('YYYY-MM-DD') : 'Not specified'} 
              </td>

              <td className="text-left py-3 px-4">
                <span  className="text-blue-500 hover:underline">
                  {sale.lot_id}
                </span>
              </td>
              <td className="text-left py-3 px-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                  ${sale.purchase_price}
                </span>
              </td>
              <td className="text-left py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-sm ${sale.sale_status === 'Sold' ? 'bg-green-100 text-green-800' : sale.sale_status === 'Not sold' ? 'bg-red-100 text-red-800' : sale.sale_status === 'ON APPROVAL' ? 'bg-yellow-100 text-yellow-800' : ''}`}>
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