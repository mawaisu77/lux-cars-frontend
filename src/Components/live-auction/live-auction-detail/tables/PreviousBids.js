import React from 'react';

export default function PreviousBids() {
  const bids = [
    { id: '34L912', country: 'Iraq', price: 8700, status: 'Cancelled' },
    { id: 'AN1370', country: 'Iraq', price: 8400, status: 'Cancelled' },
    { id: 'KQ5601', country: 'Iraq', price: 8200, status: 'Completed' },
    { id: '9832h6', country: 'Iraq', price: 8000, status: 'Cancelled' },
    { id: '9832h6', country: 'Iraq', price: 8000, status: 'Cancelled' },
    { id: '9832h6', country: 'Iraq', price: 8000, status: 'Cancelled' },
    { id: '9832h6', country: 'Iraq', price: 8000, status: 'Cancelled' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Previous Bids</h2>
        <a href="#" className="text-sm text-gray-500 hover:text-blue-600">View All</a>
      </div>

      {/* Table Container */}
      <div className="max-h-64 no-scrollbar overflow-y-scroll">
        <table className="w-full table-auto border-collapse border rounded-xl">
          {/* Table Header */}
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">BID ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">COUNTRY</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase border-b">PRICE</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase border-b">STATUS</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {bids.map((bid) => (
              <tr key={bid.id} className="hover:bg-gray-50 w-full">
                <td className="px-4 py-3 text-left text-sm text-blue-600 font-semibold border-b">#{bid.id}</td>
                <td className="px-4 py-3 text-left text-sm text-gray-700 border-b">{bid.country}</td>
                <td className="px-4 py-3 text-left text-sm text-gray-700 border-b">${bid.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-sm border-b">
                  <span
                    className={`inline-block px-2 py-1 text-xs text-right rounded-lg ${
                      bid.status === 'Cancelled' ? 'bg-red-100 text-red-500 border border-red-500' : 'bg-blue-100 text-blue-500 border border-blue-500'
                    }`}
                  >
                    {bid.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
