import React from 'react';

const FundsTable = () => {
  const data = [
    { name: 'Lorem Ipsum', date: '2024-07-10', card: 'Visa', status: 'Completed', amount: '$100' },
    { name: 'Jane Smith', date: '2024-07-09', card: 'MasterCard', status: 'Pending', amount: '$200' },
    { name: 'Bob Johnson', date: '2024-07-08', card: 'American Express', status: 'Failed', amount: '$300' },
    { name: 'Alice Brown', date: '2024-07-07', card: 'Visa', status: 'Completed', amount: '$400' },
    { name: 'Alice Brown', date: '2024-07-07', card: 'Visa', status: 'Completed', amount: '$400' }
  ];


  return (
    <div className='w-[80vw] mx-auto mt-8'>
      <div className='overflow-x-auto'>
        <table className='w-[74vw] text-[1.3vw] '>
          <thead className=' w-full'>
            <tr className='text-[1.2vw] font-urbanist font-bold border-b   '>
              <th className='py-6  '>
                Name
              </th>
              <th className='   '>
                Date
              </th>
              <th className=' '>
                Card
              </th>
              <th className=' '>
                Status
              </th>
              <th className='  '>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className=''>
                <td className=' py-4   text-gray-700'>
                  <div>
                    <p className='text-[1vw]'>lorem ipsum</p>
                    <p className='text-[1vw] text-[#1f1f2c]'> Subscription</p>
                  </div>
                </td>
                <td className='py-4  text-[1vw]  text-gray-700'>
                  {item.date}
                </td>
                <td className=' py-4  text-[1vw] text-gray-700'>
                   <div>
                    <p>A.Nelson</p>
                    <p>12/26</p>
                   </div>
                </td>
                <td className={`px-6 py-4 text-[1vw] font-semibold ${
                  item.status === 'Completed' ? 'text-green-600' : 
                  item.status === 'Pending' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {item.status}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-[1vw] text-gray-700'>
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundsTable;
