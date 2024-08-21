import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import image1 from "../../../assets/Vehicle/IMG (54).png";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import useBidHistory from "../../../hooks/useGetBidHistoryByLotId";
import TimeAgo from 'react-timeago'

const SingleProductTabs = ({ data }) => {
  
  const { bidHistory, loading: loadingBidHistory, error:bidHistoryError, fetchBidHistory } = useBidHistory(data.lot_id);

  useEffect(() => {
    if (data.lot_id) {
      fetchBidHistory();
    }
    console.log("history ===> ",bidHistory)

  }, [data.lot_id]);

  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  const renderIAAIView = () => (
    <div className="flex flex-col items-center justify-center gap-y-4">
       {loading && (
        <div className="absolute flex items-center justify-center w-full h-52">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      )}
      <iframe
        src={data.iaai_360}
        width="80%"
        height="600px"
        allowFullScreen
        onLoad={handleLoad} 
        style={{ display: loading ? "none" : "block" }} 
      />
    </div>
  );

  const renderCopartView = () => (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex justify-center mt-8">
        {data.copart_exterior_360.map((image, index) => (
          <img key={index} src={image} alt={`Copart Exterior View ${index + 1}`} className="w-full h-auto mb-2" />
        ))}
        {data.copart_interior_360 && (
          <img src={data.copart_interior_360} alt="Copart Interior View" className="w-full h-auto" />
        )}
      </div>
    </div>
  );

  const TabHistory = [
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400",
    },
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400",
    },
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400",
    },
  ];

  return (
    <TabGroup className=" w-[1400px] mx-auto mt-20">
        <TabList className="w-full flex gap-x-10 px-5 py-3 bg-[#f8f8f8] font-bold rounded-md border border-gray-200">
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md  outline-none transition-all duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            Vehicle Info
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md transition-all outline-none duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            360° View
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md transition-all outline-none duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            Bid History
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md transition-all outline-none duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            Calculator
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md transition-all outline-none duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            Get Report
          </Tab>
          <Tab
            className={({ selected }) =>
              `text-[20px] p-2 rounded-md transition-all outline-none duration-300 ${selected ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-700 hover:text-red-500'}`
            }
          >
            Help
          </Tab>
       </TabList>
      <TabPanels className={'bg-[#f8f8f8] px-10 max-w-[1400px] '}>
      <TabPanel className='mt-2 py-10 mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          
          {/* Vehicle Info */}
          <section className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2'>Vehicle Info</h2>
            <div className='space-y-4'>
              <InfoRow label='Title' value={data?.title} />
              <InfoRow label='Engine' value={data?.engine} />
              <InfoRow label='Year' value={data?.year} />
              <InfoRow label='Drivetrain' value={data?.drive} />
              <InfoRow label='Transmission' value={data?.transmission} />
              <InfoRow label='Damage Primary' value={data?.damage_pr} />
              <InfoRow label='Damage Secondary' value={data?.damage_sec} />
              <InfoRow label='Start Code' value={data?.status} />
            </div>
          </section>

          {/* Location */}
          <section className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2'>Location</h2>
            <div className='space-y-4'>
              <InfoRow label='Location' value={data?.location} />
              <InfoRow label='Location Old' value={data?.location_old} />
              <InfoRow label='Country' value={data?.country} />
              <InfoRow label='State' value={data?.state} />
              <InfoRow label='Document' value={data?.document} />
              <InfoRow label='Document Old' value={data?.document_old} />
            </div>
          </section>

          {/* Specifications */}
          <section className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2'>Specifications</h2>
            <div className='space-y-4'>
              <InfoRow label='Vehicle Type' value={data?.vehicle_type} />
              <InfoRow label='Cylinders' value={data?.cylinders} />
              <InfoRow label='Make' value={data?.make} />
              <InfoRow label='Model' value={data?.model} />
              <InfoRow label='Series' value={data?.series} />
              <InfoRow label='Keys' value={data?.keys} />
              <InfoRow label='Fuel' value={data?.fuel} />
              <InfoRow label='Color' value={data?.color} />
            </div>
          </section>

        </div>
      </TabPanel>
     
        <TabPanel className="max-w-[1400px] mt-2 px-5 py-1 mx-auto overflow-auto">
        {data.base_site === 'iaai' && data.iaai_360 && renderIAAIView()}
        {data.base_site === 'copart' && (data.copart_exterior_360.length > 0 || data.copart_interior_360) && renderCopartView()}
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto my-4 py-10">
          {loadingBidHistory ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="#000" loading={loadingBidHistory} size={50} />
            </div>
          ) : bidHistoryError ? (
            <div className="text-red-500 text-center">
              Error loading bid history. Please try again later.
            </div>
          ) : bidHistory?.data?.length === 0 ? (
            <div className="text-center text-gray-500">
              No bid history available.
            </div>
          ) : (
            bidHistory?.data && bidHistory?.data
              .sort((a, b) => new Date(b.bid.createdAt) - new Date(a.bid.createdAt))
              .map((item, index) => (
                <div
                  key={index}
                  className="flex bg-white shadow-md rounded-lg p-4 mt-1"
                >
                  <div className="flex items-center">
                    <img
                      className="w-[44px] h-[44px] rounded-lg"
                      src={item.profilePicture}
                      alt="Profile"
                    />
                  </div>
                  <div className="flex justify-between w-full ml-4">
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <p className="text-[1rem] font-urbanist font-bold">
                          {item.username}
                        </p>
                        <p className="text-[0.9rem] text-gray-500 font-urbanist">
                          <TimeAgo date={item.bid.createdAt} />
                        </p>
                      </div>
                      <p
                        className={`text-[0.9rem] ${
                          item.bid.isValid ? 'text-green-600' : 'text-red-600'
                        } font-urbanist`}
                      >
                        {item.bid.isValid ? 'Active' : 'Expired'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p
                        className={`text-[1rem] font-urbanist font-bold ${
                          item.bid.isValid ? 'text-black' : 'text-gray-500'
                        }`}
                      >
                        ${item.bid.bidPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto">
          <div className="flex flex-col justify-center gap-y-4">
            \tab 3 content
          </div>
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto">
          <div className="flex flex-col justify-center gap-y-4">
            \tab 4 content
          </div>
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto">
          <div className="flex flex-col justify-center gap-y-4">
            \tab 5 content
          </div>
        </TabPanel>
     
      </TabPanels>
    </TabGroup>
  );
};

const InfoRow = ({ label, value }) => (
  <div className='flex justify-between'>
    <p className='text-gray-600 font-medium'>{label}:</p>
    <span className='text-black'>{value}</span>
  </div>
);

export default SingleProductTabs;
