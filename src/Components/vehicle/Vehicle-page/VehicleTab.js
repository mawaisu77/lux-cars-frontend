import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import image1 from "../../../assets/Vehicle/IMG (54).png";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const SingleProductTabs = ({ data }) => {

  const [loading, setLoading] = useState(true);

  // Handler to update loading state when iframe is loaded
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
      <TabList className="w-full flex px-5 justify-between p-3 bg-[#f8f8f8] font-bold rounded-md">
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          Vehicle Info
        </Tab>
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          360° View
        </Tab>
        
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          Bid History
        </Tab>
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          Calculator
        </Tab>
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          Get Report
        </Tab>
        <Tab className="hover:text-red-500 text-[20px] active:text-red-500 focus:text-red-500 active:border-none focus:border-none outline-none">
          Help
        </Tab>
      </TabList>
      <TabPanels className={'bg-[#f8f8f8] px-10  max-w-[1400px] '}>
        <TabPanel className="mt-2 py-2 mx-auto ">
          {/* <div className="flex justify-start gap-x-20 text-left my-10 leading-8"> */}
          <div className="grid  md:grid-cols-3 my-4 leading-8 md:gap-x-20">
            <div className="flex flex-col items-start text-[20px] leading-10">
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist text-left">Title:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold text-left">
                  {data?.title}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Engine:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.engine}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Year:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.year}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Drivetrain:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.drive}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
              <p className="text-[20px] text-[#7a798a] font-urbanist">Transmission:</p>
              <span className="text-[20px] text-black font-urbanist font-semibold">
                {data?.transmission}
              </span>
              </div>
        
              <div className="flex justify-start gap-x-2 item-center">
              <p className="text-[20px] text-[#7a798a] font-urbanist">Damage Primary:</p>
              <span className="text-[20px] text-black font-urbanist font-semibold">
                {data?.damage_pr }
              </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
              <p className="text-[20px] text-[#7a798a] font-urbanist">Damage Secondary:</p>
              <span className="text-[20px] text-black font-urbanist font-semibold">
                {data?.damage_sec }
              </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Start Code:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.status}
                </span>
              </div>
             
            </div>

            
            {/* ===================== */}
            <div className="leading-10 flex flex-col items-start text-[20px]">                   
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Odometer:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.odometer}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                        <p className="text-[20px] text-[#7a798a] font-urbanist">Odobrand:</p>
                        <span className="text-[20px] text-black font-urbanist font-semibold">
                          {data?.odobrand}
                        </span>
              </div>              
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Location:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.location}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Location Old:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold text-nowrap">
                  {data?.location_old}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                        <p className="text-[20px] text-[#7a798a] font-urbanist">Country:</p>
                        <span className="text-[20px] text-black font-urbanist font-semibold">
                          {data?.country}
                        </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">State:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.state}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Document:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.document}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Document Old:</p>
                <span className="text-[20px] text-black font-urbanist text-nowrap font-semibold">
                  {data?.document_old}
                </span>
              </div>            
            </div>


            {/* ===================== */}
            <div className="leading-10">
            <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">VehicleType:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.vehicle_type}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Cylinders:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.cylinders}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Make:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.make}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Model:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.model}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Series:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.series}
                </span>
              </div> 
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Keys:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.keys}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Fuel:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.fuel}
                </span>
              </div>
              <div className="flex justify-start gap-x-2 item-center">
                <p className="text-[20px] text-[#7a798a] font-urbanist">Color:</p>
                <span className="text-[20px] text-black font-urbanist font-semibold">
                  {data?.color}
                </span>
              </div>
            </div>
       
          </div>
          
        </TabPanel>
        <TabPanel className="max-w-[1400px] mt-2 px-5 py-1 mx-auto overflow-auto">
        {data.base_site === 'iaai' && data.iaai_360 && renderIAAIView()}
        {data.base_site === 'copart' && (data.copart_exterior_360.length > 0 || data.copart_interior_360) && renderCopartView()}
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto">
          {TabHistory.map((item, index) => (
            <div key={index} className="flex w-full my-2">
              <div>
                <img
                  className="w-[44px] h-[44px] rounded-lg"
                  src={item.img}
                  alt="Bidder"
                />
              </div>
              <div className="flex justify-between w-full px-2">
                <div className="text-left">
                  <div className="flex gap-3">
                    <p className="text-[0.97vw] font-urbanist font-bold">
                      {item.name}
                    </p>
                    <p className="text-[0.84vw] text-[#7a798a] font-urbanist">
                      {item.bid}
                    </p>
                  </div>
                  <p className="text-[0.84vw] text-[#7a798a] font-urbanist">
                    {item.time}
                  </p>
                </div>
                <div>
                  <p className="text-[0.97vw] font-urbanist font-bold">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
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

export default SingleProductTabs;
