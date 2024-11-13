import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Stack,
  TableCell,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  RemoveCircleOutline,
  AddCircleOutline,
  Visibility,
  People,
} from "@mui/icons-material";

import Select from "react-select";
// IMAGES path
import placeholder from "../../../assets/Vehicle/IMG (50).png";
import VerticleSwiper from "./ui/VerticleSwiper";
import CircularProgress from "./ui/CircularProgress";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";
import TooltipGlobal from "./ui/tooltip/TooltipGlobal";
import { IoInformationCircleOutline } from "react-icons/io5";


const ImageContainer = styled(Box)({
  width: "100%",
  height: "150px",
  marginBottom: "10px",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
// Styled components
const QuickBidButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#E8F9F9",
  color: "#000",
  borderRadius: "25px",
  "&:hover": {
    backgroundColor: "#D1F4F4",
  },
  textTransform: "none",
  padding: "8px 16px",
  width: "100%",
}));

const BidDetails = () => {
  const [currentBid, setCurrentBid] = useState(9000);
  const [manualBid, setManualBid] = useState(9100);
  const [timeLeft, setTimeLeft] = useState("04 : 23 : 10 : 39");
  const carImages = [
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
  ];

  const quickBids = [100, 200, 300, 400, 500, 1000];
  return (
    <>
      <div className="p-3 max-w-[100%] mx-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[30px] font-medium">
            Chevrolet GMT-400
          </span>
            <div className="px-2 text-[26px] bg-secondary-gray rounded-xl flex items-center gap-2 py-1 rounded-20">
              <span className="text-[18px]">Countdown:</span>
              <span className="text-[20px]">{timeLeft}</span>
            </div>

            <div className="flex gap-4">
            <div className="flex items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl">
              <Visibility className="text-[14px]"/> <span className="text-[14px]">225</span>
            </div>
            <div className="flex  items-center  px-2 py-1 gap-1 bg-secondary-gray rounded-3xl">
              <People className="text-[14px]"/> <span className="text-[14px]">10</span>
            </div>
            </div>
        </div>

        <div className="flex gap-x-8 ">
          {/* Left side - Image gallery */}
          <div className="w-[300px]">
            <VerticleSwiper images={carImages} />
          </div>

          {/* Right side - Bidding interface */}
          <Box sx={{ flex: 1 }}>
            <div className="mb-3 text-gray-500 text-left">
              Habitant sollicitudin faucibus cursus lectus pulvinar dolor non
              ultrices eget. Facilisi lacerat morbi fringilla urna amet sed
              ipsum vitae malesuada. Habitant sollicitudin faucibus cursus
              lectus pulvinar dolor non ultrices eget.
            </div>

            <div className="relative mb-4 grid grid-cols-12 p-3 rounded-md shadow-md">
              <div className="col-span-8">
                <div className="mb-2 grid grid-cols-12  items-center">
                  <div className="flex flex-col col-span-8 items-center relative mb-2">
                    <span className="text-[15px] mb-[12px] font-medium">Active Bid:</span>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      IRAQ
                    </Typography>
                    <div className="relative inline-flex">
                      <CircularProgress />
                      {/* <div
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="h4" fontWeight="bold">
                              ${currentBid}
                            </Typography>
                          </div> */}
                    </div>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Highest BID!
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      All Bids in USD!
                    </Typography>
                  </div>
             
                </div>
                     <div className=" flex gap-3 mb-2 ">
                          <input
                      value={manualBid}
                      onChange={(e) => setManualBid(Number(e.target.value))}
                      className="w-[120px] border border-gray-300 rounded-lg px-2 py-2 text-center"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-[22px] text-red-600 rounded-lg border border-red-600 p-1"><IoIosRemove /></span>
                      <span className="text-[22px] text-red-600 rounded-lg border border-red-600 p-1  "><IoIosAdd /></span>
                    </div>
                    
                  </div>
              </div>
              <div className="col-span-4">
                <h1 className="text-[15px] mb-[12px] font-medium">Quick Bid Increase</h1>
                <div className="mb-2 flex flex-wrap gap-1 text-[15px] font-medium">
                  {quickBids.map((amount) => (
                    <div
                      onClick={() => setCurrentBid(currentBid + amount)}
                      className="w-full flex items-center gap-1 justify-center px-2 py-1.5 bg-[#E8F9F9] text-[#15CAB8] hover:bg-[#D1F4F4] border border-[#15CAB8] rounded-lg cursor-pointer"
                    >
                      <span className=""><FaArrowTrendUp /></span>
                      <span className="">${amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="w-full flex items-center justify-center gap-2 px-2 py-1.5 bg-[#DC2626] text-white hover:bg-[#B91C1C] border border-[#DC2626] rounded-lg cursor-pointer"
            >
              <FaBagShopping />
              <span>Place Bid</span>
            </div>

            <div className="w-full mt-3 text-left">
              <span className=" text-[16px] font-medium">
                Auto Bid For Me
              </span>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white w-full">
              {/* Dollar Prefix */}
              <span className="mr-2 text-gray-500">$</span>
              
              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter amount"
                className=" focus:outline-none text-gray-700 w-full"
              />
             <TooltipGlobal
                title="Dynamic Bidding Guide"
                description="The incremental bid based on the vehicles value is as follows:"
                tableData={[
                  { range: '1 - 5', increment: '1' },
                  { range: '5 - 40', increment: '5' },
                  { range: '40 - 100', increment: '10' },
                  { range: '100 - 1,000', increment: '25' },
                  { range: '1,000 - 5,000', increment: '50' },
                ]}
                  customStyles={{
                    color: '#fff',
                    headerStyles: { fontSize: '18px' },
                    paragraphStyles: { fontSize: '14px', color: '#fff' },
                  }}
                  placement="left"
                  hoverComponent={<span className="cursor-pointer text-[20px]"><IoInformationCircleOutline /></span>}
                />
        </div>
              {/* <Typography variant="caption" color="text.secondary">
                      This is a proxy bid when you aren't teavailable. Enter your
                      max value cap
                    </Typography> */}
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default BidDetails;
