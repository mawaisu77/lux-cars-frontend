export default function VehicleDetails({vehicle}) {


  console.log("1111111111111111",vehicle)
    return (
      <div className="max-w-[73.229vw] mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-30 bg-gray-100 p-2 rounded-lg font-bold text-center mb-8 md:mb-[0.5vw]">Vehicle Details</h1>

          {/* Grid Section */}
        <div className="grid w-full grid-cols-12 gap-6">
            <div className="bg-white col-span-6 rounded-lg md:rounded-[0.938vw] shadow-md p-6 md:p-[1.25vw]">
              <div className="space-y-3 md:space-y-[0.925vw]">
                <DetailRow label="Lot" value={vehicle?.make || "N/A"} />
                <DetailRow label="VIN" value={vehicle?.model || "N/A"} />
                <DetailRow label="Year/Make/Model" value={vehicle?.year || "N/A"} />
                <DetailRow label="Odometer" value={vehicle?.vin || "N/A"} />
                <DetailRow label="Color" value={vehicle?.mileage || "N/A"} />
                <DetailRow label="Engine Type" value={vehicle?.trasmission  || "N/A"} />
                <DetailRow label="Condition" value={vehicle?.status || "N/A"} />
                <DetailRow label="Transmission" value={vehicle?.zip || "N/A"} />
                <DetailRow label="Fuel" value={vehicle?.minPrice} />
              </div>
            </div>
            <div className="bg-white col-span-6 rounded-lg md:rounded-[0.938vw] shadow-md p-6 md:p-[1.25vw]">
              <div className="space-y-3 md:space-y-[0.925vw]">
                <DetailRow label="Lot" value={vehicle?.currentBid || "N/A"} />
                <DetailRow label="VIN" value={vehicle?.noOfBids || "N/A"} />
                <DetailRow label="Year/Make/Model" value={vehicle?.carLocation || "N/A"} />
                <DetailRow label="Odometer" value={vehicle?.carState || "N/A"} />
                <DetailRow label="Color" value={vehicle?.carTitledAt || "N/A"} />
                <DetailRow label="Engine Type" value={vehicle?.carTitledInfo  || "N/A"} />
                <DetailRow label="Condition" value={vehicle?.titlesStatus || "N/A"} />
                <DetailRow label="Transmission" value={vehicle?.referral || "N/A"} />
              </div>
            </div>
        </div>

        {/* Description and Modifications */}
        <div className="mt-8 md:mt-[1.667vw] bg-white rounded-lg shadow-md p-6 md:p-[1.25vw]">
        {vehicle?.description && (
          <div className="mb-6 md:mb-[1.267vw] text-left">
            <h2 className="text-xl md:text-24 font-bold mb-2 md:mb-[0.4vw]">Description</h2>
            <p className="text-gray-700 text-sm md:text-18">{vehicle.description}</p>
          </div>
        )}
        {vehicle?.modification && (
          <div className="mb-6 md:mb-[1vw] text-left">
            <h2 className="text-xl md:text-24 font-bold mb-2 md:mb-[0.4vw]">Modifications</h2>
            <p className="text-gray-700 text-sm md:text-18">{vehicle.modification}</p>
          </div>
        )}

      </div>

      </div>
    );
  }
  
  function DetailRow({ label, value }) {
    return (
      <div className="flex justify-between items-center text-sm md:text-18">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  }
  
  