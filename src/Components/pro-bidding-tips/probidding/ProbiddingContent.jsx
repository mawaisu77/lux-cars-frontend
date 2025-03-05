import React from "react";
import imageee from "../../../assets/Vehicle/IMG (50).png";
import { Link } from "react-router-dom";

const ProbiddingContent = () => {
  return (
    <>
      <div className="back-image">
        <div className="w-[15.5] flex flex-col pt-[20vh]">
          <div className="text-[2.6vw] font-semibold text-white">
            Probidding Tips
          </div>
          <div className="text-white flex gap-3 justify-center text-[1vw] font-urbanist">
            <Link to="/">
              <button className="hover:text-white hover:scale-110 duration-150">
                Home
              </button>
            </Link>
            /
            <button className="hover:text-white hover:scale-110 duration-150">
              Probidding Tips
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-[85vw] mx-auto">
        
          {/* Pro Bidding Tips */}
          <section className="bg-white p-8 rounded-xl shadow-sm transition  flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Pro Bidding Tips
              </h2>
              <ul className="space-y-4 text-gray-700 text-left">
                <li className="flex items-start space-x-3">
                  <span className="text-xl text-red-500">✔</span>
                  <p>
                    <strong>Understand the Market:</strong> Research recent
                    sales to determine fair prices.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl text-red-500">✔</span>
                  <p>
                    <strong>Set a Budget:</strong> Decide the maximum amount to
                    spend and stick to it.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl text-red-500">✔</span>
                  <p>
                    <strong>Inspect Vehicle Listings:</strong> Examine
                    descriptions and photos closely.
                  </p>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-xl text-red-500">✔</span>
                  <p>
                    <strong>Check Vehicle History:</strong> Use ClearVin for
                    detailed past reports.
                  </p>
                </li>
              </ul>
            </div>
            <img
              src={imageee}
              alt="First-Time Buyers"
              className="lg:w-1/2 h-auto max-h-[300px] object-cover rounded-lg"
            />
          </section>

          {/* First-Time Buyers Tips */}
          <section className="mt-10 bg-white p-8 rounded-xl shadow-sm transition  flex flex-col lg:flex-row items-center gap-8">
            <img
              src={imageee}
              alt="First-Time Buyers"
              className="lg:w-1/2 h-auto max-h-[400px] object-cover rounded-lg"
            />
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                5 Essential Tips for First-Time Car Auction Buyers
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Entering the car auction world in the Caribbean can be both
                thrilling and challenging. Here’s how to make it a success:
              </p>
              <ul className="space-y-4 text-gray-700 text-left">
                <li>
                  ✅ Familiarize yourself with auction processes, whether online
                  or in-person.
                </li>
                <li>
                  ✅ Review available vehicles and check history reports using
                  ClearVin.
                </li>
                <li>
                  ✅ Set a firm budget including customs and import duties in
                  the Bahamas.
                </li>
                <li>
                  ✅ Inspect vehicles carefully or have a professional evaluate
                  them.
                </li>
                <li>
                  ✅ If bids exceed your budget, step back—new opportunities
                  always arise.
                </li>
              </ul>
            </div>
          </section>

          {/* Spotting a Great Deal */}
          <section className="mt-10 bg-white p-8 rounded-xl shadow-sm transition  flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                How to Spot a Great Deal at Car Auctions
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Finding a gem in car auctions requires a keen eye for detail and
                market knowledge.
              </p>
              <ul className="space-y-4 text-gray-700 text-left">
                <li>📌 Understand import duty rates and shipping costs.</li>
                <li>
                  📌 Assess repair costs against the vehicle's local market
                  value.
                </li>
                <li>
                  📌 Check for tropical climate impact, flood damage, and
                  corrosion.
                </li>
                <li>📌 Monitor bidding patterns and time your bids wisely.</li>
              </ul>
            </div>
            <img
              src={imageee}
              alt="First-Time Buyers"
              className="lg:w-1/2 h-auto max-h-[350px] object-cover rounded-lg"
            />
          </section>

          {/* Market Trends */}
          <section className="mt-10 bg-white p-8 rounded-xl shadow-sm transition  flex flex-col lg:flex-row items-center gap-8">
            <img
              src={imageee}
              alt="First-Time Buyers"
              className="lg:w-1/2 h-auto max-h-[350px] object-cover rounded-lg"
            />
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                The Impact of Market Trends on Car Auction Prices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Car auction prices in the Caribbean are influenced by various
                global and local factors.
              </p>
              <ul className="space-y-4 text-gray-700 text-left">
                <li>
                  🌎 Changes in customs regulations and import duties affect
                  prices.
                </li>
                <li>
                  🌎 Seasonal demand, such as tourist seasons, impacts
                  convertible prices.
                </li>
                <li>
                  🌎 Increased imports can create a buyer’s market with lower
                  prices.
                </li>
                <li>
                  🌎 Global events can disrupt supply chains, affecting
                  availability and pricing.
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProbiddingContent;
