import React from 'react'
import BidHistory from '../BidHistory'
import InfoRow from './InfoRow'
import { damageDescriptions, getDamageColorClass } from '../DamageColorCodes';
import { getOdometerColorClass, odometerDescriptions } from '../OdometerColor';
import { formatMileageMiles } from '../../../SearchPage/search-page/searchCard';
import ProtectionNote from './ProtectionNote';


const VehicleDetailInfo = ({data, currentStatus, currentDocumentOldType, salesHistoryCount}) => {
  const damageColorCode = getDamageColorClass(data?.damage_pr);
  const damageColorCode2 = getDamageColorClass(data?.damage_sec);
  const odometerColorClass = getOdometerColorClass(data?.odometer);

  return (
    <div className="grid  gap-[1vw]">

<ProtectionNote currentDocumentOldType={currentDocumentOldType} damageColorCode={damageColorCode} damageType={data?.damage_pr} salesHistoryCount={salesHistoryCount} />


    {/* Vehicle Info */}
    <section className="   bg-white w-full p-[1.5vw] rounded-lg shadow-sm mt-5">
      <h2 className="text-sm lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
        Vehicle Info
      </h2>
      <div className="space-y-[2vh] text-sm md:text-18 font-medium lg:leading-[1.5vw] tracking-wide">
        <InfoRow
          label="Title"
          value={data?.title || "N/A"}
        />
        <InfoRow
          label="Engine"
          value={data?.engine || "N/A"}
        />
        <InfoRow
          label="Year"
          value={data?.year || "N/A"}
        />
        <InfoRow
          label="Drivetrain"
          value={data?.drive || "N/A"}
        />
        <InfoRow
          label="Mileage"
          value={formatMileageMiles(data?.odometer) || "N/A"}
          className={odometerColorClass}
          description={odometerDescriptions[odometerColorClass] || ''} 
        />
        <InfoRow
          label="Transmission"
          value={data?.transmission || "N/A"}
        />
        <InfoRow
          label="Damage Primary"
          value={data?.damage_pr || "N/A"}
          className={damageColorCode}
          description={damageDescriptions[data?.damage_pr] || ''}

        />
        <InfoRow
          label="Damage Secondary"
          value={data?.damage_sec || "N/A"}
          className={damageColorCode2}
          description={damageDescriptions[data?.damage_sec] || ''} 

        />
        <InfoRow
          label="Start Code"
          value={data?.status || "N/A"}
          className={currentStatus?.hex_new}
          description={currentStatus?.description}
        />
      </div>
    </section>

    {/* Location */}
    <section className="  bg-white p-[1.5vw] rounded-lg shadow-sm">
      <h2 className="text-lg lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
        Location
      </h2>
      <div className="space-y-[2vh] text-sm md:text-18 lg:leading-[1.5vw] font-medium tracking-wide">
        <InfoRow
          label="Location"
          value={data?.location || "N/A"}
        />
        <InfoRow
          label="Location Old"
          value={data?.location_old || "N/A"}
        />
        <InfoRow
          label="Country"
          value={data?.country || "N/A"}
        />
        <InfoRow
          label="State"
          value={data?.state || "N/A"}
        />
        <InfoRow
          label="Document"
          value={data?.document || "N/A"}
        />
        <InfoRow
          label="Document Old"
          value={data?.document_old || "N/A"}
        />
      </div>
    </section>

      {/* Specifications */}
    <div className="flex flex-col justify-center gap-y-[2.1vh]">
      <section className="   bg-white p-[1.5vw] my-4 rounded-lg shadow-sm">
        <h2 className="text-xl lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2.1vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.4vw]">
          Specifications
        </h2>
        <div className="space-y-[2vh] text-sm md:text-18 lg:leading-[1.5vw] font-medium tracking-wide">
        <InfoRow
            label="Vehicle Type"
            value={data?.vehicle_type || "N/A"}
          />
          <InfoRow
            label="Cylinders"
            value={data?.cylinders || "N/A"}
          />
          <InfoRow
            label="Make"
            value={data?.make || "N/A"}
          />
          <InfoRow
            label="Model"
            value={data?.model || "N/A"}
          />
          <InfoRow
            label="Series"
            value={data?.series || "N/A"}
          />
          <InfoRow
            label="Keys"
            value={data?.keys || "N/A"}
          />
          <InfoRow
            label="Fuel"
            value={data?.fuel || "N/A"}
          />
          <InfoRow
            label="Color"
            value={data?.color || "N/A"}
          />
        </div>
      </section>
    </div>


    {/* Bid history */}
    <div className="">
      <div>
        <h2 className="text-md lg:text-[1.2vw] font-semibold bg-gray-300 mb-[2vh] border-b-2 border-gray-200 p-[0.5vw] rounded-[0.375vw]">
          Bid History
        </h2>
      </div>
      <BidHistory data={data} />
    </div>
  </div>
  )
}

export default VehicleDetailInfo