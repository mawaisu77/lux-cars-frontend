// import Header from "../../header/index";
import { Link } from "react-router-dom";
import image from "../../../assets/fees/Image_Placeholder(1).png";
import image1 from "../../../assets/fees/Image Placeholder.png";
import image2 from "../../../assets/fees/repeat.png";
import image3 from "../../../assets/fees/Horizontal - White0 1.png";
import { PiUsersFill } from "react-icons/pi";
// import { feesLeftCard } from '../../../data/data';
import { feesLeftCard } from "../../../../data/data.js";
// import image1 from '../../../assets/fees/Horizontal - White0 1.png'
import Card from "./Card.js";
// feesRightCard
import {
  feesRightCard,
  BuyerFeesListCardList,
  VirtualBidFeeCardList,
} from "../../../data/data.js";
import Header from "../../../../Components/header/index.js";
import BuyerFeesListCard from "./BuyerFeesListCard.js";
import VirtualBidFeeCard from "./VirtualBidFeeCard.js";

// import { BuyerFeesListCard } from "../../../data/data.js";
function Feespage() {
  return (
    <>
      <div className="bg-fees">
        <div className="hidden  lg:block">
          <div className="  w-[15.5] flex flex-col  mt-[5.5vh]">
            <div className="text-[2.6vw] bg-black font-semibold text-white">
              Fees Overview
            </div>

            <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist ">
              <Link to="/">
                {" "}
                <button className="hover:text-white hover:text-[1.1vw]  ">
                  Homeeee
                </button>
              </Link>
              /
              <button className="hover:text-white hover:text-[1.1vw]">
                Fees Overviewww
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100vw]">
      <div className="max-w-[85vw]  sm:max-w-[73.177vw] mx-auto">
        <div className="md:flex md:justify-between ">
          <div className="">
            <div className="">
              <h1 className="text-left text-[36px] md:text-[1.875vw]  font-[700] text-[#1F1F2C] font-urbanist md:mb-[1.25vh] mb-[40px]">
                Bidding at LUX
              </h1>
              <div className="relative">
                <img src={image} className="w-auto" alt="image_"/>
                <img
                  alt="image3"
                  src={image3}
                  className=" w-[150px] md:w-[14vw] absolute top-[30px] md:top-[10.917vh] left-[25px] md:left-[1.5vw]"
                />
              </div>
            </div>
            <div className="mt-[30px] md:mt-[1.563vh]  ">
              <h2 className="text-left text-[22px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist">
                Advantages Of Bidding Through Lux First Choice Cars
              </h2>

              <div className="  flex flex-wrap text-center justify-center md:justify-start lg:justify-start mt-[30px] md:mt-[1.563vh] gap-[12px]">
                {feesLeftCard.map((data, index) => (
                  <Card id={index} data={data} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[100%] md:w-[33.542vw] md:mt-[0vw] mt-[105px] ">
            <div>
              <h2 className="text-left text-[30px] md:text-[1.875vw] font-[700] text-[#1F1F2C] font-urbanist mb-[1.25vh]">
                Bidding at COPART / IAAI
              </h2>
              <img src={image1} alt="image1" />
            </div>

            <h2 className="text-left text-[20px] md:text-[1.35vw] font-[700] text-[#1F1F2C] font-urbanist mt-[30px] md:mt-[1.563vh] mb-[1.25vh]">
              drawbacks of bidding directly t Copart/IAAI auctions
            </h2>

            <div className="mt-[0.833vh] text-center justify-center flex flex-wrap mt-[30px] md:mt-[1.563vh]  gap-[12px]">
              {feesRightCard.map((data, index) => (
                <Card id={index} data={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="md:mt-[4vh] mt-[100px] md:mb-[4vh] mb-[30px]">
          <h2 className="text-left text-[40px] md:text-[2.083vw] font-[700] text-[#1F1F2C] font-urbanist">
            Fees:
          </h2>
          <p className="text-left text-[17px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
            Copart buyer fees are charged for all vehicles and other items
            purchased at a Copart auction, including miscellaneous salvage items
            sold as “Other Goods.” Different fees are assessed for
            individual/public buyers and business buyers with valid licenses on
            file. Fee may differ depending on the amount of the winning bid.
          </p>
          <div className="text-left flex gap-[10px] md:gap-[0.521vw] mt-[1.563vh] mb-[0.833vh]">
            
          </div>
        </div>
        <div className=" w-[100%] md:w-[66.823vw] mx-auto mb-[50px]  md:mb-[1.719vh]">
          <div className="flex flex-wrap justify-between">
            <div className="text-left flex flex-wrap gap-[5px] md:gap-[0.417vw] items-center">
              <div className="rounded-[2.396vw] bg-[#D8ECFF] w-[20px] h-[20px] lg:w-[1.802vw] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                <img src={image2} className="w-[70%] md:w-[1.5vw]" />
              </div>
              <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                Buyer Fees Lists
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-[7px]  gap-[0.417vw]">
              <select className="w-[105px]  md:w-[6.5vw] lg:w-[6.25vw] rounded-[4px] md:rounded-[0.417vw] border border-grey-500 outline-none h-[30px] md:h-[3.385vh] text-left text-[10px] md:text-[1vw] lg:text-[0.529vw] font-[400] font-urbanist">
                <option className="">General fee</option>
                <option>General fee</option>
                <option>General fee</option>
              </select>
              {/* <div className="md:w-[1.8vw] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center items-center text-center md:-pt-[15px] justify-center border rounded-[6px] md:rounded-[0.217vw]">
                <p className="text-[20px] md:text-[#292D32]">...</p>
              </div> */}
              <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center items-center text-center items-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                ...
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-[15px] md:mt-[0.833vh] mr-[1.875vw]">
            <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
              Sale Price Range
            </h2>
            <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
              Standard Vehicle Fee
            </h2>
          </div>
          <hr className="bg-[#131313] opacity-[35%] mt-[0.521vh] mb-[0.833vh]" />
          <div className="">
            {BuyerFeesListCardList.map((data, index) => (
              <div className="flex justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[2.604vh]">
                <BuyerFeesListCard id={index} data={data} />
              </div>
            ))}
          </div>

          <div className="flex flex-start md:block mt-[5px] md:mt-[1vw]">
            <button className="text-left text-[15px] md:text-[1vw] lg:text-[0.781vw] w-[130px] font-[700] md:w-[8vw] md:h-[3.5vh]  lg:w-[6.771vw] h-[50px] lg:h-[6vh] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] md:py-[0.5vh] md:px-[1vh] lg:py-[0.833vh] md:px-[2.5vw] md:px-[1vw]  lg:px-[2.083vh] font-[700] text-[#CA0000] font-urbanist">
              Load More
            </button>
          </div>
        </div>
        <div className=" w-[100%] md:w-[66.823vw] mx-auto  mb-[50px] md:mb-[1.719vh]">
          <div className="flex flex-wrap justify-between">
            <div className="text-left flex items-center flex-wrap gap-[5px] md:gap-[0.417vw]">
              <div className="rounded-[2.396vw] bg-[#D8ECFF] lg:w-[1.802vw] w-[20px] h-[20px] md:w-[4vw] md:h-[4vh] lg:h-[3.3vh] flex items-center justify-center">
                <img src={image2} className="w-[70%] md:w-[1.5vw]" />
              </div>
              <h2 className="text-left text-[18px] md:text-[0.938vw] font-[500] md:font-[600]  text-[#131313] font-urbanist">
                Virtual Bid Fee
              </h2>
            </div>
            <div className="hidden md:flex flex-wrap justify-center items-center  gap-[0.417vw]">
              <select className="md:w-[6.5vw] bold-[700] lg:w-[6.25vw] border-grey-400 outline-none rounded-[0.417vw] border text-gray border-grey-500 outline-none h-[65px] md:h-[3.385vh] text-left md:text-[1vw] lg:text-[0.529vw] font-[400] font-urbanist">
                <option>General fee</option>
                <option>General fee</option>
                <option>General fee</option>
              </select>
              <div className="md:w-[1.8vw] text-[20px] md:text-[#292D32] pb-[2px] lg:w-[1.563vw] h-[30px] w-[25px] md:h-[3.385vh] flex md:items-end flex-center items-center text-center items-center justify-center border rounded-[6px] md:rounded-[0.217vw]">
                ...
              </div>
            </div>
          </div>
          <div className="w-full w-[300px]  md:w-auto overflow-x-scroll whitespace-nowrap md:overflow-hidden  ">
            <div className="flex  w-[400px] md:w-auto justify-between mt-[15px]   md:mt-[0.833vh] md:mr-[1.875vw]">
              <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] w-[26.823vw]  text-[#131313] font-urbanist">
                Sale Price Range
              </h2>
              <h2 className="text-left text-[15px] md:text-[0.938vw]  font-[500] md:font-[600] text-[#131313] font-urbanist">
                Pre Bid Fee
              </h2>
              <h2 className="text-left text-[15px] md:text-[0.938vw] font-[500] md:font-[600] text-[#131313] font-urbanist">
                Standard Vehicle Fee
              </h2>
            </div>
            <hr className=" opacity-[35%] w-[400px]  mt-[0.521vh] mb-[0.833vh]" />
            <div className="  ">
              {VirtualBidFeeCardList.map((data, index) => (
                <div className="flex w-[400px] flex-end md:w-[100%]  justify-between mt-[0.833vh] mr-[1.875vw]  mb-[20px]  md:mb-[2.604vh]">
                  <VirtualBidFeeCard id={index} data={data} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-start md:block mt-[5px] md:mt-[1vw]">
            <button className="text-left text-[15px] md:text-[1vw] lg:text-[0.781vw] w-[130px] font-[700] md:w-[8vw] md:h-[3.5vh]  lg:w-[6.771vw] h-[50px] lg:h-[6vh] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] md:py-[0.5vh] md:px-[1vh] lg:py-[0.833vh] md:px-[2.5vw] md:px-[1vw]  lg:px-[2.083vh] font-[700] text-[#CA0000] font-urbanist">
              Load More
            </button>
          </div>

          {/* <div className="flex flex-start md:block mt-[5px] md:mt-[1vw]">
            <button className="text-left text-[15px] md:text-[0.6vw] lg:text-[0.781vw] w-[130px] md:w-[6.771vw] h-[50px] md:h-[5.208vh] text-center rounded-[30px] md:rounded-[1.563vw] bg-[#F3F3F6] md:py-[0.5vh] md:px-[1vh] lg:py-[0.833vh]  lg:px-[2.083vh] font-[700] text-[#CA0000] font-urbanist">
              Load More
            </button>
          </div> */}
        </div>
        <div className="mt-[15px] md:mt-[1.563vh]">
          <h2 className="text-left text-[24px]  md:text-[1.25vw]  font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
          Service Fee: 
          </h2>
          <p className="text-left text-[15px] md:text-[0.938vw] font-[400] text-[#7A798A] font-urbanist">
          $95 per unit for vehicle handling, including vehicle pull out and loading.
          </p>
        </div>
        <div className="mt-[15px] md:mt-[1.563vh]">
          <h2 className="text-left text-[22px] md:text-[1.25vw] font-[700] text-[#1F1F2C] font-urbanist mb-[15px] md:mb-[0vh]">
            Late Fees, Storage Fees, Mailing Fees, and Relist Fees:
          </h2>
          <p className="text-left text-[15px] md:text-[0.938vw]  font-[400] text-[#7A798A] font-urbanist">
            The vehicle amount and all applicable fees must be paid within 3
            business days of purchase, including the day of sale, to avoid a fee
            of $50 per vehicle (late fee). Storage rates may vary by location.
            If the lot is not paid in full within 8 calendar days (including the
            day of sale), the vehicle will be relisted. The Relist Fee will be
            10% of the final sale price with a minimum of $750. Mailing fee $50
            is applicable for each won lot.
          </p>
        </div>
      </div>
      </div>

    </>
  );
}

export default Feespage;
