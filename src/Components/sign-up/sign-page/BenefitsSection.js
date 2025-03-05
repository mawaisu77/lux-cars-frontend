import { MdOutlineVerifiedUser } from "react-icons/md";
import { PiCellTower } from "react-icons/pi";
import { FaShoppingBag } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";


export default function BenefitsSection() {
  return (
    <div className="mt-5 md:mt-[1.042vw] max-w-[66.667vw] mx-auto p-6 md:p-[1.25vw]">
      {/* Main Content */}
      <div className="space-y-12 md:space-y-[1.25vw]">
        {/* Title */}
        <h2 className="text-3xl md:text-30 font-bold text-[#1F1F2C] text-center">Benefits Of Lux Cars</h2>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 lg:gap-[2vw] max-w-2xl lg:max-w-[42vw] mx-auto">
          <div className="text-center">
            <div className="text-5xl md:text-40 font-bold text-red-600">50+</div>
            <div className="text-gray-600 mt-2 lg:text-[1vw]">Categories Available</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-40 font-bold text-red-600">12.5k+</div>
            <div className="text-gray-600 mt-2 lg:text-[1vw] md:mt-[0.208vw]">Community</div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-[1.25vw]   ">

          <div className="hover:bg-[#D5C1F6] border border-[#A3A3A3] duration-300 rounded-lg md:rounded-[0.833vw] p-6 md:p-[1.25vw] relative">
            <div className="absolute -top-3 -left-3 md:top-[-0.833vw] md:left-[-0.833vw] p-1 bg-white rounded-full flex items-center justify-center mb-4 md:mb-[0.208vw]">
              <MdOutlineVerifiedUser className="text-white text-3xl md:text-36 bg-[#553094] rounded-full p-1.5 md:p-[0.308vw]" />
            </div>
            <h3 className="text-lg md:text-24 lg:leading-[2.5vw] font-semibold mt-2 md:mt-[0.208vw]">
              You Can Easily Bid For Vehicles
            </h3>
          </div>

          <div className="hover:bg-[#D5C1F6] border border-[#A3A3A3] duration-300 rounded-lg md:rounded-[0.833vw] p-6 md:p-[1.25vw] relative">
          <div className="absolute -top-3 -left-3 md:top-[-0.833vw] md:left-[-0.833vw] p-1 bg-white rounded-full flex items-center justify-center mb-4 md:mb-[0.208vw]">
          <PiCellTower className="text-white text-3xl md:text-36 bg-[#553094] rounded-full p-1.5 md:p-[0.308vw]" />
            </div>
            <h3 className="text-lg md:text-24 font-semibold mt-2 lg:leading-[2.5vw] md:mt-[0.208vw]">
              You can sell your vehicles with ease
            </h3>
          </div>

          <div className="hover:bg-[#D5C1F6] border border-[#A3A3A3] duration-300 rounded-lg md:rounded-[0.833vw] p-6 md:p-[1.25vw] relative">
          <div className="absolute -top-3 -left-3 md:top-[-0.833vw] md:left-[-0.833vw] p-1 bg-white rounded-full flex items-center justify-center mb-4 md:mb-[0.208vw]">
          <FaShoppingBag className="text-white text-3xl md:text-36 bg-[#553094] rounded-full p-1.5 md:p-[0.308vw]" />
            </div>
            <h3 className="text-lg md:text-24 font-semibold lg:leading-[2.5vw] mt-2 md:mt-[0.208vw]">
            platform has lowest fees with max rewards
            </h3>
          </div>

          <div className="hover:bg-[#D5C1F6] border border-[#A3A3A3] duration-300 rounded-lg md:rounded-[0.833vw] p-6 md:p-[1.25vw] relative">
          <div className="absolute -top-3 -left-3 md:top-[-0.833vw] md:left-[-0.833vw] p-1 bg-white rounded-full flex items-center justify-center mb-4 md:mb-[0.208vw]">
          <IoSettings className="text-white text-3xl md:text-36 bg-[#553094] rounded-full p-1.5 md:p-[0.308vw]" />
            </div>
            <h3 className="text-lg md:text-24 lg:leading-[2.5vw] font-semibold mt-2 md:mt-[0.208vw]">
            Extensive Search To Save Time & Money
            </h3>
          </div>

 
        </div>
      </div>
    </div>
  );
}
