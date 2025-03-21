export default function VehicleDetails({vehicle}) {

    return (
      <div className="w-full mx-auto ">
        <h1 className="lg:text-[1.5vw] leading-[1.5vw]   text-2xl md:text-30 bg-white  p-2 lg:p-[0.5vw] rounded-md md:rounded-[0.5vw] font-bold text-center md:mb-[0.2vw]">Vehicle Details</h1>
          {/* Grid Section */}
        <div className="grid w-full   grid-cols-12 gap-[10px] lg:gap-[0.2vw]">
            <div className="bg-white    col-span-12 rounded-md md:rounded-[0.5vw] shadow-sm p-2 lg:p-[1.25vw] text-[12px] lg:text-15">
              <div className="space-y-[10px] lg::space-y-[0.925vw]">
                <DetailRow label="VIN" value={vehicle?.vin || "N/A"} />
                <DetailRow label="Make/Model/Year" value={vehicle?.make + " " + vehicle?.model + " " + vehicle?.year} />
                <DetailRow label="Odometer" value={vehicle?.mileage + " miles" || "N/A"} />
                <DetailRow label="Status" value={vehicle?.status || "N/A"} />
                <DetailRow label="Transmission" value={vehicle?.transmission || "N/A"} />
                <DetailRow label="Title Status" value={vehicle?.titlesStatus || "N/A"} />
                <DetailRow label="Zip Code" value={vehicle?.zipcode || "N/A"} />
                <DetailRow label="Status Code" value={vehicle?.titlesStatus || "N/A"} />
              </div>
            </div>
            <div className="bg-white    col-span-12 rounded-md md:rounded-[0.5vw] shadow-sm p-2 lg:p-[1.25vw] text-[12px] lg:text-15">
              <div className="space-y-[10px] lg:space-y-[0.925vw]">
                <DetailRow label="Car Location" value={vehicle?.carLocation || "N/A"} />
                <DetailRow label="Car State" value={vehicle?.carState || "N/A"} />
                <DetailRow label="Car Titled At" value={vehicle?.carTitledAt || "N/A"} />
                <DetailRow label="Car Titled Info" value={vehicle?.carTitledInfo  || "N/A"} />
              </div>
            </div>
        </div>

        {/* Description and Modifications */}
        {/* <div className="mt-8 md:mt-[1.667vw] bg-white rounded-lg shadow-md p-6 md:p-[1.25vw]">
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

      </div> */}

      </div>
    );
  }
  
  function DetailRow({ label, value }) {
    return (
      <div className="flex justify-between leading-5 lg:leading-[1.5vw] items-center text-sm md:text-18">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  }
  
  