import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";

import image1 from '../../../assets/Vehicle/IMG (54).png'

const SingleProductTabs = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const TabHistory = [
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400"
    },
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400"
    },
    {
      img: image1,
      name: "Mason Woodward",
      bid: "bid accepted",
      time: "8 hours ago",
      price: "$400"
    },
  ];

  return (
    <TabGroup className="">
      <TabList className="w-full flex justify-between p-3">
        <Tab className="hover:text-red-500 active:border-none focus:border-none outline-none">Vehicle Info</Tab>
        <Tab className="hover:text-red-500 active:border-none focus:border-none outline-none">Bid History</Tab>
        <Tab className="hover:text-red-500 active:border-none focus:border-none outline-none">Calculator</Tab>
        <Tab className="hover:text-red-500 active:border-none focus:border-none outline-none">Get Report</Tab>
        <Tab className="hover:text-red-500 active:border-none focus:border-none outline-none">Help</Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="max-w-[1000px] mx-auto">
          <div className="flex justify-between text-left my-10 leading-8">
            <div className="text-left">
              <p className="text-[0.84vw] text-[#7a798a]">Engine: <span className="text-[1vw] text-black font-urbanist font-bold">4.3L V6</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Drivetrain: <span className="text-[1vw] text-black font-urbanist font-bold">Rear-Wheel Drive</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Transmission: <span className="text-[1vw] text-black font-urbanist font-bold">Manual</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Odometer: <span className="text-[1vw] text-black font-urbanist font-bold">255,936 mi (411,889 km)</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Condition: <span className="text-[1vw] text-black font-urbanist font-bold">Normal Wear, Minor Dent/Scratches</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Start Code: <span className="text-[1vw] text-black font-urbanist font-bold">Run and Drive</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Airbag Checked: <span className="text-[1vw] text-black font-urbanist font-bold">Driver, Passenger, Left, Right</span></p>
            </div>
            <div>
              <p className="text-[0.84vw] text-[#7a798a]">From: <span className="text-[1vw] text-black font-urbanist font-bold">Kansas City, KS</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">To: <span className="text-[1vw] text-black font-urbanist font-bold">Houston, TX</span></p>
              <p className="text-[0.84vw] text-[#7a798a]">Date: <span className="text-[1vw] text-black font-urbanist font-bold">Monday, May 13, 2024</span></p>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="max-w-[1000px] mx-auto">
          {TabHistory.map((item, index) => (
            <div key={index} className="flex w-full my-2">
              <div>
                <img className="w-[44px] h-[44px] rounded-lg" src={item.img} alt="Bidder"/>
              </div>
              <div className="flex justify-between w-full px-2">
                <div className="text-left">
                  <div className="flex gap-3">
                    <p className="text-[0.97vw] font-urbanist font-bold">{item.name}</p>
                    <p className="text-[0.84vw] text-[#7a798a] font-urbanist">{item.bid}</p>
                  </div>
                  <p className="text-[0.84vw] text-[#7a798a] font-urbanist">{item.time}</p>
                </div>
                <div>
                  <p className="text-[0.97vw] font-urbanist font-bold">{item.price}</p>
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
