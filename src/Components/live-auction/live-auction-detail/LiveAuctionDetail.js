import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Stack,
  CircularProgress,
  Select,
  MenuItem,
  TableCell,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  KeyboardArrowDown,
  RemoveCircleOutline,
  AddCircleOutline,
  Visibility,
  People,
} from "@mui/icons-material";
import Header from "../../header/Header/Header";
import { Link } from "react-router-dom";
import PreviousBids from "./tables/PreviousBids";
import BidDetails from "./BidDetails";
import UpcomingBids from "./tables/UpcomingBids";

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

const LiveAuctionDetail = () => {
  const [currentBid, setCurrentBid] = useState(9000);
  const [manualBid, setManualBid] = useState(9100);
  const [timeLeft, setTimeLeft] = useState("04 : 23 : 10 : 39");

  const carImages = [
    "/placeholder.svg?height=150&width=250",
    "/placeholder.svg?height=150&width=250",
    "/placeholder.svg?height=150&width=250",
    "/placeholder.svg?height=150&width=250",
    "/placeholder.svg?height=150&width=250",
    "/placeholder.svg?height=150&width=250",
  ];

  const quickBids = [100, 200, 300, 400, 500, 1000];
  // Styled components

  return (
    <>
      <div className="lg:block hidden bg-vehicle">
        <div className="w-[15.5] flex flex-col pt-[12.5vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Vehicle Detail
          </div>
          <div className=" text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:text-[1.1vw]">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:text-[1.1vw]">
              Live Auction
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1420px] grid grid-cols-12 mx-auto py-[40px]">
        <div className="col-span-7 w-full">
          <BidDetails />
        </div>
        <div className="flex flex-col gap-4 col-span-5 w-full">
          <PreviousBids />
          <UpcomingBids />
        </div>
      </div>
    </>
  );
};

export default LiveAuctionDetail;
