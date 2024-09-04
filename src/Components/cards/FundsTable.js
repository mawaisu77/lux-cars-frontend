import React from 'react';

const FundsTable = () => {
  const data = [
    { name: 'Lorem Ipsum', date: '2024-07-10', card: 'Visa', status: 'Success', amount: '$100' },
    { name: 'Jane Smith', date: '2024-07-09', card: 'MasterCard', status: 'Pending', amount: '$200' },
    { name: 'Bob Johnson', date: '2024-07-08', card: 'American Express', status: 'Success', amount: '$300' },
    { name: 'Alice Brown', date: '2024-07-07', card: 'Visa', status: 'Success', amount: '$400' },
    { name: 'Alice Brown', date: '2024-07-07', card: 'Visa', status: 'Success', amount: '$400' }
  ];

  return (
    <div className='w-[80vw] mx-auto mt-8'>
      <div className='overflow-x-auto'>
        <table className='w-[1006px] lg:w-[74vw] text-[1.3vw]'>
          <thead className='w-full text-[20px]'>
            <tr className='text-[20px] lg:text-[1.2vw] font-urbanist font-bold border-b'>
              <th className='py-6'>Name</th>
              <th>Date</th>
              <th>Card</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className='text-[20px] h-[46px] lg:text-[1vw]'>
                <td className='py-4 w-[260px]   '>
                  <div className='flex flex-col gap-3'>
                    <p className='font-bold'>{item.name}</p>
                    <p className='text-[#b5b5b5]'>Subscription</p>
                  </div>
                </td>
                <td className='py-4 font-bold'>
                  {item.date}
                </td>
                <td className='py-4 '>
                  <div className='flex flex-col gap-3'>
                    <p className='font-bold'>A.Nelson</p>
                    <p className='text-[#b5b5b5]'>12/26</p>
                  </div>
                </td>
                <td>
                  <span className={`px-6 py-4 font-semibold w-[100px] rounded-full ${
                  item.status === 'Success' ? 'bg-green-100 text-green-600' :
                  item.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {item.status}

                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap font-bold '>
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
