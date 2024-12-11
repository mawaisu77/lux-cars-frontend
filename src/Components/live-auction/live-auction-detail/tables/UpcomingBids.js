import React from 'react';
// Assets
import OnReserve from "../../../../assets/Vehicle/IMG (51).png";

const UpcomingBids = () => {
  const upcomingBids = [
    {
      id: 1,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "New",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    },
    {
      id: 2,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "In Progress",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    },
    {
      id: 9,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "In Progress",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    },
    {
      id: 6,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "In Progress",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    },
    {
      id: 3,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "In Progress",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    },
    {
      id: 4,
      image: OnReserve,
      year: "2012",
      make: "Ford",
      model: "F150 Super",
      status: "In Progress",
      price: 400,
      lot: "155536378",
      certificate: "CT Certificate of Title",
      odo: "10833",
      onReserve: true
    }
  ];

  return (
    <div className=" bg-white h-[21.615vw] shadow-custom rounded-lg p-[1vw] w-full">
      <div className="flex justify-between items-center mb-[0.625vw]">
        <h2 className="text-16 font-semibold">Upcoming Bids</h2>
        <button className="text-gray-500 text-14 hover:text-gray-700">
          View All
        </button>
      </div>

      <div className="grid grid-cols-12 border p-[0.625vw] border-gray-200 gap-x-[10px] mb-[0.625vw] text-14 text-left text-gray-500 w-full">
        <div className="col-span-8 ">BID INFO</div>
        <div className="col-span-1 text-left ">PRICE</div>
        <div className="col-span-3 text-right ">STATUS</div>
      </div>

      {/* Scrollable Section */}
        <div className="h-[75%] no-scrollbar overflow-y-scroll w-full">
        {upcomingBids.map((bid) => (
          <div key={bid.id} className="grid grid-cols-12 p-[0.625vw] border-b border-l border-r border-gray-200 gap-x-[0.625vw] w-full">
            <div className="col-span-8  w-full">
              <div className="flex gap-[0.625vw]">
                <div className="relative w-[4.2vw] h-[3vw]">
                  <img
                    src={bid.image}
                    alt={`${bid.year}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute -bottom-1 -right-1 w-[1.15vw] h-[1.15vw] bg-red-500 rounded-full" />
                </div>
                <div className="w-full">
                  <div className="font-medium text-15 w-full flex justify-between items-center">
                    {bid.year} {bid.make} {bid.model}
                    <span className="ml-[0.625vw] text-14 text-gray-500">On Reserve</span>
                  </div>
                  <div className="text-14 text-gray-500 flex items-center justify-between">
                    <span>Lot : {bid.lot}</span>
                    <span className="mx-1 text-14"></span>
                    <span>{bid.certificate}</span>
                  </div>
                  <div className="text-14 text-gray-500 flex items-center justify-start">
                    <span>Odo :{bid.odo}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 text-left font-medium text-15">
              ${bid.price}
            </div>
            <div className="col-span-3 text-right">
              <span
                className={`px-[0.625vw] py-[0.317vw] rounded-lg text-14 ${
                  bid.status === "New" 
                    ? "bg-blue-50 text-blue-600 border border-blue-600" 
                    : "bg-yellow-50 text-yellow-600 border border-yellow-600"
                }`}
              >
                {bid.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBids;
