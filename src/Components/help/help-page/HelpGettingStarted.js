import React from 'react'
import { BiSolidFolderPlus } from "react-icons/bi";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";
import { BiDollar } from "react-icons/bi";
import { GrMoney } from "react-icons/gr";

const HelpGettingStarted = () => {
  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* 1. Getting Started */}
    <div className="text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <FaSquareArrowUpRight size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"1. Getting Started"}
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold mt-2">
        Registeration Process
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Welcome to BidCaribbean, a LUX First Choice Cars division. To
        start bidding:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Click “Register” on the homepage.</li>
        <li>
          Fill in your details, including name, contact info, and email.
        </li>
        <li>Upload a valid ID for verification.</li>
        <li>Set a refundable deposit to unlock your bidding power.</li>
      </ol>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Once verified, you can bid on top-quality vehicles at unbeatable
        prices.
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Understanding Bid Power
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Bid power determines the maximum amount you can bid. For instance:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>A $500 deposit unlocks $5,000 bid power.</li>
        <li>A $1,000 deposit unlocks $10,000 bid power.</li>
      </ol>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Deposits are refundable if you don’t win an auction, ensuring a
        risk-free bidding experience.
      </h1>
    </div>

    {/* 2. Bidding and Buying*/}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <GrMoney size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"2. Bidding and Buying"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        How to Bid
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Browse our extensive inventory using advanced filters.</li>
        <li>
          Click on a vehicle to view details, including condition and
          history.
        </li>
        <li>
          Place your bid or enter the maximum amount you’re willing to
          pay.
        </li>
        <li>
          Our system automatically increments your bid to keep you on top
          until your maximum is reached.
        </li>
      </ol>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Safe Bidding Practices by BidCaribbean
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Only bid on vehicles with verified reports.</li>
        <li>
          Review the vehicle’s condition, including images and
          descriptions.
        </li>
        <li>Never share your account credentials.</li>
      </ol>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Your security is our priority.
      </h1>
    </div>

    {/* 3. Pricing and Payment */}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <BiDollar size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"3. Pricing and Payment"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Fee Transparency
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        At BidCaribbean, we believe in transparent and upfront pricing.
        Here’s what’s included:
      </h1>

      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Winning Bid Amount: The final amount you bid.</li>
        <li>
          Buyer’s Premium: A percentage of the winning bid (displayed
          upfront).
        </li>
        <li>Taxes and Fees: Based on local regulations.</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        No hidden fees—just honest, transparent transactions!
      </h1>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Payment Methods We accept
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Credit/Debit Cards</li>
        <li>Bank Transfers</li>
        <li>Secure Payment Gateways</li>
      </ol>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Our team will guide you through the payment process after you win.
      </h1>
    </div>

    {/* 4. Vehicle Details */}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <BiSolidDetail size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"4. Vehicle Details"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Inspection Reports
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Every vehicle listing includes:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Verified vehicle history reports.</li>
        <li>
          Details on damages (e.g., hail, theft recovery, minor dents).
        </li>
        <li>High-resolution photos.</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold mt-2">
        Damage Descriptions
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Look for detailed tags like:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>{`“Cosmetic Damage”: Minor scratches or dents.`}</li>
        <li>{`“Hail Damage”: Damage caused by storms.`}</li>
        <li>{`“Repossessed”: Vehicles reclaimed by lenders.`}</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        These descriptions help you make informed choices.
      </h1>
    </div>

    {/* 5. Post-Auction Process*/}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <BiSolidFolderPlus size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"5. Post-Auction Process"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Winning and Next Steps
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        After winning an auction:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Receive a confirmation email with payment instructions.</li>
        <li>Complete payment within 48 hours.</li>
        <li>Choose pickup or delivery options.</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Our team will keep you updated every step of the way.
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold mt-2">
        Delivery Options
      </h1>
      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Enjoy seamless delivery services:
      </h1>
      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>{`“Local Pickup: Available at select locations.`}</li>
        <li>{`“Home Delivery: Convenient shipping to your doorstep.`}</li>
        <li>{`International Shipping: Options available for customers outside the Bahamas.`}</li>
      </ol>
    </div>

    {/* 6. Selling Your Car*/}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <FaCar size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"6. Selling Your Car"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Listing Process
      </h1>

      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Register as a seller and create your listing.</li>
        <li>
          Upload photos vehicle descriptions, and set a reserve price.
        </li>
        <li>Approve bids that meet or exceed your reserve.</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold mt-2">
        Maximizing Your Sale
      </h1>

      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>{`Use professional photos to highlight your vehicle’s features.`}</li>
        <li>{`Provide honest descriptions for better buyer trust.`}</li>
        <li>{`Set a competitive reserve price to attract more bids.`}</li>
      </ol>
    </div>

    {/* 7. Financing and Loans */}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <FaMoneyCheckDollar size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"7. Financing and Loans"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Need financial assistance? Apply for a loan in 3 simple steps:
      </h1>

      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>
          Complete the application form in the “Financing / Loan
          Application” section.
        </li>
        <li>
          Provide required documents, including proof of income and ID.
        </li>
        <li>Receive a loan approval within 48 hours.</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Approved Financial Partners
      </h1>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        We partner with trusted institutions to offer flexible plans. Our
        team will connect you with the right lender for your budget and
        needs.
      </h1>
    </div>

    {/* 8. Contact Support*/}
    <div className=" text-left border shadow-md w-full flex flex-col justify-start items-start rounded-xl p-4">
      <div className="flex justify-center items-center p-1 rounded-lg bg-red-500 ">
        <MdContactPhone size={25} color="white" />
      </div>
      <h1 className="mt-2 text-[20px] lg:text-30 font-urbanist font-semibold">
        {"8. Contact Support"}
      </h1>
      <h1 className="text-[20px] mt-2 lg:text-22 font-urbanist font-semibold">
        Have questions or need assistance? Our support team is here to
        help:
      </h1>

      <ol className="text-left list-decimal list-inside text-[14px] lg:text-18 font-urbanist text-[#6d6d74]">
        <li>Email: support@luxfirstchoicecars.com</li>
        <li>Phone: +1 242-555-1234</li>
      </ol>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        Approved Financial Partners
      </h1>

      <h1 className="text-[20px] lg:text-22 font-urbanist font-semibold">
        We partner with trusted institutions to offer flexible plans. Our
        team will connect you with the right lender for your budget and
        needs.
      </h1>
    </div>
  </div>
  )
}

export default HelpGettingStarted